<template>
    <button
        :class="['button', { 'button-cancel' : mode === 'cancel' }]"
        @click.prevent.stop="$emit('click')"
        :style="{ width: width + 'px', marginRight: margin + 'px', marginBottom: marginBottom + 'px', height: height + 'px'}"
    > {{ title }} </button>
</template>

<script>

    import './Button.scss'

    export default {
        data: () => ({

        }),
        props: ['title', 'width', 'mode', 'margin', 'marginBottom', 'height']
    }
</script>