<template>

<div class="card" style="">
    <div class="card-header">
        <img class="card-img-top"  :src="prod.img"  alt="Product image">
    </div>
  <div class="card-body">
    <h5 class="card-title">{{prod.name}}</h5>
    <ul class="list-group list-group-flush">
        <li v-if="prod.items.length >= 1" class="list-group-item active">The product has: {{prod.items.length}} item</li>
        <li v-if="prod.products.length > 1" class="list-group-item active">The bundle contains {{prod.products.length}} products</li>
        <ul v-if="prod.products.length > 1 && !isLoading" class="list-group list-group-flush" >
            <h6>Products:</h6>
            <li :key="p.name" v-for="p in prod.products" class="list-group-item">{{p.name}}</li>
        </ul>
        <hr>
        <h6>Rent info</h6>
        <li class="list-group-item">Rented: {{prod.rentInfo.total}} times</li>
        <li class="list-group-item">Total turnover: {{prod.turnover}}€</li>
    </ul>
    <router-link v-if="prod.items.length >= 1" :to="{ name: 'Items', query: {type: prod._id } }" class="btn btn-primary mt-4">Show items</router-link>
    <router-link v-if="prod.rentInfo.total >= 1" :to="{ name: 'Rentals', query: {productType: prod._id } }" class="btn btn-primary mt-4">Show rentals</router-link>
  </div>
</div>

</template>

<script>
import { apiMixin } from '../mixins/apiMixin'


export default {
    name: 'ProductCard',
    mixins: [apiMixin],
    data: function (){
        return {
            prod: Object,
            isLoading: true
        }
    },
    props:{
        product: Object
    },
    async created(){
        this.prod = this.product
        if(this.prod.products.length > 1){
            for (const index in this.prod.products) {
                this.prod.products[index] = await this.getProduct(this.prod.products[index])
            }
        }
        this.isLoading = false
    },
}
</script>



<style lang="scss" scoped>

    a{
        margin-left: 1em;
    }

</style>