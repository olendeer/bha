<template>
    <div class="user-base">
        <div class="user-base-user">
            <div class="user-base-user-image">
                <Female v-if="user.client.gender === 'Female'"/>
                <Male v-if="user.client.gender === 'Male'"/>
            </div>
            <div class="user-base-user-info">{{user.lastName}}, {{user.firstName}} (Age {{ageCount}})</div>
        </div>
        <div class="user-base-nav" v-if="tests.length">
            <div class="user-base-nav-btn">
                <Diff/>
                Value/Diff
            </div>
            <div class="user-base-nav-btn">
                <Eye/>
                Show/Hide
            </div>
            <div class="user-base-nav-btn" @click="pdf">
                <Download/>
                Download
            </div>
            <div class="user-base-nav-btn" @click="pdf('print')">
                <Print/>
                Print
            </div>
            <div class="user-base-nav-btn" @click="excelHandler">
                <Export/>
                Export
            </div>
            <div class="user-base-nav-btn" @click="$emit('commentController')">
                <Comment/>
                Comment
            </div>
            <div class="user-base-nav-btn" @click="$emit('deleteController')">
                <Archive/>
                Delete
            </div>
        </div>
    </div>
</template>

<script>

    import { date } from '../../utilites/functions'
    import { xls } from '../../utilites/excel'

    import html2canvas from 'html2canvas'
    import { jsPDF } from "jspdf";


    import Diff from '@/assets/img/base/diff.svg'
    import Eye from '@/assets/img/base/eye.svg'
    import Download from '@/assets/img/base/download.svg'
    import Print from '@/assets/img/base/print.svg'
    import Export from '@/assets/img/base/export.svg'
    import Comment from '@/assets/img/base/comment.svg'
    import Archive from '@/assets/img/archive.svg'

    import Male from '../../assets/img/male-min.svg'
    import Female from '../../assets/img/female-min.svg'

    import './UserBase.scss'

    export default {
        props: ['user', 'tests'],
        components: { Diff, Eye, Download, Print, Export, Comment, Female, Male, Archive },
        data(){
            return {
                age : 0,
                test: [ ],
                excelName: ''
            }
        },
        methods: {
            pdf(mode){
                html2canvas(document.querySelector('.user-data')).then(canvas => {
                    const doc = jsPDF({ orientation: 'l' })
                    const screenshot = canvas.toDataURL('image/png')
                    let name = '';
                    if(this.$route.path.includes('single')){
                        name = 'Health_Single_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                    } else if (this.$route.path.includes('post')){
                        name = 'Health_Pre_Post_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                    } else if (this.$route.path.includes('cardiac')){
                        name = 'Cardiac_Resonance_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                    } else if (this.$route.path.includes('breatwork')){
                        name = 'Breathwork_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                    }

                    doc.addImage(screenshot, 'PNG', 0, 20, 290, this.$route.path.includes('post') ? 160 : 120);
                    if(mode === 'print'){
                        doc.autoPrint()
                        doc.save(name + '.pdf');
                    } else {
                        doc.save(name + '.pdf');
                        this.$emit('pushController', 'A new PDF report was successfully saved')
                    }
                });
            },
            excelHandler(){
                let temp = this.tests.find(item => item.active).data
                let excelData = []
                for(let key in temp){
                    excelData.push({ Name: key, Value: temp[key] })
                }
                
                let name;
                if(this.$route.path.includes('single')){
                    name = 'Health_Single_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                } else if (this.$route.path.includes('post')){
                    name = 'Health_Pre_Post_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                } else if (this.$route.path.includes('cardiac')){
                    name = 'Cardiac_Resonance_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                } else if (this.$route.path.includes('breatwork')){
                    name = 'Breathwork_' + (new Date().getMonth() + 1) + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '_' + new Date().getHours() + '_' + new Date().getMinutes()
                }
                xls(name, excelData)
            }
        },
        computed: {
            ageCount(){
                return date(this.user.client.dateOfBirth, 'b')
            }
        }
    }
</script>