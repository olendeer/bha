<template>
    <div class="user-data">
        <Four 
            :title="'Breathwork session summary'"
            :circles="summary"
            :height="'179px'"
        />
        <Details/>
        <Resonance/>
        <Heart :title="'Heart Rate'" :width="'328px'"/>
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
                summary: [
                    {
                        title: 'Resonance',
                        margin: '30px'
                    },
                    {
                        title: 'Congruence',
                        margin: '30px'
                        
                    },
                    {
                        title: 'Mean HR',
                        margin: '30px'
                    },
                    {
                        title: 'HR Variation',
                    }
                ],
                stress: [
                    {
                        title: 'Aging Speed',
                        margin: '30px'
                    },
                    {
                        title: 'Biological Age',
                        margin: '30px'
                        
                    },
                    {
                        title: 'Calendar Age',
                    },
                ],
                comment: 'Explanations to the source code of the program located directly inside the commented code. The syntax for comments is defined by the programming language. '
            }
        },
        components: { Measurements, Four, Adaptation, Heart, Comments, Details, Resonance }
    }
</script>