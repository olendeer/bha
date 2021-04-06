<template>
    <div :class="['delete', {'delete-active' : open} ]" @click="close($event)">
        <div class="delete-content">
            <div class="delete-content-header">You are about to delete this test record. All data associated with this test will become inaccessible. To confirm that you are certain to delete it, click YES, DELETE IT.</div>
            <div class="delete-content-nav">
                <Button
                    :title="'Delete it'"
                    :width="150"
                    :height="38"
                    @click="deleteTestHandler"
                />
                <Button
                    :title="'Don’t delete'"
                    :width="150"
                    :height="38"
                    :margin="0"
                    :mode="'cancel'"
                    @click="$emit('deleteController')"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import { deleteTest } from '../../utilites/api'

    import Button from '@/components/Button/Button'

    import './Delete.scss'

    export default {
        props: ['open', 'token', 'test'],
        components: { Button },
        methods: {
            deleteTestHandler(){
                deleteTest(this.token, { id: this.test.id})
                .then(res => {
                    if(!res.data){
                        this.$emit('pushController', res.errors.pop().message)
                    } else {
                        this.$emit('deleteTest', this.test.id)
                        this.$emit('deleteController')
                    }
                })
            },
            close(event) {
                if(event.target.classList.contains('delete-active') || event.target.classList.contains('delete')){
                    this.$emit('deleteController')
                }
            }
        },
    }
</script>