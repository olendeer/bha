<template>
    <div class="add-client-wrapper">
        <div class="add-client">
            <h2 class="add-client-header"><Back @click="$router.back()"/> Add new client </h2>
            <div class="add-client-body">
                <div :class="['add-client-body-error', {'add-client-body-error-active' : error}]" v-html="errorMessage">
                </div>
                <div class="add-client-body-desc"><span>*</span> - mandatory data entries </div>
                <form class="add-client-body-inputs" @submit.prevent="send">
                    <div class="inputs-wrapper">
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
                            :value="birth"
                            :name="'birth'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Date of birth'"
                            :marginBottom="37"
                            @focus="focusBirth"
                            @blur="blurBirth"
                            :required="true"
                            :birth="true"
                            :isOpenCalendar="isOpenCalendar"
                            @dayclick="dayclick"
                            @closeCalendar="closeCalendar"
                        />
                        <div class="add-client-body-inputs-gender">
                            <div :class="['gender-item', {'gender-item-active' : inputs.gender === 'male'}]" @click="inputs = {...inputs, gender: 'male'}">
                                <div class="circle">
                                    <span></span>
                                </div>
                                Male
                            </div>
                            <div :class="['gender-item', {'gender-item-active' : inputs.gender === 'female'}]" @click="inputs = {...inputs, gender: 'female'}">
                                <div class="circle">
                                    <span></span>
                                </div>
                                Female
                            </div>
                        </div>
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
                            :value="inputs.notes"
                            :name="'notes'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'Health notes'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="false"
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
                            @click="$router.back()"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import { validateEmail } from '@/utilites/functions'

    import { createUser } from '@/utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import Back from '@/assets/img/arrow_back.svg'
    import './AddClient.scss'

    export default {
        data() {
            return {
                inputs: {
                    notes: '',
                    first_name: '',
                    last_name: '',
                    email : '',
                    phone: '',
                    address: '',
                    username: '',
                    password: '',
                    repeat: '',
                    gender: 'male',
                },
                error: false,
                errorMessage: '',
                isOpenCalendar: false,
                birth: ''
            }
        },
        components: { Input, Button, Back },
        props: ['token'],
        methods: {
            inputChange(value){
                if(value.name === 'birth'){
                    this.birth = value.value
                    this.error = false
                } else {
                    this.inputs[value.name] = value.value
                    this.error = false
                }
            },
            inputCheck(input){
                if(!this.inputs.first_name.trim() || !this.inputs.last_name.trim() || !this.inputs.email.trim() || !this.inputs.username.trim() || !this.inputs.password.trim() || !this.inputs.repeat.trim() || !this.birth.toString().trim()){
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
                    createUser(this.token, {...this.inputs, birth: this.birth})
                    .then(res => {
                        if(res.errors){
                            this.errorMessage = res.errors.pop().message
                            this.error = true
                        } else {
                            this.$router.push('/dashboard')
                        }
                    })
                }
            },
            focusBirth(){
                this.error = false
                this.isOpenCalendar = true
            },
            closeCalendar(){
                this.isOpenCalendar = false
            },
            blurBirth(){
                this.inputCheck()
                // console.log(this.inputs.birth.toString().length)
                // if(this.inputs.birth.length){
                    // this.isOpenCalendar = false
                // }
                
                // this.isOpenCalendar = false
            },
            dayclick(){
                // this.isOpenCalendar = false
                // if(this.birth.length > 0){
                //     this.isOpenCalendar = false
                // }
                // console.log('day')
            }
        },
        watch: {
            birth(){
                console.log('sdf')
            }
        }
    }
</script>