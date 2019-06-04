 channel_id = 793952;
 api_key = 'YUDWUDKAZAXLYZH9';
 // get the data from thingspeak
 $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds.json?api_key=' + api_key +
     '&results=168',
     function (data) {
         jsonfile = data;

         var time = jsonfile.feeds.map(function (point) {
             let str = point.created_at;
             let date = moment(str);
             return date.format('llll');
         });


         var temp = jsonfile.feeds.map(function (point) {
             return point.field1;
         });

         var humid = jsonfile.feeds.map(function (point) {
             return point.field2;
         });;

         var pressure = jsonfile.feeds.map(function (point) {
             return point.field3;
         });;

         var rainfall = jsonfile.feeds.map(function (point) {
             return point.field4;
         });;

         var windspeed = jsonfile.feeds.map(function (point) {
             return point.field5;
         });;

         var gust = jsonfile.feeds.map(function (point) {
             return point.field6;
         });;

         var wind_direction = jsonfile.feeds.map(function (point) {
             return point.field7;
         });;


         var temp_humid_chart = temp_humid_canvas.getContext('2d');
         var config = {
             type: 'line',
             data: {
                 labels: time,
                 datasets: [{
                     label: 'Temperature',
                     data: temp,
                     yAxisID: "A",
                     fill: false,
                     borderColor: 'blue',
                     backgroundColor: 'transparent',
                     pointBorderColor: 'blue',
                     pointBackgroundColor: 'blue',
                     pointRadius: 5,
                     pointHoverRadius: 10,
                     pointHitRadius: 30,
                     pointBorderWidth: 2,
                     pointStyle: 'rectRounded'


                 }, {
                     label: 'Humidity',
                     data: humid,
                     yAxisID: "B",
                     fill: false,
                     borderColor: 'red',
                     backgroundColor: 'transparent',
                     borderDash: [5, 5],
                     pointBorderColor: 'red',
                     pointBackgroundColor: 'red',
                     pointRadius: 5,
                     pointHoverRadius: 10,
                     pointHitRadius: 30,
                     pointBorderWidth: 2,

                 }]
             },

             options: {
                 responsive: true,
                 title: {
                     display: true,
                     text: "Temperature & Humidity",
                     fontSize: 24,
                 },
                 tooltips: {
                     mode: 'label'
                 },
                 scales: {
                     xAxes: [{
                         stacked: true
                     }],
                     yAxes: [{
                         stacked: true,
                         position: "left",
                         id: "A",
                         scaleLabel: {
                             display: true,
                             labelString: 'Temperature (°C)'
                         }
                     }, {
                         stacked: false,
                         position: "right",
                         id: "B",
                         scaleLabel: {
                             display: true,
                             labelString: 'Humidity (%)'
                         }

                     }]
                 }
             }

         };

         var temp_humid_chart = new Chart(temp_humid_chart, config);


         var rain_chart = rain_canvas.getContext('2d');
         var config = {
             type: 'line',
             data: {
                 labels: time,
                 datasets: [{
                     label: 'Rainfall (mm)',
                     data: rainfall,
                     backgroundColor: 'transparent',
                     fill: false,
                     borderColor: 'green',
                     backgroundColor: 'transparent',
                     pointBorderColor: 'green',
                     pointBackgroundColor: 'green',
                     pointRadius: 5,
                     pointHoverRadius: 10,
                     pointHitRadius: 30,
                     pointBorderWidth: 2,
                     pointStyle: 'rectRounded'


                 }]
             },
             options: {
                 responsive: true,
                 title: {
                     display: true,
                     text: "Rainfall",
                     fontSize: 24,
                 },


                 scales: {
                     yAxes: [{
                         stacked: true,
                         position: "left",
                         id: "A",
                         scaleLabel: {
                             display: true,
                             labelString: 'Rainfall (mm)'

                         },
                         ticks: {
                             beginAtZero: true
                         }
                     }]
                 }
             }
         };

         var rain_chart = new Chart(rain_chart, config);
     });