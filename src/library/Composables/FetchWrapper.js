import axios from "axios";
import aes from 'crypto-js/aes';
import CryptoJS from 'crypto-js'
import {functions} from '@/library/globalHelpers'
import { useAuthStore } from "@/db/authentication";


export class FetchWrapper{
    constructor(headers = {}, options = {}, baseUrl = import.meta.env.VITE_API_BASE_URL) {
        const authStore = useAuthStore();
        const {getApiEndpoint} = functions //public
        this.getApiEndpoint = getApiEndpoint;

        let authToken = authStore.token && aes.decrypt(authStore.token, import.meta.env.VITE_PWD)
                .toString(CryptoJS.enc.Utf8)
        this.axiosInstance = axios.create({
          baseURL: baseUrl,
          timeout: 100000,
          headers: {
              'Authorization': `Bearer ${authToken}`,
              ...headers
          },
          ...options
        });
    }
    fetch(url, method, data, params = {}){
        return new Promise((resolve, reject) => {

            let payload = method.toLowerCase() === 'delete'? {data: data} : {...data} // delete method fix

            this.axiosInstance[method](this.getApiEndpoint(url, params), payload) // sanitise the URL and data
                .then((response)=>{
                    resolve(response)
                })
                .catch((error) => {
                   reject(this.parseError(error))
                })
        })
    }

    uploadFile(url, method, data, params = {}, options = {}){
        /**
        * @Note:Axios-issue-4885
         * [FIX] - use a fresh instance for file uploads
         * [FIX] - add #{transformRequest: formData => formData} as an extra option
        * */
        return new Promise((resolve, reject) => {
           axios[method](
               import.meta.env.VITE_API_BASE_URL+this.getApiEndpoint(url, params),
               data,
               {
                   headers: {
                       'Authorization': `Bearer ${'token'}`, // get this from keycloak
                       'Content-Type': 'multipart/form-data'
                   },
                   ...options
               }
           ) // sanitise the URL and data
                .then((response)=>{
                    resolve(response)
                })
                .catch((error) => {
                   reject(this.parseError(error))
                })
        })
    }

    parseError(error){
        let parsed = error.toJSON()

        let data = '',
        status = parsed.code,
        headers = parsed.name,
        message = parsed.message || parsed.error || 'Sorry, we didn\'t get a response from the server...'

        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
            data = error.response.data
            status = error.response.status
            headers = error.response.headers
            if (typeof error.response.data == "object"){
                message = this.constructValidation(error.response.data)
            }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          data = error.request
        } else {
          // Something happened in setting up the request that triggered an Error
          message = error.message
        }


        return {data, status,headers, message}
    }

    constructValidation(data){
        let message = 'We caught a few issues: <br />'
        const formValidationIssues = () => {
            //theres a message?
            if (data.message || data.error || data.detail){
                message += '- '+(data.message || data.error || data.detail)
                return;
            }

            //validate
            let keys = Object.keys(data)
            if (typeof data === "object" && keys && keys.length > 0){
                keys.forEach((key)=>{
                    message += key+': '+data[key][0]
                    message += "<br />"
                })
            }
        }
        if (typeof data === 'object'){
            formValidationIssues()
        }else{
            message = data
        }

        return message;
    }
}