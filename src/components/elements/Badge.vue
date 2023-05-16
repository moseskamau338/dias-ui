<template>
<span class="inline-flex items-center shadow" :class="[
 theme,
 badgeSize
]">
  <slot>
    {{status.toUpperCase()}}
  </slot>
</span>
</template>

<script>
import {computed, inject, ref} from "vue";
export default {
  name: "Badge",
  props:{
    status: {required: true, type: String},
    themes:{type: Array, default:[]},
    small: Boolean,
  },
  setup(props){
    const {parseTableStatus} = inject('helpers')
    const badgeSize = ref('px-1.5 py-1 text-[11px] leading-none font-medium rounded')

    if (props.small){
      badgeSize.value = 'px-1.5 text-[7px] uppercase font-bold rounded'
    }

    const theme = computed(() => {
      return parseTableStatus(props.status.toLowerCase(),props.themes)
    })

    return {theme, badgeSize}
  }
}
</script>

<style scoped>

</style>