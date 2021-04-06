<template>
    <div class="user-data">
        <Four 
            :title="'Breathwork session summary'"
            :circles="summary"
            :height="'179px'"
        />
        <Details
            :test="test"
        />
        <Resonance
            :test="test"
        />
        <Heart 
            :title="'Heart Rate'" 
            :width="'328px'"
            :test="test"
            :breat="true"
        />
        <Four 
            :title="'Aging Summary'"
            :circles="stress"
            :height="'196px'"
            :width="'308px'"
            :ml="'20px'"
        />
        <Comments :comment="test.procedureComment" v-if="test.procedureComment"/> 
    </div>
</template>

<script>

    import Measurements from '@/components/Measurements/Measurements'
    import Four from '@/components/Four/Four'
    import Adaptation from '@/components/Adaptation/Adaptation'
    import Heart from '@/components/Heart/Heart'
    import Comments from '@/components/Comments/Comments'
    import Details from '@/components/Details/Details'
    import Resonance from '@/components/Resonance/Resonance'

    import './UserCardiac.scss'

    export default {
        props: ['user', 'test'],
        data(){
            return {
                summary: [],
                stress: [],
            }
        },
        components: { Measurements, Four, Adaptation, Heart, Comments, Details, Resonance },
        mounted(){
            this.updateData()
        },
        methods: {
            updateData(){
                this.summary = [
                    {
                        title: 'Resonance',
                        margin: '30px',
                        color: [
                            {
                                color: '#FBBC05',
                                gap: [0, 30]
                            },
                            {
                                color: '#FFFF00',
                                gap: [31, 60]
                            },
                            {
                                color: '#4ACE67',
                                gap: [61, 100]
                            }
                        ],
                        value: Math.round(this.test.data.MeanScore)
                    },
                    {
                        title: 'Congruence',
                        margin: '30px',
                        color: [
                            {
                                color: '#FBBC05',
                                gap: [0, 20]
                            },
                            {
                                color: '#FFFF00',
                                gap: [21, 40]
                            },
                            {
                                color: '#4ACE67',
                                gap: [41, 100]
                            }
                        ],
                        value: Math.round(this.test.data.Consistency)
                    },
                    {
                        title: 'Mean HR',
                        margin: '30px',
                        color: [
                            {
                                color: '#FBBC05',
                                gap: [30, 40]
                            },
                            {
                                color: '#FFFF00',
                                gap: [41, 50]
                            },
                            {
                                color: '#4ACE67',
                                gap: [51, 80]
                            },
                            {
                                color: '#FFFF00',
                                gap: [81, 90]
                            },
                            {
                                color: '#FBBC05',
                                gap: [91, 130]
                            }
                        ],
                        value: Math.round(this.test.data.MeanHR)
                    },
                    {
                        title: 'HR Variation',
                        color: [
                            {
                                color: '#FBBC05',
                                gap: [0, 10]
                            },
                            {
                                color: '#FFFF00',
                                gap: [11, 20]
                            },
                            {
                                color: '#4ACE67',
                                gap: [21, 50]
                            }
                        ],
                        value: Math.round(this.test.data.HrVariation)
                    }
                ]
                this.stress = [
                    {
                        title: 'Aging Speed',
                        margin: '30px',
                        color: [
                            {
                                color: '#4ACE67',
                                gap: [0, 0.9]
                            },
                            {
                                color: '#FFFF00',
                                gap: [0.9, 1.1]
                            },
                            {
                                color: '#FBBC05',
                                gap: [1.1, 2.0]
                            }
                        ],
                        value: this.test.data.AgingSpeed.toFixed(1),
                    },
                    {
                        title: 'Biological Age',
                        margin: '30px',
                        color: [
                            {
                                color: '#0F89DA',
                                gap: [0, 120]
                            }
                        ],
                        value: Math.round(this.test.data.BioAge)
                    },
                    {
                        title: 'Calendar Age',
                        margin: '0px',
                        color: [
                            {
                                color: '#0F89DA',
                                gap: [0, 120]
                            }
                        ],
                        value: Math.round(this.test.data.CalAge)
                    }
                ]
            }
        },
        watch: {
            test(){
                this.updateData()
            }
        }
    }
</script>