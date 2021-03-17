<template>
    <div class="user-wrapper">
        <div class="user">
            <UserHeader
                :tab="tab"
                @changeTab="changeTab"
            />
            <UserBase
                :user="user"
                @pushController="pushController"
                @commentController="commentController"
                @deleteController="deleteController"
                :tests="tests"
                v-if="user"
            />
            <Comment
                :open="isOpenComments"
                :token="token"
                @commentController="commentController"
                @pushController="pushController"
                :test="tests.find(item => item.active)"
            />
            <Delete
                :open="isOpenDelete"
                :token="token"
                @deleteController="deleteController"
                @pushController="pushController"
                :test="tests.find(item => item.active)"
            />
            <div class="user-test" v-if="tests.length">
                <Arrow/>
                <span>Test Date</span>
                <Arrow class="right"/>
            </div>
            <router-view 
                name="user"
                :user="user"
                :test="tests.find(item => item.active)"
            />
        </div>
    </div>
</template>

<script>

    import { getUser } from '../../utilites/api'

    import UserHeader from '@/components/UserHeader/UserHeader'
    import UserBase from '@/components/UserBase/UserBase'
    import Comment from '@/components/Comment/Comment'
    import Delete from '@/components/Delete/Delete'

    import Arrow from '@/assets/img/arrow_test.svg'

    import './User.scss'

    export default {
        data(){
            return {
                user: null,
                tests: [],
                tab: 0,
                isOpenComments: false,
                isOpenDelete: false
            }
        },
        props: ['token'],
        components:{ UserHeader, UserBase, Arrow, Comment, Delete },
        mounted(){
            // edit 
            getUser(this.token, {id : this.$route.params.id})
            .then(res => {
                this.user = this.$route.params.user
                if(res.errors){
                    this.pushController(res.errors.pop().message)
                    this.$router.push('/dashboard')
                } else {
                    if(res.data.clientData.nodes[0]){
                        this.$router.push('/user/' + this.$route.params.id + '/' + res.data.clientData.nodes[0].id + '/single')
                        console.log(res.data.clientData.nodes)
                        this.tests = res.data.clientData.nodes.map((item, index) => index === 0 ? {...item, data: JSON.parse(JSON.parse(item.data)), active: true} : {...item, data: JSON.parse(JSON.parse(item.data)), active: false})
                    }
                }
            })
        },
        methods: {
            changeTab(index){
                this.tab = index
            },
            pushController(message){
                this.$emit('pushController', message)
            },
            commentController(){
                this.isOpenComments = !this.isOpenComments
            },
            deleteController(){
                this.isOpenDelete = !this.isOpenDelete
            }
        },
    }
</script>


