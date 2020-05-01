        let iniBrz = '';
        let dayOneBrz = '';
        let dates = [];
        let datesLast14Days = [];
        let datesLast13Days = [];
        let dateEUA = '';
        let dateItaly = '';
        let dateChina = '';
        let casesBrazil = [];
        let casesUSA = [];
        let casesItaly = [];
        let casesChina = [];
        let dayBrazil = '';
        let firstDayBrazil = '';
        let todayActiveBrazil = '';
        let todayActiveUSA = '';

        // BRAZIL
        let confirmedBrazil = '';
        let deathsBrazil = '';
        let recoveryBrazil = '';
        let deathBrazil = [];
        let recoveredBrazil = [];
        let deathPercentBrazil = '';
        let recoveryPercentBrazil = '';
        let dailyBrazil = [];

        let last14DaysBrazil = [];

        function listTotal(country, type) {
            $.ajax({
                url: "https://api.covid19api.com/" + type + "/country/" + country,
                type: "GET",
                headers: {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "cbacee47d3msh506eafac422a7fep1fdc63jsn08402b70b2de"
                },
                success: function(texto) {
                        let flag = false;
                        if (country == 'brazil') {
                            casesBrazil['confirmed'] = [];
                            casesBrazil['recovered'] = [];
                            casesBrazil['death'] = [];

                            todayActiveBrazil = texto.slice(-1)[0];
                            confirmedBrazil = todayActiveBrazil['Confirmed'];
                            deathsBrazil = todayActiveBrazil['Deaths'];
                            recoveryBrazil = todayActiveBrazil['Recovered'];
                            deathPercentBrazil = ((deathsBrazil * 100) / confirmedBrazil).toFixed(0);
                            recoveryPercentBrazil = ((recoveryBrazil * 100) / confirmedBrazil).toFixed(0);

                            $("#active_brazil_val").val(confirmedBrazil);
                            $("#active_brazil_val").maskMoney({
                                thousands: '.',
                                decimal: ',',
                                precision: 0
                            });
                            $("#active_brazil_val").maskMoney('mask', $("#active_brazil_val").val());
                            $("#active_brazil").text($("#active_brazil_val").val());

                            $("#deaths_brazil_val").val(deathsBrazil);
                            $("#deaths_brazil_val").maskMoney({
                                thousands: '.',
                                decimal: ',',
                                precision: 0
                            });
                            $("#deaths_brazil_val").maskMoney('mask', $("#deaths_brazil_val").val());
                            $("#deaths_brazil").text($("#deaths_brazil_val").val() + '(' + deathPercentBrazil + '%)');

                            $("#recovered_brazil_val").val(recoveryBrazil);
                            $("#recovered_brazil_val").maskMoney({
                                thousands: '.',
                                decimal: ',',
                                precision: 0
                            });
                            $("#recovered_brazil_val").maskMoney('mask', $("#recovered_brazil_val").val());
                            $("#recovered_brazil").text($("#recovered_brazil_val").val() + '(' + recoveryPercentBrazil + '%)');

                            //$("#dayOneBrz").text('Primeiro dia com confirmados oficialmente: ' + dayOneBrz);

                            dailyBrazil['confirmed'] = [];
                            dailyBrazil['recovered'] = [];
                            dailyBrazil['death'] = [];
                            $.each(texto, function(i, item) {
                                if (item['Cases'] != '0') {
                                    if (flag == false) {
                                        firstDayBrazil = item['Date'];
                                        firstDayBrazil = (Date.parse(firstDayBrazil) / 1000);
                                        dayOneBrz = new Date(item['Date']);
                                        let day = (dayOneBrz.getDate(+1) < 10 ? '0' : '') + (dayOneBrz.getDate(+1));
                                        let month = (dayOneBrz.getMonth(+1) < 10 ? '0' : '') + (dayOneBrz.getMonth(+1));

                                        dayOneBrz = day + '/' + month + '/2020';
                                        $("#brz_first").val(dayOneBrz);
                                        flag = true;
                                    }
                                    dayBrazil = item['Date'];
                                    aux = dayBrazil.split('T');
                                    aux1 = aux[0].split('-');
                                    dates.push((parseInt(aux1[2]) + '/' + aux1[1]));
                                    casesBrazil['confirmed'].push(item['Confirmed']);
                                    casesBrazil['death'].push(item['Deaths']);
                                    casesBrazil['recovered'].push(item['Recovered']);
                                }
                            });
                            let txt = texto.slice(-14);
                            $.each(txt, function(i, item) {
                                if (item['Date'] != txt.slice(-1)[0]['Date']){
                                dailyConf = parseInt(txt[i+1]['Confirmed']) - parseInt(item['Confirmed']);
                                dailyRecov = parseInt(txt[i+1]['Recovered']) - parseInt(item['Recovered']);
                                dailyDeath = parseInt(txt[i+1]['Deaths']) - parseInt(item['Deaths']);
                            
                                dailyBrazil['confirmed'].push(dailyConf);
                                dailyBrazil['recovered'].push(dailyRecov);
                                dailyBrazil['death'].push(dailyDeath);
                                }
                            });

                            //let lastCase = last14DaysBrazil['confirmed'].slice(-1)[0];
                            //casesBrazil['confirmed'].pop();
                            //casesBrazil['confirmed'].push(lastCase);
                        } 
                        if (country == 'united-states') {
                            casesUSA['confirmed'] = [];
                            casesUSA['recovered'] = [];
                            casesUSA['death'] = [];
                            $.each(texto, function(i, item) {
                                dateEUA = (Date.parse(item['Date']) / 1000);
                                if (dateEUA >= firstDayBrazil) {
                                    casesUSA['confirmed'].push(item['Confirmed']);
                                    casesUSA['death'].push(item['Deaths']);
                                    casesUSA['recovered'].push(item['Recovered']);
                                }
                            });
                        }
                        if (country == 'italy') {
                            casesItaly['confirmed'] = [];
                            casesItaly['recovered'] = [];
                            casesItaly['death'] = [];
                            $.each(texto, function(i, item) {
                                dateItaly = (Date.parse(item['Date']) / 1000);
                                if (dateItaly >= firstDayBrazil) {
                                    casesItaly['confirmed'].push(item['Confirmed']);
                                    casesItaly['death'].push(item['Deaths']);
                                    casesItaly['recovered'].push(item['Recovered']);
                                }
                            });
                        }
                        if (country == 'china') {
                            casesChina['confirmed'] = [];
                            casesChina['recovered'] = [];
                            casesChina['death'] = [];
                            $.each(texto, function(i, item) {
                                dateChina = (Date.parse(item['Date']) / 1000);
                                if (dateChina >= firstDayBrazil) {
                                    casesChina['confirmed'].push(item['Confirmed']);
                                    casesChina['death'].push(item['Deaths']);
                                    casesChina['recovered'].push(item['Recovered']);
                                }
                            });
                        }
                        
                },
                error: function() {}
            });
        }

        function chartTotal() {
            let ctx = document.getElementById('chartTotal');
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                            label: 'Brasil',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesBrazil['confirmed']
                        },
                        {
                            label: 'EUA',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(177, 205, 26,0.4)',
                            borderColor: 'rgba(177, 205, 26,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(177, 205, 26,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(177, 205, 26,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesUSA['confirmed']
                        },
                        {
                            label: 'Itália',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(61, 130, 204,0.4)',
                            borderColor: 'rgba(61, 130, 204,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(61, 130, 204,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(61, 130, 204,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesItaly['confirmed']
                        },
                        {
                            label: 'China',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(255, 119, 66,0.4)',
                            borderColor: 'rgba(255, 119, 66,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(255, 119, 66,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(255, 119, 66,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesChina['confirmed']
                        }
                    ]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartRecovery() {
            let ctx = document.getElementById('chartRecovery');
            let chartRecovery = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                            label: 'Brasil',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(75,192,192,0.4)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(75,192,192,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesBrazil['recovered']
                        },
                        {
                            label: 'EUA',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(177, 205, 26,0.4)',
                            borderColor: 'rgba(177, 205, 26,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(177, 205, 26,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(177, 205, 26,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesUSA['recovered']
                        },
                        {
                            label: 'Itália',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(61, 130, 204,0.4)',
                            borderColor: 'rgba(61, 130, 204,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(61, 130, 204,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(61, 130, 204,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesItaly['recovered']
                        },
                        {
                            label: 'China',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(255, 119, 66,0.4)',
                            borderColor: 'rgba(255, 119, 66,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(255, 119, 66,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(255, 119, 66,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesChina['recovered']
                        }
                    ]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartTotalBrazil() {
            let ctx = document.getElementById('chartTotalBrazil');
            let myChartBrazil = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: casesBrazil['confirmed']
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });

        }

        function chartRecoveryBrazil() {
            let ctx = document.getElementById('chartRecoveryBrazil');
            let chartRecoveryBrazil = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates,
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: casesBrazil['recovered']
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartRecovery14dBrazil(){
            let ctx = document.getElementById('chartlast14DaysRecoveryBrazil');
            var chartlast14DaysRecoveryBrazil = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates.slice(-14),
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(135,231,82,1)',
                        borderColor: 'rgba(135,231,82,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(135,231,822,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(135,231,82,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: casesBrazil['recovered'].slice(-14)
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartConfirmed14dBrazil(){
                let ctx = document.getElementById('chartlast14DaysConfirmedBrazil');
                var chartlast14DaysConfirmedBrazil = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: dates.slice(-14),
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontSize: 40
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize: 40
                                }
                            }]
                        },
                        datasets: [{
                            label: 'Brasil',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(215,147,147,1)',
                            borderColor: 'rgba(215,147,147,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(215,147,147,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(215,147,147,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesBrazil['confirmed'].slice(-14)
                        }]
                    },
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        mode: null
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true
                    }
                });
        }

        function chartDeath14dBrazil(){
                let ctx = document.getElementById('chartlast14DaysDeathBrazil');
                var chartlast14DaysDeathBrazil = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: dates.slice(-14),
                        scales: {
                            yAxes: [{
                                ticks: {
                                    fontSize: 40
                                }
                            }],
                            xAxes: [{
                                ticks: {
                                    fontSize: 40
                                }
                            }]
                        },
                        datasets: [{
                            label: 'Brasil',
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: 'rgba(74,74,74,1)',
                            borderColor: 'rgba(74,74,74,1)',
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: 'rgba(74,74,74,1)',
                            pointBackgroundColor: '#fff',
                            pointBorderWidth: 3,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: 'rgba(74,74,74,1)',
                            pointHoverBorderColor: 'rgba(220,220,220,1)',
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: casesBrazil['death'].slice(-14)
                        }]
                    },
                    tooltips: {
                        enabled: false
                    },
                    hover: {
                        mode: null
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true
                    }
                });
        }

        function chartConfirmed13dBrazil(){
            let ctx = document.getElementById('chartlast13DaysConfBrazil');
            var chartlast13DaysConfBrazil = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates.slice(-13),
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(215,147,147,1)',
                        borderColor: 'rgba(215,147,147,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(215,147,147,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(215,147,147,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dailyBrazil['confirmed']
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartRecovery13dBrazil(){
            let ctx = document.getElementById('chartlast13DaysRecovBrazil');
            var chartlast13DaysRecovBrazil = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates.slice(-13),
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(135,231,82,1)',
                        borderColor: 'rgba(135,231,82,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(135,231,822,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(135,231,82,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dailyBrazil['recovered']
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }
        function chartDeath13dBrazil(){
            let ctx = document.getElementById('chartlast13DaysDeathBrazil');
            var chartlast13DaysDeathBrazil = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dates.slice(-13),
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [{
                        label: 'Brasil',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(74,74,74,1)',
                        borderColor: 'rgba(74,74,74,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(74,74,74,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(74,74,74,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: dailyBrazil['death']
                    }]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    aspectRatio: 2,
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }

        function chartConfRecovBrazil14d(){
            let ctx = document.getElementById('chartConfRecovBrazil14d');
            var chartConfRecovBrazil14d = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates.slice(-14),
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontSize: 40
                            }
                        }]
                    },
                    datasets: [
                        {
                        label: 'Confirmado',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(215,147,147,1)',
                        borderColor: 'rgba(215,147,147,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(215,147,147,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(215,147,1474,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: casesBrazil['confirmed'].slice(-14)
                    },
                    {
                        label: 'Recuperado',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(135,231,82,1)',
                        borderColor: 'rgba(135,231,82,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(135,231,82,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 3,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(135,231,82,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: casesBrazil['recovered'].slice(-14)
                    }
                ]
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                },
                options: {
                    aspectRatio: 2,
                    responsive: true,
                    maintainAspectRatio: true
                }
            });
        }


        $(document).ready(function() {
            listTotal('brazil', 'total');

            setTimeout(function() {
                listTotal('united-states', 'total');
                listTotal('italy', 'total');
                listTotal('china', 'total');
            }, 800);

            setTimeout(function() {
                chartTotalBrazil();
                chartRecoveryBrazil();
            }, 1800)

            setTimeout(function() {
                chartTotal();
            }, 2000);

            setTimeout(function() {
                chartRecovery();
            }, 3000);

            setTimeout(function() {
                chartRecovery14dBrazil();
                chartConfirmed14dBrazil();
                chartDeath14dBrazil();

                chartRecovery13dBrazil();
                chartConfirmed13dBrazil();
                chartDeath13dBrazil();
                chartConfRecovBrazil14d();
            }, 4000);
            
            setTimeout(function() {
                $('#splash').fadeOut(500);
                $(' html, body').css({
                    overflow: 'auto'
                });
                $("#page").show();
            }, 5500);
        });
