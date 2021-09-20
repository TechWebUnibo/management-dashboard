<template>

<div class="card" style="">
    <div class="card-header">
        <img class="card-img-top"  :src="product.img"  alt="Product image">
    </div>
  <div class="card-body">
    <h5 class="card-title">{{product.name}}</h5>
    <ul class="list-group list-group-flush">
        <li class="list-group-item active">The product has: {{product.items.length}}item</li>
        <li class="list-group-item">Rented: {{product.rentInfo.total}} times</li>
        <li class="list-group-item">Total turnover: {{product.turnover}}</li>
    </ul>
    <router-link :to="{ name: 'Items', params: {items: product.items } }" class="btn btn-primary mt-4">Show items</router-link>
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
    .card-text{
        color: black;
    }
    .card-title{
        color: black;
    }
    .card-header{
        min-height: 40%;
        display: flex;
        align-items: center;
    }
    .card-body{
        overflow-y:  scroll;
    }
    .card-footer{
        padding: 1em 0;
    }

</style>