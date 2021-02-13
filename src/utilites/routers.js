import Vue from 'vue'
import Router from 'vue-router'

// import Registration from '@/views/Registration/Registration'
import Login from '@/views/Login/Login'
// import Reset from '@/views/Reset/Reset'

// import Nav from '@/views/Nav/Nav'
// import Dashboard from '@/views/Dashboard/Dashboard'

import {
    checkAuth
} from './auth'

Vue.use(Router)

const redirectController = () => {
    if(checkAuth() === 'authenticated'){
        return '/dashboard'
    } else {
        return '/login'
    }
}


const router = new Router({
    mode: 'history',
    routes: [
        {
            path : '/',
            // component: Login,
            meta: {
                auth: false
            },
            redirect: '/login'
        },
        {
            path : '/login',
            component: Login,
            meta: {
                auth: false
            }
        },
        {
            path : '/dashboard',
            component: Login,
            meta: {
                auth: true
            }
        },
        // {
        //     path: '/start',
        //     component: Unregistered,
        //     children: [
                // {
                //     path: '/',
                //     components: {
                //         unregistered: Start
                //     },
                //     meta: {
                //         auth: false
                //     },
                // },
                // {
                //     path: 'login',
                //     components: {
                //         unregistered: Login
                //     },
                //     meta: {
                //         auth: false
                //     },
                // },
                // {
                //     path: 'registration',
                //     components: {
                //         unregistered: Registration
                //     },
                //     meta: {
                //         auth: false
                //     },
                // },
                // {
                //     path: 'reset',
                //     components: {
                //         unregistered: Reset
                //     },
                //     meta: {
                //         auth: false
                //     },
                // },
                // {
                //     path: '*',
                //     components: {
                //         unregistered: Login
                //     }
                // }
        //     ],
        //     redirect: redirectController
        // },
        // {
        //     path: '/app',
        //     component: Nav,
        //     children: [
        //         {
        //             path: 'dashboard',
        //             component: Dashboard,
        //             meta: {
        //                 auth: true
        //             }
        //         }
        //     ],
        //     redirect: redirectController
        // },
        // {
        //     path: '*',
        //     redirect: redirectController
        // }
    ]
})

router.beforeEach((to, _, next) => {
    console.log(to)
    if(to.meta.auth){
        if(checkAuth() === 'authenticated'){
            next()
        } else {
            router.push({
                path: '/login'
            })
        }
    } else {
        if(checkAuth() === 'authenticated'){
            router.push({
                path: '/dashboard'
            })
        } else {
            next()
        }
    }
})

export default router