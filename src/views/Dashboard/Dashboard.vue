<template>
    <div class="dashboard">
        <InviteClient
            @pushController="pushError"
            @closeInvite="closeInvite"
            @pushInvite="pushInvite"
            :isOpenInvite="isOpenInvite"
            :token="token"
        />
        <Header 
            @logoutController="$emit('logoutController')" 
            @userSearch="userSearch"
            @openInvite="openInvite"
            @openClient="openClient"
        />
        <div class="dashboard-content">
            <div class="dashboard-content-header">Client Directory</div>
            <div class="dashboard-content-body">
                <div v-for="user in clients" :key="user.id" 
                    @click="toOpen = (toOpen && toOpen.id === user.id ? null : user)"
                    :class="['dashboard-content-body-client', { 'to-open' : toOpen && toOpen.id === user.id}]"
                    >
                    <Female v-if="user.client.gender === 'Female'"/>
                    <Male v-if="user.client.gender === 'Male'"/>
                    <span>{{user.lastName}}, {{user.firstName}}</span>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
    import Button from '@/components/Button/Button'
    import Header from '@/components/Header/Header'
    import InviteClient from '@/components/InviteClient/InviteClient'

    import { getClients } from '@/utilites/api'

    import Male from '../../assets/img/male.svg'
    import Female from '../../assets/img/female.svg'

    import './Dashboard.scss'

    export default {
        props: ['user', 'userId', 'token'],
        components: { Button, Header, InviteClient, Female, Male },
        data(){
            return {
                clients: [],
                clientsServer:[],
                isOpenInvite: false,
                toOpen: null
            }
        },
        mounted(){
            getClients({ id: this.userId, search: null }, this.token)
            .then(res => {
                if(res.data){
                    console.log(res.data.caregiverClients.nodes)
                    this.clients = res.data.caregiverClients.nodes
                    this.clientsServer = res.data.caregiverClients.nodes
                } else {
                    this.$emit('pushController', res.errors[0].message)
                }
            })
        },
        methods: {
            userSearch(search){
                this.clients = this.clientsServer.filter(item => {
                    if(item.firstName.toLowerCase().includes(search.toLowerCase()) || item.lastName.toLowerCase().includes(search.toLowerCase())){
                        return true
                    }
                    return false
                })
            },
            pushError(message){
                this.$emit('pushController', message)
            },
            pushInvite(){
                this.$emit('pushController', 'An invitation to share the data was sent to the client for approval.')
            },
            closeInvite(){
                this.isOpenInvite = false
            },
            openInvite(){
                this.isOpenInvite = true
            },
            openClient(){
                if(this.toOpen){
                    this.$router.push({
                        name: 'user',
                        params: { user : this.toOpen , id: this.toOpen.client.id}
                    })
                }
            }
        }
    }   
</script>