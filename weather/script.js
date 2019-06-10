draw_content();

$(document).ready(function (e) {
    var refresher = setInterval("draw_content();", 10000); // 30 seconds
})

function draw_content() {
    channel_id = 793952;
    api_key = 'YUDWUDKAZAXLYZH9';
    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds/last.json', function (data) {
        //console.log(data);
        var current_temp = Math.round(data.field1 * 10) / 10;
        var current_humid = Math.round(data.field2 * 10) / 10;
        var current_pressure = Math.round(data.field3 * 10) / 10;
        var current_rainfall = Math.round(data.field4 * 10) / 10;
        var current_windspeed = Math.round(data.field5 * 10) / 10;
        var current_soil_moisture = 0;
        var current_sunlight = 0;
        var last_read = moment(data.created_at).format('LT');

        $('temp').html(current_temp);
        $('humid').html(current_humid);
        $('press').html(current_pressure);
        $('ws').html(current_windspeed);
        $('rf').html(current_rainfall);
        $('sm').html(current_soil_moisture);
        $('si').html(current_sunlight);
        $('time').html(last_read);
    });

    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds.json?api_key=' + api_key +
        '&results=1008',
        function (data) {
            //console.log(data);
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
                        borderColor: 'green',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'green',
                        pointBackgroundColor: 'green',
                        pointHoverRadius: 5,
                    }]
                },
                options: {
                    animation: false,
                    elements: {
                        point: {
                            radius: 0,
                        }
                    },
                    responsive: true,
                    title: {
                        display: false,
                        text: "Temperature & Humidity",
                        fontSize: 14,
                        fontColor: 'black',
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
                        label: 'Rainfall',
                        data: rainfall,
                        backgroundColor: 'transparent',
                        fill: false,
                        borderColor: 'blue',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'blue',
                        pointBackgroundColor: 'blue',
                    }]
                },
                options: {
                    animation: false,
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    responsive: true,
                    title: {
                        display: false,
                        text: "Rainfall",
                        fontSize: 14,
                        fontColor: 'black',
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Rain (mm)'
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


            var solar_chart = solar_canvas.getContext('2d');
            var solar_config = {
                type: 'line',
                data: {
                    labels: time,
                    datasets: [{
                        label: 'Sunlight',
                        data: rainfall, //change this
                        backgroundColor: 'transparent',
                        fill: false,
                        borderColor: 'yellow',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'yellow',
                        pointBackgroundColor: 'yellow',
                    }]
                },
                options: {
                    animation: false,
                    elements: {
                        point: {
                            radius: 0
                        }
                    },
                    responsive: true,
                    title: {
                        display: false,
                        text: "Sunlight",
                        fontSize: 14,
                        fontColor: 'black',
                    },
                    scales: {
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Solar Irradiance (W/m\u00B2)'
                            },
                            ticks: {
                                beginAtZero: true,
                                autoSkip: true,
                            }
                        }]
                    }
                }
            };
            var solar_chart = new Chart(solar_chart, solar_config);
        });

}