<template>
    <div class="mt-10">
      <TableLite actioned :headers="user_headers" :records="[]" class="mt-10">
          <template #header>
              <div class="flex items-center space-x-4">
                    <div>
                      <input type="text" name="search" id="search" class="shadow-sm focus:ring-indigo-500 focus:border-sky-500 block w-[300px] sm:text-sm border-gray-300 rounded-md" placeholder="Search...">
                    </div>

              </div>
          </template>
      </TableLite>
    </div>
</template>

<script setup>
import TableLite from "@/components/Tables/TableLite.vue";
import {ref} from "vue";

const user_headers = ref([
    {key:'username'},
    {key:'permissions'},
    {key:'role'},
])

</script>

<style scoped>

</style>