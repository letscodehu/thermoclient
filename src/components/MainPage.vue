<template>
    <div class="fixed" v-bind:class="{light : light >= 20, dark : light < 20}">
        <div class="corner-button">
            <img src="../img/arrival.png" @click="set('arrive')"/>
        </div>
        <div class="top-right corner-button">
            <img src="../img/airport.png" @click="set('leave')"/>
        </div>
        <div class="centered">
            <el-progress :percentage="percentage" :color="colors" :stroke-width="10" :show-text="false"
                         type="dashboard"></el-progress>
            <span>{{temp}} °C (Limit: {{limit}} °C)</span>
        </div>
        <div class="bottom-left corner-button">
            <img src="../img/sofa.png" @click="set('home')"/>
        </div>
        <div class="bottom-right corner-button">
            <img src="../img/sleep.png" @click="set('night')"/>
        </div>
    </div>
</template>

<script>
    import config from '../config.js';

    export default {
        data() {
            return {
                limit: 24,
                max: 40,
                min: 10,
                light: 10,
                temp: 20,
                previousEvent: null,
                colors: [
                    {color: '#f56c6c', percentage: 90},
                    {color: '#e6a23c', percentage: 80},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 40},
                    {color: '#6f7ad3', percentage: 20}
                ],
                types: {
                    'home': 22,
                    'arrive': 24,
                    'leave': 19,
                    'night': 20
                }
            }
        },
        computed: {
            percentage() {
                return Math.ceil((this.temp - this.min) / (this.max - this.min) * 100);
            }
        },
        methods: {
            set(type) {
                const formData = new FormData
                this.limit = this.types[type];
                formData.append("limit", this.limit);
                fetch(config.url + "/set", {
                    method: 'POST',
                    body: formData
                })
                    .then(r => r.json())
                    .then(r => {
                        this.$notify({
                            title: 'Success!',
                            message: 'Temperature set to ' + this.types[type] + " °C",
                            type: 'success'
                        });
                    })
            },
            check() {
                fetch(config.url + "/")
                    .then(r => r.json())
                    .then(response => {
                        this.temp = parseFloat(response.temp).toPrecision(3);
                        this.heating = response.heating;
                        this.limit = response.limit;
                        this.light = parseInt(response.light.substring(0, response.light.length - 3));
                        this.pressure = response.pressure;
                    })
            }
        },
        mounted() {
            this.check();
            setInterval(this.check, 1000);
        },
        name: "MainPage"
    }
</script>

<style lang="less">
    .c-swipe-wrapper {
        position: fixed;
        width: 100% !important;
        height: 100% !important;
        top: 0;
        left: 0;
    }

    .fixed {
        -webkit-transition: background-image 1s ease-in-out;
        transition: background-image 1s ease-in-out;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        position: fixed;
        width: 100% !important;
        height: 100% !important;
        top: 0;
        left: 0;

        .corner-button {
            flex-basis: 50%;
            display: flex;

            img {
                padding: 20px;
                margin: 10px;
                max-height: 70px;
                border-radius: 30px;
                opacity: 0.7;
                background-color: #fff;
                max-width: 70px;
            }
        }

        .centered {
            flex-basis: 80%;
            opacity: 0.7;
            background-color: #fff;
            border-radius: 30px;
            padding: 20px;
            margin: 10px;
            flex-direction: column;
            display: flex;
            align-self: center;
            align-items: center;
        }

        .top-right {
            flex-direction: row-reverse;
        }

        .bottom-right {
            align-items: flex-end;
            justify-content: flex-end;
        }

        .bottom-left {
            flex-direction: column-reverse;
        }
    }

    &.dark {
        background: url('../img/dark.jpg') no-repeat center;
    }

    &.light {
        background: url('../img/light.jpg') no-repeat center;
    }
</style>