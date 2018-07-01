import Vue from 'vue'
import VueRouter from 'vue-router'
import monthComponent from './account-month.vue';
import detailComponent from './account-detail.vue';
import loginComponent from './account-login.vue';
import savingComponent from './account-saving.vue';
import transferComponent from './account-transfer.vue';
import moment from 'moment';

Vue.use(VueRouter);
var routes: any = [
    { path: '/', redirect: (to: any) => moment(new Date()).format("/YYYY/MM") },
    { path: '/:year/:month', component: monthComponent },
    { path: '/:year/:month/:day', component: detailComponent },
    { path: '/login', component: loginComponent},
    { path: '/saving', component: savingComponent},
    { path: '/transfer', component: transferComponent},
    { path: '/today', redirect: (to: any) => moment(new Date()).format("/YYYY/MM/DD") },
];

export default new VueRouter({ routes: routes });
