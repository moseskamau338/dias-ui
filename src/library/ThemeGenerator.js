export class ThemeGenerator{
    toast(type){
        return {
            bgColor: (() => {
                switch(type) {
                    case 'success': return 'bg-green-200';
                    case 'danger' :return 'bg-red-200';
                    case 'warning' : return 'bg-amber-200';
                    default: return 'bg-sky-300';
                }
              })(),
            icon: (() => {
                switch(type) {
                    case 'success': return 'fa-check text-brand-green';
                    case 'danger' :return 'fa-hexagon-minus text-red-500';
                    case 'warning' : return 'fa-triangle-exclamation text-yellow-600';
                    default: return 'fa-info text-brand-gray';
                }
              })(),
        }
    }
    alert(variant){
        return {
          bgColor: (() => {
            switch(variant) {
            case 'success': return 'bg-green-100 border-green-400';
            case 'danger' :return 'bg-red-100 border-red-400';
            case 'warning' : return 'bg-yellow-100 border-yellow-400';
            default: return 'bg-blue-100 dark:bg-blue-300 border-blue-400';
            }
          })(),

          icon: (() => {
            switch(variant) {
            case 'success': return 'fa-check text-brand-green';
            case 'danger' :return 'fa-hexagon-minus text-red-500';
            case 'warning' : return 'fa-triangle-exclamation text-yellow-700';
            default: return 'fa-circle-info text-blue-600';
            }
          })(),

          text: (() => {
            switch(variant) {
            case 'success': return 'text-brand-green';
            case 'danger' :return 'text-red-500';
            case 'warning' : return 'text-yellow-700';
            default: return 'text-blue-600 dark:text-blue-800';
            }
          })()


        }
    }
    button(variant){
        return {
          theme: (() => {
            switch(variant) {
                case 'success': return 'border border-transparent text-white bg-green-600 hover:bg-green-600/90 focus:ring-green-600';
                case 'danger' :return 'border border-transparent text-white bg-red-500 hover:bg-red-600 focus:ring-red-500';
                case 'warning' : return 'border border-transparent text-white bg-orange-400 hover:bg-orange-500 focus:ring-orange-400';
                case 'dark' : return 'border border-transparent text-white bg-churpy-dark hover:bg-churpy-dark/90 focus:ring-churpy-dark';
                case 'secondary' : return 'bg-transparent hover:bg-gray-100 dark:hover:bg-churpy-night focus:ring-gray-400 border border-gray-500';
                case 'primary': return 'border border-transparent text-white bg-brand-blue hover:bg-sky-600 focus:ring-sky-600';
                default: return 'border border-transparent text-white bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500';
            }

          })(),


        }
    }
    badge(status){
         switch(status) {
            case 'success': return 'bg-green-600 text-green-100';
            case 'danger' :return 'bg-red-600 text-red-100';
            case 'warning' : return 'bg-orange-600 text-orange-100';
            default: return 'bg-blue-600 dark:bg-blue-300 border-blue-100';
        }
    }
    avatar(variant){
        switch(variant) {
            case 'success': return 'border bg-green-200/30 text-green-500';
            case 'danger' :return 'border bg-red-200/30 text-red-400';
            case 'dark' : return 'border border-gray-500 bg-gray-300 dark:bg-churpy-dark text-gray-600 dark:text-gray-500';
            case 'warning' : return 'border bg-orange-200/30 text-orange-500';
            default: return 'bg-blue-200/30 dark:text-blue-300 text-blue-500 border-blue-400';
        }
    }
}
