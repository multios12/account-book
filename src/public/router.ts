import Vue from 'vue'
import VueRouter from 'vue-router'
import monthComponent from './account-month.vue';
import detailComponent from './account-detail.vue';

Vue.use(VueRouter);
var routes: any = [
    { path: '/', component: monthComponent },
    { path: '/:year/:month', component: monthComponent },
    { path: '/:year/:month/:day', component: detailComponent },
];

export default new VueRouter({ routes: routes });
