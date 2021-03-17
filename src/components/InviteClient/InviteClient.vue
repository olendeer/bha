<template>
    <div :class="['invite', {'invite-active' : isOpenInvite} ]" @click="close($event)">
        <div class="invite-content">
            <div class="invite-content-header">Invite client</div>
            <p class="invite-content-title">Enter your client email adress and send an invitation to share health date.</p>
            <Input
                :value="email"
                :name="'email'"
                :type="'text'"
                @inputChange="inputChange"
                :placeholder="'Contact email'"
                :marginBottom="37"
                @focus="error = false"
            />
            <div class="invite-content-nav">
                <Button
                    :title="'Send'"
                    :width="315"
                    :marginBottom="15"
                    @click="sendInvite"
                />
                <Button
                    :title="'Cancel'"
                    :width="315"
                    :margin="0"
                    :mode="'cancel'"
                    @click="$emit('closeInvite')"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import { validateEmail } from '@/utilites/functions'

    import { inviteUser } from '@/utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import './InviteClient.scss'

    export default {
        data(){
            return {
                email: ''
            }
        },
        props: ['isOpenInvite', 'token'],
        components: { Input, Button },
        methods: {
            inputChange(value){
                this.email = value.value
            },
            inputCheck(input){
                if (!validateEmail(this.email)){
                    this.$emit('pushController', 'Please enter a valid email address')
                    return false
                } 
                return true
            },
            sendInvite(){
                if(this.inputCheck()){
                    inviteUser(this.token, { email: this.email })
                    .then(res => {
                        if(!res.data){
                            this.$emit('pushController', res.errors.pop().message)
                        } else {
                            this.$emit('pushInvite')
                            // this.$router.
                        }
                        this.$emit('closeInvite')
                    })
                }
            },
            close(event) {
                if(event.target.classList.contains('invite-active') || event.target.classList.contains('invite')){
                    this.$emit('closeInvite')
                }
            }
        },
        watch: {
            isOpenInvite(){
                this.email = ''
            }
        }
    }
</script>