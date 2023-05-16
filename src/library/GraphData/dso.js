
export const dsoSeries = [{
        name: 'DSO',
          data: [28,25,23,22, 21]
        },
    ]
export const dsoChart =  {
            chart: {
              toolbar: {
                show: false
              },
              type: 'bar',
            },
             colors: ['#fc5b00'],
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
            plotOptions: {
              bar: {
                borderRadius: 3,
                border:false,
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#92928c"]
              }
            },
            xaxis: {
              categories: ["Mar", "Apr", "May", "Jun", "Jul"],
              // position: 'top',
               labels: {
                 show: true,
                 style:{
                   colors: ['#92928c','#92928c','#92928c','#92928c','#92928c'],
                 }
               },
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val + "days";
                }
              }

            },
            title: {
              text: 'DSO 2021',
              floating: true,
              offsetY: 330,
              align: 'center',
              style: {
                color: '#444'
              }
            }
          }