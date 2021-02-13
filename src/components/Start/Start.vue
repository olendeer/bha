<template>
    <div :class="['start', { 'start-active' : open }]">
        <Logo/>
        <h1 class="start-header">Body Health Analyzer</h1>
        <span class="start-title">Cloud Edition</span>
        <span class="start-version">Version: 1.4.101.0</span>
        <span class="start-rights">© 2019-2020 Binacor. All right reserved</span>
    </div>    
</template>

<script>

    import Logo from '../../assets/img/logo.svg'

    import './Start.scss'

    export default {
        props: ['open'],
        components: { Logo },
    }
</script>