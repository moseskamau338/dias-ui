<template>
  <component :key="key" :is="layout">
    <slot />
  </component>
</template>

<script>
import AppLayoutDefault from './AppLayoutDefault.vue'
import FlatLayout from './FlatLayout.vue'
import { markRaw, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'BaseLayout',
  setup() {
    const route = useRoute()
    const key = ref('')
    const components = {AppLayoutDefault, FlatLayout}

    const layout = ref()

    watch(
      () => route.meta?.layout || undefined,
      async (metaLayout) => {
        try {
          if(layout.value?.name !== metaLayout){
            key.value = Math.floor(Math.random()*1000, 3)
          }
          const component = metaLayout && components[metaLayout]
          layout.value = markRaw(component || FlatLayout)
        } catch (e) {
          layout.value = markRaw(FlatLayout)
        }
      },
      { immediate: true }
    )

    return { layout, key }
  }
}
</script>