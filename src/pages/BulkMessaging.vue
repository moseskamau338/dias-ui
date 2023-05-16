<template>
  <section class="flex justify-center">
      <div class="bg-white shadow p-4 rounded-md w-full mx-[25%] h-fit mt-10">
          <div>
                <h1 class="text-2xl font-bold text-slate-600">Bulk SMS</h1>
                <small class="text-sm text-slate-400">Instantly send your message to multiple contacts</small>
           </div>

          <div class="flex flex-col mt-5">
              <div>
                  <label for="recipients">Select Recipients</label>

                   <div class="flex items-center space-x-5 mt-2">
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5">
                          <input id="selection" aria-describedby="selection-description" name="selection" type="checkbox" class="focus:ring-sky-500 h-4 w-4 text-sky-600 border-gray-300 rounded">
                        </div>
                        <div class="ml-3 text-sm">
                          <label for="selection" class="font-medium text-gray-700">Select All</label>
                        </div>
                      </div>
                      <CButton variant="secondary">
                          <span class="mr-1">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                                  <path d="M6 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 111.5 0v7.5A.75.75 0 016 12zM18 12a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0118 12zM6.75 20.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM18.75 18.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zM12.75 5.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0zM12 21a.75.75 0 01-.75-.75v-7.5a.75.75 0 011.5 0v7.5A.75.75 0 0112 21zM3.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0zM12 11.25a2.25 2.25 0 110-4.5 2.25 2.25 0 010 4.5zM15.75 15a2.25 2.25 0 104.5 0 2.25 2.25 0 00-4.5 0z" />
                                </svg>

                          </span>
                          <span>Filters</span>
                      </CButton>
                  </div>

                    <div class="border mt-4 p-2 rounded">
                        <Empty title="No contacts selected" description="Add filters or select all contacts" />
                    </div>
              </div>

              <div class="mt-5">
                  <label for="recipients">Message</label>

                      <textarea rows="8" name="comment" id="comment" class="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Write your message here..."></textarea>
              </div>

              <div class="mt-12 flex space-x-3">
                  <CButton variant="primary">Send message</CButton>
                  <CButton variant="secondary">Cancel</CButton>
              </div>

          </div>

      </div>
  </section>
</template>

<script>
import CButton from "@/components/elements/CButton.vue";
import Empty from "@/components/elements/Empty.vue";

export default {
    name: "BulkMessaging",
    components: {Empty, CButton}
}
</script>

<style scoped>

</style>