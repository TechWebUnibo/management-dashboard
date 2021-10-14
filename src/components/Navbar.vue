<template>
    <nav class="nav">
        <a class="navbar-brand" href="#">
            <img src="../assets/logo.png" alt="Company Logo" width="130" height="40">
        </a>
        <ul id='collapseItems'>
            <NavItem  v-for='navItem in navItems' :key='navItem.id' :navItem='navItem' />
        </ul>
        <button class="sidebar-toggle" @click="toggleSidebar"  aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
            <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
        <div id='sidebar' class="sidebar-hidden">
            <button class="sidebar-toggle" @click="toggleSidebar" aria-controls="sidebar" aria-expanded="true" aria-label="Toggle navigation"><font-awesome-icon :icon="['fas', 'arrow-left']" /></button>
            <ul class="p-1">
                <NavItem  v-for='navItem in navItems' :key='navItem.id' :navItem='navItem' />
            </ul>
        </div>
    </nav>
</template>

<script>

// TODO - sistemare l'apertura e la chiusura della sidebar

import NavItem from './NavItem.vue'

export default {
    name: 'Navbar',
    props: {
        navItems: Array
    },
    components:{
        NavItem
    },
    methods:{
        toggleSidebar(){
            let sidebar = document.getElementById('sidebar')
            let toggles = document.getElementsByClassName('sidebar-toggle')
            if(getComputedStyle(sidebar).width === '0px'){
                sidebar.classList.add('sidebar-toggled')
                for (const toggle of toggles) {
                    toggle.setAttribute('aria-expanded', true)
                }
            }
            else{
                sidebar.classList.remove('sidebar-toggled')
                for (const toggle of toggles) {
                    toggle.setAttribute('aria-expanded', false)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
  @import "@/scss/variables.scss";


.nav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: $primary-color;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.nav a{
    color: black;
    font-weight: 500;
}

#collapseItems{
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    margin: 0;
}

.sidebar-hidden{
    display: none;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    overflow-x: hidden; 
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    position: fixed;
    z-index: 3; 
  }

.sidebar-toggle{
    display: none;
    padding: 1rem;
}


.sidebar-toggled{
    width: 35%;
    max-width: 300px;
    background: $primary-color;
    background-color: $primary-color;
    transition: 0.2s; 
    line-height: 3em;
}

.sidebar-toggled button {
    font-size: 1rem;
    text-align: left;
    border-bottom: 1px solid rgba($color: #beb4b45b, $alpha: 1.0);
    padding: 0.5rem;
}


@include media-breakpoint-down(sm) {
  #collapseItems {
    display: none;
  }
  .nav{
    justify-content: space-between;
  }
  .sidebar-toggle{
      display: block;
      background-color: transparent;
      border: 0px  ;
  }
}
@include media-breakpoint-up(sm) {
  #sidebar {
    display: none;
    width: 0;
  }
}
</style>