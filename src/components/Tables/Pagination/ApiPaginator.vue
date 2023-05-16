<template>
          <!-- pagination items -->
           <div id="paginator" class="flex flex-col lg:flex-row items-center">
            <!-- pagination controls: chevron-btns and page number items -->
            <div class="flex space-x-5 items-center">

              <!-- left-chevron buttons -->
              <button class="flex items-center justify-center hover:bg-gray-300 h-6 w-6 rounded-full transition-all focus:ring-1 focus:ring-green-500"><i class="fa-solid fa-chevron-double-left font-bold text-xs"></i></button>
              <!-- end of left-chevron btns -->

              <!-- page number items, i.e, 1,2,3 ... -->
              <div>
                <ul class="flex space-x-4 items-center">
                  <li :class="[
                      page === 1? 'h-6 w-6 flex items-center justify-center rounded-full bg-green-300/50 dark:text-green-200' : 'font-light',
                      'font-bold text-sm'
                  ]" v-for="page in pagesArr">
                    {{page}}
                  </li>
                </ul>
              </div>
              <!-- end of page number items -->

              <!-- right-chevron buttons -->
              <button class="flex items-center justify-center hover:bg-gray-300 h-6 w-6 rounded-full transition-all focus:ring-1 focus:ring-green-500"><i class="fa-solid fa-chevron-double-right font-bold text-xs"></i></button>
              <!-- end of right-chevron btns -->
            </div>
            <!-- end of pagination controls -->

            <!-- total pages selector -->
             <div class="flex items-center space-x-1">
               <p class="text-xs mr-2">Rows per page:</p>
               <select class="text-xs py-1 rounded leading-none border-gray-400 dark:bg-churpy-night-box focus:ring-1 focus:ring-brand-blue focus:border-none">
                 <option :key="index" v-for="(val, index) in rowsPerPageArr">{{val}}</option>
               </select>
             </div>
            <!-- end of total pages selector -->
           </div>
</template>

<script>
export default {
  name: "ApiPaginator",
  setup(){
    /**
     * @summary:
     * AP - Api Paginator
     * props: 
     * - totalRecords
     * PC - Parent Component
     * AP: emit an event to the parent component to update the pagination
     * PC: listen to the event and acts on it, e.g, make the query
     *    - get a paginated response from the server
     * 
     * 

     From the server:
     - page number - 10
     - page size - 4 
     - total number of records - 40


     @examples:
     - Increase the page size
     PC: 


     */
    // @TODO: make this dynamic
  const rowsPerPageArr = [5,10,15,20,40,50,100];
  const pagesArr = [1,2,3,4,5];

  return { rowsPerPageArr, pagesArr };
  }
}
</script>

<style scoped>

</style>