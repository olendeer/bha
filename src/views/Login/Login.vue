<template>
    <form class="login" @submit.prevent="send">
        <Logo class="logo"/>
        <h1 class="login-header">Body Health Analyzer</h1>
        <p :class="['login-error', { 'login-error-active' : error }]">{{ errorMessage }}</p>
        <Input
            :value="inputs.username"
            :name="'username'"
            :type="'text'"
            @inputChange="inputChange"
            :placeholder="'Username'"
            :marginBottom="30"
            @focus="error = false"
            @blur="inputCheck"
        />
        <Input
            :value="inputs.password"
            :name="'password'"
            :type="'password'"
            @inputChange="inputChange"
            :placeholder="'Password'"
            :marginBottom="30"
            @focus="error = false"
            @blur="inputCheck"
        />
        <Button
            :title="'Log in'"
            :width="345"
            @click="send()"
        />
        <router-link to="/reset" class="login-reset">Forgot password</router-link>
        <div class="login-register">
            Don't have an account yet? <span @click="userSelect = true">Register</span>
        </div>
        <UserSelect :open="userSelect" @closeClick="userSelect = false"/>
    </form>
</template>

<script>

    import { auth } from '../../utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'
    import UserSelect from '@/components/UserSelect/UserSelect'

    import Logo from '../../assets/img/logo-min.svg'

    import './Login.scss'

    export default {
        props: ['user', 'message'],
        components: { Logo, Input, Button, UserSelect },
        data: () => ({
            inputs: {
                username : '',
                password : ''
            },
            error: true,
            errorMessage: 'Please enter your username and password then click LOG IN',
            userSelect : false
        }),
        mounted() {
            if(this.$route.params.message){
                this.errorMessage = this.$route.params.message
                setTimeout(() => {
                    this.error = false
                }, 1000)
                setTimeout(() => {
                    this.errorMessage = 'Please enter your username and password then click LOG IN'
                }, 1300)
                setTimeout(() => {
                    this.error = true
                }, 1500)
            }
        },
        methods: {
            inputChange(value){
                this.inputs[value.name] = value.value
                this.error = false
            },
            inputCheck(input){
                if(!this.inputs.username.trim() && !this.inputs.password.trim()){
                    this.error = true
                    this.errorMessage = 'Please enter your username and password then click LOG IN'
                    return false
                } else if (!this.inputs.username.trim() && this.inputs.password.trim()){
                    this.error = true
                    this.errorMessage = 'Please enter your username'
                    return false
                } else if (this.inputs.username.trim() && !this.inputs.password.trim()){
                    this.error = true
                    this.errorMessage = 'Please enter your password'
                    return false
                } else if (this.inputs.password.trim().length < 8){
                    this.error = true
                    this.errorMessage = 'The password must contain at least 8 characters'
                    return false
                } else {
                    this.error = false
                    return true
                }
            },
            send() {
                if(this.inputCheck()){
                    auth(this.inputs.username, this.inputs.password)
                    .then(res => this.checkResponse(res))
                }
            },
            checkResponse(response) {
                if(!response.data){
                    this.errorMessage = response.errors.pop().message
                    this.error = true
                } else {
                    this.$emit('setUserData', { user: response.data.login.user, token: response.data.login.id })
                    this.$router.push('/dashboard')
                }
            }
        }
    }
</script>

