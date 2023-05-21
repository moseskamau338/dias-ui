<template>
  <section class="bg-slate-100 flex items-center justify-center h-screen">
      <div class="relative">
          <div><img src="/logo.svg" alt="LOGO" class="mx-auto h-14"></div>
          <div class="bg-white shadow p-4 rounded-md w-[500px] mt-10">
               <div class="flex justify-between">
                   <div>
                        <h1 class="text-2xl font-bold text-slate-600">Signup</h1>
                        <!--<small class="text-sm text-slate-400">Welcome back</small>-->
                   </div>

                   <router-link class="text-sm text-brand-blue underline" :to="{name: 'login'}">Login</router-link>
               </div>
              <Alert closable :key="typeof alert.show + alert.title" v-if="alert.show" class="mt-5" :variant="alert.type">
                  <p class="font-bold" v-html="alert.title"></p>
                  <p v-html="alert.description"></p>
              </Alert>

            <form @submit.prevent="handleRegister" class="space-y-3 mt-2">
                <div class="mx-auto">
                  <label for="first_name" class="block text-sm font-medium"> First Name </label>
                  <div class="mt-1">
                    <input v-model="state.first_name" type="text" required name="first_name" id="first_name" autocomplete="first_name" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="John"/>
                  </div>
                </div>
                <div class="mx-auto">
                  <label for="last_name" class="block text-sm font-medium"> Last Name </label>
                  <div class="mt-1">
                    <input type="text" required name="last_name" id="last_name" autocomplete="last_name" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="Doe" v-model="state.last_name" />
                  </div>
                </div>
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
                </div>

                <div>
                  <label for="password" class="block text-sm font-medium"> Confirm Password </label>
                  <div class="mt-1">
                    <input type="password" required name="password" id="password" autocomplete="password" class="shadow-sm focus:ring-brand-blue focus:border-brand-blue block w-full sm:text-sm border-gray-300 rounded-md placeholder-gray-400 dark:bg-churpy-night dark:border-slate-600" placeholder="******" v-model="state.confirm_password" />
                  </div>
                </div>


                <div class="pt-8 flex space-x-2">
                  <button :disabled="state.processing" type="submit" class="inline-flex items-center px-8 py-1.5 text-md font-medium rounded disabled:opacity-60 bg-brand-blue text-white shadow-sm mb-4 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-blue transition-all h-fit">{{ state.processing ? `Loading ...` : `Signup` }}</button>
                </div>
              </form>


          </div>
      </div>
  </section>
</template>

<script>
import {inject, reactive, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/db/authentication';
import Alert from "@/components/elements/Alert.vue";
import CButton from "@/components/elements/CButton.vue";

export default {
  name: "Register",
  components: {CButton, Alert},
  setup(){
    // hooks/composables/classes
    const showPassword = ref(false)
    const showConfirmPassword = ref(false)
    const passwordMatchError = ref(false)
    const router = useRouter();
   const emitter = inject('emitter')
    const { register } = useAuthStore();

    const alert = ref({
      show: false,
      title:'',
      description: '',
      type:'',
    })

    // state
    const state = reactive({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      processing: false
    });

    const handleRegister = async () => {
      console.log('Registering...')
      console.log('######## Validation: ####### - ', state.password !== state.confirm_password)

      if (state.password !== state.confirm_password){
        passwordMatchError.value = true
        return
      }


      passwordMatchError.value = false

      // toggle state.processing
      state.processing = true;
      const payload = {
        email: state.email,
        full_name: `${state.first_name} ${state.last_name}`,
        password: state.password,
        role: 'Admin',
        phone_number: '254756733234'
      }


      register(payload).then((data) => {
        emitter.emit('toast', {
             title:'Success!',
             message:'You have been registered successfully. Please check your email for verification and further instructions. We shall <b>redirect you to the login page</b>',
             type:'success'
         });

        setTimeout(() => {
            router.push({name:'login'})
        }, 3000)
      })
      .catch((error) => {
        emitter.emit('toast', {
             title:'Sorry! Something went wrong when processing your details',
             message:error.message,
             type:'danger'
         });
      })
      .finally(() => {state.processing = false})

    }

    return { state, alert, handleRegister, passwordMatchError, showPassword, showConfirmPassword };
  }

}
</script>

<style scoped>

</style>