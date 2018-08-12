import moment from "moment";
import Vue from "vue";
import VueRouter from "vue-router";
import userStore from "./userStore";

import pageDetail from "./components/page-detail.vue";
import pageLogin from "./components/page-login.vue";
import pageMonth from "./components/page-month-list.vue";
import pageMonthReport from "./components/page-month-report.vue";
import pageSaving from "./components/page-saving.vue";
import pageSetting from "./components/page-setting.vue";
import pageTransfer from "./components/page-transfer.vue";
import settingAccountsComponent from "./components/part-setting-accounts.vue";
import settingOutDatesComponent from "./components/part-setting-outdates.vue";

Vue.use(VueRouter);
const routes: any = [
    { path: "/", redirect: (to: any) => moment(new Date()).format("/YYYY/MM") },
    {
        children: [
            { path: "/", component: settingAccountsComponent },
            { path: "accounts", component: settingAccountsComponent },
            { path: "outdates", component: settingOutDatesComponent },
        ],
        component: pageSetting,
        path: "/settings",
    },
    { path: "/:year/:month", component: pageMonth },
    { path: "/:year/:month/report", component: pageMonthReport },
    { path: "/:year/:month/:day", component: pageDetail },
    { path: "/login", component: pageLogin },
    { path: "/saving", component: pageSaving },
    { path: "/transfer", component: pageTransfer },
    { path: "/today", redirect: (to: any) => moment(new Date()).format("/YYYY/MM/DD") },
];

const router = new VueRouter({ routes });

/**
 * グローバルナビゲーションガード beforeイベント
 */
router.beforeEach(async (to, from, next) => {
    // localStorageにtokenが保存されていなければ、ログイン画面を表示する
    if (to.path === "/logout") {
        userStore.logout();
        next({ path: "/login" });
        return;
    } else if (!userStore.token() && (to.path !== "/login")) {
        next({ path: "/login" });
        return;
    }

    next();
});

export default router;
