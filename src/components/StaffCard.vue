<template>

<div class="card" style="">
  <div class="card-body">
    <h3 class="card-title">{{employee.username}}</h3>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The employee has made: {{employee.rentInfo.total}} rentals for a total of {{employee.turnover}}€</li>
        <li class="list-group-item">{{employee.rentInfo.not_started}} not started</li>
        <li class="list-group-item">{{employee.rentInfo.in_progress}} in progress</li>
        <li class="list-group-item">{{employee.rentInfo.terminated}} terminated</li>
        <li class="list-group-item">{{employee.rentInfo.cancelled}} cancelled</li>
        <li class="list-group-item">{{employee.rentInfo.delayed}} delayed</li>
    </ul>
  </div>
    <div class="card-footer bg-transparent">
        <router-link v-if="employee.rentInfo.total" :to="{ name: 'Rentals', query: { employee: employee._id} }" class="btn btn-primary mt-4">Show rentals</router-link>
        <router-link :to="{ name: 'StaffModify', query: { employee: employee._id} }" class="btn btn-primary mt-4">Modify</router-link>
        <button v-if="!employee.rentInfo.total" @click="$emit('delete', employee)" class="btn btn-danger mt-4">Delete</button>
    </div>
</div>

</template>

<script>
import { apiMixin } from '../mixins/apiMixin'

export default {
    name: 'StaffCard',
    mixins: [apiMixin],
    data: function (){
        return {
        }
    },
    props:{
        employee: Object
    }
}
</script>



<style lang="scss" scoped>

.btn{
    margin-right: 1em;
}


</style>