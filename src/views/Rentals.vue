<template>
    <div id="Rentals">
        <h1>Rentals charts</h1>
        <div class="row mt-5">
            <PieChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
            <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title + "-pie"' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
            <h2 class="mt-5">Rentals</h2>
            <div class="row">
                <div class="col-lg-3 pb-2">
                    <label for="searchBar">Filter:</label>
                    <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                        <label for="customer_order">Sort</label>
                            <select class="custom-select" id="customer_order" v-model="order" @change="sortRental" role="search">
                                <option disabled>Choose...</option>
                                <option>Number of products</option>
                                <option>Price</option>
                                <option>Ascending date</option>
                                <option>Descending date</option>
                            </select>
                </div>
            <div class="offset-lg-6 col-lg-3">
                <b-button v-b-toggle.filter-collapse variant="primary">Filters</b-button>
                <b-collapse id="filter-collapse" class="mt-2">
                    <label for="state_filter">Filter by state</label>
                        <select class="custom-select" id="state_filter" v-model="state" @change="filter">
                            <option selected>All states</option>
                            <option>Not started</option>
                            <option>In progress</option>
                            <option>Terminated</option>
                            <option>Cancelled</option>
                            <option>Delayed</option>
                        </select>
                        <label for="start_date">Choose a start date</label>
                        <b-form-datepicker id="start_date" @input="filter" v-model="range.start" class="mb-2" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
                        <label for="end_date">Choose a end date</label>
                        <b-form-datepicker id="end_date" @input="filter"  v-model="range.end" class="mb-2" :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"></b-form-datepicker>
                        <b-button variant="danger" role="reset" @click="reset" >Reset</b-button>
                </b-collapse>
            </div>
        </div>
    <div class="cardsContainer">
        <RentalCard v-for="rental in filteredList" :key="rental._id" :rental="rental" />
    </div> 

    </div>
</template>

<script>

import PieChart from "../components/PieChart.vue";
import BarChart from "../components/BarChart.vue";
import RentalCard from "../components/RentalCard.vue"


import { apiMixin } from '../mixins/apiMixin';


export default {
    name: 'Rentals',
    mixins: [apiMixin],
    components:{
        RentalCard,
        PieChart,
        BarChart
    },
    data: function(){
        return {
            rentals: [],
            filtered: [],
            charts: [],
            state: 'All states',
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
        this.rentals = await this.getRentals({productName: true})
        this.charts.push(this.stateChart(this.rentals))
        this.filtered = this.rentals
    },
    computed: {
    filteredList() {
        return this.filtered.filter(rental => {
            return rental._id.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },
    methods:{
        stateChart(rentals){
            console.log(rentals)
            const labels = ['not started', 'in progress', 'terminated', 'cancelled', 'delayed']
            let count = {
                not_started: 0,
                in_progress: 0,
                terminated: 0,
                cancelled: 0,
                delayed: 0
            }
            rentals.forEach(rent => {
                count[rent.state] = count[rent.state] + 1
            });

            return {chardata: Object.values(count), labels: labels, title: 'Number of rentals for state'}
        },
        sortRental(){
            if(this.order === 'Number of product')
                this.rentals.sort((a, b) => b.products.length - a.products.length)
            else if(this.order === 'Price')
                this.rentals.sort((a, b) => a.price - b.price)
            else if(this.order === 'Ascending date')
                this.rentals.sort((a, b) => Date.parse(a.start) - Date.parse(b.start))
            else if(this.order === 'Descending date')
                this.rentals.sort((a, b) => Date.parse(b.start) - Date.parse(a.start))
        },
        stateFilter(){
            let stateMap = {
            not_started: 'Not started',
            in_progress: 'In progress',
            terminated: 'Terminated',
            cancelled: 'Cancelled',
            delayed: 'Delayed'
            }
            this.filtered = this.rentals.filter(rental => {
                return this.state === stateMap[rental.state] || this.state === 'All states'
            })
        },
        filterByDate(){
            console.log(this.range)
            if(Date.parse(this.range.start) && Date.parse(this.range.end)){
                this.filtered = this.filtered.filter(rental => {
                    return (rental.start > this.range.start && rental.start < this.range.end) ||
                           (rental.end > this.range.start && rental.end < this.range.end) ||
                           (rental.start < this.range.start && rental.end > this.range.end) 
                    })
            }
        },
        filter(){
            this.stateFilter()
            this.filterByDate()
        },
        reset(){
            this.range.start = ''
            this.range.end = ''
            this.state = 'All states'
            this.filter()
        }
    }
}
</script>


<style scoped lang="scss">

@import "@/scss/variables.scss";

#Rentals h2{
    text-align: center;
}

</style>