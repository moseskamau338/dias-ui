<template>
  <div class="px-4">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto text-lg">
        <slot name="title">Table sample design</slot>
        <p class="mt-2 text-sm text-gray-700">
          <slot name="description"></slot>
        </p>
      </div>
      <div class="mt-4 sm:mt-0 md:max-w-5xl sm:max-w-5xl sm:flex-none">
        <div class="mt-1 relative rounded-md shadow-sm">
          <input type="text" name="account-number" id="account-number" class="focus:ring-brand-blue focus:border-brand-blue block w-full dark:bg-churpy-night-box dark:border-gray-500 pr-10 sm:text-sm border-gray-300 rounded-md leading-3 py-1.5" placeholder="Search records...">
          <div class=" flex absolute inset-y-0 right-0 pr-3 items-center pointer-events-none">
            <!-- Heroicon name: solid/question-mark-circle -->
            <i class="fa-solid fa-search dark:text-gray-600"></i>
          </div>
        </div>
      </div>
    </div>
    <div v-if="records.length > 0" class="mt-4 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8 flex justify-center">
        <div class="inline-block relative w-full mx-12 py-2 align-middle">
          <div class="ring-1 ring-black ring-opacity-5 md:rounded-lg h-80 overflow-y-auto">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-200 dark:bg-churpy-dark sticky z-10 top-0">
              <tr class="py-0">
                <th  v-for="(field, index) in fields" scope="col" class="px-2 min-w-2 group py-3 text-left text-xs font-semibold text-churpy-dark dark:text-gray-400">
                    <!--<i class="fa-solid fa-arrow-alt-down text-gray-400 cursor-pointer ml-0 mr-1 group-hover:scale-105 group-hover:text-gray-600 transition-all "></i>-->

                    <span v-if="!field.action" class="relative flex items-center justify-between">
                      <input v-show="selectable" type="checkbox" class="w-4 h-4 rounded focus:ring-offset-1 focus:ring-brand-blue focus:bg-brand-blue focus:border-brand-blue"/>
                      <span>{{field.label}}</span>

                       <Popover v-slot="{ open }" class="relative">
                          <PopoverButton
                              :class="open ? '' : 'text-opacity-90'">
                            <i class="fa-solid fa-align-right text-gray-300 cursor-pointer ml-3 group-hover:scale-105 group-hover:text-gray-600 transition-all "></i>
                          </PopoverButton>

                          <transition
                              enter-active-class="transition duration-200 ease-out"
                              enter-from-class="translate-y-1 opacity-0"
                              enter-to-class="translate-y-0 opacity-100"
                              leave-active-class="transition duration-150 ease-in"
                              leave-from-class="translate-y-0 opacity-100"
                              leave-to-class="translate-y-1 opacity-0"
                          >
                            <PopoverPanel
                                class="absolute z-10 w-56 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0"
                            >
                              <div
                                  class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
                              >
                                <div class="relative bg-white p-2">
                                  <TabGroup>
                                    <TabList class="flex p-1 space-x-1">
                                      <Tab
                                          as="template"
                                          v-slot="{ selected }"
                                      >
                                        <button
                                            :class="[
                                            'w-full py-1 text-xs font-medium transition-all',
                                            selected
                                              ? 'text-brand-blue border-b-2 border-brand-blue'
                                              : 'text-gray-700 hover:text-green-600/50',
                                          ]"
                                        >
                                          <i class="fa-solid fa-search"></i>
                                        </button>
                                      </Tab>
                                       <Tab
                                          as="template"
                                          v-slot="{ selected }"
                                      >
                                        <button
                                            :class="[
                                            'w-full py-1 text-xs font-medium transition-all',
                                            selected
                                              ? 'text-brand-blue border-b-2 border-brand-blue'
                                              : 'text-gray-700 hover:text-green-600/50',
                                          ]"
                                        >
                                          <i class="fa-solid fa-filter"></i>
                                        </button>
                                      </Tab>
                                    </TabList>

                                    <TabPanels class="mt-2">
                                      <TabPanel>
                                        <ul role="list" class="divide-y divide-gray-200">
                                          <li class="px-0 py-0 sm:px-6">
                                            <input type="text" placeholder="Search column..." class="rounded border-gray-200 leading-3 py-1 text-xs focus:ring-brand-blue focus:border-brand-blue">
                                            <p class="text-gray-400 mt-1">
                                              Search this column by ID
                                            </p>
                                          </li>

                                          <!-- More items... -->
                                        </ul>




                                      </TabPanel>
                                    </TabPanels>
                                    <TabPanels class="mt-2">
                                      <TabPanel>
                                        Filters 2
                                      </TabPanel>
                                    </TabPanels>
                                  </TabGroup>



                                </div>

                              </div>
                            </PopoverPanel>
                          </transition>
                        </Popover>


                    </span>

                  <span v-else class="sr-only">Edit</span>
                </th>

              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:bg-churpy-dark/60 h-9 overflow-auto">
              <tr :key="index" @click="rowClicked(record)" v-for="(record, index) in data" class="dark:hover:bg-gray-300/20 hover:bg-gray-100 transition-all cursor-pointer">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-400 sm:pl-6">
                  <input type="checkbox" class="rounded mr-1 h-3 w-3 focus:ring-offset-1 focus:ring-brand-blue focus:bg-brand-blue focus:border-brand-blue"/>
                  {{$filters.truncate(record.id,10)}}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{record.date}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{record.ccy}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-bold">
                    {{$filters.number(record.amount,'0.00',{ thousandsSeparator: ',' })}}
                  </span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class="text-brand-blue font-bold">{{$filters.number(record.recon_amount, '0.00')}}</span>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{record.gl}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate">{{record.customer}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class="inline-flex items-center px-2 shadow-md rounded-full text-[9px] font-bold uppercase bg-red-500 text-white">{{record.recon_status}}</span>

                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span class="inline-flex items-center px-2 shadow-md rounded-full text-[9px] font-bold uppercase bg-green-500 text-white"> {{record.source}} </span>
                </td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <div class="flex">
                   <span class="h-5 w-5 rounded-full flex justify-center items-center bg-green-200 mr-1 hover:bg-green-300 hover:
                   shadow-md hover:scale-105 cursor-pointer transition-all">
                     <i class="fa-solid fa-plus text-brand-blue text-[12px]"></i>
                   </span>
                    <span class="h-5 w-5 rounded-full flex justify-center items-center bg-green-200 hover:bg-green-300 hover:shadow-md hover:scale-105 cursor-pointer transition-all">
                     <i class="fa-solid fa-eye text-brand-blue text-[12px]"></i>
                   </span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <!--pagination-->
          <!-- This example requires Tailwind CSS v2.0+ -->
          <div class="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
              <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">1</span>
                  to
                  <span class="font-medium">10</span>
                  of
                  <span class="font-medium">97</span>
                  results
                </p>
              </div>
              <div class="flex items-center">
                <select class="h-fit py-1 top-0 mr-3 border-gray-400 rounded text-xs text-center align-middle focus:ring-brand-blue focus-visible:ring-brand-blue dark:bg-churpy-night-box dark:border-gray-500">
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>50</option>
                  <option>100</option>
                </select>

                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-churpy-night-box dark:border-gray-500 text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Previous</span>
                    <!-- Heroicon name: solid/chevron-left -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                  <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
                  <a href="#" aria-current="page" class="z-10 bg-brand-blue/30 border-brand-blue text-churpy-dark relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-churpy-night-box dark:text-brand-blue dark:border-gray-500"> 1 </a>
                  <a href="#" class="bg-white border-gray-300 hover:bg-brand-blue/30 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-churpy-night-box dark:border-gray-500"> 2 </a>
                  <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-brand-blue/30 dark:bg-churpy-night-box dark:border-gray-500"> ... </span>
                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:bg-brand-blue/30  dark:bg-churpy-night-box dark:border-gray-500"> 9 </a>
                  <a href="#" class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium hover:bg-brand-blue/30 dark:bg-churpy-night-box dark:border-gray-500"> 10 </a>
                  <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-brand-blue/30 hover:bg-gray-50 dark:bg-churpy-night-box dark:border-gray-500">
                    <span class="sr-only">Next</span>
                    <!-- Heroicon name: solid/chevron-right -->
                    <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </a>
                </nav>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Alert v-else class="mt-4 w-1/2">
      Your table has no records yet
    </Alert>

  </div>
</template>


<script>
import { Popover, PopoverButton, PopoverPanel,
TabGroup, TabList, Tab, TabPanels, TabPanel
} from '@headlessui/vue'
import Alert from "@/components/elements/Alert.vue";

export default{
  name: "TableWidget",
  components:{
    Alert, Popover, PopoverButton, PopoverPanel,
    TabGroup, TabList, Tab, TabPanels, TabPanel
  },
  props:{
    records:{required: true, type:Array},
    selectable: {type:Boolean, default: false},
    fields:{required: true, type:Array},
  },
  setup(props){

    function rowClicked(index){
      console.log(index)
      data.value[data.value.indexOf(index)].id = 'Clicked'
      // alert('Row clicked!', JSON.stringify(index))
    }

    return {rowClicked}
  }
}



</script>