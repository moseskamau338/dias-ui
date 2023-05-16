<template>
  <nav>
      <ul class="flex space-x-6">
          <li v-for="nav in navs">
              <router-link :to="{name: nav.route}" class="p-2 rounded-md hover:bg-white hover:bg-opacity-10 hover:text-sky-100 text-sm" :class="
                  activeRoute(nav.route) ? 'bg-white bg-opacity-10' : ''
                ">
                  {{nav.title}}
              </router-link>
          </li>
      </ul>
  </nav>
</template>

<script setup>
import navs from '@/navigation'
import {useRoute} from "vue-router";

 const route = useRoute()
function activeRoute(currentRoute){
  if (route.name){
    return route.name.includes(currentRoute)
  }
  return route.name === currentRoute
}
</script>

<style scoped>

</style>