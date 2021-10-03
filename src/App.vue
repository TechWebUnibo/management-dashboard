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
      { id: 1, text: 'Home', link: this.baseUrl },
      { id: 2, text: 'Admin Page', link: '/admin'},
      { id: 3, text: 'Shop', link: '/shop'}
    ]
    this.fullNavItems = this.basicNavItems.concat([
      { id: 4, text: 'Customers', link: this.baseUrl + '/customers'},
      { id: 5, text: 'Rental', link: this.baseUrl +  '/rentals' } ,
      { id: 6, text: 'Staff', link: this.baseUrl +  '/staff'},
      { id: 7, text: 'Products', link: this.baseUrl +  '/products' }
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
  position: relative;
}

html{
  position: relative;
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
  height: 100%;
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
