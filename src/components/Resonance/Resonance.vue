<template>
    <div class="resonance">
        <div class="resonance-header">Resonance zones</div>
         <div class="resonance-chart">
            <div class="chart-top">
                <div class="chart-top-values">
                    <span>100</span>
                    <span>80</span>
                    <span>60</span>
                    <span>40</span>
                    <span>20</span>
                </div>
                <div class="chart-top-graph">
                    <div class="column"><span :style="{height: poor + '%'}"></span></div>
                    <div class="column"><span :style="{height: fair + '%'}"></span></div>
                    <div class="column"><span :style="{height: good + '%'}"></span></div>
                </div>
            </div>
            <div class="chart-bottom">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
            </div>
        </div>
    </div>
</template>

<script>



    import './Resonance.scss'

    export default {
        data(){
            return {
                poor: 0,
                fair: 0,
                good: 0
            }
        },
        mounted(){
            this.updateDate()
        },
        props: ['test'],
        methods: {
            updateDate(){
                setTimeout(() => {
                    this.poor = this.test.resonance.poor
                    this.fair = this.test.resonance.fair
                    this.good = this.test.resonance.good
                }, 500)
            }
        },
        watch: {
            test(){
                this.updateDate()
            }
        }

    }
</script>