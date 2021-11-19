<template>
    <li class="nav-item">
        <router-link class="nav-link" :to='navItem.link'><font-awesome-icon v-if="showIcon" :icon="navItem.icon" />
        {{navItem.text}}</router-link>
    </li>
</template>


<script>

export default {
    name: 'NavItem',
    props: {
        navItem: Object,
        showIcon: Boolean
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