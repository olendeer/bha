<template>
    <div class="resonance">
        <div class="resonance-header">Resonance zones</div>
        <div class="resonance-chart">
            <apex type="bar" height="168" :options="chartOptions" :series="series"></apex>
            <div class="resonance-chart-circles">
                <span v-for="(_, index) in Array(8).fill(true)" :key="index" ></span>
            </div>
        </div>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'


    import './Resonance.scss'

    export default {
        components: { apex: VueApexCharts },
        data(){
            return {
                series: [{
                    data: [21, 22, 10, 28, 16, 21, 13, 30]
                }],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'bar',
                        toolbar:{
                            show: false
                        },
                        stroke: {
                            // show: false
                            lineCap: 'round'
                        },
                        animations: {
                            enabled: false
                        }
                    },
                    colors: ['#BED1E6'],
                    stroke: {
                        // show: false
                        lineCap: 'round'
                    },
                    tooltip: {
                        enabled: false
                    },
                    plotOptions: {
                        bar: {
                                // borderRadius: '60px',
                                columnWidth: '60%',
                                // distributed: true,
                                // startingShape: 'rounded',
                                // endingShape: 'rounded',
                                colors: {
                                    backgroundBarRadius: 50
                                }
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
                                ['John', 'Doe'],
                                ['Joe', 'Smith'],
                                ['Jake', 'Williams'],
                                'Amber',
                                ['Peter', 'Brown'],
                                ['Mary', 'Evans'],
                                ['David', 'Wilson'],
                                ['Lily', 'Roberts'], 
                            ],
                            axisBorder: {
                                show: true,
                                color: '#6E6E6E',
                                offsetX: -10,
                                offsetY: 10
                            },
                            axisTicks: {
                                show: false,
                                borderType: 'solid'
                            },
                            tooltip: {
                                enabled: false,
                            },
                            labels: {
                                show: false,
                            }
                        },
                        yaxis: {
                            show: true,
                            axisBorder: {
                                show: true,
                                color: '#6E6E6E',
                                offsetY: 9,
                            },
                            tooltip: {
                                enabled: false,
                            },
                            labels: {
                                show: true,
                                offsetX: -10,
                                offsetY: 9,
                                style: {
                                    colors: '#ffffff',
                                    fontFamily: 'Roboto',
                                    fontWeight: 500,
                                    fontSize: '12px'
                                },
                                rotate: 0,
                            },
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
                            type: 'vertical',
                            opacityTo: 0.9,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#35DA3E",
                                    opacity: 1
                                },
                                {
                                    offset: 100,
                                    color: "#60D278",
                                    opacity: 1
                                },
                            ]
                        }
                    },
                },
            }
        }
    }
</script>