<template>
    <div class="four" :style="{height: height, width: width, marginLeft: ml}">
        <div class="four-header">{{ title }} </div>
        <div class="four-body">
            <CircleGraph
                v-for="circle in circles" 
                :key="circle.title"
                :title="circle.title"
                :margin="circle.margin"
                :color="circle.color"
                :value="circle.value"
            />
        </div>
    </div>
</template>

<script>
    import CircleGraph from '@/components/CircleGraph/CircleGraph'

    import './Four.scss'

    export default {
        props: ['title', 'circles', 'height', 'width', 'ml'],
        components: { CircleGraph }
    }
</script>