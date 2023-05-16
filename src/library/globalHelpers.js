import find from "./filters/array/find";
import {ThemeGenerator} from "./ThemeGenerator";
import {apiRoutes} from "@/library/apiRegister";
import dayjs from "dayjs";
import axios from "axios";

function cleanUpCurrency(s){
        //Watch for appended negatives
        if (typeof s === "string"){
            //remove space
            s = s.replace(/\s/g, "")
            //if negative at the back bring to front
            if (s.endsWith('-')){
                s = s.slice(0,s.length-1)
                s = '-'+s
            }
        }

        let expression = /^\$?\(?[\d,.]*\)?$/;
        //remove commas
        s = s.split(',').join('')
        //remove spaces
        s = s.split(' ').join('')
        //Check if it is in the proper format
        if (!isNaN(parseFloat(s))) return parseFloat(s);
        if(s.match(expression)){
            //It matched - strip out parentheses and append - at front
            return parseFloat('-' + s.replace(/[$(),]/g,''));
        }else{
            return parseFloat(s);
        }
    }

export const functions = {
    dayjs,
   getRandomColor(name, opacity = 0.3) {
       const getName = () => {
           let nameList = name.split(' ')
           if (nameList.length > 1){
               return (nameList[0].charAt(0)+nameList[1].charAt(0)).toUpperCase()
           }else{
               return (nameList[0].charAt(0)+nameList[0].charAt(1)).toUpperCase()
           }
       }
    // get first alphabet in upper case
    const firstAlphabet = name.charAt(0).toLowerCase();

    // get the ASCII code of the character
    const asciiCode = firstAlphabet.charCodeAt(0);

    // number that contains 3 times ASCII value of character -- unique for every alphabet
    const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();

    let num = Math.round(0xffffff * parseInt(colorNum));
    let r = num >> 16 & 255;
    let g = num >> 8 & 255;
    let b = num & 255;

    return {
      color: 'rgb(' + r + ', ' + g + ', ' + b + ', '+opacity+')',
      character: getName()
    };
  },
     searchFilter(collection, term){
          if (!collection) return []
          if (term.length === 0){
            return collection
          }else{
            //collection
              let keys = Object.keys(collection?.[0]) || []
            return collection.filter((client) => {
                let res = false
                keys.forEach((key) => {
                    res ||= String(client[key]).toLowerCase().includes(term.toLowerCase())
                })
                return res
            })
          }
    },
   parseTableStatus(status, mappings = []){
       // take list of mappings: ['tentative' => warning]
        let newmappings = [
          {name:'active', status:'success'},
          {name:'success', status:'success'},
          {name:'failed', status:'danger'},
          {name:'processing', status:'warning'},
          {name:'inactive', status:'danger'},
          {name:'pending', status:'danger'},
          {name:'partial', status:'warning'},
          {name:'suggested', status:'warning'},
        ].concat(mappings)
        //get status mapping:
        let mapping = find(newmappings, status)[0]

        if (!mapping) {
            return 'bg-indigo-100 text-churpy-dark'
        }

        //compute tailwind classes
        return new ThemeGenerator().badge(mapping.status)

    },
   ensignFigure(num){
		if (typeof num === 'string'){
		  return  parseFloat(cleanUpCurrency(num).toFixed(2))
		}else if(typeof num === 'number'){
			return parseFloat(num.toFixed(2))
		}
	},

   currency(val,decimals = 2,addSymbol = false){
       if (!addSymbol){
          return new Intl.NumberFormat('en-US', {minimumFractionDigits: decimals, maximumFractionDigits:3}).format(val)
       }
       return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'KES', minimumFractionDigits: decimals, maximumFractionDigits:3 }).format(val)
   },
   formatMyNumber(x, dp=2){
        x = parseFloat(x).toFixed(dp);
        if(x && !isNaN(x)){
            var num_parts = x.toString().split(".");
            num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return num_parts.join(".");
        }
        return x;
    },
   makeTitle(slug, separator = '-') {
      let words = slug.split(separator);

      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      return words.join(' ');
   },
   downloadFile(url,method,data = null,filename){
        return new Promise((resolve, reject)=>{
            axios({
                  url: url,
                  method: method,
                  data: data,
                  responseType: 'blob',
              }).then((response) => {
                   let fileURL = window.URL.createObjectURL(new Blob([response.data]));
                   let fileLink = document.createElement('a');

                   fileLink.href = fileURL;
                   fileLink.setAttribute('download', filename);
                   document.body.appendChild(fileLink);

                   fileLink.click();
                   resolve()
              })
              .catch((error)=>{
                  reject(error)
              })
        })
    },

   /**
    * @Note:
    * The parameter parsing works by looping
    * through the param keys and appending to the endpoint
    * @catch
    * the 'default' key is added before the rest without the '?' param indicator
    * */
   getApiEndpoint(name, params = {}){
       let endpoint = apiRoutes[name]
       if (Object.keys(params).length > 0){
           // check default
           if (params['default']){
               endpoint += '/'+params['default']
               delete(params['default']) //remove it to avoid counter issues
           }
           let keys = Object.keys(params)
           keys.forEach((key) => {
               if (key.toLowerCase() !== 'default'){
                   //check first key with 'default' removed
                   endpoint += `${keys.indexOf(key) === 0? '?' : '&'}${key}=${params[key]}`
               }
           })

       }
       // attach head uri then return api endpoint
       return endpoint
   },

   formatStrDate(date){
    return new Date(date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
   },
   getPaginationQueryStrings(queryString){
    const queryStrArr = queryString.split("&");
    const pageQueryStr = queryStrArr.find(qStr => qStr.includes("Page"));
    const page = parseInt(pageQueryStr.split("=")[1]);
    const limitQueryStr = queryStrArr.find(qStr => qStr.includes("ItemsPerPage"));
    const limit = parseInt(limitQueryStr.split("=")[1]);

    return { page, limit }
   },
   numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
}