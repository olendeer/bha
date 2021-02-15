<template>
    <div :class="['user-select-wrapper', {'user-select-wrapper-active' : open}]" @click="close($event)">
        <div class="user-select">
            <div class="user-select-content">
                <div class="user-select-content-header">Select User Type</div>
                <Button
                    :title="'I am a professional user'"
                    :width="315"
                    :marginBottom="15"
                    @click="$router.push({ name: 'register', params: { mode: 'doctor' } })"
                />
                <Button
                    :title="'I am home user'"
                    :width="315"
                    :mode="'cancel'"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import Button from '@/components/Button/Button'

    import './UserSelect.scss'

    export default {
        props: ['open'],
        components:{ Button },
        methods: {
            close(event) {
                if(event.target.classList.contains('user-select-wrapper-active') || event.target.classList.contains('user-select')){
                    this.$emit('closeClick')
                }
            }
        }
    }
</script>