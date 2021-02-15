<template>
    <div :class="['logout-wrapper', { 'logout-wrapper-active' : open }]" @click="close($event)">
        <div :class="'logout'">
            <div class="logout-content">
                <div class="logout-content-title">Do you want to go out?</div>
                <div class="logout-content-nav">
                    <Button
                        :title="'Ok'"
                        :width="150"
                        :margin="15"
                        @click="logoutUser"
                    />
                    <Button
                        :title="'Cancel'"
                        :mode="'cancel'"
                        :width="150"
                        @click="$emit('logoutController')"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from '@/components/Button/Button'

    import { logout } from '@/utilites/api'

    import './Logout.scss'

    export default {
        props: ['open', 'token'],
        components: { Button },
        methods: {
            logoutUser() {
                logout(this.token)
                .then(res => {
                    if(res.data?.logout){
                        this.$router.push({
                            name: 'login',
                            params: { message : 'The user successfully logged out' }
                        })
                        this.$emit('removeUserData')
                    } else {
                        this.$emit('pushController', res.errors?.pop().message)
                    }
                })
                this.$emit('logoutController')
            },
            close(event) {
                console.log(event.target.classList.contains('logout-wrapper-active'))
                if(event.target.classList.contains('logout-wrapper-active') || event.target.classList.contains('logout')){
                    this.$emit('closeClick')
                }
            }
        }
    }
</script>