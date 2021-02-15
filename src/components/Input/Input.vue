<template>
    <div :class="['input', { 'input-active' : active }]" :style="{ marginBottom: marginBottom + 'px' }">
        <input 
            :type="typeInput"
            :name="name"
            :value="value"
            @input="update($event.target.value)"
            class="input-inner"
            @focus="focus"
            @blur="blur($event)"
        >
        <div :class="['input-placeholder', { 'input-placeholder-active' : active }]" @click.stop="$event.target.previousElementSibling.focus()">
            <div class="input-placeholder-name" @click.stop="$event.target.parentElement.previousElementSibling.focus()">{{placeholder}} <span @click.stop="$event.target.parentElement.parentElement.previousElementSibling.focus()">{{ required ? '*' : '' }}</span> </div>
            <span class="input-placeholder-hint" @click.stop="$event.target.parentElement.previousElementSibling.focus()">{{ hint || '' }}</span>
        </div>
        <Eye v-if="type === 'password'" :class="{'input-eye' : true, 'input-eye-active' : typeInput === 'text'}" @click="visiblePassword"/>
    </div>
</template>

<script>

    import Eye from '../../assets/img/eye.svg'

    import './Input.scss'

    export default {
        props: ['name', 'value', 'type', 'placeholder', 'marginBottom', 'required', 'hint'],
        data(){
            return {
                typeInput: this.type,
                active: false
            }
        },
        methods: {
            update(value) {
                this.$emit("inputChange", {value: value, name: this.name});
            },
            visiblePassword(){
                this.typeInput = this.typeInput === 'password' ? 'text' : 'password'
            },
            focus() {
                this.$emit('focus')
                this.active = true
            },
            blur(event){
                this.$emit('blur', event.target)
                if(!this.value.length > 0){
                    this.active = false   
                }
            }
        },
        components: { Eye },
    }
</script>