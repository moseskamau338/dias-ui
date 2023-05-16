<template>
  <BaseLayout>
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
</template>

<script setup>
import {useAuthStore} from "@/db/authentication";
import { useRoute, useRouter } from 'vue-router';
import isEmpty from "lodash/isEmpty";
import {watch} from "vue";

// hooks/composables
const route = useRoute(); // use this to access the current route and its properties
const router = useRouter(); // use this to perform navigation actions such as .push and .go
const authStore = useAuthStore();

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

  /**
   * handles cases where the user is NOT authenticated but they're
   * trying to access a guarded route
   */
  if(routeRequiresAuth && !isCurrentUserAuthed){
    // redirect to the login page
    //window.location.replace('/auth/login')
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
}

//if(route.meta.requiresAuth || route.meta.requiresGuest){
//  handleUserAuth(route.meta.requiresAuth, route.meta.requiresGuest)
//}

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