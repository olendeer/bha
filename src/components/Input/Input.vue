<template>
    <div :class="['input', { 'input-active' : active }]" :style="{ marginBottom: marginBottom + 'px' }">
        <input 
            :type="typeInput"
            :style="{display: 'none'}"
            :name="name"
        />
        <input 
            :type="typeInput"
            :name="name"
            :value="value"
            @input="update($event.target.value)"
            class="input-inner"
            @focus="focus($event)"
            @blur="blur($event)"
            autocomplete="new-password"
        >
        <div :class="['input-placeholder', { 'input-placeholder-active' : active }]" @click.stop="$event.target.previousElementSibling.focus()">
            <div class="input-placeholder-name" @click.stop="$event.target.parentElement.previousElementSibling.focus()">{{placeholder}} <span @click.stop="$event.target.parentElement.parentElement.previousElementSibling.focus()">{{ required ? '*' : '' }}</span> </div>
            <span class="input-placeholder-hint" @click.stop="$event.target.parentElement.previousElementSibling.focus()">{{ hint || '' }}</span>
        </div>
         <calendar 
            v-model="birthValue"
            is-dark
            color="red"
            v-if="isOpenCalendar && birth"
            :dayclick="$emit('dayclick')"
            :locale="'en'"
        ></calendar>
        <Arrow v-if="birth" class="input-arrow" />
        <Eye v-if="type === 'password'" :class="{'input-eye' : true, 'input-eye-active' : typeInput === 'text'}" @click="visiblePassword"/>
    </div>
</template>

<script>

    import Eye from '../../assets/img/eye.svg'

    import DatePicker from 'v-calendar/lib/components/date-picker.umd'

    import Arrow from '@/assets/img/arrow_test.svg'


    import './Input.scss'

    export default {
        props: ['name', 'value', 'type', 'placeholder', 'marginBottom', 'required', 'hint', 'birth', 'isOpenCalendar'],
        data(){
            return {
                typeInput: this.type,
                active: false,
                birthValue: ''
            }
        },
        methods: {
            update(value) {
                this.$emit("inputChange", {value: value, name: this.name});
            },
            visiblePassword(){
                this.typeInput = this.typeInput === 'password' ? 'text' : 'password'
            },
            focus(event) {
                console.log(event)
                event.target.removeAttribute('readonly')
                this.$emit('focus')
                this.active = true
            },
            blur(event){
                this.$emit('blur', event.target)
                if(!this.value.length > 0 && !this.birth){
                    this.active = false   
                }
                // console.log('blur')
                if(this.birth){
                    // console.log(this.value)
                    // this.$emit('closeCalendar')
                }
            }
        },
        // mounted(){
        //     if(this.value){
        //         this.active = true
        //     }
        // },
        components: { Eye, calendar: DatePicker, Arrow },
        watch: {
            birthValue(){
                this.update(new Date(this.birthValue).getMonth() + '/' + new Date(this.birthValue).getDate() + '/' +  new Date(this.birthValue).getFullYear() )
                this.$emit('closeCalendar')
                if(this.birthValue.toString().length){
                    this.active = true 
                }
            },
            value(){
                if(this.value){
                    this.active = true
                }
            }
        }
    }
</script>