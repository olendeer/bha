<template>
    <div class="heart" :style="{ width: width }">
        <div class="heart-header">{{title}}</div>
        <div class="heart-chart">
            <apex type="line" height="160" :options="chartOptions" :series="series"></apex>
            <div class="heart-chart-circles">
                <span v-for="(_, index) in Array(9).fill(true)" :key="index" ></span>
            </div>
        </div>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'

    import './Heart.scss'

    export default {
        props: ['width', 'title'],
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
                        foreColor: '#ffffff'
                    },
                    stroke: {
                        width: 3,
                        curve: 'smooth',
                        lineCap: 'round',
                        colors: ['#ffffff']
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
                },
            }
        }
    }
</script>