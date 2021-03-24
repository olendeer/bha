<template>
    <div :class="['comment', {'comment-active' : open} ]" @click="close($event)">
        <div class="comment-content">
            <div class="comment-content-header">Comments</div>
            <Input
                :value="comment"
                :name="'comment'"
                :type="'text'"
                @inputChange="inputChange"
                :placeholder="'Testing comments'"
                :marginBottom="26"
                @focus="error = false"
            />
            <div class="comment-content-nav">
                <Button
                    :title="'Send'"
                    :width="315"
                    :marginBottom="15"
                    @click="sendCommentHandler"
                />
                <Button
                    :title="'Cancel'"
                    :width="315"
                    :margin="0"
                    :mode="'cancel'"
                    @click="$emit('commentController')"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import { sendComment } from '../../utilites/api'

    import Input from '@/components/Input/Input'
    import Button from '@/components/Button/Button'

    import './Comment.scss'

    export default {
        data(){
            return {
                comment: ''
            }
        },
        props: ['open', 'token', 'test'],
        components: { Input, Button },
        methods: {
            inputChange(value){
                this.comment = value.value
            },
            inputCheck(input){
                if (!this.comment.length){
                    this.$emit('pushController', 'Enter comment')
                    return false
                } 
                return true
            },
            sendCommentHandler(){
                if(this.inputCheck()){
                    sendComment(this.token, { id: this.test.id, comment: this.comment })
                    .then(res => {
                        if(!res.data){
                            this.$emit('pushController', res.errors.pop().message)
                        } else {
                            this.$emit('commentController')
                            this.test.procedureComment = this.comment
                        }
                    })
                }
            },
            close(event) {
                if(event.target.classList.contains('comment-active') || event.target.classList.contains('comment')){
                    this.$emit('commentController')
                }
            }
        },
        watch: {
            open(){
                console.log(this.test)
                this.comment = this.test.procedureComment
            }
        }
    }
</script>