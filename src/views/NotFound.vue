<template>
    <div class="_404">
        <h2 class="m-0">
            抱歉，页面未找到，{{ countDown }}s后自动跳转到
            <a href="javascript:;" @click="goHome">首页</a>
        </h2>
        <img src="../assets/images/404.jpg" alt="页面未找到" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            countDown: 5,
            timer: null
        };
    },
    methods: {
        goHome() {
            this.$router.push("/home/");
            clearInterval(this.timer);
        }
    },
    created() {
        this.timer = setInterval(() => {
            this.countDown > 0 ? this.countDown-- : this.goHome();
        }, 1000);
    }
};
</script>

<style scoped>
body {
    background-color: #dceebc;
}

._404 {
    width: 30%;
    margin: 5rem auto;
}

._404 img {
    width: 30rem;
}

._404 a {
    color: #010101;
}

._404 a:hover {
    color: skyblue;
}
</style>