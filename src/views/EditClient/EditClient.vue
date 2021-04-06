<template>
    <div class="edit-client-wrapper">
        <div class="edit-client">
            <h2 class="edit-client-header"><Back @click="$router.push({ name: 'user', params: { user : $route.params.client , id: $route.params.client.client.id} })"/> Edit client </h2>
            <div class="edit-client-body">
                <div :class="['edit-client-body-error', {'edit-client-body-error-active' : error}]" v-html="errorMessage">
                </div>
                <div class="edit-client-body-desc"><span>*</span> - mandatory data entries </div>
                <form class="edit-client-body-inputs" @submit.prevent="send">
                    <div class="inputs-wrapper">
                        <Input
                            :value="inputs.firstName"
                            :name="'firstName'"
                            :type="'text'"
                            @inputChange="inputChange"
                            :placeholder="'First name'"
                            :marginBottom="37"
                            @focus="error = false"
                            @blur="inputCheck"
                            :required="true"
                        />
                        <Input
                            :value="inputs.lastName"
                            :name="'lastName'"
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
                            @closeCalendar="closeCalendar"
                        />
                        <div class="edit-client-body-inputs-gender">
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
                    </div>
                    <div class="nav-wrapper">
                        <Button
                            :title="'Save'"
                            :width="154"
                            :margin="30"
                            @click="send"
                        />
                        <Button
                            :title="'Cancel'"
                            :width="154"
                            :margin="0"
                            :mode="'cancel'"
                            @click="$router.push({ name: 'user', params: { user : $route.params.client , id: $route.params.client.client.id} })"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

    import { validateEmail } from '@/utilites/functions'

    import { editUser } from '@/utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import Back from '@/assets/img/arrow_back.svg'
    import './EditClient.scss'

    export default {
        data() {
            return {
                inputs: {},
                birth: '',
                error: false,
                errorMessage: '',
                isOpenCalendar: false,
            }
        },
        components: { Input, Button, Back },
        props: ['token', 'client'],
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
                if(!this.inputs.firstName.trim() || !this.inputs.lastName.trim() || !this.inputs.email.trim() || !this.inputs.username.trim() || !this.birth.toString().trim()){
                    this.error = true
                    this.errorMessage = 'Fill in all required fields'
                    return false
                } else if (!validateEmail(this.inputs.email)){
                    this.error = true
                    this.errorMessage = 'Please enter a valid email address'
                    return false
                }
                return true
            },
            send() {
                if(this.inputCheck()){
                    editUser(this.token, {...this.inputs, id: this.$route.params.client.id, birth: this.birth.toString()})
                    .then(res => {
                        if(res.errors){
                            this.errorMessage = res.errors.pop().message
                            this.error = true
                        } else {
                            this.$router.push({ name: 'user', params: { user : this.$route.params.client , id: this.$route.params.client.client.id} })
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
            },
        },
        mounted(){
            this.inputs = {
                ...this.$route.params.client,
                gender: this.$route.params.client?.client?.gender?.toLowerCase(),
                notes: this.$route.params.client?.client?.heathNotes
            }
            this.birth = this.$route.params.client?.client?.dateOfBirth
        },
        watch: {
            inputs(){
                console.log(this.inputs)
            }
        }
    }
</script>