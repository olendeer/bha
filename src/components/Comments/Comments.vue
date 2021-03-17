<template>
    <div class="comments">
        <div class="comments-header">Comments</div>
        <p class="comments-body">{{ comment }}</p>
    </div>
</template>

<script>

    import './Comments.scss'

    export default {
        props: ['comment']
    }
</script>