<template>

<div class="card" style="">
    <div class="card-header">
        <img class="card-img-top img-thumbnail"  :src="customer.avatar"  alt="Customer avatar">
    </div>
  <div class="card-body">
    <h5 class="card-title">{{customer.username}}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The customer has made: {{customer.rentInfo.total}} rentals for a total of {{customer.turnover}} euro</li>
        <li class="list-group-item">{{customer.rentInfo.not_started}} not started</li>
        <li class="list-group-item">{{customer.rentInfo.in_progress}} in progress</li>
        <li class="list-group-item">{{customer.rentInfo.terminated}} terminated</li>
        <li class="list-group-item">{{customer.rentInfo.cancelled}} cancelled</li>
        <li class="list-group-item">{{customer.rentInfo.delayed}} delayed</li>
    </ul>
         <hr>
     <div id='personalInfo'>    
        <h6>Personal info</h6>
        <ul class="list-group list-group-flush" v-if="customer.address">
            <li class="list-group-item">Lives in: {{customer.address.city }}</li>
            <li class="list-group-item">Zip code: {{customer.address.zip }}</li>
            <li class="list-group-item">Residence: {{customer.address.residence }}</li>
        </ul>
        <ul class="list-group list-group-flush" v-if="!customer.address">
            <li class="list-group-item">No other info</li>
        </ul>
     </div>
  </div>
    <div class="card-footer bg-transparent">
        <router-link v-if="customer.rentInfo.total" :to="{ name: 'Rentals', query: {customer: customer._id} }" class="btn btn-primary mt-4">Show rentals</router-link>
    </div>
</div>

</template>

<script>

export default {
    name: 'CustomerCard',
    data: function (){
        return {
        }
    },
    props:{
        customer: Object
    },
    created(){
        if(typeof this.customer.avatar === 'undefined' || this.customer.avatar === ''){
            this.customer.avatar = '/img/avatar/generic-user-icon.png'
        }
    }
}
</script>



<style lang="scss" scoped>

.card-footer{
    border-top: 0px;
    padding: 1rem 1rem;
}

</style>