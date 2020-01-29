<template>
    <div class="fixed">
        <div class="corner-button" @click="set('arrive')">
            <img src="../img/arrival.png"/>
        </div>
        <div class="top-right corner-button" @click="set('leave')">
            <img src="../img/airport.png"/>
        </div>
        <div class="centered">
            <el-progress :percentage="percentage" :color="colors" :stroke-width="10" :show-text="false" type="dashboard"></el-progress>
            <span>{{temp}} °C (Limit: {{limit}} °C)</span>
        </div>
        <div class="bottom-left corner-button" @click="set('home')">
            <img src="../img/sofa.png"/>
        </div>
        <div class="bottom-right corner-button" @click="set('night')">
            <img src="../img/sleep.png"/>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                limit: 24,
                max: 40,
                min: 10,
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
                    'arrive' : 24,
                    'leave' : 19,
                    'night' : 20
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
                formData.append("limit", this.limit );
                fetch("http://192.168.0.19:5000/set", {
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
                fetch("http://192.168.0.19:5000/")
                .then(r => r.json())
                .then(response => {
                    console.log(response)
                    this.temp = parseFloat(response.temp).toPrecision(3);
                    this.heating = response.heating;
                    this.limit = response.limit;
                    this.light = response.light;
                    this.pressure = response.pressure;
                })
            }
        },
        mounted() {
            this.check();
            setInterval(this.check, 60000);
        },
        name: "MainPage"
    }
</script>

<style scoped lang="less">
.fixed {
    font-family: Arial;
    position: fixed;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .corner-button {
        flex-basis: 50%;
        display: flex;
        img {
            padding: 30px;
            max-height: 70px;
            max-width: 70px;
        }
    }
    .centered {
        flex-basis: 100%;
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
</style>