<template>
    <div class="dashboard">
        <Button 
            :title="'Logout'"
            @click="$emit('logoutController')"
        />
    </div>
    
</template>

<script>
    import Button from '@/components/Button/Button'

    import './Dashboard.scss'

    export default {
        props: ['user'],
        components: { Button },
    }   
</script>