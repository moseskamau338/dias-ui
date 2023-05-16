let months = ["Jan '21", "Feb '21", "Mar '21", "Apr '21", "May '21", "Jun '21", "Jul '21"]

 export const turn_over_series = [{
              data: [12,10,10,10,10,12,15]
            }]
export const turn_over_options = {
              chart: {
                 sparkline: {
                  enabled: false
                },
                width: '100%',
                id: 'area-datetime',
                type: 'area',
                height: 350,
                zoom: {
                  autoScaleYaxis: true
                }
              },
              theme: {
                  mode: 'light',
                  palette: 'palette4',
                  monochrome: {
                      enabled: false,
                      color: '#255aee',
                      shadeTo: 'light',
                      shadeIntensity: 0.65
                  },
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
              dataLabels: {
                enabled: false
              },
              markers: {
                size: 0,
                style: 'hollow',
              },
              xaxis: {
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