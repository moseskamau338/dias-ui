import {createApp} from 'vue'
import App from './App.vue'
 import router from './router'
import './assets/style.css'
import BaseLayout from '@/components/layouts/BaseLayout.vue'
import { createPinia } from 'pinia'
import {functions} from './library/globalHelpers'

import mitt from 'mitt'
import { vMaska } from "maska";

const emitter = mitt()
const pinia = createPinia()


import('./setup')


  const app = createApp(App)
    app.provide('emitter', emitter)
    app.provide('helpers', functions)

    app.use(router)
        .use(pinia)
        .component('BaseLayout', BaseLayout)
        .directive("maska", vMaska)
        .mount('#app') // allow access the app without having to login



