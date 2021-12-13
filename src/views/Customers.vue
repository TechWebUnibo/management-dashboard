<template>
    <div id='Customers' class="container">
        <h1>Customers charts</h1>
        <div class="row mt-5">
            <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
        <h2>Customers</h2>
            <div class="row">
                <div class="col-lg-3">
                    <label for="searchBar">Filter:</label>
                    <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                </div>
                <div class="offset-lg-7 col-lg-2">
                    <label for="customer_order">Sort</label>
                        <select class="custom-select" id="customer_order" v-model="order" @change="sortCustomer">
                            <option disabled>Choose...</option>
                            <option>Number of rentals</option>
                            <option>Turnover</option>
                        </select>
                </div>
            </div>
        <div v-if="isLoaded" class="cardsContainer" id="customersContainer">
            <CustomerCard v-for="customer in filteredList" :key="customer._id" :customer="customer" />
        </div> 
            <div class="mt-3">
                <b-pagination align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="customersContainer"></b-pagination>
            </div>
    </div>
</template>


<script>

import BarChart from "../components/BarChart.vue";
import CustomerCard from "../components/CustomerCard.vue";
import { apiMixin } from '../mixins/apiMixin';
 
export default {
    mixins: [apiMixin],
    components:{
        BarChart,
        CustomerCard
    },
    data: function(){
        return {
            customers: [],
            search: '',
            order: 'Choose...',
            charts: [],
            chartOptions:{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },
            perPage: 4,
            currentPage: 1,
            isLoaded: false
        }
    },
    async created(){
        this.customers = await this.getCustomers()
        let rents = await this.getRentals()
        let invoices = await this.getInvoices()

        this.charts.push(this.nRentalChart(this.customers, rents))
        this.charts.push(this.turnoverChart(this.customers, invoices))

        this.isLoaded = true
    },  
    computed: {
    rows() {
      return this.customers.length
    },
    filteredList() {
        const filtered = this.customers.filter(customer => {
            return customer.username.toLowerCase().includes(this.search.toLowerCase())
            })
            const start = this.currentPage == 1 ? 0 : ((this.currentPage -1)  * this.perPage)
            const end = this.currentPage == 1 ? this.perPage : (start  + this.perPage)
            console.log({start, end})
            return filtered.slice(start, end)
        }
    },
    methods:{
        nRentalChart(customers, rents){
            let chardata = []
            let count = {}
            let labels = []
            rents.forEach(rent => {
                let customer = rent.customer
                if(typeof count[customer] == 'undefined'){
                    count[customer] = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                count[customer][rent.state] = count[customer][rent.state] + 1
                count[customer].total = count[customer].total + 1
            });
            customers.forEach(customer =>{
                labels.push(customer.username)
                if(typeof count[customer._id] == 'undefined'){
                    chardata.push(0)
                    customer.rentInfo = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                else{
                    chardata.push(count[customer._id].total)
                    customer.rentInfo = count[customer._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Number of rentals for customer'}
        },
        
        turnoverChart(customers, invoices){
            let chardata = []
            let count = {}
            let labels = []
            invoices.forEach(invoice => {
                let customer = invoice.customer
                if(typeof count[customer] == 'undefined'){
                    count[customer] = invoice.price
                }
                else{
                    count[customer] = count[customer] + invoice.price
                }
            });
            customers.forEach(customer =>{
                labels.push(customer.username)
                if(typeof count[customer._id] == 'undefined'){
                    chardata.push(0)
                    customer.turnover = 0
                }
                else{
                    chardata.push(count[customer._id])
                    customer.turnover = count[customer._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Turnover for customer'}    
        },
        sortCustomer(){
            if(this.order === 'Number of rentals'){
                this.customers.sort((a, b) =>{
                    if(a.rentInfo.total < b.rentInfo.total)
                        return 1
                    if(a.rentInfo.total > b.rentInfo.total)
                        return -1
                    else
                        return 0
                })
            }
            else if(this.order === 'Turnover'){
                this.customers.sort((a, b) =>{
                    if(a.turnover < b.turnover)
                        return 1
                    if(a.turnover > b.turnover)
                        return -1
                    return 0
                })
            }
        }
    },
    metaInfo() {
        return { 
            title: "Customers",
        }
    }
    
}
</script>


<style lang="scss" scoped>

    @import "@/scss/variables.scss";

    #Customers h1, h2{
        text-align: center;
    }
    #Customers{
        margin-top: 2em;
        padding-bottom: 1em;
    }

    .search-wrapper{
        justify-content: end;
        column-gap: 1em;
    }


</style>

