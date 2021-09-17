<template>
    <div id='Customers' class="container">
        <h1>Customers charts</h1>
        <div class="row mt-5">
            <BarChart class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
        <label for="customer_order">Sort</label>
            <select class="form-select" id="customer_order" v-model="order" @change="sortCustomer">
                <option disabled>Choose...</option>
                <option>Number of rentals</option>
                <option>Turnover</option>
            </select>
        <div v-if="isLoaded" id="customerCards">
            <CustomerCard v-for="customer in customers" :key="customer._id" :customer="customer" />
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
            console.log(this.order)
            if(this.order === 'Number of rentals'){
                this.customers.sort((a, b) =>{
                    console.log(a.rentInfo.total)
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
    }
    
}
</script>


<style lang="scss" scoped>

    @import "@/scss/variables.scss";

    #Customers h1{
        text-align: center;
    }
    #Customers{
        margin-top: 2em;
        padding-bottom: 1em;
    }
    #customerCards{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        row-gap: 3em;
        margin-top: 2em;
        justify-content: space-between;
        justify-items: center;
    }



    @include media-breakpoint-down(lg) {
        #customerCards{
            grid-template-columns: 1fr 1fr;
        }
    }
    @include media-breakpoint-down(sm) {
        #customerCards{
            grid-template-columns: 1fr;
        }
    }
</style>

