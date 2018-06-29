import Vue from 'vue'
import VueRouter from 'vue-router'
import monthComponent from './account-month.vue';
import detailComponent from './account-detail.vue';
import savingComponent from './account-saving.vue';
import moment from 'moment';

Vue.use(VueRouter);
var routes: any = [
    { path: '/', redirect: (to: any) => moment(new Date()).format("/YYYY/MM") },
    { path: '/:year/:month', component: monthComponent },
    { path: '/:year/:month/:day', component: detailComponent },
    { path: '/saving', component: savingComponent},
    { path: '/today', redirect: (to: any) => moment(new Date()).format("/YYYY/MM/DD") },
];

export default new VueRouter({ routes: routes });
