<template>
    <div class="user-data">
        <Measurements :title="'Body Measurements and Vitals - Pre'"/>
        <Four 
            :title="'General health - Pre'"
            :circles="general"
        />
        <Measurements :title="'Body Measurements and Vitals - Post'"/>
        <Four 
            :title="'General health - Post'"
            :circles="general"
        />
        <Adaptation :title="'Body Adaptation - Pre'"/>
        <Four 
            :title="'Stress and Adaptation - Pre'"
            :circles="stress"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart :title="'Heart Rate - Pre'"/>
        <Adaptation :title="'Body Adaptation - Post'"/>
        <Four 
            :title="'Stress and Adaptation - Post'"
            :circles="stress"
            :height="'196px'"
            :width="'415px'"
        />
        <Heart :title="'Heart Rate - Post'"/>
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
        props: ['user'],
        data(){
            return {
                general: [
                    {
                        title: 'Stress Index',
                        margin: '30px'
                    },
                    {
                        title: 'Vagal Index',
                        margin: '30px'
                        
                    },
                    {
                        title: 'HRV Index',
                        margin: '30px'
                    },
                    {
                        title: 'Autonomic Balance',
                    }
                ],
                stress: [
                    {
                        title: 'Adaptation strain',
                        margin: '30px'
                    },
                    {
                        title: 'Adaptation resource',
                        margin: '30px'
                        
                    },
                    {
                        title: 'Adaptation index',
                        margin: '30px'
                    },
                    {
                        title: 'Stress index',
                    }
                ],
            }
        },
        components: { Measurements, Four, Adaptation, Heart, Comments }
    }
</script>