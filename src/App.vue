<template>
<div>
    <header>
      <Navbar :navItems="authenticated ? fullNavItems : basicNavItems"  />
    </header>
    <main>
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
        baseUrl: ['/management-dashboard', '/management-dashboard/'],
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
      { id: 3, text: 'Customers', link: '/customers'},
      { id: 4, text: 'Rental', link: '/rental' },
      { id: 5, text: 'Staff', link: '/staff'},
      { id: 6, text: 'Items', link: '/Items' }
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

ul{
  text-decoration: none;
}

a {
  color: black;
  text-decoration: none;
  font-family: $primary-font;
}

</style>
