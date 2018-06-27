import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import moment from "moment";
import axios from "axios";

// import 'bootstrap/dist/css/bootstrap.css'
import './bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import navComponent from './app-nav.vue';
import router from './router'

//Vue.use(VueRouter);
Vue.use(BootstrapVue);

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
        var self = this;
        axios.get("./settings").then(value => {
            self.settings = value.data
            self.selectedMonth = moment(new Date()).format("YYYY-MM");
        });
    },
    methods: {
        monthChanged:function(value:string){
            this.selectedMonth = value;
        },
        dateChanged:function(value:string) {
            this.selectedDate = value;
        }
    }
}).$mount('#app')