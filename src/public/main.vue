<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <b-navbar-brand class="navbar-brand" @click="changeMonthToNow()">account-book</b-navbar-brand>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <b-collapse is-nav id="navbarsExampleDefault">
        <b-navbar-nav class="mr-auto">
          <b-form-select v-model="selectedMonth" :options="months" @change="changeMonth" />
          <b-nav-item active @click="dateClicked()">today</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </nav>

    <main role="main" class="container-fluid">
      <account-detail v-if="selectedDate!=null" :selectedDate="selectedDate" :settings="settings" @back="changeMonth"></account-detail>
      <account-month  v-else              :selectedMonth="selectedMonth" @date-clicked="dateClicked"></account-month>
      <account-status v-if="selectedDate==null" :selectedMonth="selectedMonth"  :settings="settings"></account-status>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import axios from "axios";
import inputItemComponent from "./account-detail.vue";
import monthComponent from "./account-month.vue";
import statusComponent from "./account-status.vue";

export default Vue.extend({
  data() {
    return {
      settings: {},
      selectedMonth: null,
      selectedDate: null,
      months: []
    };
  },
  created: function() {
    var nowDate = new Date();
    for (let index = -6; index <= 6; index++) {
      var targetDate = moment(nowDate).add(index, "months");
      this.months.push({
        value: targetDate.format("YYYY-MM"),
        text: targetDate.format("YYYY-MM")
      });
    }

    this.selectedMonth = moment(nowDate).format("YYYY-MM");
    var self = this;
    axios.get("./settings").then(value => (self.settings = value.data));
  },
  methods: {
    changeMonthToNow: function() {
      var nowDate = new Date();
      var targetDate = moment(nowDate).format("YYYY-MM");
      this.changeMonth(targetDate);
    },
    changeMonth: function(value: any) {
      this.selectedDate = null;
      if (value == null) {
        value = this.selectedMonth;
        return;
      }
      this.selectedMonth = value;
    },
    dateClicked: function(targetdate: string) {
      if (!targetdate) {
        targetdate = moment(new Date()).format("YYYY-MM-DD");
      }
      this.selectedDate = targetdate;
    }
  }
});
Vue.component("account-month", monthComponent);
Vue.component("account-detail", inputItemComponent);
Vue.component("account-status", statusComponent);
</script>

<style>
body {
  padding-top: 4.5rem;
}
</style>
