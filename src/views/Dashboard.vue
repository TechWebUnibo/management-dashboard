<template>
    <div id='Dashboard'>
        <h1>Stats and graphs</h1>
        <h2>See different statics about customers, rents and others</h2>
        <div id='cards'>
            <Card v-for='card in cards' :key='card.title' :card="card"/>
        </div>
            
    </div>
</template>


<script>

import Card from "@/components/Card.vue";

export default {
    name: 'Dashboard',
    data: function () {
        return {
            baseUrl: '/management-dashboard/',
            cards: [
                {title: 'Customers', text: 'Show stats about the customers', link: 'customers', img: 'customers.png'},
                {title: 'Staff', text: 'Show stats about the staff', link: '#', img: 'staff.jpg'},
                {title: 'Rental', text: 'Show stats about the rentals', link: '#', img: 'rentals.jpg'}
            ]
        }
    },
    components: {
        Card
    },
    created(){
        this.cards.forEach(card =>{
            card.link = this.baseUrl + card.link
        })
    }
}
</script>

<style lang="scss" scoped>

@import "@/scss/variables.scss";

    #Dashboard{
        height: 100%;
        background-color: white;
        padding: 4em;

        width: 100%;
        height: 100%;
    }

    #Dashboard h1{
        text-align: center;
        font-family: $primary-font;
    }
    #Dashboard h2{
        text-align: center;
        font-family: $primary-font;
        font-size: 1em;
    }

    #cards{
        margin-top: 2em;
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2em;
        row-gap: 2em;
        justify-content: space-around;
    }

@include media-breakpoint-down(sm) {
    #cards{
        grid-template-columns: 1fr;
    }
}


</style>