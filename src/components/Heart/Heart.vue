<template>
    <div class="heart" :style="{ width: width }">
        <div class="heart-header">{{title}}</div>
        <div class="heart-chart">
            <div class="heart-chart-columns" v-if="breat && $route.fullPath.includes('breatwork')">
                <div class="column" v-for="(item, index) in columns" :key="index"><span :style="{
                    background: item.color,
                    height: item.value + '%',
                }"></span></div>
            </div>
            <apex type="line" :height="breat ? 154 : 160" :options="chartOptions" :series="series" ref="chart"></apex>
            <div class="heart-chart-circles">
                <span v-for="(_, index) in Array(breat && $route.fullPath.includes('breatwork') ? 12 : 9).fill(true)" :key="index" ></span>
            </div>
        </div>
    </div>
</template>

<script>

    import VueApexCharts from 'vue-apexcharts'

    import './Heart.scss'

    export default {
        props: ['width', 'title', 'test', 'breat'],
        components: { apex: VueApexCharts },
        data(){
            return {
                series: [{
                    name: 'Likes',
                    data: [{x: 10, y: 20}, { x: 20, y: 30}, { x: 30, y: 35 }, {x: 40, y: 50}, { x: 50, y: 90}, { x: 60, y: 40 }, {x: 70, y: 30}, { x: 80, y: 20}, { x: 90, y: 15 }]
                }],
                chartOptions: {
                    chart: {
                        height: this.breat ? 154 : 160,
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
                            show: !(this.breat && this.$route.fullPath.includes('breatwork')),
                            offsetX: -10,
                            style: {
                                colors: '#ffffff',
                                fontFamily: 'Roboto',
                                fontWeight: 500,
                                fontSize: '12px'
                            },
                            rotate: 0,
                            formatter: value => Math.round(value)
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
                data: [],
                columns: []
            }
        },
        methods:{
            updateData(){
                let readed = JSON.parse(JSON.parse(this.test.rawData1))
                let columnReaded = JSON.parse(JSON.parse(this.test.rawData2))
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                let y = readed.map(item => 60000 / item)
                let x = readed.reduce(reducer)
                let time = x / readed.length
                this.data = y.map((item, index) => ({
                    x: time * index + 1, 
                    y: item
                }))
                if(columnReaded?.chunk){
                    this.columns = columnReaded.chunk(columnReaded.length / 12).slice(0, 12).map(item => item.reduce(reducer) / item.length).map(item => {
                        if(item < 30){
                            return {
                                color: 'linear-gradient(90deg, #F49A2F 0%, #FCBE76 94.27%)',
                                value: item
                            }
                        } else if(item >= 30 && item < 60 ) {
                            return {
                                color: 'linear-gradient(90deg, #FFDD2B 0%, #E8D46F 94.27%)',
                                value: item
                            }
                        } else {
                            return {
                                color: 'linear-gradient(179.07deg, #35DA3E -6.25%, #60D278 111.45%)',
                                value: item
                            }
                        }
                    })
                }
            },
        },
        mounted(){
            this.updateData()
            
        },
        watch: {
            test(){
                this.updateData()
            },
            data(){
                this.$refs.chart.updateSeries([{
                    data: this.data
                }])
                // console.log(this.data)
            },
            columns(){
                console.log(this.columns)
            }
        }
    }
</script>