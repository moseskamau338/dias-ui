import { ref, inject,defineEmits,defineProps,getCurrentInstance } from "vue";
import remove from "lodash/remove";
import {sumBy} from "lodash";

defineProps(['selection'])
defineEmits(['update:selection'])


export function useTables(){
    const helpers = inject('helpers')
    const { emit } = getCurrentInstance()

    // all data table related features go here
    let selectedRows = ref([])
    const selectRow = (row) => {
        row['selected'] = !row['selected']
        //console.log('selected: ',row)
        let newRow = {id: row.id, amount: helpers.ensignFigure(row.amount)}

        if (row.selected){
            selectedRows.value.push(newRow)
        }else{
            remove(selectedRows.value, newRow)
        }
        //for v-model
        emit('update:selection', {
            selection:selectedRows.value,
            total: sumSelected()
        })

    }

    const sumSelected = () => {
        let res = sumBy(selectedRows.value, 'amount')

       return {formated:helpers.currency(res),value:res}
    }

    return {selectRow, sumSelected}
}