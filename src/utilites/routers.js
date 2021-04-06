import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/Login/Login'
import Register from '@/views/Register/Register'
import Dashboard from '@/views/Dashboard/Dashboard'
import Reset from '@/views/Reset/Reset'
import AddClient from '@/views/AddClient/AddClient'
import EditClient from '@/views/EditClient/EditClient'

import User from '@/views/User/User'
import UserSingle from '@/views/User/UserSingle/UserSingle'
import UserPost from '@/views/User/UserPost/UserPost'
import UserCardiac from '@/views/User/UserCardiac/UserCardiac'
import UserBreatwork from '@/views/User/UserBreatwork/UserBreatwork'


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
        },
        {
            path : '/add-client',
            component: AddClient,
            name: 'add-client',
            meta: {
                auth: true
            }
        },
        {
            path : '/edit-client/:id',
            component: EditClient,
            name: 'edit-client',
            meta: {
                auth: true
            }
        },
        {
            path : '/user/:id',
            name: 'user',
            component: User,
        },
        {
            path : '/user/:id/',
            component: User,
            children: [
                {
                    path: 'single/',
                    components: {
                        user: UserSingle
                    }
                },
                {
                    path: 'prepost/',
                    components: {
                        user: UserPost
                    }
                },
                {
                    path: 'cardiac/',
                    components: {
                        user: UserCardiac
                    }
                },
                {
                    path: 'breatwork/',
                    components: {
                        user: UserBreatwork
                    }
                }
            ]
        }
    ]
})

export default router