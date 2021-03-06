<template>
    <div class="register-wrapper">
        <div class="register">
            <h2 class="register-header">Create account</h2>
            <div class="register-body">
                <div :class="['register-body-error', {'register-body-error-active' : error}]" v-html="errorMessage">
                </div>
                <div class="register-body-desc"><span>*</span> - mandatory data entries </div>
                <form class="register-body-inputs" @submit.prevent="send">
                    <div class="inputs-wrapper">
                        <Input
                            :value="inputs.eg1"
                            :name="'eg1'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Prefix'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :hint="'e.g. Dr'"
                        />
                        <Input
                            :value="inputs.first_name"
                            :name="'first_name'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'First name'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.last_name"
                            :name="'last_name'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Last name'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.eg2"
                            :name="'eg2'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Prefix'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :hint="'e.g. MD'"
                        />
                        <Input
                            :value="inputs.business"
                            :name="'business'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Business name'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                        />
                        <Input
                            :value="inputs.email"
                            :name="'email'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Contact email'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.phone"
                            :name="'phone'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Contact phone'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                        />
                        <Input
                            :value="inputs.address"
                            :name="'address'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Contact address'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                        />
                        <Input
                            :value="inputs.username"
                            :name="'username'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Username'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.password"
                            :name="'password'"
                            :type="'password'"
                            @inputChange="inputChange"
                            :placeholder="'Password'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.repeat"
                            :name="'repeat'"
                            :type="'password'"
                            @inputChange="inputChange"
                            :placeholder="'Re-enter password'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                    </div>
                    <div class="nav-wrapper">
                        <Button
                            :title="'Create'"
                            :width="154"
                            :margin="30"
                            @click="send"
                        />
                        <Button
                            :title="'Cancel'"
                            :width="154"
                            :margin="0"
                            :mode="'cancel'"
                            @click="$router.push('login')"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import { validateEmail } from '@/utilites/functions'

    import { register } from '@/utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import './Register.scss'

    export default {
        data() {
            return {
                inputs: {
                    eg1: '',
                    first_name: '',
                    last_name: '',
                    eg2: '',
                    business: '',
                    email : '',
                    phone: '',
                    address: '',
                    username: '',
                    password: '',
                    repeat: ''
                },
                error: true,
                errorMessage: 'Thank you for choosing the Body Health Analyzer! <br/> As a first step, you need to create your account record. Please fill the form below then click CREATE. ',
            }
        },
        components: { Input, Button },
        methods: {
            inputChange(value){
                this.inputs[value.name] = value.value
                this.error = false
            },
            inputCheck(input){
                if(!this.inputs.first_name.trim() || !this.inputs.last_name.trim() || !this.inputs.email.trim() || !this.inputs.username.trim() || !this.inputs.password.trim() || !this.inputs.repeat.trim()){
                    this.error = true
                    this.errorMessage = 'Fill in all required fields'
                    return false
                } else if (!validateEmail(this.inputs.email)){
                    this.error = true
                    this.errorMessage = 'Please enter a valid email address'
                    return false
                } else if (this.inputs.password.length < 6){
                    this.error = true
                    this.errorMessage = 'The password must contain at least 6 characters'
                    return false
                } else if (this.inputs.password !== this.inputs.repeat){
                    this.error = true
                    this.errorMessage = 'Passwords don\'t match'
                    return false
                } 
                return true
            },
            send() {
                if(this.inputCheck()){
                    register(this.inputs)
                    .then(response => {
                        if(!response.data){
                            this.errorMessage = response.errors.pop().message
                            this.error = true
                        } else {
                            this.$router.push({
                                name: 'login',
                                params: { message : 'A new account was successfully created. Check your mailbox registered with the account to confirm the account activation' }
                            })
                        }
                    })
                }
            },
        }
    }
</script>