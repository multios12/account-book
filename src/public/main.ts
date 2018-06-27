import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import moment from "moment";
import axios from "axios";

// import 'bootstrap/dist/css/bootstrap.css'
import './bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import navComponent from './app-nav.vue';
import monthComponent from './account-month.vue';
import detailComponent from './account-detail.vue';

Vue.use(VueRouter);
Vue.use(BootstrapVue);

var routes: any = [
    { path: '/', component: monthComponent },
    { path: '/detail', component: detailComponent },
];

var router = new VueRouter({ routes: routes });

const app = new Vue({
    router,
    components: { "app-nav": navComponent },
    data: {
        settings: {},
        selectedMonth: null,
        selectedDate: null,
        balance: 0

    },
    created: function () {
        var nowDate = new Date();
        this.selectedMonth = moment(nowDate).format("YYYY-MM");
        var self = this;
        axios.get("./settings").then(value => (self.settings = value.data));
    }
}).$mount('#app')