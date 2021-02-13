<template>
    <button
        :class="['button']"
        @click.prevent.stop="$emit('click')"
        :style="{ width: width + 'px' }"
    > {{ title }} </button>
</template>

<script>

    import './Button.scss'

    export default {
        data: () => ({

        }),
        props: ['title', 'width']
    }
</script>