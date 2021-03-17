<template>
    <div class="circle-graph" :style="{marginRight: margin}">
        <div class="circle-graph-data">
            <svg viewBox="0 0 66 66" width="66" height="66">
                <circle cx="33" cy="33" r="31" :stroke="'#ffffff'" stroke-width="4" fill="none" stroke-opacity=".05" />
                <circle cx="33" cy="33" r="30.5" :stroke="color || '#ffffff'" stroke-width="5" fill="none" stroke-dasharray="194.68" :stroke-dashoffset="percent"/>
            </svg>
            <div class="value">{{value}}</div>
        </div>
        <div class="circle-graph-title">{{ title }}</div>
    </div>
</template>

<script>

    import './CircleGraph.scss'

    export default {
        props: ['margin', 'title', 'value', 'circle', 'color'],
        data(){
            return {
                percent: 194.68
            }
        },
        mounted(){
            setTimeout(() => {
                this.percent = 194.68 * (1 - (this.value || 50) / 100)
            }, 500)
        }
    }
</script>