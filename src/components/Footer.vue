<template>
    <footer class="footer">
      <div class="container p-4">
          <div class="row">
            <div class="col-md-6">
                <ul>
                    <NavItem v-for="navItem in navItems" :key='navItem.id' :navItem="navItem" />
                </ul>
            </div>
            <div class="col-md-6">
                <img src="../assets/logo.png"  class="img-fluid"  alt="Company Logo">
            </div>
          </div>
          <hr>
          <span class="small-text text-muted">Powered by NoloNolo+</span>
      </div>
    </footer>
</template>


<script>

import NavItem from "./NavItem.vue";

export default {
    name: 'Footer',
    components: {
        NavItem
    },
    props: {
        navItems: Array
    }
}
</script>


<style lang="scss" scoped>

@import "@/scss/variables.scss";

    .footer {
    margin-top: 2em;
    position: block ;
    bottom: 0;
    width: 100%;
    height: fit-content;
    line-height:40px;
    background-color: $primary-color;
    }

    h6{
        font-size: 1.5em;
        font-family: $primary-font;
    }

    

    
</style>