<template>
<section class="bg-slate-100 flex items-center justify-center h-screen">
      <div class="relative">
          <div><img src="/logo.svg" alt="LOGO" class="mx-auto h-14"></div>
          <div class="bg-white shadow p-4 rounded-md w-[500px] mt-10">
               <div class="flex justify-between">
                   <div>
                        <h1 class="text-2xl font-bold text-slate-600">Reset Your Password</h1>
                   </div>
               </div>

            <form @submit.prevent class="space-y-3 mt-4">
                <div>
                  <label for="password" class="block text-sm font-medium"> New Password </label>
                  <div class="mt-1">
                    <input type="password" required name="new_password" id="password" autocomplete="password" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="******" />
                  </div>
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium"> Confirm Password </label>
                  <div class="mt-1">
                    <input type="password" required name="password_confirmation" id="password" autocomplete="password" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="******" />
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
  name: "ResetPassword",

}
</script>

<style scoped>

</style>