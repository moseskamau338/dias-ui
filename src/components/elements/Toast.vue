<template>

    <!-- toaster: error, success, info -->
    <teleport to="#notifications">
        <TransitionRoot
            :key="content"
            enter="transition transform duration-800 ease-out" 
            enter-from="translate-x-4 opacity-0" enter-to="translate-x-0 opacity-100"
            leave="transition transform duration-400 ease-in" leave-from="opacity-100" leave-to="opacity-0"
            :show="notify" :class="themeGenerator.bgColor" class="fixed flex z-[9999] top-0 right-5 shadow-xl my-5 h-auto p-1 rounded-md max-w-[400px] overflow-hidden">

          <div class="w-auto mx-auto mr-1">
            <TransitionChild as="template"
              enter="transition transform duration-400 ease-out" 
              enter-from="rotate-90 scale-50 opacity-0" enter-to="rotate-0 scale-100 opacity-100"
              leave="transition transform duration-400 ease-in" leave-from="opacity-100" leave-to="opacity-0"
            >
              <div class="w-6 h-6 m-1.5 bg-white/70 rounded-full flex justify-center items-center">
                  <i class="fa-solid text-lg" :class="themeGenerator.icon"></i>
              </div>
            </TransitionChild>
          </div>
          <TransitionChild as="template"
            enter="transition transform duration-600 ease-out" 
            enter-from="translate-x-8 opacity-0" enter-to="translate-x-0 opacity-100"
            leave="transition transform duration-400 ease-in" leave-from="opacity-100" leave-to="opacity-0"
          >
            <div class="pt-2 flex flex-col">
              <div class="flex justify-between">
                <div class="mr-6">
                <h1 class="text-sm font-medium text-gray-800" v-html="content.title"></h1>

                  <p class="text-prose text-xs mt-1" v-html="content.message"></p>
                </div>
                <span @click="notify = !notify" class="mr-2 bg-red-100 hover:bg-red-50 hover:cursor-pointer hover:shadow-md h-6 w-6 grow-0 shrink-0 rounded-full flex justify-center items-center transition-all">
                  <i class="fa-solid fa-circle-xmark text-red-600"></i>
                </span>
              </div>
            </div>
          </TransitionChild>
        </TransitionRoot>
    </teleport>
</template>

<script>
import {ThemeGenerator} from '@/library/ThemeGenerator'
 import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { ref, inject } from 'vue'

export default{
  components: {
    TransitionRoot,
    TransitionChild
  },
    setup(){
      const emitter = inject('emitter')
      const notify = ref(false)
      const type = ref('info')

      let content = ref({
        title:'' || '👋 Hello There, you need a title',
        message:'',
      })

      let theme = new ThemeGenerator()

      const themeGenerator = ref(theme.toast(type.value))


      emitter.on('toast', (notifications)=>{
        content.value.title = notifications.title
        content.value.message = notifications.message || ''
        type.value = notifications.type

        themeGenerator.value = theme.toast(type.value)

        notify.value = true; //show notification

        setTimeout(()=>{
          notify.value = false;
        },20000)
      })
      return {
        notify,
        themeGenerator,
        content
      }
    }
}
</script>
