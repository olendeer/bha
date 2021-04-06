<template>
    <div class="user-data">
        <Measurements :title="'Body Measurements and Vitals'"
            :test="test"/>
        <Four 
            :title="'General health'"
            :circles="general"
        />
        <Adaptation 
            :title="'Body Adaptation'"
            :values="[test.data.FR, test.data.SL]"
            />
        <Four 
            :title="'Stress and Adaptation'"
            :circles="stress"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart 
            :title="'Heart Rate'"
            :test="test"
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

    import './UserSingle.scss'


    export default {
        props: ['user', 'test'],
        data(){
            return {
                general: [],
                stress: [],
                // comment: 'Explanations to the source code of the program located directly inside the commented code. The syntax for comments is defined by the programming language. '
            }
        },
        mounted(){
            console.log('SINGLE TEST', this.test)
            this.updateData()
        },
        methods: {
            updateData(){
                this.general = [
                    {
                        title: 'Stress Index',
                        margin: '30px',
                        color: [
                            {
                                color: '#4ACE67',
                                gap: [0, 150]
                            },
                            {
                                color: '#FFFF00',
                                gap: [151, 300]
                            },
                            {
                                color: '#FBBC05',
                                gap: [301, 1000]
                            }
                        ],
                        value: Math.round(this.test.data.SI)
                    },
                    {
                        title: 'Vagal Index',
                        margin: '30px',
                        color: [
                            {
                                color: '#FBBC05',
                                gap: [0, 20]
                            },
                            {
                                color: '#FFFF00',
                                gap: [21, 30]
                            },
                            {
                                color: '#4ACE67',
                                gap: [31, 100]
                            }
                        ],
                        value: Math.round(this.test.data.RMSSD)
                    },
                    {
                        title: 'HRV Index',
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
                        value: Math.round(this.test.data.SDNN)
                    },
                    {
                        title: 'Autonomic Balance',
                        color: [
                            {
                                color: '#0F89DA',
                                gap: [-100, -20]
                            },
                            {
                                color: '#4ACE67',
                                gap: [-21, 20]
                            },
                            {
                                color: '#FBBC05',
                                gap: [21, 100]
                            }
                        ],
                        value: Math.round(this.test.data.AutonomicBalance)
                    }
                ]
                this.stress = [
                    {
                        title: 'Adaptation strain',
                        margin: '30px',
                        color: [
                            {
                                color: '#EB4335',
                                gap: [0, 25]
                            },
                            {
                                color: '#FBBC05',
                                gap: [26, 50]
                            },
                            {
                                color: '#FFFF00',
                                gap: [51, 75]
                            },
                            {
                                color: '#4ACE67',
                                gap: [76, 100]
                            }
                        ],
                        value: Math.round(this.test.data.SL)
                    },
                    {
                        title: 'Adaptation resource',
                        margin: '30px',
                        color: [
                            {
                                color: '#EB4335',
                                gap: [0, 25]
                            },
                            {
                                color: '#FBBC05',
                                gap: [26, 50]
                            },
                            {
                                color: '#FFFF00',
                                gap: [51, 75]
                            },
                            {
                                color: '#4ACE67',
                                gap: [76, 100]
                            }
                        ],
                        value: Math.round(this.test.data.FR)
                        
                    },
                    {
                        title: 'Adaptation index',
                        margin: '30px',
                        color: [
                            {
                                color: '#EB4335',
                                gap: [0, 25]
                            },
                            {
                                color: '#FBBC05',
                                gap: [26, 50]
                            },
                            {
                                color: '#FFFF00',
                                gap: [51, 75]
                            },
                            {
                                color: '#4ACE67',
                                gap: [76, 100]
                            }
                        ],
                        value: Math.round(this.test.data.HSI)
                    },
                    {
                        title: 'Stress index',
                        color: [
                            {
                                color: '#4ACE67',
                                gap: [0, 150]
                            },
                            {
                                color: '#FFFF00',
                                gap: [151, 300]
                            },
                            {
                                color: '#FBBC05',
                                gap: [301, 1000]
                            }
                        ],
                        value: Math.round(this.test.data.SI)
                    }
                ]
            }
        },
        components: { Measurements, Four, Adaptation, Heart, Comments },
        watch: {
            test(){
                this.updateData()
            }
        }
    }
</script>