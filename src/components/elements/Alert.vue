<template>
<div :key="variant" :class="themeGenerator.bgColor" class="border-l-4 px-2 py-1 w-fit shadow rounded">
    <div class="flex">
      <div class="flex-shrink-0">
        <i class="fa-solid" :class="themeGenerator.icon"></i>
      </div>
      <div class="ml-3">
        <p :class="themeGenerator.text" class="text-xs md:text-sm">
          <slot></slot>
        </p>
      </div>

      <!--<span><i class="fa-solid fa-close"></i></span>-->
    </div>
  </div>
</template>

<script>
import {ThemeGenerator} from "@/library/ThemeGenerator";
export default {
  name: "Alert",
  props:{
    variant:{
      default:'info',
      type: String
    },
    closable: Boolean
  },
  setup(props){
      const themeGenerator = new ThemeGenerator().alert(props.variant)
    return {themeGenerator}
  }
}
</script>
