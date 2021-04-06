<template>
    <div class="measurements">
        <div class="measurements-header">{{ title }}</div>
        <div class="measurements-body" v-if="test">
            <CircleGraph 
                :margin="'25px'"
                :title="'Resting HR'"
                :color="[
                    {
                        color :'#FBBC05',
                        gap: [30, 40]
                    },
                    {
                        color :'#FFFF00',
                        gap: [41, 50]
                    },
                    {
                        color :'#4ACE67',
                        gap: [51, 80]
                    },
                    {
                        color :'#FFFF00',
                        gap: [81, 90]
                    },
                    {
                        color :'#FBBC05',
                        gap: [91, 130]
                    }
                ]"
                :value="+test.data.HeartRate.toFixed(0)"
            />
            <CircleGraph
                :margin="'25px'"
                :title="'SpO2'"
                :color="[
                    {
                        color :'#FBBC05',
                        gap: [0, 90]
                    },
                    {
                        color :'#FFFF00',
                        gap: [91, 94]
                    },
                    {
                        color :'#4ACE67',
                        gap: [95, 100]
                    },
                ]"
                :value="+test.data.SpO2.toFixed(0)"
            />
            <div class="measurements-body-person">
                <div class="column-left">
                    <div class="column-item">
                        Height: <span>{{height}}</span>
                    </div>
                    <div class="column-item">
                        Weight:    <span>{{weight}}</span>
                    </div>
                    <div class="column-item">
                        BMI:       <span>{{bmi}}</span>
                    </div>
                </div>
                <div class="column-right">
                    <div class="column-item">
                        Blood Pressure:    <span>{{pressure}}</span>
                    </div>
                    <div class="column-item">
                        Blood Glucose:    <span>{{glucose}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import CircleGraph from '@/components/CircleGraph/CircleGraph'

    import './Measurements.scss'

    export default {
        components: { CircleGraph },
        props: ['title', 'test'],
        data(){
            return {

            }
        },
        computed: {
            height(){
                let h = this.test.body?.data?.Height
                if(h){
                    let d = Math.trunc(h / 12)
                    let f = h - (d * 12)
                    return d + '-' + f
                }
                return '---'
            },
            weight() {
                return this.test?.compose?.data?.Weight || '---'
            },
            bmi() {
                return this.test?.compose?.data?.BMI.toFixed(1) || '---'
            },
            pressure() {
                if(this.test?.pressure?.data){
                    return this.test.pressure.data.Sys + '/' + this.test?.pressure.data.Dia
                }
                return '---'
            },
            glucose(){
                return this.test?.glucose?.data['Blood glucose']?.toFixed(0) || '---'
            }
        }
    }
</script>