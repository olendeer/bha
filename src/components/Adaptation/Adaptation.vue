<template>
    <div class="adaptation">
        <div class="adaptation-header">{{title}}</div>
        <div class="adaptation-chart">
            <div class="chart-top">
                <div class="chart-top-values">
                    <span>90</span>
                    <span>70</span>
                    <span>50</span>
                    <span>30</span>
                    <span>10</span>
                </div>
                <div class="chart-top-graph">
                    <Graph class="adaptation-chart-graph"/>
                    <div class="value" :style="{left: (goz - 4) + 'px', bottom: (ver - 4) + 'px' }"></div>
                </div>
            </div>
            <div class="chart-bottom">
                <span>10</span>
                <span>30</span>
                <span>50</span>
                <span>70</span>
                <span>90</span> 
            </div>
        </div>
    </div>
</template>

<script>

    import Graph from '@/assets/img/graph.svg'


    import './Adaptation.scss'

    export default {
        props: ['title', 'values'],
        components: { Graph },
        data(){
            return {

            }
        },
        computed: {
            goz(){
                return (133 / 100) * this.values[0]
            },
            ver(){
                return ((118 / 100) * this.values[1]) + 3
            }
        }
    }
</script>