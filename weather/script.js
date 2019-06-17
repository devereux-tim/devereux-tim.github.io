draw_content();

$(document).ready(function (e) {
    var refresher = setInterval("draw_content();", 60000); // 60 seconds
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


        document.getElementById('temp').textContent = current_temp;
        document.getElementById('humid').textContent = current_humid;
        document.getElementById('press').textContent = current_pressure;
        document.getElementById('ws').textContent = current_windspeed;
        document.getElementById('rf').textContent = current_rainfall;
        document.getElementById('sm').textContent = current_soil_moisture;
        document.getElementById('si').textContent = current_sunlight;
        document.getElementById('time').textContent = last_read;
    });

    $.getJSON('https://api.thingspeak.com/channels/' + channel_id + '/feeds.json?api_key=' + api_key +
        '&results=10080',
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



            var sum = 0;
            for (var index = 0; index < 1440; index++) {
                sum += parseFloat(rainfall[index]);
                total_rainfall = Math.round(sum * 10) / 10;
            }
            document.getElementById('rf').textContent = total_rainfall;
            console.log(data);
            console.log(total_rainfall);
            console.log(rainfall);

            var windspeed = data.feeds.map(function (point) {
                return point.field5;
            });;

            var gust = data.feeds.map(function (point) {
                return point.field6;
            });;

            var wind_direction = data.feeds.map(function (point) {
                return point.field7;
            });;

            var soil_moisture = 0;

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
                        borderColor: 'orange',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'orange',
                        pointBackgroundColor: 'orange',
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
                            stacked: true,
                            ticks: {
                                fontSize: 13,

                            },
                            type: 'time',
                            time: {
                                //unit: 'day'
                            },
                        }],
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Temperature (°C)',
                                fontSize: 18,
                            },

                        }, {
                            stacked: false,
                            position: "right",
                            id: "B",
                            scaleLabel: {
                                display: true,
                                labelString: 'Humidity (%)',
                                fontSize: 18,
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100,
                                autoSkip: true,
                            },

                        }]
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 18,
                        }
                    }
                }
            };
            var temp_humid_chart = new Chart(temp_humid_chart, temp_humid_config);


            var rain_soil_chart = rain_soil_canvas.getContext('2d');
            var rain_soil_config = {
                type: 'line',
                data: {
                    labels: time,
                    datasets: [{
                        label: 'Rain',
                        data: rainfall,
                        yAxisID: "A",
                        fill: false,
                        borderColor: 'blue',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'blue',
                        pointBackgroundColor: 'blue',
                        pointHoverRadius: 5,
                    }, {
                        label: 'Soil Moisture',
                        data: soil_moisture,
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
                        text: "Rainfall & Soil Moisture",
                        fontSize: 14,
                        fontColor: 'black',
                    },
                    tooltips: {
                        mode: 'label'
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                fontSize: 13,

                            },
                            type: 'time',
                            time: {
                                //unit: 'day'
                            },
                        }],
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Rain (mm)',
                                fontSize: 18,
                            },

                        }, {
                            stacked: false,
                            position: "right",
                            id: "B",
                            scaleLabel: {
                                display: true,
                                labelString: 'Soil Moisture (%)',
                                fontSize: 18,
                            },
                            ticks: {
                                beginAtZero: true,
                                steps: 10,
                                stepValue: 5,
                                max: 100,
                                autoSkip: true,
                            },

                        }]
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 18,
                        }
                    }
                }
            };
            var rain_soil_chart = new Chart(rain_soil_chart, rain_soil_config);

            /*
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
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                fontSize: 13,

                            },
                            type: 'time',
                            time: {
                                //unit: 'day'
                            },
                        }],
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Rain (mm)',
                                fontSize: 18,

                            },
                            ticks: {
                                beginAtZero: true,
                                autoSkip: true,
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 18,
                        }
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
                        data: 0, //change this
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
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                fontSize: 13,
                            },
                            type: 'time',
                            time: {
                                //  unit: 'day'
                            },
                        }],
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Solar Irradiance (W/m\u00B2)',
                                fontSize: 18,
                            },
                            ticks: {
                                beginAtZero: true,
                                autoSkip: true,
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 18,
                        }
                    }
                }
            };
            var solar_chart = new Chart(solar_chart, solar_config);
*/
            var wind_chart = wind_canvas.getContext('2d');
            var wind_config = {
                type: 'line',
                data: {
                    labels: time,
                    datasets: [{
                        label: 'Wind Speed',
                        data: windspeed, //change this
                        backgroundColor: 'transparent',
                        fill: false,
                        borderColor: 'lightblue',
                        backgroundColor: 'transparent',
                        pointBorderColor: 'lightblue',
                        pointBackgroundColor: 'lightblue',
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
                        text: "Wind Speed",
                        fontSize: 14,
                        fontColor: 'black',
                    },
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                                fontSize: 13,
                            },
                            type: 'time',
                            time: {
                                // unit: 'hour'
                            },
                        }],
                        yAxes: [{
                            stacked: true,
                            position: "left",
                            id: "A",
                            scaleLabel: {
                                display: true,
                                labelString: 'Wind Speed (km/h)',
                                fontSize: 18,
                            },
                            ticks: {
                                beginAtZero: true,
                                autoSkip: true,
                            }
                        }]
                    },
                    legend: {
                        display: true,
                        labels: {
                            fontSize: 18,
                        }
                    }
                }
            };
            var wind_chart = new Chart(wind_chart, wind_config);
        });
}