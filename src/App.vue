<template>
<div>
    <header>
      <Navbar :navItems="navItems" />
    </header>
    <main>
      <router-view />
    </main>
</div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
      data: function () {
      return {
        navItems: []
    }
  },
  created() {
    this.navItems = [
      { id: 2, text: 'Admin Page', link: '/admin'},
      { id: 1, text: 'About', link: '/about' }
    ]
  } 
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
