<template>
    <div class="reset-wrapper">
        <div class="reset">
            <header class="reset-header" @click="$router.back()">
                <Arrow/>
                <h1>Reset password</h1>
            </header>
            <form class="reset-body" @submit.prevent="send">
                <h2 class="reset-body-header">Body Health Analyzer</h2>
                <span>Please enter your email to reset for password.</span>
                <Input
                    placeholder="Contact email"
                    :value="inputs.email"
                    :name="'email'"
                    :type="'text'"
                    @inputChange="inputChange"
                    @focus="error = false"
                />
                <Button
                    :title="'Reset'"
                    :width="345"
                    @click="send"
                />
            </form>
        </div>
    </div>
</template>

<script>

    import Arrow from '@/assets/img/arrow_back.svg'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import { validateEmail } from '@/utilites/functions'
    import { reset } from '@/utilites/api'

    import './Reset.scss'

    export default {
        data(){
            return {
                inputs: {
                    email : '',
                },
            }
        },
        components: { Arrow, Input, Button },
        methods: {
            inputChange(value){
                this.inputs[value.name] = value.value
            },
            inputCheck(){
                if(this.inputs.email.trim().length === 0){
                    this.$emit('pushController', 'Enter email')
                    return false
                } else if (!validateEmail(this.inputs.email)){
                    this.$emit('pushController', 'Please enter a valid email address')
                    return false
                } else {
                    return true
                }
            },
            send() {
                if(this.inputCheck()){
                    reset(this.inputs.email)
                    .then(response => {
                        if(!response.data){
                            this.$emit('pushController', response.errors.pop().message)
                        } else {
                            this.$router.push({
                                name: 'login',
                                params: { message : ' Your request to reset password was successfully sent. Please check your contact email to get further instructions.' }
                            })
                        }
                    })
                }
            }
        }
    }
</script>