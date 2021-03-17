<template>
    <header class="wrapper-header">
        <div class="wrapper-header-btn" @click="$emit('openClient')"><OpenIcon/> <span>Open client</span> </div>
        <router-link to='/add-client' class="wrapper-header-btn"><AddIcon/> <span>Add client</span> </router-link>
        <div class="wrapper-header-btn" @click="$emit('openInvite')"><InviteIcon/> <span>Invite client</span> </div>
        <div :class="['wrapper-header-btn', { 'wrapper-header-btn-active' : isOpenSearch }]" @click="isOpenSearch = !isOpenSearch" ><SearchIcon/> <span>Search client</span>
            <div :class="['wrapper-header-btn-search', { 'wrapper-header-btn-search-active' : isOpenSearch }]" @click.prevent.stop>
                <input type="text" placeholder="Search client" :value="search" @input="search = $event.target.value">
                <SearchIcon/>
            </div>
        </div>
        <div class="wrapper-header-btn"><AccountIcon/> <span>Account</span> </div>
        <div class="wrapper-header-btn"><ConfigIcon/> <span>Configuration</span> </div>
        <div class="wrapper-header-btn"><HelpIcon/> <span>Help</span> </div>
        <div class="wrapper-header-btn" @click="$emit('logoutController')"><LogoutIcon/> <span>Log out</span> </div>
    </header>
</template>

<script>

    import OpenIcon from '../../assets/img/header/folder.svg'
    import AddIcon from '../../assets/img/header/add.svg'
    import InviteIcon from '../../assets/img/header/plane.svg'
    import SearchIcon from '../../assets/img/header/search.svg'
    import AccountIcon from '../../assets/img/header/account.svg'
    import ConfigIcon from '../../assets/img/header/setting.svg'
    import HelpIcon from '../../assets/img/header/question.svg'   
    import LogoutIcon from '../../assets/img/header/logout.svg'   

    import './Header.scss'

    export default {
        data(){
            return {
                isOpenSearch: false,
                search : ''
            }
        },
        watch: {
            isOpenSearch(){
                this.search = ''
            },
            search(){
                this.$emit('userSearch', this.search)
            }
        },
        components: { OpenIcon, AddIcon, InviteIcon, SearchIcon, AccountIcon, ConfigIcon, HelpIcon, LogoutIcon },
    }
</script>