<template>
  <section class="bg-slate-100 flex items-center justify-center h-screen">
      <div class="relative">
          <div><img src="/logo.svg" alt="LOGO" class="mx-auto h-14"></div>
          <div class="bg-white shadow p-4 rounded-md w-[500px] mt-10">
              <LoginForm forgot-password>
                  <template #header>
                     <div class="flex justify-between">
                         <div>
                              <h1 class="text-2xl font-bold text-slate-600">Login</h1>
                              <small class="text-sm text-slate-400">Welcome back</small>
                         </div>

                         <router-link class="text-sm text-brand-blue underline" :to="{name: 'signup'}">Register</router-link>
                     </div>
                  </template>
              </LoginForm>
          </div>
      </div>
  </section>

</template>

<script>
import Alert from "@/components/elements/Alert.vue";
import LoginForm from "@/pages/Auth/LoginForm.vue";

export default {
  name: "Login",
  components: {LoginForm, Alert},

}
</script>

<style scoped>

</style>