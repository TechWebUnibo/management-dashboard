<template>
    <div id='Staff' class="container">
        <h1>Staff charts</h1>
        <div class="row mt-5">
            <BarChart :aria-label="chart.title" role="figure" class="col-lg-6" v-for="chart in charts" :key='chart.title' :chartdata="chart.chardata" :labels="chart.labels" :title="chart.title" :options="chartOptions"/>
        </div>
        <h2>Staff members</h2>
            <div class="row">
                <div class="col-lg-3">
                    <label for="searchBar">Filter:</label>
                    <input type="text" v-model="search" id="searchBar" class="custom-select" placeholder="Search title.."/>
                </div>
                <div class="offset-lg-7 col-lg-2">
                    <label for="customer_order">Sort</label>
                        <select class="custom-select" id="staff_order" v-model="order" @change="sortStaff">
                            <option disabled>Choose...</option>
                            <option>Number of rentals</option>
                            <option>Turnover</option>
                        </select>
                </div>
            </div>
        <div v-if="isLoaded" class="cardsContainer" id="staffContainer">
            <StaffCard v-for="employee in filteredList" :key="employee._id" :employee="employee" />
        </div> 
            <div class="mt-3" v-if="isLoaded">
                <b-pagination align="center"
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                    aria-controls="staffContainer"></b-pagination>
            </div>
    </div>
</template>


<script>

import BarChart from "../components/BarChart.vue";
import StaffCard from "../components/StaffCard.vue";
import { apiMixin } from '../mixins/apiMixin';
 
export default {
    mixins: [apiMixin],
    components:{
        BarChart,
        StaffCard
    },
    data: function(){
        return {
            staff: [],
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
        this.staff = await this.getStaff()
        let rentals = await this.getRentals()
        let invoices = await this.getInvoices()
        
        this.charts.push(this.nRentalChart(this.staff, rentals))
        this.charts.push(this.turnoverChart(this.staff, invoices))
        this.isLoaded = true
    },  
    computed: {
    rows() {
      return this.staff.length
    },
    filteredList() {
        const filtered = this.staff.filter(employee => {
            return employee.username.toLowerCase().includes(this.search.toLowerCase())
            })
            const start = this.currentPage == 1 ? 0 : ((this.currentPage -1)  * this.perPage)
            const end = this.currentPage == 1 ? this.perPage : (start  + this.perPage)
            return filtered.slice(start, end)
        }
    },
    methods: {
        nRentalChart(staff, rents){
            let chardata = []
            let count = {}
            let labels = []
            rents.forEach(rent => {
                let employee = rent.employee
                if(typeof count[employee] == 'undefined'){
                    count[employee] = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                count[employee][rent.state] = count[employee][rent.state] + 1
                count[employee].total = count[employee].total + 1
            });
            staff.forEach(employee =>{
                labels.push(employee.username)
                if(typeof count[employee._id] == 'undefined'){
                    chardata.push(0)
                    employee.rentInfo = {
                        not_started: 0,
                        in_progress: 0,
                        cancelled: 0,
                        terminated: 0,
                        delayed: 0,
                        total: 0
                    } 
                }
                else{
                    chardata.push(count[employee._id].total)
                    employee.rentInfo = count[employee._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Number of rentals for employee'}
        },
        turnoverChart(staff, invoices){
            let chardata = []
            let count = {}
            let labels = []
            invoices.forEach(invoice => {
                let employee = invoice.employee
                if(typeof count[employee] == 'undefined'){
                    count[employee] = invoice.price
                }
                else{
                    count[employee] = count[employee] + invoice.price
                }
            });
            staff.forEach(employee =>{
                labels.push(employee.username)
                if(typeof count[employee._id] == 'undefined'){
                    chardata.push(0)
                    employee.turnover = 0
                }
                else{
                    chardata.push(count[employee._id])
                    employee.turnover = count[employee._id]
                }
            })
            return {chardata: chardata, labels: labels, title: 'Turnover for employee'}    
        },
        sortStaff(){
            if(this.order === 'Number of rentals'){
                this.staff.sort((a, b) =>{
                    if(a.rentInfo.total < b.rentInfo.total)
                        return 1
                    if(a.rentInfo.total > b.rentInfo.total)
                        return -1
                    else
                        return 0
                })
            }
            else if(this.order === 'Turnover'){
                this.staff.sort((a, b) =>{
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


    .search-wrapper{
        justify-content: end;
        column-gap: 1em;
    }


</style>

