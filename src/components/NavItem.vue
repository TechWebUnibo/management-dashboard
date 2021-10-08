<template>
    <li class="nav-item">
        <router-link class="nav-link" :to='navItem.link'>{{navItem.text}}</router-link>
    </li>
</template>


<script>
export default {
    name: 'NavItem',
    props: {
        navItem: Object
    }
}
</script>

<style lang='scss' scoped>
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