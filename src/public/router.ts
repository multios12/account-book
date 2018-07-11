import Vue from 'vue'
import VueRouter from 'vue-router'
import monthComponent from './components/page-month-list.vue';
import monthReportComponent from './components/page-month-report.vue';
import detailComponent from './components/page-detail.vue';
import savingComponent from './components/page-saving.vue';
import transferComponent from './components/page-transfer.vue';
import moment from 'moment';

Vue.use(VueRouter);
var routes: any = [
    { path: '/', redirect: (to: any) => moment(new Date()).format("/YYYY/MM") },
    { path: '/:year/:month', component: monthComponent },
    { path: '/:year/:month/report', component: monthReportComponent },
    { path: '/:year/:month/:day', component: detailComponent },
    { path: '/saving', component: savingComponent},
    { path: '/transfer', component: transferComponent},
    { path: '/today', redirect: (to: any) => moment(new Date()).format("/YYYY/MM/DD") },
];

export default new VueRouter({ routes: routes });
