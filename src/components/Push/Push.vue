<template>
    <div :class="['push', { 'push-active' : open }]">{{ text }}</div>
</template>

<script>
    import './Push.scss'
    export default {
        props : ['open', 'text'],

    }
</script>