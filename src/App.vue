<template>
	<div id="app" class="wrapper">
		<router-view @setUserData="setUserData" :user="user" />
		<Start :open="start" />
	</div>
</template>

<script>
	
	import Start from './components/Start/Start'

	export default {
		name: 'App',
		components: { Start },
		data() {
			return {
				start : true,
				user: null,
				token : null
			}
		},
		mounted() {
			setTimeout(() => {
				this.start = false
			}, 1000)
		},
		watch: {
			user(){
				console.log(this.user)
			}
		},
		methods: {
			setUserData({ user, token }) {
				this.user = user
				this.token = token
			}
		}
	}
</script>
