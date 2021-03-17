<template>
    <div class="user-data">
        <Measurements :title="'Body Measurements and Vitals'"
            :test="test"/>
        <Four 
            :title="'General health'"
            :circles="general"
        />
        <Adaptation :title="'Body Adaptation'"/>
        <Four 
            :title="'Stress and Adaptation'"
            :circles="stress"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart :title="'Heart Rate'"/>
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
                stress: [
                    {
                        title: 'Adaptation strain',
                        margin: '30px'
                    },
                    {
                        title: 'Adaptation resource',
                        margin: '30px',
                        color: '#0F89DA',
                        value: 13
                        
                    },
                    {
                        title: 'Adaptation index',
                        margin: '30px',
                        color: '#EB4335',
                        value: -19
                    },
                    {
                        title: 'Stress index',
                    }
                ],
                // comment: 'Explanations to the source code of the program located directly inside the commented code. The syntax for comments is defined by the programming language. '
            }
        },
        mounted(){
            console.log(this.test)
            this.general = [
                {
                    title: 'Stress Index',
                    margin: '30px',
                    color: '#4ACE67',
                    value: Math.round(this.test.data.SI)
                },
                {
                    title: 'Vagal Index',
                    margin: '30px',
                    color: '#4ACE67',
                    value: Math.round(this.test.data.RMSSD)
                },
                {
                    title: 'HRV Index',
                    margin: '30px',
                    color: '#FFFF00',
                    value: Math.round(this.test.data.SDNN)
                },
                {
                    title: 'Autonomic Balance',
                    color: '#FBBC05',
                    value: Math.round(this.test.data.AutonomicBalance)
                }
            ]
            this.stress = [
                {
                    title: 'Adaptation strain',
                    margin: '30px',
                    color: '#4ACE67',
                    value: Math.round(this.test.data.SL)
                },
                {
                    title: 'Adaptation resource',
                    margin: '30px',
                    color: '#4ACE67',
                    value: Math.round(this.test.data.FR)
                    
                },
                {
                    title: 'Adaptation index',
                    margin: '30px',
                    color: '#FFFF00',
                    value: Math.round(this.test.data.HSI)
                },
                {
                    title: 'Stress index',
                    color: '#FBBC05',
                    value: Math.round(this.test.data.SI)
                }
            ]
        },
        components: { Measurements, Four, Adaptation, Heart, Comments }
    }
</script>