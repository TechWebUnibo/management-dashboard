<template>
<div id="App">
    <header>
      <Navbar :navItems="authenticated ? fullNavItems : basicNavItems"  />
    </header>
    <main class="container">
      <router-view @userLogged="authenticated = true" />
    </main>
    <Footer :navItems="basicNavItems"></Footer>
</div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { refreshPublicKey, isLogged } from "./utility/auth";

import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faTruck } from '@fortawesome/free-solid-svg-icons'
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome)
library.add(faUserCog)
library.add(faShoppingCart)
library.add(faUsers)
library.add(faAddressCard)
library.add(faUserTie)
library.add(faTruck)
library.add(faBoxOpen)

Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
      data: function () {
      return {
        baseUrl: '/management-dashboard',
        basicNavItems: [],
        fullNavItems: [],
        authenticated: false
    }
  },
  async created() {
    this.authenticated = await isLogged()
    await refreshPublicKey()
    this.basicNavItems = [
      { id: 1, text: 'Home', link: this.baseUrl, icon: 'home' },
      { id: 2, text: 'Admin Page', link: '/admin', icon: 'user-tie'},
      { id: 3, text: 'Shop', link: '/shop', icon: 'shopping-cart'}
    ]
    this.fullNavItems = this.basicNavItems.concat([
      { id: 4, text: 'Customers', link: this.baseUrl + '/customers', icon: 'users' },
      { id: 5, text: 'Rental', link: this.baseUrl +  '/rentals', icon: 'box-open'} ,
      { id: 6, text: 'Staff', link: this.baseUrl +  '/staff', icon: 'address-card'},
      { id: 7, text: 'Products', link: this.baseUrl +  '/products', icon: 'truck' }
    ])
  },
}
</script>

<style lang="scss">

@import "@/scss/variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}

html, body{
  min-height: 100%;
}

h1, h2{
  font-family: $primary-font;
  text-align: center;
}


ul{
  text-decoration: none;
}

a {
  color: black;
  text-decoration: none;
  font-family: $primary-font;
}

main{
  margin-top: 1em;
  background-color: white;
  min-height: 100%;
}

canvas{
  overflow-x: scroll;
}

.wrapper{
  overflow-x: scroll;
}

.cardsContainer{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 3em;
  column-gap: 1em;
  margin-top: 2em;
  justify-content: space-between;
}


@include media-breakpoint-down(lg) {
    .cardsContainer{
        grid-template-columns: 1fr 1fr;
    }
}

@include media-breakpoint-down(md) {
    .cardsContainer{
        grid-template-columns: 1fr ;
    }
}


.card-text{
    color: black;
}
.card-title{
    color: black;
}
.card-header{
    display: flex;
    align-items: center;
}

.card-footer{
    padding: 1em 1em;
}



.custom-select {
    display: block;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;    
    border-radius: 5px;
}
</style>
