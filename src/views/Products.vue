<template>
    <div id="Products">
        <div class="row mt-5">
            <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
            <h2 class="mt-5">Rentals</h2>
            <div class="row">
                <div class="col-lg-3 pb-2">
                    <label for="searchBar">Filter:</label>
                    <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                        <label for="customer_order">Sort</label>
                            <select class="custom-select" id="customer_order" v-model="order" @change="sortProducts" role="search">
                                <option disabled>Choose...</option>
                                <option>Number of products</option>
                                <option>Price</option>
                                <option>Ascending date</option>
                                <option>Descending date</option>
                            </select>
                </div>
            <div class="offset-lg-6 col-lg-3">
            </div>
        </div>
    <div class="cardsContainer">
    </div> 

    </div>
</template>

<script>

import BarChart from "../components/BarChart.vue";


import { apiMixin } from '../mixins/apiMixin';


export default {
    name: 'Rentals',
    mixins: [apiMixin],
    components:{
        BarChart
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
        }
    },
    async created(){
        let rentals = await this.getRentals({productName: true})
        let invoices = await this.getInvoices({productName: true})
        this.products = await this.getProducts()
        console.log(this.nRentalChart(this.products, rentals))
        this.charts.push(this.nRentalChart(this.products, rentals))
        this.charts.push(this.turnoverChart(this.products, invoices ))
        this.filtered = this.products   
    },
    computed: {
    filteredList() {
        return this.filtered.filter(product => {
            return product.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods:{
        nRentalChart(products, rents){
            let chardata = []
            let count = {}
            let labels = []
            rents.forEach(rent => {
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
                Object.keys(invoice.products).forEach(product =>{
                    if(typeof count[product] == 'undefined'){
                        count[product] = invoice.price
                    }
                    else{
                        count[product] = count[product] + invoice.price
                    }
                })
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
            return this.products
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