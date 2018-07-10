<template>
    <b-card header-tag="header" class="mx-1">
        <h4 slot="header" class="mb-0">
            reports[{{selectedMonth}}]
        </h4>
        <canvas id="myChart" width="400" height="400"></canvas>
        <b-table small hover :fields="fields" :items="incomes">
          <template slot="accountColumn" slot-scope="data">{{getAccountName(data.item.account)}}</template>
        </b-table>
        <b-table small hover :fields="fields" :items="spendings">
          <template slot="accountColumn" slot-scope="data">{{getAccountName(data.item.account)}}</template>
        </b-table>
      </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import moment from "moment";
import router from "../router";
import chart from "chart.js"
export default Vue.extend({
  data() {
    return {
      fields: [
        { key: "accountColumn", label: "科目", sortable: true }, "amount"],
      incomes: [],
      spendings: [],
      selectedMonth: null
    };
  },
  props: ["settings"],
  computed: {
    title: function() {
      this.selectedMonth;
    }
  },
  created: function() {this.show();},
  methods: {
    show: function() {
      var value: string = this.$route.path;
      value = value.substring(1);
      this.selectedMonth = value.replace(/\//g, "-").replace(/-report/g, "");

      var self = this;
      var url = "./reports/" + value.replace(/\/report/g, "");
      axios.get(url).then(value => {
        self.incomes = value.data.incomes;
        self.spendings = value.data.spendings;

        var myBarChart = new chart('myChart', {
            type: 'bar',
            data: self.spendings,
            //options: options
        });
      });
    },
    getAccountName: function(value: any) {
      for (let index = 0; index < this.settings.accounts.length; index++) {
        const element = this.settings.accounts[index];
        if (element.value == value) {
          return element.text;
        }
      }
    },
  }
});
</script>
