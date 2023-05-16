import { defineStore } from "pinia";
import {FetchWrapper} from "@/library/Composables/FetchWrapper";
import {find} from "lodash/collection";
import {inject} from "vue";

// set company ID based on location
let company_id = ''
let location = window.location.protocol + "//" + window.location.host
if (location === 'https://sote.churpy.co'){
    company_id = '8b7cc0e3-fc67-422b-90b0-5fe4a3f377a4'
}
else if(location === 'https://unga-uats.churpy.co'){
    company_id = 'ad873bae-919e-4745-bcc2-cbb6157e995d'
}
else if(location === 'https://unga.reconciliation.churpy.co'){
    company_id = 'ee640817-9386-451b-b50c-5b05ba586b92'
}
else if(location === 'https://demo.churpy.co'){
    company_id = 'ad873bae-919e-4745-bcc2-cbb6157e9951'
}
else{
    company_id = 'ad873bae-919e-4745-bcc2-cbb6157e995d'
}

/*
* This store only holds access management settings
* */

export const useAccessManagementStore = defineStore('accessManagement', {
    persist: {enabled:false},
    state: ()=>{
       return {
           loading: false,
           company_id,
           organization_id:'',
           organization: null,
           allowed_menus: [],
           keycloak: inject('keycloak'),
           groups: [],
           members: []
       }
    },
    actions: {
        getItems(items, fallBack, force = false){
            this.loading = true
              return new Promise(async (resolve) => {
                  if(this[items].length <= 0 || force){
                      await this[fallBack]().then(()=>{
                          this.loading = false
                          resolve(this[items])
                      })
                  }else{
                      this.loading = false
                     resolve(this[items])
                  }
              })
        },
        getSingle(items, value){
            this.loading = true
            const finder = () => {
                return find(this[items], (item) => {
                return item.id === value
            })
            }
            return new Promise(async (resolve) => {
                let result = finder()
                if (!result){
                    await this.fetchGroups().then(() => {
                        result = finder()
                    })
                }
                this.loading = false
                resolve(result)
            })
        },
        async fetchGroups(params = {}) {
            this.loading = true
            const request = new FetchWrapper({}, {
               baseURL: import.meta.env.VITE_TEAMS_API_BASE_URL
           })
            return new Promise((resolve, reject) => {
              request.fetch('groups', 'get', null, params)
                .then(({data}) => {
                  this.groups = [] //reset
                  data.forEach((group) => {
                    this.groups.push({
                      id:group.id,
                      group_name:group.name,
                      users:[],
                      created_at:'23/04/2021'}
                    )
                  })
                    resolve(data)
                })
                .catch((error) => {
                    resolve(error)
                })
                  .finally(() => this.loading = false)
            })
        },
        async fetchMembers(params = {}){
            this.loading = true
            const request = new FetchWrapper({}, {
               baseURL: import.meta.env.VITE_TEAMS_API_BASE_URL
           })
           return new Promise((resolve, reject) => {
               const processName = (user) => {
                   //user.firstName || '' +' '+ user.lastName || ''
                   let name = '';
                   name += user.firstName ? user.firstName : '' // add first name
                   name += name.length ? ' ' : '' // add space
                   name += user.lastName ? user.lastName : '' // add last mame
                   return name
               }
                  request.fetch('members', 'get', null,params)
                  .then(({data}) => {
                      this.members = [] //reset
                    data.users.forEach((user) => {
                      let name = processName(user)
                      this.members.push({
                        id:user.id,
                        name: name || user.email,
                        username: user.username,
                        email: user.email,
                        status: user.enabled
                      })
                        resolve(this.members)
                    })
                  }).catch((error)=>{
                      reject(error)
                  })
                      .finally(()=> this.loading = false)
           })
        },
        roles(type){
            return this.keycloak.resourceAccess[type]?.['roles']
        }
      },
})