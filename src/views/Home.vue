<template>
<div id='Home'>
  <Login @userLogged="$emit('userLogged')"/>
</div>
</template>

<script>

import Login from '@/components/Login.vue'

export default {
  name: 'App',
  components: {
    Login
  }, 
    metaInfo() {
      return { 
          title: "Login",
      }
  }
}
</script>


<style lang="scss" scoped>

  #Home{
    padding-top: 2em;
  }

</style>