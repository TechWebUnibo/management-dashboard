<template>
    <div id="Products">
        <h1>Items charts</h1>
        <h2 v-if="typeof items === 'undefined'">This page shoul be visited only with the proper links</h2>
        <div v-if="typeof items !== 'undefined'" >
            <div class="row mt-5">
                <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
            </div>
            <div class="row mt-5">
                <PieChart :aria-label="pieChart.title" role="figure" class="col-lg-12"  :key='pieChart.title' :chartdata="pieChart.chardata" :labels="pieChart.labels" :title="pieChart.title" :options="chartOptions"/>
            </div>
                <h2 class="mt-5">Rentals</h2>
                <div class="row">
                    <div class="col-lg-3 pb-2">
                        <label for="searchBar">Filter:</label>
                        <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                            <label for="customer_order">Sort</label>
                                <select class="custom-select" id="customer_order" v-model="order" @change="sortItems" role="search">
                                    <option disabled>Choose...</option>
                                    <option>Number of items</option>
                                    <option>Turnover</option>
                                </select>
                    </div>
                <div class="offset-lg-6 col-lg-3">
                    <b-button v-b-toggle.filter-collapse variant="primary">Filters</b-button>
                    <b-collapse id="filter-collapse" class="mt-2">
                        <label for="state_filter">Filter by state</label>
                            <select class="custom-select" id="state_filter" v-model="condition" @change="conditionFilter">
                                <option selected>All condition</option>
                                <option>Perfect</option>
                                <option>Good</option>
                                <option>Broken</option>
                                <option>Not available</option>
                            </select>
                    </b-collapse>
                </div>
            </div>
            <div class="cardsContainer">
                <ItemCard v-for="item in filteredList" :key="item.name" :item="item" />
            </div> 
        </div>
    </div>
</template>

<script>

import BarChart from "../components/BarChart.vue";
import ItemCard from "../components/ItemCard.vue";
import PieChart from "../components/PieChart.vue";


import { apiMixin } from '../mixins/apiMixin';


export default {
    name: 'Rentals',
    mixins: [apiMixin],
    components:{
        BarChart,
        ItemCard,
        PieChart
    },
    props:{
        items: []
    },
    data: function(){
        return {
            filtered: [],
            charts: [],
            pieChart: {},
            search: '',
            condition: 'All condition',
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
        if(typeof this.items !== 'undefined'){
            let rentals = await this.getRentals()
            let invoices = await this.getInvoices()
    
            this.charts.push(this.nRentalChart(this.items, rentals))
            this.charts.push(this.turnoverChart(this.items, invoices))
            this.pieChart = this.conditionChart(this.items)
    
            this.filtered = this.items   
        }
    },
    computed: {
    filteredList() {
        return this.filtered.filter(item => {
            return item.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods:{
        nRentalChart(items, rents){
            let chardata = []
            let count = {}
            let labels = []
            rents.forEach(rent => {
                rent.products.forEach(item =>{
                    if(typeof count[item] == 'undefined'){
                        count[item] = {
                            not_started: 0,
                            in_progress: 0,
                            cancelled: 0,
                            terminated: 0,
                            delayed: 0,
                            total: 0
                        } 
                    }
                    count[item][rent.state] = count[item][rent.state] + 1
                    count[item].total = count[item].total + 1
                })
            });
            items.forEach(item =>{
                labels.push(item.name)
                if(typeof count[item._id] == 'undefined'){
                    chardata.push(0)
                    item.rentInfo = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                else{
                    chardata.push(count[item._id].total)
                    item.rentInfo = count[item._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Number of rentals for items'}
        },
        turnoverChart(items, invoices){
            let chardata = []
            let count = {}
            let labels = []
            invoices.forEach(invoice => {
                Object.keys(invoice.products).forEach(item =>{
                    if(typeof count[item] == 'undefined'){
                        count[item] = invoice.price
                    }
                    else{
                        count[item] = count[item] + invoice.price
                    }
                })
            })

            items.forEach(item =>{
                labels.push(item.name)
                if(typeof count[item._id] == 'undefined'){
                    chardata.push(0)
                    item.turnover = 0
                }
                else{
                    chardata.push(count[item._id])
                    item.turnover = count[item._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Turnover for item'}    
        },
        conditionChart(items){
            const labels = ['perfect', 'good', 'suitable', 'broken', 'not available']
            let count = {
                perfect: 0,
                good: 0,
                suitable: 0,
                broken: 0,
                not_available: 0
            }
            items.forEach(item => {
                count[item.condition] = count[item.condition] + 1
            });

            return {chardata: Object.values(count), labels: labels, title: 'Number of items for condition'}
        },
        sortItems(){
            if(this.order === 'Number of rental')
                this.items.sort((a, b) => b.rentInfo.total - a.rentInfo.total )
            else if(this.order === 'Turnover')
                this.items.sort((a, b) => b.turnover - a.turnover)      
            },
        conditionFilter(){
            let conditionMap = {
                perfect: 'Perfect',
                good: 'Good',
                suitable: 'Suitable',
                broken: 'Broken',
                not_available: 'Not available'
            }
            this.filtered = this.items.filter(item => {
                return this.condition === conditionMap[item.condition] || this.state === 'All condition'
            })
        },
    }
}
</script>


<style scoped lang="scss">

@import "@/scss/variables.scss";

#Products h2{
    text-align: center;
}

</style>