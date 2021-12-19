<template>
<div>
    <div v-if="!isLoaded" class="d-flex justify-content-center mt-5">
        <b-spinner label="Spinning"></b-spinner>
    </div>
    <div v-else id="Products">
        <h1>Products charts</h1>
        <div class="row mt-5">
            <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
            <h2 class="mt-5">Products</h2>
            <div class="row">
                <div class="col-lg-3 pb-2">
                    <label for="searchBar">Filter:</label>
                    <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                        <label for="customer_order">Sort</label>
                            <select class="custom-select" id="customer_order" v-model="order" @change="sortProducts" role="search">
                                <option disabled>Choose...</option>
                                <option>Number of items</option>
                                <option>Turnover</option>
                            </select>
                </div>
            <div class="offset-lg-6 col-lg-3">
            </div>
        </div>
    <div class="cardsContainer" id='productsContainer'>
        <ProductCard v-for="product in filteredList" :key="product.name" :product="product" />
    </div> 
        <div class="mt-3">
            <b-pagination align="center"
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="productsContainer"></b-pagination>
        </div> 
    </div>
</div>
</template>

<script>

import BarChart from "../components/BarChart.vue";
import ProductCard from '../components/ProductCard.vue';


import { apiMixin } from '../mixins/apiMixin';


export default {
    name: 'Rentals',
    mixins: [apiMixin],
    components:{
        BarChart,
        ProductCard
    },
    data: function(){
        return {
            products: [],
            filtered: [],
            items: [],
            charts: [],
            search: '',
            order: 'Choose...',
            chartOptions:{
                responsive: true,
                maintainAspectRatio: false,
            },
            isLoaded: false,
            range: {
                start: '',
                end: '',
            },
            perPage: 4,
            currentPage: 1,
        }
    },
    async created(){
        let rentals = await this.getRentals({productName: true})
        let invoices = await this.getInvoices({productName: true})
        console.log({invoices})
        this.products = await this.getProducts()
        for (let product of this.products) {
            product.items = await this.getItems({type: product._id})
        }
        this.charts.push(this.nRentalChart(this.products, rentals))
        this.charts.push(this.turnoverChart(this.products, invoices))
        this.filtered = this.products   
        this.isLoaded = true
    },
    computed: {
    rows() {
      return this.products.length
    },
    filteredList() {
        const filtered = this.filtered.filter(product => {
            return product.name.toLowerCase().includes(this.search.toLowerCase())
            })
        const start = this.currentPage == 1 ? 0 : ((this.currentPage -1)  * this.perPage)
        const end = this.currentPage == 1 ? this.perPage : (start  + this.perPage)
        return filtered.slice(start, end)
        }
    },
    methods:{
        nRentalChart(products, rents){
            let chardata = []
            let count = {}
            let labels = []
            rents.forEach(rent => {
                if(rent.products.length > 1){
                    if(typeof count[rent.productType] == 'undefined'){
                        count[rent  .productType] = {
                            not_started: 0,
                            in_progress: 0,
                            cancelled: 0,
                            terminated: 0,
                            delayed: 0,
                            total: 0
                        } 
                    }
                    count[rent.productType][rent.state] = count[rent.productType][rent.state] + 1
                    count[rent.productType].total = count[rent.productType].total + 1   
                }
                rent.products.forEach(product =>{
                    if(typeof count[product] == 'undefined'){
                        count[product] = {
                            not_started: 0,
                            in_progress: 0,
                            cancelled: 0,
                            terminated: 0,
                            delayed: 0,
                            total: 0
                        } 
                    }
                    count[product][rent.state] = count[product][rent.state] + 1
                    count[product].total = count[product].total + 1
                })
            });
            products.forEach(product =>{
                labels.push(product.name)
                if(typeof count[product.name] == 'undefined'){
                    chardata.push(0)
                    product.rentInfo = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                else{
                    chardata.push(count[product.name].total)
                    product.rentInfo = count[product.name]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Number of rentals for product'}
        },
        turnoverChart(products, invoices){
            let chardata = []
            let count = {}
            let labels = []
            invoices.forEach(invoice => {
                if(typeof count[invoice.productType] == 'undefined'){
                    count[invoice.productType] = invoice.price
                }
                else{
                    count[invoice.productType] = count[invoice.productType] + invoice.price
                }
            })

            products.forEach(product =>{
                labels.push(product.name)
                if(typeof count[product.name] == 'undefined'){
                    chardata.push(0)
                    product.turnover = 0
                }
                else{
                    chardata.push(count[product.name])
                    product.turnover = count[product.name]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Turnover for product'}    
        },
        sortProducts(){
            if(this.order === 'Number of items')
                this.products.sort((a, b) => b.items.length - a.items.length )
            else if(this.order === 'Turnover')
                this.products.sort((a, b) => b.turnover - a.turnover)      
            }
    },
    metaInfo() {
        return { 
            title: "Products",
        }
    }
}
</script>


<style scoped lang="scss">

@import "@/scss/variables.scss";

#Products h2{
    text-align: center;
}

</style>