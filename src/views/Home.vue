<template>
<div>
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
}
</script>
