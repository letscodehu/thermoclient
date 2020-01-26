import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import MainPage from "./components/MainPage.vue";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "home",
            component: MainPage
        }
    ]
});


    new Vue({
        el: "#app",
        components: {
            MainPage
        },
        router
    })


