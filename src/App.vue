<template>
  <BaseLayout v-show="!loading">
      <router-view v-slot="{ Component , route, params}">
        <Transition :key="route.path"
          enter-active-class="transform ease-out duration-300 transition delay-100 opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition opacity-100 ease-in duration-100"
          leave-to-class="opacity-0"
          appear
        >
          <component :is="Component" v-bind="params"/>
        </Transition>
      </router-view>
  </BaseLayout>
    <div v-show="loading" class="h-screen flex flex-col items-center">
      <div class="h-screen text-xl flex justify-center items-center transition-all duration-700 flex-col">
        <span class="flex">
            <svg class="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
        </span>
      </div>
    </div>

</template>

<script setup>
import {useAuthStore} from "@/db/authentication";
import { useRoute, useRouter } from 'vue-router';
import {ref, watch} from "vue";

// hooks/composables
const route = useRoute(); // use this to access the current route and its properties
const router = useRouter(); // use this to perform navigation actions such as .push and .go
const authStore = useAuthStore();
const loading = ref(true)

// vars global to this component
const isCurrentUserAuthed = authStore.authenticated();

/*If user is authenticated,
* start refresh token flow
* */
if(isCurrentUserAuthed){
    //start refreshing token
    authStore.initRefreshToken()
}

// functions global to this component
const handleUserAuth = (routeRequiresAuth, routeRequiresGuest) => {
  loading.value = true
  /**
   * handles cases where the user is NOT authenticated but they're
   * trying to access a guarded route
   */
  if(routeRequiresAuth && !isCurrentUserAuthed){
    // redirect to the login page
    window.location.replace('/auth/login')
  }

  /**
   * handles cases where the user is authenticated but they're trying
   * to access an unguarded route, i.e, a guest route
   */
  if(routeRequiresGuest && isCurrentUserAuthed){
    // redirect to the dashboard
    //router.push({ name: 'dashboard' });
    window.location.replace('/')
  }

    setTimeout(() => {
      loading.value = false
    }, 200)
}

if(route.meta.requiresAuth || route.meta.requiresGuest){
  handleUserAuth(route.meta.requiresAuth, route.meta.requiresGuest)
}

/**
 * watch for changes in route.meta
 * @NOTE:
 * - we're doing this becuase route.meta is empty the first time
 * the app is mounted, but it's updated shortly after.
 */
watch(() => route.meta, (newRouterMeta) => {
  handleUserAuth(newRouterMeta.requiresAuth, newRouterMeta.requiresGuest);
})

</script>