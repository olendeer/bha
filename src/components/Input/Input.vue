<template>
    <div class="input">
        <input 
            :type="typeInput"
            :name="name"
            :value="value"
            @input="update($event.target.value)"
            class="input-inner"
            :placeholder="placeholder"
            @focus="$emit('focus')"
            @blur="$emit('blur', $event.target)"
        >
        <Eye v-if="type === 'password'" :class="{'input-eye' : true, 'input-eye-active' : typeInput === 'text'}" @click="visiblePassword"/>
    </div>
</template>

<script>

    import Eye from '../../assets/img/eye.svg'

    import './Input.scss'

    export default {
        props: ['name', 'value', 'type', 'placeholder', 'marginBottom'],
        data(){
            return {
                typeInput: this.type
            }
        },
        methods: {
            update(value) {
                this.$emit("inputChange", {value: value, name: this.name});
            },
            visiblePassword(){
                this.typeInput = this.typeInput === 'password' ? 'text' : 'password'
            }
        },
        components: { Eye },
    }
</script>