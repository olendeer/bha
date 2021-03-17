<template>
    <div class="adaptation">
        <div class="adaptation-header">{{title}}</div>
        <div class="adaptation-chart">
            <apex type="line" height="180" :options="chartOptions" :series="series"></apex>
        </div>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'

    import './Adaptation.scss'

    export default {
        props: ['title'],
        components: { apex: VueApexCharts },
        data(){
            return {
                series: [{
                    name: 'Likes',
                    data: [{x: 10, y: 20}, { x: 20, y: 30}, { x: 30, y: 35 }, {x: 40, y: 50}, { x: 50, y: 90}, { x: 60, y: 40 }, {x: 70, y: 30}, { x: 80, y: 20}, { x: 90, y: 15 }]
                }],
                chartOptions: {
                    chart: {
                        height: 200,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        foreColor: '#6D6D6D'
                    },
                    stroke: {
                        width: 10,
                        curve: 'smooth',
                        lineCap: 'round'
                    },
                    tooltip: {
                        enabled: false
                    },
                    xaxis: {
                        type: 'numeric',
                        categories: [10, 30, 50, 70, 90],
                        // tickAmount: 10,
                        axisBorder: {
                            show: true,
                            color: '#6E6E6E',
                            offsetX: -10,
                        },
                        axisTicks: {
                            show: false
                        },
                        tooltip: {
                            enabled: false,
                        },
                        labels: {
                            show: true,
                            offsetY: -4,
                            style: {
                                colors: '#ffffff',
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                fontSize: '12px'
                            },
                            rotate: 0,
                            formatter: value => {
                                return Math.round(value)
                            }
                        }
                    },
                    yaxis: {
                        show: true,
                        axisBorder: {
                            show: true,
                            color: '#6E6E6E',
                            // offsetX: -10,
                        },
                        tooltip: {
                            enabled: false,
                        },
                        labels: {
                            show: true,
                            offsetX: -10,
                            style: {
                                colors: '#ffffff',
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                fontSize: '12px'
                            },
                            rotate: 0,
                        },
                        // labels: {
                        //     show: true
                        // }
                    },
                    grid: {
                        xaxis: {
                            lines: {
                                show: false
                            }
                        },
                        yaxis: {
                            lines: {
                                show: false
                            }
                        }
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0.7,
                            opacityTo: 0.9,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#FF1414",
                                    opacity: 1
                                },
                                {
                                    offset: 22.4,
                                    color: "#FBBC05",
                                    opacity: 1
                                },
                                {
                                    offset: 83,
                                    color: "#FFFF00",
                                    opacity: 1
                                },
                                {
                                    offset: 100,
                                    color: "#4ACE67",
                                    opacity: 1
                                }
                            ]
                        }
                    },
                },
            }
        }
    }
</script>