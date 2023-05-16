let months = ["Jan '21", "Feb '21", "Mar '21", "Apr '21", "May '21", "Jun '21", "Jul '21"]

 export const days_delinquent_series = [{
              data: [45,50,47,48,50,45,30]
            }]
export const days_delinquent_options = {
      // stroke: {
      //     colors: ['#2dc649'],
      //     width: 3,
      // },
      chart: {
        width: '100%',
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      grid: {
        show: false,      // you can either change hear to disable all grids
        xaxis: {
          lines: {
            show: true  //or just here to disable only x axis grids
           }
         },
        yaxis: {
          lines: {
            show: true  //or just here to disable only y axis
           }
         },
      },
      // annotations: {
      //   yaxis: [{
      //     y: 30,
      //     borderColor: '#999',
      //     label: {
      //       show: true,
      //       text: 'Timeline',
      //     }
      //   }],
      //   xaxis: [{
      //     x: new Date('14 Nov 2012').getTime(),
      //     borderColor: '#999',
      //     yAxisIndex: 0,
      //     label: {
      //       show: true,
      //       text: 'Amount',
      //       // style: {
      //       //   color: "#fff",
      //       //   background: '#174256'
      //       // }
      //     }
      //   }]
      // },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        // type: 'datetime',
        // min: new Date('01 Mar 2012').getTime(),
        // tickAmount: 6,
        categories: months,
         labels:{
          style:{
            colors: '#92928c',
          }
        },
      },
      yaxis:{
         labels:{
          style:{
            colors: '#92928c',
          }
        },
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
    }