import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login/Login'
import Register from '@/views/Register/Register'
import Dashboard from '@/views/Dashboard/Dashboard'
import Reset from '@/views/Reset/Reset'


Vue.use(Router)



const router = new Router({
    mode: 'history',
    routes: [
        {
            path : '/',
            meta: {
                auth: false
            },
            redirect: '/login'
        },
        {
            path : '/login',
            component: Login,
            name: 'login',
            meta: {
                auth: false
            }
        },
        {
            path : '/dashboard',
            component: Dashboard,
            props: true,
            meta: {
                auth: true
            }
        },
        {
            path : '/register',
            component: Register,
            name: 'register',
            meta: {
                auth: false
            }
        },
        {
            path : '/reset',
            component: Reset,
            name: 'reset',
            meta: {
                auth: false
            }
        }
    ]
})

export default router