const dueLabels = ['0 days', '1-30 days', '31-60 days','61-90 days']

export const credit_loss_series = [{
              name: 'Expected Credit Loss',
              data: [2.5,5.2,10,30]
            }]
export const credit_loss_options = {
            chart: {
              sparkline:{
                enabled: false
              },
              height: 350,
              type: 'bar',
              events: {
                click: function(chart, w, e) {
                }
              }
            },
            // colors: colors,
            plotOptions: {
              bar: {
                columnWidth: '45%',
                distributed: true,
              }
            },
            legend: {
              show: false
            },
            xaxis: {
              categories: dueLabels,
              labels: {
                style: {
                  // colors: colors,
                  colors: '#92928c',
                  fontSize: '12px'
                }
              }
            },
              yaxis: {
              labels: {
                style:{
                  colors: '#92928c',
                },
                 formatter: (value) => { return value + '%' },
              }
            }
          }