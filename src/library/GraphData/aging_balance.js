const colors = ["#66aa00","#dc3912","#66aa00","#3366cc","#ff9900","#dc3912"];
import {functions} from '@/library/globalHelpers'

export const chartOptions = {
        series: [{
            data: [20000700, 20000700,20000700, 4500700, 6000500, 12501900]
          }],
          chartOptions: {
            chart: {
               toolbar: {
                show: false
              },
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                  // console.log(chart, w, e)
                }
              }
            },
            colors: colors,
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            dataLabels: {
              enabled: false
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: [
                ['Due'],
                ['Overdue'],
                ['0-30d'],
                ['30d-60d'],
                ['60d-90d'],
                ['> 90'],
              ],
              labels: {
                style: {
                   colors: '#92928c',
                  fontSize: '12px'
                }
              }
            },
            yaxis: {
              labels: {
                style: {
                  colors: '#92928c',
                  fontSize: '12px'
                },
                formatter: (value) => { return functions.formatMyNumber(value,0) },
              }
            }
          },
      }