<template>

    <div class="card" >
        <img class="card-img" :src="require(`@/assets/${card.img}`)" :alt="card.alt">
        <div class="card-body">
            <h3 class="card-title">{{card.title}}</h3>
            <p class="card-text">{{card.text}}</p>
            <router-link v-for="link in card.links" :key="link.link" :to="link.link" class="btn btn-primary">{{link.text}}</router-link>            
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

    .btn {
        margin-right: 1em;
    }
</style>