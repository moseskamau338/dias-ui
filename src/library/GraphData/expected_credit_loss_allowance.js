const dueLabels = ['0 days', '1-30 days', '31-60 days','61-90 days']
const colors =  ["54478c","2c699a","048ba8","0db39e","16db93","83e377","b9e769","efea5a","f1c453","f29e4c"]

export const credit_loss_allowance_series = [{
              name: 'Expected Credit Loss Allowance',
              data: [75888.42,94708.75,60710.74,182132.21]
            }]
export const credit_loss_allowance_options = {
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
            dataLabels: {
              enabled: false
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
              title: {
                  text: 'KES',
                  style: {
                      color: '#92928c',
                  },
              },
              labels: {
                style: {
                  colors: '#92928c',
                },
                formatter: function(val){
                  val = parseFloat(val).toFixed(0);
                  if(val && !isNaN(val)){
                    let num_parts = val.toString().split(".");
                    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    return num_parts.join(".");
                  }
                  return val;
                }
              }
            }
          }