<template>
    
    <div class="px-4">
      <!-- selected invoice totals -->
        <span v-if="sumSelected().value">Totals: {{sumSelected().formated}}</span>
      <!-- end of selected invoice totals -->

     
    <div class="sm:flex sm:items-center">
       <!-- headers -->
      <div class="sm:flex-auto">
        <slot name="header"></slot>
      </div>
      <div class="mt-4 sm:mt-0 md:ml-4 sm:ml-16 sm:flex-none">
        <!-- actions -->
        <slot name="actions"></slot>
        <div v-if="settings">
          <slot name="settings" v-bind:open_settings="open_settings" v-bind:toggleSettingView="toggleSettingView">
              <button v-if="settings" @click="open_settings=true"
                class="bg-slate-100 h-fit rounded text-slate-500 focus:ring-1 focus:ring-slate-500 leading-none px-4 py-0.5 mt-3">
                <i class="fa-duotone text-xs fa-columns"></i>
              </button>
          </slot>
        </div>
      </div>
    </div>


    <div class="mt-4 flex flex-col mx-4">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
           <div id="scrollable" :class="container_classes">
              <!-- table -->
              <table class="min-w-full table-fixed divide-y divide-gray-300 border-2 border-separate border-spacing-0 border-transparent border-collapse">
                <!-- table header -->
                <thead class="sticky top-0" :class="head_classes">
                <tr class="py-0">
                  <th  v-for="(field, index) in filtered_fields" scope="col" class="group text-left" :class="header_cell_classes">
                      <slot :name="'header_'+field.key" v-bind:field="field">
                        <div class="relative flex items-start">
                          <div class="flex items-center h-5" v-show="selectable && index === 0">
                            <input id="selection" type="checkbox" class="focus:ring-green-500 h-4 w-4 text-brand-blue border-gray-300 rounded" />
                          </div>
                          <div class="ml-3">
                            <label for="selection">{{(field.label || makeTitle(field.key, '_')).toUpperCase()}}</label>
                          </div>
                        </div>
                      </slot>
                      </th>
                      <th v-if="actioned">
                        <span class="sr-only">actions</span>
                        <slot name="action_header" v-bind:open_settings="open_settings" v-bind:toggleSettingView="toggleSettingView"></slot>
                      </th>

                </tr>
                </thead>
               <!-- table body -->
               <tbody class="divide-y divide-gray-200 dark:divide-slate-600 bg-white dark:bg-churpy-dark/60 h-9 overflow-auto">

                <!-- table row(s) -->
                <template v-if="!loading && data.length > 0" :key="index" v-for="(record, index) in data.slice(startIndex, endIndex)">

                  <tr class="transition-all"
                      :class="[record.selected? 'border-l-2':'', row_classes]">

                      <!-- row data -->
                  <td @click="rowClicked(record)" :key="ind" v-for="(field, ind) in filtered_fields" class="whitespace-nowrap" :class="cell_classes">
                    <slot :name="field.key" v-bind:record="record">
                      <div class="relative flex items-start">
                        <div class="flex items-center h-5" v-if="selectable && ind === 0">
                          <input v-model="record.selected" type="checkbox" class="hover:cursor-pointer focus:ring-green-500 h-4 w-4 text-brand-blue border-gray-300 rounded" />
                        </div>
                        <div class="ml-3 text-xs">
                          <label class="font-medium">{{record[field.key]}}</label>
                        </div>
                      </div>
                    </slot>
                  </td>

                      <!-- row actions -->
                      <td v-if="actioned" class="whitespace-nowrap px-3 py-1 text-xs text-gray-500 dark:text-gray-300">
                        <slot name="row_actions" v-bind:record="record"></slot>
                      </td>

                    </tr>

                    <slot name="inner_table" v-bind:record="record">

                    </slot>
                </template>

                      <tr v-else-if="loading">
                        <td colspan="100%">
                          <div class="text-center mt-8">
                             <i class="fa-duotone fa-spinner-third animate-spin mr-2"></i>
                             <span class="font-bold mt-4">Processing...</span>
                           </div>
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="100%">
                             <Empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>



        <Paginator v-if="!removePagination"
                   :initialPageSize="initialPageSize"
                   :records="records"
                   :totalRecords="totalRecords || records.length"
                   @paginate-records="paginationUpdate" />

        </div>
  </div>

    <ReconTableSettings v-if="settings" :columns="headers" @close="open_settings = !open_settings" :open="open_settings" />

</template>

<script>
import {inject, toRef, ref, computed, watch, toRefs} from "vue";
import { useTables } from "@/library/tables";
import Empty from "@/components/elements/Empty.vue";
import Paginator from "@/components/widgets/Tables/Pagination/Paginator.vue";
import ReconTableSettings from "@/components/page/Recon/ReconTableSettings.vue";

export default {
  name: "TableLite",
  components: {ReconTableSettings, Paginator, Empty},
  props:{
    loading:{default:false},
    settings: Boolean,
    removePagination: Boolean,
    selectable:{default:false, type:Boolean},
    headers:{required:true, type:Array},
    actioned:{default:false, type:Boolean},
    url:{default:''},
    records:{
      type:Array,
      default:[]
    },
    totalRecords: {type: Number},
    initialPageSize: {type:Number},
     container_classes: {type:String, default: 'ring-1 ring-black ring-opacity-5 md:rounded max-h-[65vh] overflow-y-auto border dark:border-slate-500 rounded'},
     head_classes: {type:String, default: 'bg-gray-200 z-10 dark:bg-churpy-dark whitespace-nowrap'},
     header_cell_classes: {type:String, default: 'px-2 min-w-2 py-3 text-xs font-semibold text-churpy-dark dark:text-gray-400'},
     row_classes: {type:String, default: 'dark:hover:bg-gray-300/20 hover:bg-gray-100/60 dark:odd:bg-gray-600 odd:bg-gray-100'},
     cell_classes: {type:String, default: 'px-3 py-1 text-xs text-gray-500 dark:text-gray-300'},
  },
  setup(props, { emit }){
    const {makeTitle} = inject('helpers')
    let data = toRef(props,"records");
    let startIndex = ref(0);
    let endIndex = ref(3000);
    let open_settings = ref(false);


    const filtered_fields = computed(() => {
        let cols = props.headers.filter((col) => col['show'] === true || col['show'] === undefined)
        cols = cols.map((col) => {
          if(col['show'] === undefined){
            col['show'] = true
          }
          return col
        })

        return cols
    })
    const {selectRow, sumSelected} = useTables()

    function rowClicked(record){
      if (props.selectable){
         console.log('Row clicked')
        selectRow(record)
      }
    }

    function paginationUpdate(paginatorInfo){
      console.log('[TABLELITE] Received info from paginator', paginatorInfo);
      emit("paginationQueryInfo", {info: paginatorInfo});
      //const { start, end, currentPage, currentPageSize } = paginatorInfo;

      // Update the start and end indexes
      // startIndex.value = start;
      // endIndex.value = end;

      /**
       * @TODO: do the fetching here to get the updated paginated data
       */
    }

    function toggleSettingView(){open_settings.value = !open_settings.value}


    return {rowClicked, makeTitle, filtered_fields,
      open_settings,toggleSettingView, data, sumSelected, paginationUpdate,
      startIndex, endIndex}

  }

}
</script>

<style scoped>

</style>