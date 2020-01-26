<template>
    <div>
        <el-card class="box-card">
            <el-progress v-touch:moving="move" type="dashboard" :percentage="percentage" :show-text="false"
                         :color="colors"></el-progress>
        </el-card>
        <el-card class="box-card">

        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                limit: 24,
                max: 30,
                min: 17,
                previousEvent: null,
                colors: [
                    {color: '#f56c6c', percentage: 90},
                    {color: '#e6a23c', percentage: 80},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 40},
                    {color: '#6f7ad3', percentage: 20}
                ]
            }
        },
        computed: {
            percentage() {
                return (this.max - this.min) / (this.limit - this.min);
            }
        },
        methods: {
            move(event) {
                let diff = 0;
                if (this.previousEvent) {
                    diff = this.previousEvent.changedTouches[0].screenY - event.changedTouches[0].screenY
                }
                this.previousEvent = event;
                let newLimit = this.limit - diff / 5;
                this.limit = Math.max(Math.min(newLimit, this.max), this.min);
            }
        },
        name: "MainPage"
    }
</script>

<style scoped>

</style>