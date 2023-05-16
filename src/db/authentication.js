import CryptoJS from 'crypto-js'
import aes from 'crypto-js/aes';
import router from "@/router";
import {defineStore} from "pinia";
import {FetchWrapper} from "@/library/Composables/FetchWrapper";
import dayjs from "dayjs";
import {inject} from "vue";

export const useAuthStore = defineStore('authStore', {
    persist: {enabled:true},
    state: ()=>{
        return {
          dayjs,
          emitter: inject('emitter'),
          token: '',
          user: '',
          refresh_token_invalid: false,
          refresh_token:'',
          next_token_expiry:'',
          next_refresh_expiry:'',
          password_reset_token:'',
          refreshInterval:null
        }
    },
    actions: {
        authenticated(){
            return Boolean(this.token);
        },
        register(credentials){
            const requester = new FetchWrapper({},{}, import.meta.env.VITE_AUTH_URL)
            return new Promise((resolve, reject) => {
                requester.fetch('register', 'post', credentials)
                    .then(({data}) => {
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        login(credentials){
             const requester = new FetchWrapper({},{}, import.meta.env.VITE_AUTH_URL)
            return new Promise((resolve, reject) => {
                requester.fetch('authenticate', 'post', credentials)
                    .then(({data}) => {
                        const authToken = data.token;
                         this.user =  this.encrypt(data.user, {stringify: true});

                         this.refresh_token = this.encrypt(data.refresh_token, {stringify: true});

                         this.next_token_expiry = data.token_expires_at
                         this.next_refresh_expiry = data.refresh_token_expires_at
                        this.setToken(authToken);

                         //if logging in from login page, redirect to dashboard, else reload
                        if (router.currentRoute.name === 'login'){
                             window.location.assign("/");
                        }else{ window.location.reload() }

                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        resetPassword(payload){
            const requester = new FetchWrapper({},{}, import.meta.env.VITE_AUTH_URL)
            return new Promise((resolve, reject) => {
                requester.fetch('reset', 'post', payload)
                    .then(({data}) => {
                        clearInterval(this.refreshInterval)
                        this.refresh_token_invalid = true
                        resolve(data)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        refreshToken(){
            let self = this
            const requester = new FetchWrapper({},{}, import.meta.env.VITE_AUTH_URL)
            return new Promise(function (resolve, reject) {
                requester.fetch('refresh', 'post', {
                  "refresh_token": self.get('refresh_token')
                })
                .then(({data}) => {
                    // update token
                    self.setToken(data.token)
                    self.next_token_expiry = data.token_expires_at
                    resolve(data)
                })
                .catch((error) => {
                    reject(error)
                })
            })
        },
        initRefreshToken(){
            //let time = parseInt((Math.abs(dayjs(new Date()).diff(this.next_token_expiry, 'millisecond'))-60000).toFixed())

            clearInterval(this.refreshInterval)
            this.refreshInterval = setInterval(async () => {
                await this.refreshToken()
                .catch((error) => {
                    //Stop interval && initiate mini login popup
                    clearInterval(this.refreshInterval)
                    this.refresh_token_invalid = true
                    //this.signout()
                })
          }, 30000)
        },
        get(key) {
          return this.decrypt(this[key])
        },
        set(key, properties) {
          let item = this.get(key)
            Object.keys(properties).forEach((prop_key) => {
                item[prop_key] = properties[prop_key]
            })
            this[key] = this.encrypt(item, {stringify: true});
        },
        setToken(token){
            this.token = this.encrypt(
                typeof token === 'object' ? JSON.stringify(token) : token
            )
             this.initRefreshToken()
        },
        encrypt(value, options= {stringify: false}){
            if (options.stringify){
                value = typeof value === 'object' ? JSON.stringify(value) : value
            }
            return aes.encrypt(value, import.meta.env.VITE_PWD).toString()
        },
        decrypt(ciphertext){
            let deciphered = aes.decrypt(ciphertext, import.meta.env.VITE_PWD)
                .toString(CryptoJS.enc.Utf8)

            try {
                return JSON.parse(deciphered);
            }catch{
                return deciphered;
            }

        },
        signout(){
            const request = new FetchWrapper({},{}, import.meta.env.VITE_AUTH_URL)
            const reset = () => {
                ['token', 'user', 'refresh_token', 'next_token_expiry', 'next_refresh_expiry', 'password_reset_token' ].forEach(key => this[key] = '')
            }
            request.fetch('logout', 'post')
            .then(() =>{
               reset()
                if (router.currentRoute.value.matched.some(record => record.meta.requiresAuth)) {
                    window.location.assign("/auth/login");
                }
            })
            .catch((error) => {
                this.emitter.emit('toast', {title: 'Error logging out!', message: error.message, type:'danger'})
            })


        },
    }
})