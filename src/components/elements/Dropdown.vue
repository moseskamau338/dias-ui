<template>
    <Menu as="div" class="relative inline-block text-left">
      <div>
        <MenuButton
            v-bind="$attrs"
           :class="themeGenerator.theme"
          class="inline-flex w-full items-center justify-center rounded-md px-3 py-1 text-sm font-medium hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75"
        >
          {{name || 'Options'}}
          <i  aria-hidden="true" class="fa-solid fa-chevron-down ml-2 -mr-1"></i>
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
          <div class="px-1 py-1" :key="index" v-for="(option, index) in options">
            <MenuItem as="div" v-slot="{ active, disabled }">
              <slot :name="option.key" v-bind:active="active" v-bind:disabled="disabled">
                <button
                  :class="[
                    active ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'text-gray-900 dark:text-gray-400',
                    'group flex w-full items-center rounded-sm px-2 py-2 text-sm',
                  ]"
                >
                  <span class="flex items-center">
                    <i v-if="option.icon" class="fa-solid mr-2" :class="option.icon"></i>
                    {{option.name}}
                  </span>
                </button>
             </slot>
            </MenuItem>
          </div>


        </MenuItems>
      </transition>
    </Menu>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import {computed} from "vue";
import {ThemeGenerator} from "@/library/ThemeGenerator";
export default {
  name: 'Dropdown',
  components: {
    Menu, MenuButton,
    MenuItems, MenuItem
  },
  props:{
    options: {required: true, type: Array},
    name: {type: String},
    variant: { type: String, default:'info'},
  },
  setup(props){
     const themeGenerator = computed(() => {
       let variant = props.variant
        let t = new ThemeGenerator()
        return t.button(variant)
      })

    return {themeGenerator}
  }
}
</script>
