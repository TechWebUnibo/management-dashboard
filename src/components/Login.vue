<template>
    <div id="login">
        <h1>Welcome to the manager's page</h1>
        <h2>Please login</h2>
        <form @submit.prevent="signIn"> 
        <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="username" required>
            <small id="usernameHelp" class="form-text" :class="{'text-danger': usernameHelp.triggered}">{{usernameHelp.text}}</small>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="password" required>
            <small id="passwordHelp" class="form-text" :class="{'text-danger': passwordHelp.triggered}">{{passwordHelp.text}}</small>
        </div>
        <div class="d-flex">
            <button type="submit" class="btn btn-primary" aria-label="Login" >Login</button>
            <button type="reset" class="btn btn-danger" aria-label="Reset">Reset</button>
        </div>
        </form>
    </div>
</template>

<script>

import { login, isLogged } from '../utility/auth';

export default {
    name: 'Login',
    data: function(){
        return {
            username: '',
            password: '',
            url: '//site202118.tw.cs.unibo.it/api/login/staff',
            usernameHelp: {
                text: 'Insert here your username',
                triggered: false
            },
            passwordHelp: {
                text: 'Insert here your password',
                triggered: false
            }
        }
    },
    methods:{
        async signIn() {
            this.resetHelp()
            let status = await login(this.username, this.password)
            if(status === 404){
                this.usernameHelp.text = 'Wrong username'
                this.usernameHelp.triggered = true
            }
            else if(status === 403){
                this.passwordHelp.text = 'Wrong password'
                this.passwordHelp.triggered = true
            }
            else{
                this.$emit('userLogged')
                this.$router.push('/management-dashboard/dashboard')
            }
        },
        resetHelp(){
            this.usernameHelp.triggered = false
            this.passwordHelp.triggered = false
            this.usernameHelp.text = 'Insert here your username'
            this.passwordHelp.text = 'Insert here your password'
        }
    },
    async created(){
        if(await isLogged())
            this.$router.push({name: 'Dashboard'})
    }
}   
</script>

<style lang="scss" scoped>
    #login{
        text-align: left;
        max-width: 600px;
        margin: auto;
        padding: 3em;
        height: 100%;
        background-color: white;
        border-radius: 5px;
    }
    #login h1, h2{
        text-align: center;
        font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    }
    #login h1{
        font-size: 2rem;
    }
    #login h2{
        font-size: 1.5rem;
    }
</style>