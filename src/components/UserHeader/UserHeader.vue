<template>
    <div class="user-header">
        <Back class="back" @click="$router.push('/dashboard')"/>
        <div @click="pushTab('single', 0)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 0 }]"><List/> Health single</div>
        <div @click="pushTab('post', 1)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 1 }]"><List/> Health Pre/Post</div>
        <div @click="pushTab('cardiac', 2)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 2 }]"><List/> Cardiac resonance</div>
        <div @click="pushTab('breatwork', 3)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 3 }]"><List/> Breathwork</div>
        <div @click="$emit('changeTab', 4)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 4 }]"><History/> History</div>
        <div @click="$emit('changeTab', 5)" :class="['user-header-btn', { 'user-header-btn-active' : tab === 5 }]"><Modify/> Modify</div>
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
        props: ['tab'],
        methods: {
            pushTab(link, index){
                this.$emit('changeTab', index)
                if(!this.$route.fullPath.includes(link)){
                    this.$router.push(link)
                }
            }
        }
    }
</script>