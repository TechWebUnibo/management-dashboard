<template>

<div class="card" style="">
    <div class="card-body">
        <h5 class="card-title">{{item.name}}</h5>
        <ul class="list-group list-group-flush">
            <li class="list-group-item active">The item has been rented for {{item.rentInfo.total}} times for a turnover of {{item.turnover}}</li>
            <li class="list-group-item">Condition: {{item.condition}}</li>
            <li class="list-group-item">Price: {{item.price}}</li>
        </ul>
    </div>
      <div class="card-footer bg-transparent" v-if="item.rentInfo.total > 0">
        <router-link :to="{ name: 'Rentals', query: { products: item._id,} }" class="btn btn-primary mt-4">Show rentals</router-link>
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
        item: Object
    },
    created(){
    }
}
</script>



<style lang="scss" scoped>

</style>