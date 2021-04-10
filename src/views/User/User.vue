<template>
    <div class="user-wrapper">
        <div class="user">
            <UserHeader
                :tab="tab"
                @changeTab="changeTab"
                :client="user"
            />
            <UserBase
                :user="user"
                @pushController="pushController"
                @commentController="commentController"
                @deleteController="deleteController"
                :test="tests[this.tab].find(item => item.active)"
                v-if="user"
                :diff="diff"
                @changeDiff="changeDiff"
                @changeShow="changeShow"
                :tab="tab"
            />
            <Comment
                :open="isOpenComments"
                :token="token"
                @commentController="commentController"
                @pushController="pushController"
                :test="tests[this.tab].find(item => item.active)"
            />
            <Delete
                :open="isOpenDelete"
                :token="token"
                @deleteController="deleteController"
                @pushController="pushController"
                @deleteTest="deleteTest"
                :test="tests[this.tab].find(item => item.active)"
            />
            <div class="user-test" v-if="tests[this.tab].find(item => item.active)">
                <Arrow @click="changeTest('prev')"/>
                <span v-html="testDate"></span>
                <Arrow class="right" @click="changeTest('next')"/>
            </div>
            <router-view 
                name="user"
                :user="user"
                :test="tests[this.tab].find(item => item.active)"
                v-if="tests[this.tab].find(item => item.active)"
            />
        </div>
    </div>
</template>

<script>

    import { getUser } from '../../utilites/api'
    import { date } from '../../utilites/functions'

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
                tests: {
                    single: [],
                    prepost: [],
                    cardiac: [],
                    breatwork: []
                },
                tab: 'single',
                isOpenComments: false,
                isOpenDelete: false,
                diff: false,
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
                        this.readTest(res.data.clientData.nodes)
                        this.$router.push('/user/' + this.$route.params.id + '/single')
                    }
                }
            })
        },
        methods: {
            pushController(message){
                this.$emit('pushController', message)
            },
            commentController(){
                this.isOpenComments = !this.isOpenComments
            },
            deleteController(){
                this.isOpenDelete = !this.isOpenDelete
            },
            readTest(tests){
                tests = tests.map((item) => ({...item, show: true, data: JSON.parse(JSON.parse(item.data))})).filter(item => !(item.procedure.name === 'Biological age'))
                console.log('ALL', tests)
                tests = tests
                let bodys = tests.filter(body => body.procedure.name === 'Body measurements').sort((a, b) => b.createdAt - a.createdAt)
                let compose = tests.filter(body => body.procedure.name === 'Body composition').sort((a, b) => b.createdAt - a.createdAt)
                let glucose = tests.filter(body => body.procedure.name === 'Blood glucose').sort((a, b) => b.createdAt - a.createdAt)
                let pressure = tests.filter(body => body.procedure.name === 'Blood pressure').sort((a, b) => b.createdAt - a.createdAt)
                let single = tests.filter(item => item.procedure.name === 'Health test' && !item.data.Category).map((item, index) => {
                    let date = item.testedDate ? new Date(item.testedDate).getTime() : new Date(item.createdAt).getTime()
                    return {
                        ...item,
                        date: date,
                        body: bodys.reverse().find(i => i.createdAt < item.createdAt) || bodys.find(i => i.createdAt > item.createdAt),
                        compose: compose.reverse().find(i => i.createdAt < item.createdAt) || compose.find(i => i.createdAt > item.createdAt),
                        glucose: glucose.reverse().find(i => i.createdAt < item.createdAt) || glucose.find(i => i.createdAt > item.createdAt),
                        pressure: pressure.reverse().find(i => i.createdAt < item.createdAt) || pressure.find(i => i.createdAt > item.createdAt),
                        active : index === 0,
                        index,
                        type: 'single'
                    }
                })
                let pre = tests.filter(item => item.procedure.name === 'Health test' && item.data.Category === 1).map((item, index) => {
                    let date = item.testedDate ? new Date(item.testedDate).getTime() : new Date(item.createdAt).getTime()
                    return {
                        ...item,
                        date: date,
                        body: bodys.reverse().find(i => i.createdAt < item.createdAt) || bodys.find(i => i.createdAt > item.createdAt),
                        compose: compose.reverse().find(i => i.createdAt < item.createdAt) || compose.find(i => i.createdAt > item.createdAt),
                        glucose: glucose.reverse().find(i => i.createdAt < item.createdAt) || glucose.find(i => i.createdAt > item.createdAt),
                        pressure: pressure.reverse().find(i => i.createdAt < item.createdAt) || pressure.find(i => i.createdAt > item.createdAt),
                    }
                })
                let post = tests.filter(item => item.procedure.name === 'Health test' && item.data.Category === 2).map((item, index) => {
                    return {
                        ...item,
                        body: bodys.reverse().find(i => i.createdAt < item.createdAt) || bodys.find(i => i.createdAt > item.createdAt),
                        compose: compose.reverse().find(i => i.createdAt < item.createdAt) || compose.find(i => i.createdAt > item.createdAt),
                        glucose: glucose.reverse().find(i => i.createdAt < item.createdAt) || glucose.find(i => i.createdAt > item.createdAt),
                        pressure: pressure.reverse().find(i => i.createdAt < item.createdAt) || pressure.find(i => i.createdAt > item.createdAt),
                    }
                })
                let prepost = pre.map((item, index) => {
                    return {
                        pre: item,
                        post: post[index],
                        date: item.date,
                        index,
                        id: item.id,
                        active: index === 0,
                        type: 'prepost'
                    }
                })
                let cardiac = tests.filter(item => item.procedure.name === 'Breathwork' && item.data.Category === 4).map((item, index) => {
                    let date = item.testedDate ? new Date(item.testedDate).getTime() : new Date(item.createdAt).getTime()
                    let raw = JSON.parse(JSON.parse(item.rawData2)).filter(item => item > 0)
                    let rawAll = raw.length / 100
                    let poor = raw.filter(item => (item > 0 && item < 30)).length / rawAll
                    let fair = raw.filter(item => (item >= 30 && item < 60)).length / rawAll
                    let good = raw.filter(item => (item >= 60)).length / rawAll
                    return {
                        ...item,
                        date: date,
                        active : index === 0,
                        index,
                        resonance: {
                            poor,
                            fair,
                            good
                        },
                        type: 'cardiac',
                        body: bodys.reverse().find(i => i.createdAt < item.createdAt) || bodys.find(i => i.createdAt > item.createdAt),
                        compose: compose.reverse().find(i => i.createdAt < item.createdAt) || compose.find(i => i.createdAt > item.createdAt),
                        glucose: glucose.reverse().find(i => i.createdAt < item.createdAt) || glucose.find(i => i.createdAt > item.createdAt),
                        pressure: pressure.reverse().find(i => i.createdAt < item.createdAt) || pressure.find(i => i.createdAt > item.createdAt),
                    }
                })
                let breatwork = tests.filter(item => item.procedure.name === 'Breathwork' && item.data.Category === 3).map((item, index) => {
                    let date = item.testedDate ? new Date(item.testedDate).getTime() : new Date(item.createdAt).getTime()
                    let raw = JSON.parse(JSON.parse(item.rawData2)).filter(item => item > 0)
                    let rawAll = raw.length / 100
                    let poor = raw.filter(item => (item > 0 && item < 30)).length / rawAll
                    let fair = raw.filter(item => (item >= 30 && item < 60)).length / rawAll
                    let good = raw.filter(item => (item >= 60)).length / rawAll
                    return {
                        ...item,
                        date: date,
                        active : index === 0,
                        index,
                        resonance: {
                            poor,
                            fair,
                            good
                        },
                        body: bodys.reverse().find(i => i.createdAt < item.createdAt) || bodys.find(i => i.createdAt > item.createdAt),
                        compose: compose.reverse().find(i => i.createdAt < item.createdAt) || compose.find(i => i.createdAt > item.createdAt),
                        glucose: glucose.reverse().find(i => i.createdAt < item.createdAt) || glucose.find(i => i.createdAt > item.createdAt),
                        pressure: pressure.reverse().find(i => i.createdAt < item.createdAt) || pressure.find(i => i.createdAt > item.createdAt),
                        type: 'breatwork'
                    }
                })
                this.tests = {
                    single,
                    prepost,
                    cardiac,
                    breatwork
                }
            },
            deleteTest(id){
                this.tests[this.tab] = this.tests[this.tab].filter(item => !(item.id === id)).map((item, index) => ({...item, active: index === 0, index}))
            },
            changeTab(link){
                this.tab = link
                this.$router.push(link)
            },
            changeTest(route){
                let indexActive = this.tests[this.tab].find((item, index) => item.active).index
                if(route === 'next'){
                    if(this.tests[this.tab][indexActive + 1]){
                        this.tests = {
                            ...this.tests,
                            [this.tab]: this.tests[this.tab].map((item, index) => indexActive + 1 === index ? {...item, active: true} : {...item, active: false} )
                        }
                    }
                } else if (route === 'prev'){
                    if(this.tests[this.tab][indexActive - 1]){
                        this.tests = {
                            ...this.tests,
                            [this.tab]: this.tests[this.tab].map((item, index) => indexActive - 1 === index ? {...item, active: true} : {...item, active: false} )
                        }
                    }
                }
            },
            changeDiff(){
                this.diff = !this.diff
            },
            changeShow(id){
                this.tests[this.tab] = this.tests[this.tab].map(item => item.id === id ? {...item, show: !item.show} : item)
            }
        },
        watch: {
            tests(){
                console.log(this.tab.toUpperCase(), this.tests[this.tab].find(item => item.active))
            },
            user(){
                console.log('userPage', this.user)
            }
        },
        computed: {
            testDate(){
                if(this.tests[this.tab].find(item => item.active)){
                    return date(this.tests[this.tab].find(item => item.active).date, 'td')
                }
                return ''
            }
        }
    }
</script>


