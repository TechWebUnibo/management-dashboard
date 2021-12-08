<template>

<div :class="colorState[rental.state]" class="card" style="">
  <div class="card-body">
    <h5 class="card-title">Rental code: {{rental._id}}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The rental has: {{rental.products.length}} products for a total of {{rental.price}}euro</li>
        <li v-for="product in rental.products" :key="product" class="list-group-item">{{product}}</li>
    </ul>
    <div class="card-footer bg-transparent border-primary">
        <h6>Other info</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Customer: {{rental.customer}}</li>
            <li class="list-group-item">Operator: {{rental.employee}}</li>
            <li class="list-group-item">State: {{rental.state.replace(/_/, ' ')}}</li>
            <li class="list-group-item">Start date: {{rental.start.split('T')[0]}}</li>
            <li class="list-group-item">End date: {{rental.end.split('T')[0]}}</li>
        </ul>
    </div>
  </div>
</div>

</template>

<script>

export default {
    name: 'RentalCard',
    data: function (){
        return {
            colorState: {
                not_started: 'border-light',
                in_progress: 'border-success',
                terminated: 'border-info',
                cancelled: 'border-danger',
                delayed: 'border-warning'
            }
        }
    },
    props:{
        rental: Object
    },
    created(){
        }
}
</script>



<style lang="scss" scoped>

</style>