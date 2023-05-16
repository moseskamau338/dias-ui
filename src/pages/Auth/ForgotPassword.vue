<template>
  <section class="bg-slate-100 flex items-center justify-center h-screen">
      <div class="relative">
          <div><img src="/logo.svg" alt="LOGO" class="mx-auto h-14"></div>
          <div class="bg-white shadow p-4 rounded-md w-[500px] mt-10">
               <div class="flex justify-between">
                   <div>
                        <h1 class="text-2xl font-bold text-slate-600">Forgot Password?</h1>
                        <small class="text-sm text-slate-400">Enter your email address below to receive further instructions</small>
                   </div>

                   <router-link class="text-sm text-brand-blue underline" :to="{name: 'login'}">Login</router-link>
               </div>

            <form @submit.prevent class="space-y-3 mt-2">
                <div class="mx-auto">
                  <label for="email" class="block text-sm font-medium"> Enter your email </label>
                  <div class="mt-1">
                    <input type="email" required name="email" id="email" autocomplete="username" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="e.g email@company.com" />
                  </div>
                </div>


                <div class="pt-8 flex space-x-2">
                  <button type="submit" class="inline-flex items-center px-8 py-1.5 text-md font-medium rounded disabled:opacity-60 bg-brand-blue text-white shadow-sm mb-4 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-blue transition-all h-fit">Submit</button>
                </div>
              </form>

          </div>
      </div>
  </section>

</template>

<script>
export default {
  name: "ForgotPassword",

}
</script>

<style scoped>

</style>