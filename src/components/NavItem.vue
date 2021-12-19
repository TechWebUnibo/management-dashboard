<template>
    <li class="nav-item" :aria-current="this.$router.currentRoute === navItem.text">
        <button class="btn btn-danger text-center" @click="logoutEvent" v-if="navItem.text === 'Logout'"><font-awesome-icon :icon="navItem.icon" />Logout</button>
        <router-link v-else class="nav-link" :to='navItem.link'><font-awesome-icon v-if="showIcon" :icon="navItem.icon" />
        {{navItem.text}}</router-link>
    </li>
</template>


<script>

import { logout } from '../utility/auth'

export default {
    name: 'NavItem',
    props: {
        navItem: Object,
        showIcon: Boolean
    },
    methods: {
        logoutEvent (){
            logout()
            window.location.reload()
        }
    },
    created() {
        console.log(this.$router.currentRoute)
    }
}
</script>

<style lang='scss' scoped>

    button {
        margin-left: 1em;
    }
    li{
        list-style: none;
    }
    a{
        color: black;
        font-size: 1.2em;
    }
    a:hover{
    color: blue;
    }
</style>