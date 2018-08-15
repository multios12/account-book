import BootstrapVue from "bootstrap-vue";
import moment from "moment";
import Vue from "vue";
import axios from "./axiosForApi";

// import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./bootstrap.min.css";

import navComponent from "./components/app-nav.vue";
import router from "./router";

Vue.use(BootstrapVue);

const app = new Vue({
    router,
    // tslint:disable-next-line:object-literal-sort-keys
    components: { "app-nav": navComponent },
    data: {
        balance: 0,
        selectedDate: null,
        selectedMonth: null,
        settings: {},
    },
    async created() {
        if (this.$route.path !== "/login") {
            const self = this;
            const value = await axios.get("./settings");
            self.settings = value.data;
            self.selectedMonth = moment(new Date()).format("YYYY-MM");
        }
    },
    methods: {
        balanceClicked: (value: number) => {
            this.balance = value;
        },
        dateChanged: (value: string) => {
            this.selectedDate = value;
        },
        monthChanged: (value: string) => {
            this.selectedMonth = value;
        },
    },
}).$mount("#app");
