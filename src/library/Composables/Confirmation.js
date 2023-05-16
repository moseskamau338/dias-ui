import {ref} from "vue";

export function useConfirmation(){
     let confirmation = ref({
          open: false,
          title:'',
          target:'',
          phrase:null,
          description:'',
          type:''
        })

    const confirm = () => {
      confirmation.value.open = true
    }
    const reset = () => {
         confirmation.value.open = false

        setTimeout(()=>{
             confirmation.value = {
              open: false,
              title:'',
              target:'',
              phrase:null,
              description:'',
              type:''
            }
        }, 600)
    }

    return {confirmation, confirm, reset}
}