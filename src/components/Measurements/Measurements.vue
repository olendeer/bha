<template>
    <div class="measurements">
        <div class="measurements-header">{{ title }}</div>
        <div class="measurements-body" v-if="test">
            <CircleGraph 
                :margin="'25px'"
                :title="'Resting HR'"
                :color="'#4ACE67'"
            />
            <CircleGraph
                :margin="'25px'"
                :title="'SpO2'"
                :color="'#4ACE67'"
            />
            <div class="measurements-body-person">
                <div class="column-left">
                    <div class="column-item">
                        Height:    <span>6-0</span>
                    </div>
                    <div class="column-item">
                        Weight:    <span>185</span>
                    </div>
                    <div class="column-item">
                        BMI:       <span>25.1</span>
                    </div>
                </div>
                <div class="column-right">
                    <div class="column-item">
                        Blood Pressure:    <span>6-0</span>
                    </div>
                    <div class="column-item">
                        Blood Glucose:    <span>185</span>
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
        props: ['title', 'test']
    }
</script>