<template>
    <div class="user-data">
        <Measurements 
            :title="'Body Measurements and Vitals - Pre'"
            :test="test.pre"
        />
        <Four 
            :title="'General health - Pre'"
            :circles="generalPre"
        />
        <Measurements 
            :title="'Body Measurements and Vitals - Post'"
            :test="test.post"
        />
        <Four 
            :title="'General health - Post'"
            :circles="generalPost"
        />
        <Adaptation 
            :title="'Body Adaptation - Pre'"
            :values="[test.pre.data.FR, test.pre.data.SL]"
        />
        <Four 
            :title="'Stress and Adaptation - Pre'"
            :circles="stressPre"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart 
            :title="'Heart Rate - Pre'"
            :test="test.pre"    
        />
        <Adaptation 
            :title="'Body Adaptation - Post'"
            :values="[test.post.data.FR, test.post.data.SL]"
        />
        <Four 
            :title="'Stress and Adaptation - Post'"
            :circles="stressPost"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart 
            :title="'Heart Rate - Post'"
            :test="test.post"
        />
    </div>
</template>

<script>

    import Measurements from '@/components/Measurements/Measurements'
    import Four from '@/components/Four/Four'
    import Adaptation from '@/components/Adaptation/Adaptation'
    import Heart from '@/components/Heart/Heart'
    import Comments from '@/components/Comments/Comments'

    import './UserPost.scss'

    export default {
        props: ['user', 'test'],
        data(){
            return {
                generalPre: [],
                stressPre: [],
                generalPost: [],
                stressPost: [],
            }
        },
        mounted(){
            console.log('PREPOST TEST', this.test)
            this.updateData()
        },
        methods: {
            updateData(){
                this.generalPre = [
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
                        value: Math.round(this.test.pre.data.SI)
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
                        value: Math.round(this.test.pre.data.RMSSD)
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
                        value: Math.round(this.test.pre.data.SDNN)
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
                        value: Math.round(this.test.pre.data.AutonomicBalance)
                    }
                ]
                this.stressPre = [
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
                        value: Math.round(this.test.pre.data.SL)
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
                        value: Math.round(this.test.pre.data.FR)
                        
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
                        value: Math.round(this.test.pre.data.HSI)
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
                        value: Math.round(this.test.pre.data.SI)
                    }
                ]
                this.generalPost = [
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
                        value: Math.round(this.test.post.data.SI)
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
                        value: Math.round(this.test.post.data.RMSSD)
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
                        value: Math.round(this.test.post.data.SDNN)
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
                        value: Math.round(this.test.post.data.AutonomicBalance)
                    }
                ]
                this.stressPost = [
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
                        value: Math.round(this.test.post.data.SL)
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
                        value: Math.round(this.test.post.data.FR)
                        
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
                        value: Math.round(this.test.post.data.HSI)
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
                        value: Math.round(this.test.post.data.SI)
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