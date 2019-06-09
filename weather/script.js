channel_id = 793952;
api_key = 'YUDWUDKAZAXLYZH9';

$.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds/last.json', function (data) {
    console.log(data);
    var current_temp = Math.round(data.field1 * 10) / 10;
    var current_humid = Math.round(data.field2 * 10) / 10;
    var current_pressure = Math.round(data.field3 * 10) / 10;
    var current_windspeed = Math.round(data.field4 * 10) / 10;
    var current_rainfall = Math.round(data.field5 * 10) / 10;

    $('temp').html(current_temp);
    $('humid').html(current_humid);
    $('press').html(current_pressure);
    $('ws').html(current_windspeed);
    $('rf').html(current_rainfall);
});

$.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds.json?api_key=' + api_key +
    '&results=1008',
    function (data) {
        console.log(data);
        var time = data.feeds.map(function (point) {
            let str = point.created_at;
            let date = moment(str);
            return date.format('lll');
        });

        var temp = data.feeds.map(function (point) {
            return point.field1;
        });

        var humid = data.feeds.map(function (point) {
            return point.field2;
        });;

        var pressure = data.feeds.map(function (point) {
            return point.field3;
        });;

        var rainfall = data.feeds.map(function (point) {
            return point.field4;
        });;

        var windspeed = data.feeds.map(function (point) {
            return point.field5;
        });;

        var gust = data.feeds.map(function (point) {
            return point.field6;
        });;

        var wind_direction = data.feeds.map(function (point) {
            return point.field7;
        });;

        var temp_humid_chart = temp_humid_canvas.getContext('2d');
        var temp_humid_config = {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    label: 'Temperature',
                    data: temp,
                    yAxisID: "A",
                    fill: false,
                    borderColor: 'red',
                    backgroundColor: 'transparent',
                    pointBorderColor: 'red',
                    pointBackgroundColor: 'red',
                    pointHoverRadius: 5,
                }, {
                    label: 'Humidity',
                    data: humid,
                    yAxisID: "B",
                    fill: false,
                    borderColor: 'blue',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    pointBorderColor: 'blue',
                    pointBackgroundColor: 'blue',
                    pointHoverRadius: 5,
                }]
            },

            options: {
                elements: {
                    point: {
                        radius: 0,
                    }
                },
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
                        },

                    }, {
                        stacked: false,
                        position: "right",
                        id: "B",
                        scaleLabel: {
                            display: true,
                            labelString: 'Humidity (%)'
                        },
                        ticks: {
                            beginAtZero: true,
                            steps: 10,
                            stepValue: 5,
                            max: 100,
                            autoSkip: true,
                        },

                    }]
                }
            }
        };

        var temp_humid_chart = new Chart(temp_humid_chart, temp_humid_config);
        var rain_chart = rain_canvas.getContext('2d');
        var rain_config = {
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
                }]
            },
            options: {
                elements: {
                    point: {
                        radius: 0
                    }
                },
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
                            beginAtZero: true,
                            autoSkip: true,
                        }
                    }]
                }
            }
        };
        var rain_chart = new Chart(rain_chart, rain_config);
    });