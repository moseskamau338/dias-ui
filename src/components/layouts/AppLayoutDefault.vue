<template>
    <!-- toaster: error, success, info -->
    <Toast />
    <MiniLogin />

  <main class="">
      <header class="flex items-center justify-between bg-brand-blue py-4 text-sky-200 px-20">
          <div id="logo">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10" viewBox="0 0 56.069 63.226">
                  <path id="Exclusion_1" data-name="Exclusion 1" d="M17.746,63.225h0L0,17.528a24.17,24.17,0,0,0,2.779.138,33.018,33.018,0,0,0,11.408-2A25.212,25.212,0,0,0,26.817,5.582a14.791,14.791,0,0,1,3.862-4.222A7.16,7.16,0,0,1,34.775,0C42.393,0,50.481,13.24,55.381,33.73a21.351,21.351,0,0,1,.34,9.162,17.046,17.046,0,0,1-3.21,7.042,26.283,26.283,0,0,1-9.442,7.334,54.053,54.053,0,0,1-11.5,3.985,79.684,79.684,0,0,1-13.817,1.972ZM26.036,21v22.38H41.865V39.24H30.957V21Z" transform="translate(0 0)" fill="#ff9000"/>
                </svg>

          </div>
          <Navlist />

          <div class="flex items-center space-x-4">
              <Menu as="div" class="relative inline-block text-left">
                  <div class="group">
                    <MenuButton>
                      <span class="flex items-center justify-center bg-cyan-600 group-hover:bg-opacity-60 p-2 rounded-full text-xs text-white md:h-8 md:w-8 h-6 w-6">
                        {{ getRandomColor('Name Here').character }}
                      </span>
                    </MenuButton>
                  </div>

                  <transition
                    enter-active-class="transition duration-100 ease-out"
                    enter-from-class="transform scale-95 opacity-0"
                    enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100"
                    leave-to-class="transform scale-95 opacity-0"
                  >
                    <MenuItems
                      class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-churpy-night dark:border dark:border-gray-400 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div class="px-1 py-1" :key="index" v-for="(option, index) in [
                          {name:'Profile', action:() => $router.push({name:'settings'})},
                          {name:'Signout', action: login},
                      ]">
                        <MenuItem as="div" v-slot="{ active, disabled }">
                            <button
                              @click="option.action"
                              :class="[
                                active ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-gray-400',
                                'group flex w-full items-center rounded-sm px-2 py-2 text-sm',
                              ]"
                            >
                              <span class="flex items-center">
                                {{option.name}}
                              </span>
                            </button>
                        </MenuItem>
                      </div>


                    </MenuItems>
                  </transition>
                </Menu>
          </div>
      </header>

      <section>
          <slot></slot>
      </section>
  </main>


</template>

<script>
import Toast from "@/components/elements/Toast.vue";
import {useUiStore} from "@/db/ui";
import MiniLogin from "@/pages/Auth/MiniLogin.vue";
import Navlist from "@/components/elements/Navlist.vue";
import {inject} from "vue";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'


export default{
  name:'AppLayoutDefault',
  components: {
      Navlist,
    MiniLogin,
    Toast,
    Menu, MenuButton,
    MenuItems, MenuItem
  },

  setup(){
    const store = useUiStore()
    const {getRandomColor} = inject('helpers')
      const login = () => {
        window.location.replace('/auth/login')
      }

    return {store, getRandomColor, login}
  }
}


</script>