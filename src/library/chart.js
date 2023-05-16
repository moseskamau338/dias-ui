import { ref, inject } from "vue";


export function useCharts(){
    let x_axis_labels = ref([])
    let datasets = ref({})
    let formatedDataset = ref([])

    /*
    * Inbuilt random color generator
    * */
    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }


    /*
    * This function takes in a raw object
    * and transforms it based on certain parameters
    * */
    const default_options = {
            label_key:'',
            value_keys:[]
        }
    const datasetTransformer = (
        dataset = [],
        options = default_options) => {
        options = {...default_options,...options}

        if (!dataset || dataset.length <= 0) return false
        for (let i = 0; i < dataset.length; i++) {
            //populate labels
            let item = dataset[i]
            x_axis_labels.value.push(item[options.label_key])

            // populate datasets
            let keys = Object.keys(item)
            keys.splice(keys.indexOf(options.label_key), 1)
            keys.forEach(key => {
                if(!datasets.value[key]){
                    datasets.value[key] = []
                }
                datasets.value[key].push(item[key])
            })
        }

        formatedDataset.value = convertToChartJs()

    }

    /*
    * This function transforms the datasets
    * to chart.js palatable form
    * */
    const convertToChartJs = () => {
        let data = []
        let keys = Object.keys(datasets.value)
        for (let i = 0; i < keys.length; i++) {
            let label = keys[i]
            data.push({
                label,
                backgroundColor: getRandomColor(),
                data: datasets.value[label]
            })

        }
        return data
    }

    return {datasetTransformer, x_axis_labels, datasets, formatedDataset}
}