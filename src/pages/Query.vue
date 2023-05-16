<template>
    <div class="mx-[10%] mt-20">
        <div class="flex justify-between items-center w-full">
            <h2 class="text-lg font-medium">Diaspora Queries</h2>
            <!--<CButton variant="primary">+ New Contact</CButton>-->
        </div>
      <TableLite :headers="contact_headers" :records="[]" class="mt-10">
          <template #header>
              <div class="flex items-center space-x-10">
                  <div class="relative flex items-start">
                    <div class="flex items-center h-5">
                      <input id="selection" aria-describedby="selection-description" name="selection" type="checkbox" class="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded">
                    </div>
                    <div class="ml-3 text-sm">
                      <label for="selection" class="font-medium text-gray-700">Select All</label>
                    </div>
                  </div>
                  <select id="location" name="location" class="mt-1 block pl-3 pr-10 py-1 leading-none text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded w-fit">
                    <option>-- Bulk Action --</option>
                    <option>Action 1</option>
                    <option>Action 2</option>
                    <option>Action 3</option>
                  </select>
              </div>
          </template>
          <template #actions>
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
import CButton from "@/components/elements/CButton.vue";
import {ref} from "vue";

const contact_headers = ref([
    {key:'name'},
    {key:'phone_number'},
    {key:'query'},
])

</script>

<style scoped>

</style>