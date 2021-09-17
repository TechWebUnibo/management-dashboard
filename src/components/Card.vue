<template>

    <div class="card" >
        <img class="card-img" :src="require(`@/assets/${card.img}`)" alt="Card image">
        <div class="card-body">
            <h5 class="card-title">{{card.title}}</h5>
            <p class="card-text">{{card.text}}</p>
            <router-link :to="card.link" class="btn btn-primary">Show</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props:{
        card: Object
    },
}
</script>



<style lang="scss" scoped>
    .card-text{
        color: black;
    }
    .card-title{
        color: black;
    }
    img{
        height: 70%;
    }
</style>