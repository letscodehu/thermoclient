<template>
    <div>
        <el-progress  type="dashboard" :percentage="percentage" :show-text="false" :color="colors"></el-progress>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                percentage : 30,
                colors: [
                    {color: '#f56c6c', percentage: 90},
                    {color: '#e6a23c', percentage: 80},
                    {color: '#5cb87a', percentage: 60},
                    {color: '#1989fa', percentage: 40},
                    {color: '#6f7ad3', percentage: 20}
                ]
            }
        },
        name: "MainPage"
    }
</script>

<style scoped>

</style>