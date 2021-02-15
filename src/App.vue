<template>
	<div id="app" class="wrapper">
		<router-view 
			@setUserData="setUserData" 
			:user="user" 
			:token="token"
			@logoutController="logoutController"
			@pushController="pushController"
		/>
		<Start :open="start" />
		<Logout 
			:open="logout" 
			:token="token" 
			@logoutController="logoutController"
			@removeUserData="removeUserData"
			@pushController="pushController"
			@closeClick="logout = false"
		/>
		<Push 
			:open="push"
			:text="pushText"
		/>
	</div>
</template>

<script>
	
	import Start from './components/Start/Start'
	import Logout from './components/Logout/Logout'
	import Push from './components/Push/Push'

	import { logout } from '@/utilites/api'

	export default {
		name: 'App',
		components: { Start, Logout, Push },
		data() {
			return {
				start : true,
				logout: false,
				user: null,
				token : null,
				push: false,
				pushText: '',
				timer: null
			}
		},
		mounted() {
			window.onload = this.resetTimer;
			window.onmousemove = this.resetTimer;
			window.onmousedown = this.resetTimer;      
			window.ontouchstart = this.resetTimer;
			window.onclick = this.resetTimer;
			window.onkeypress = this.resetTimer;   
			window.addEventListener('scroll', this.resetTimer, true);


			setTimeout(() => {
				this.start = false
				if(!this.user && this.$route.path !== '/login'){
					this.$router.push('/login')
				}
			}, 1000)
		},
		methods: {
			setUserData({ user, token }) {
				this.user = user
				this.token = token
			},
			removeUserData() {
				this.user = null
				this.token = null
			},
			logoutController(){
				this.logout = !this.logout
			},
			pushController(text){
				this.pushText = text
				this.push = true,
				setTimeout(() => {
					this.push = false
				}, 1000)
			},
			logoutUser(){
				if(this.user){
					logout(this.token)
					.then(res => {
						if(res.data?.logout){
							this.$router.push({
								name: 'login',
								params: { message : 'The user successfully logged out' }
							})
							this.removeUserData()
						} else {
							this.pushController(res.errors?.pop().message)
						}
					})
				}
				this.resetTimer()
			},
			resetTimer() {
				clearTimeout(this.timer);
				this.timer = setTimeout(this.logoutUser, 1000 * 60 * 15);
			}
		}
	}
</script>
