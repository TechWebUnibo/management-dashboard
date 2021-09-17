<template>
<div id="App">
    <header>
      <Navbar :navItems="authenticated ? fullNavItems : basicNavItems"  />
    </header>
    <main class="container">
      <router-view @userLogged="authenticated = true" />
    </main>
</div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'
import { refreshPublicKey, isLogged } from "./utility/auth";

export default {
  name: 'App',
  components: {
    Navbar
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
      { id: 1, text: 'About', link: '/about' },
      { id: 2, text: 'Admin Page', link: '/admin'}
    ]
    this.fullNavItems = this.basicNavItems.concat([
      { id: 3, text: 'Customers', link: this.baseUrl + '/customers'},
      { id: 4, text: 'Rental', link: this.baseUrl +  '/rental' } ,
      { id: 5, text: 'Staff', link: this.baseUrl +  '/staff'},
      { id: 6, text: 'Items', link: this.baseUrl +  '/items' }
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
}

h1{
  font-family: $primary-font;
}

#App{
  //background-color: $bg-color;
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

</style>
