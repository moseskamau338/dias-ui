import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress/nprogress'
import 'nprogress/nprogress.css'
//import {useAuthStore} from "@/db/authentication";
//const authStore = useAuthStore()

NProgress.configure({
    showSpinner: true
})

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/Home.vue'),
        meta:{
            title: '',
            layout: 'AppLayoutDefault',
            requiresAuth: true,
            breadcrumb: [
                {
                    text: 'Dashboard',
                    active: true,
                },
            ]
        }

    },
    {
        path: '/bulk-sms',
        name: 'bulk-sms',
        component: () => import('@/pages/BulkMessaging.vue'),
        meta:{
            title: '',
            layout: 'AppLayoutDefault',
            requiresAuth: true,
            breadcrumb: [
                {
                    text: 'Dashboard',
                    to: {name: 'dashboard'},
                    active: false,
                },
                {
                    text: 'Bulk SMS',
                    active: true,
                },
            ]
        }

    },

    {
        path: '/contacts',
        name: 'contacts',
        component: () => import('@/pages/Contacts.vue'),
        meta:{
            title: '',
            layout: 'AppLayoutDefault',
            requiresAuth: true,
            breadcrumb: [
                {
                    text: 'Dashboard',
                    to: {name: 'dashboard'},
                    active: false,
                },
                {
                    text: 'Contacts',
                    active: true,
                },
            ]
        }

    },

    {
        path: '/queries',
        name: 'queries',
        component: () => import('@/pages/Query.vue'),
        meta:{
            title: '',
            layout: 'AppLayoutDefault',
            requiresAuth: true,
            breadcrumb: [
                {
                    text: 'Dashboard',
                    to: {name: 'dashboard'},
                    active: false,
                },
                {
                    text: 'Diaspora Queries',
                    active: true,
                },
            ]
        }

    },


    {
        path: '/settings',
        name: 'settings',
        component: () => import('@/pages/Settings.vue'),
        meta:{
            title: '',
             requiresAuth: true,
            layout: 'AppLayoutDefault',
            breadcrumb: (route) => ([
                {
                    text: 'Settings',
                    active: true,
                },
            ]),
        }
    },
    //auth pages
    //    name: 'signup', '/auth/signup'
    {
        path: '/auth/login',
        name: 'login',
        component: () => import('@/pages/Auth/Login.vue'),
        meta:{
             requiresGuest: true,
        }
    },
    {
        path: '/auth/signup',
        name: 'signup',
        component: () => import('@/pages/Auth/Register.vue'),
        meta:{
             requiresGuest: true,
        }
    },
    {
        path: '/auth/forgot-password',
        name: 'forgotPassword',
        component: () => import('@/pages/Auth/ForgotPassword.vue') ,
        meta:{
             requiresGuest: true,
        }
    },
     {
        path: '/auth/reset-password',
        name: 'resetPassword',
        component: () => import('@/pages/Auth/ResetPassword.vue') ,
        meta:{
             requiresGuest: true,
        }
    },

    // default pages
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/error/404.vue') ,
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export let requiresAuth = false;
export let requiresGuest = false;

   router.beforeEach((to, from, next) => {
       if (to.path) {NProgress.start()}

       const { title } = to.meta;
        to.meta.title = typeof title === 'function' ? title(to) : title;

       requiresAuth = to.matched.some(record => record.meta.requiresAuth)
       requiresGuest = to.matched.some(record => record.meta.requiresGuest)
       next()

        //if (requiresAuth){
        //    nextMain = next
        //    if (authStore.authenticated()){
        //         next()
        //    }else{
        //        setTimeout(()=>{
        //            //recheck authentication (should be updated by main.js)
        //            if (!authStore.authenticated()){keycloak.login()}
        //        }, 500)
        //    }
        //}else if(requiresGuest){
        //    //guest screen?
        //        setTimeout(()=>{
        //            if (authStore.authenticated()){
        //                next({name: 'dashboard'})
        //           }else{next()}
        //        }, 500)
        //}else{
        //    next()
        //}
 })



router.afterEach(() => {
    NProgress.done();
})



export default router