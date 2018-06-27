<template>
  <div>
    <main role="main" class="container-fluid">
      <account-detail v-if="selectedDate!=null" :selectedDate="selectedDate" :settings="settings" @back="changeMonth"></account-detail>
      <account-month  v-else              :selectedMonth="selectedMonth" @date-clicked="dateClicked" @balance-changed="balanceClicked"></account-month>
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
      months: [],
      balance: 0
    };
  },
  created: function() {
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
    },
    balanceClicked: function(value: number) {
      this.balance = value;
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

.custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
}
</style>
 
