<template>

<div class="card" style="">
    <div class="card-header">
        <img class="card-img-top"  :src="product.img"  alt="Product image">
    </div>
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The product has: {{product.items.length}} item</li>
        <li class="list-group-item">Rented: {{product.rentInfo.total}} times</li>
        <li class="list-group-item">Total turnover: {{product.turnover}}</li>
    </ul>
    <router-link v-if="product.items.length > 1" :to="{ name: 'Items', query: {type: product._id } }" class="btn btn-primary mt-4">Show items</router-link>
  </div>
</div>

</template>

<script>

export default {
    name: 'ProductCard',
    data: function (){
        return {}
    },
    props:{
        product: Object
    },
    created(){
        console.log(this.product.items)
    }
}
</script>



<style lang="scss" scoped>

</style>