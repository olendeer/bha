import Vue from 'vue'
import App from './App.vue'
import router from './utilites/routers'
// import './index.scss'

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
