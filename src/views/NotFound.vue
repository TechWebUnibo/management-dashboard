<template>
    <div id='notFound'>
        <h2>404</h2>
        <h3>Ooops, this page does not exist</h3>
        <div>   
            <router-link :to="'/management-dashboard'" class="btn btn-outline-success">Home Page</router-link>
        </div>
    </div>
</template>





<style lang="scss" scoped>


#notFound{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 5em;
}

h2{
    font-size: 10em;
    font-family: 'Abel', sans-serif;
    }

h3{
    text-align: center;
}

</style>