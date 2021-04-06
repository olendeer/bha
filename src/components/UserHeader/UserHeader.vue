<template>
    <div class="user-header">
        <Back class="back" @click="$router.push('/dashboard')"/>
        <div @click="pushTab('single')" :class="['user-header-btn', { 'user-header-btn-active' : tab === 'single' }]"><List/> Health single</div>
        <div @click="pushTab('prepost')" :class="['user-header-btn', { 'user-header-btn-active' : tab === 'prepost' }]"><List/> Health Pre/Post</div>
        <div @click="pushTab('cardiac')" :class="['user-header-btn', { 'user-header-btn-active' : tab === 'cardiac' }]"><List/> Cardiac resonance</div>
        <div @click="pushTab('breatwork')" :class="['user-header-btn', { 'user-header-btn-active' : tab === 'breatwork' }]"><List/> Breathwork</div>
        <div @click="$emit('changeTab', 4)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 4 }]"><History/> History</div>
        <div @click="$router.push({ name: 'edit-client', params: { client : client , id: client.id}
        })" class="user-header-btn"><Modify/> Modify</div>
        <div @click="$emit('changeTab', 6)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 6 }]"><Archive/> Archive</div>
    </div>
</template>

<script>

    import Back from '@/assets/img/arrow_back.svg'
    import List from '@/assets/img/list.svg'
    import History from '@/assets/img/history.svg'
    import Modify from '@/assets/img/modify.svg'
    import Archive from '@/assets/img/archive.svg'

    import './UserHeader.scss'

    export default {
        components: { Back, List, History, Modify, Archive },
        props: ['tab', 'client'],
        methods: {
            pushTab(link){
                this.$emit('changeTab', link)
            }
        },
        watch: {
            client(){
                console.log('userHeader', this.client)
            }
        }
    }
</script>