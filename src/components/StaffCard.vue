<template>

<div class="card" style="">
  <div class="card-body">
    <h5 class="card-title">{{employee.username}}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The employee has made: {{employee.rentInfo.total}} rentals for a total of {{employee.turnover}} euro</li>
        <li class="list-group-item">{{employee.rentInfo.not_started}} not started</li>
        <li class="list-group-item">{{employee.rentInfo.in_progress}} in progress</li>
        <li class="list-group-item">{{employee.rentInfo.terminated}} terminated</li>
        <li class="list-group-item">{{employee.rentInfo.cancelled}} cancelled</li>
        <li class="list-group-item">{{employee.rentInfo.delayed}} delayed</li>
    </ul>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" @change="changeRole" id="manager_switch" :checked="employee.role === 'manager'">
        <label class="form-check-label" for="manager_switch">Manager</label>
    </div>
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
    },
    methods:{
        async changeRole(){
            console.log(await this.modifyStaff(this.employee._id, {role: this.employee.role === 'manager'? 'administrator' : 'manager'}))
        }
    }
}
</script>



<style lang="scss" scoped>


</style>