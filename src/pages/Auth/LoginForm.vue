<template>
  <Alert closable :key="typeof alert.show + alert.title" v-if="alert.show" class="mt-5" :variant="alert.type">
      <p class="font-bold" v-html="alert.title"></p>
      <p v-html="alert.description"></p>
  </Alert>
<form @submit.prevent="handleLogin" class="space-y-3 mt-2">
    <slot name="header"></slot>
    <div class="mx-auto">
        <label for="email" class="block text-sm font-medium"> Email </label>
        <div class="mt-1">
          <input type="email" required name="email" id="email" autocomplete="username" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="e.g email@company.com" v-model="state.email" />
        </div>
      </div>
    <div>
      <label for="password" class="block text-sm font-medium"> Password </label>
      <div class="mt-1">
        <input type="password" required name="password" id="password" autocomplete="password" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="******" v-model="state.password" />
      </div>
        <div v-if="forgotPassword">
            <small>
                <router-link class="text-xs text-brand-blue underline" :to="{name: 'forgotPassword'}">Forgot password?</router-link>
            </small>
        </div>
    </div>

    <!--<div>-->
    <!-- <p class="text-gray-500"> Forgot your password?-->
    <!--   <span class="text-indigo-600 underline">Reset it here</span>-->
    <!-- </p>-->
    <!--</div>-->

    <div class="pt-8 flex space-x-2">
      <button :disabled="state.isLoggingIn" type="submit" class="inline-flex items-center px-8 py-1.5 text-md font-medium rounded disabled:opacity-60 bg-brand-blue text-white shadow-sm mb-4 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-blue transition-all h-fit">{{ state.isLoggingIn ? `Loading ...` : `Sign In` }}</button>
      <CButton @click="signout" v-if="internal" class="mt-2 border-none shadow-none" variant="secondary">Logout</CButton>
    </div>
  </form>
</template>

<script>
import {inject, reactive, ref} from "vue";
import Alert from "@/components/elements/Alert.vue";
import CButton from "@/components/elements/CButton.vue";
import {useAuthStore} from "@/db/authentication";

export default {
  name: "LoginForm",
  props:{
    internal: Boolean,
    forgotPassword: Boolean
  },
  components: {CButton, Alert},
  setup(){
    const auth  = useAuthStore();
    const { login, signout } = useAuthStore();
     const alert = ref({
      show: false,
      title:'',
      description: '',
      type:'',
    })
        // state
    const state = reactive({
      email: "",
      password: "",
      isLoggingIn: false
    });

    const handleLogin = async () => {

      if(!state.email.length || !state.password.length){
        alert.value.title = 'Please re-check your inputs'
        alert.value.type = 'danger'
        alert.value.show = true
        setTimeout(() => {
          alert.value.show = false
        }, 10000)

        return;
      }

      // toggle state.isLoggingIn
      state.isLoggingIn = true;
      const payload = {
        email: state.email,
        password: state.password
      };

      try {
        await login(payload);
        auth.refresh_token_invalid = false
      } catch (error) {
        state.isLoggingIn = false;
        alert.value.title = 'Error signing in!'
        alert.value.description = error.message
        alert.value.type = 'danger'
        alert.value.show = true
        setTimeout(() => {
          alert.value.show = false
        }, 10000)
      }

    }



    return { state, alert, handleLogin, signout };
  }
}
</script>

<style scoped>

</style>