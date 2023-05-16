<template>
    <div class="mx-[10%] mt-20">
        <div class="flex justify-between items-center w-full">
            <h2 class="text-lg font-medium">Manage Contacts</h2>
            <CButton variant="primary">+ New Contact</CButton>
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
                      <input type="text" name="search" id="search" class="shadow-sm focus:ring-indigo-500 focus:border-sky-500 block w-[200px] sm:text-sm border-gray-300 rounded-md" placeholder="Search...">
                    </div>

                  <CButton variant="secondary">
                      <span>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                          </svg>

                      </span>
                      <span>Download Excel</span>
                  </CButton>
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
    {key:'passport_number'},
    {key:'gender'},
    {key:'location'},
    {key:'household_size'},
    {key:'next_of_kin'},
    {key:'next_of_kin_contacts'},
])

</script>

<style scoped>

</style>