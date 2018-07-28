<template>
  <b-card header-tag="header" class="mx-1">
      <h4 slot="header" class="mb-0">
        <b-button @click="back"><i class="fas fa-arrow-left"></i></b-button>
        reports[{{selectedMonth}}]
      </h4>
      <div class="row">
      <div class="col-0 col-sm-0 col-md-2 col-lg-3 col-xl-3"></div>
      <div class="col-12 col-sm-12 col-md-8 col-lg-6 col-xl-6">
        <canvas id="balanceChart" class="mx-auto"></canvas>
      </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <b-card title="収入">
            <b-table small hover :fields="fields" :items="incomes">
              <template slot="accountColumn" slot-scope="data">{{getAccountName(data.item.account)}}</template>
            </b-table>
          </b-card>
        </div>
        <div class="col-lg-6">
          <b-card title="支出">
            <b-table small hover :fields="fields" :items="spendings">
              <template slot="accountColumn" slot-scope="data">{{getAccountName(data.item.account)}}</template>
            </b-table>
          </b-card>
        </div>
      </div>

      <b-card title="支出内訳">
        <div class="row">
        <div class="col-0 col-sm-0 col-md-1 col-lg-1 col-xl-1"></div>
        <div class="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10">
          <canvas id="spendingsChart" ></canvas>
        </div>
        </div>
      </b-card>
    </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "../axiosForApi";
import moment from "moment";
import router from "../router";
import chart from "chart.js";
export default Vue.extend({
  data() {
    return {
      fields: [
        { key: "accountColumn", label: "科目", sortable: true },
        "amount"
      ],
      incomes: [],
      spendings: [],
      graphDatas: null,
      selectedMonth: null
    };
  },
  props: ["settings"],
  computed: {
    title: function() {
      this.selectedMonth;
    }
  },
  created: function() {
    this.show();
  },
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
        this.drawBalanceChart();
        this.drawSpendingsChart();
      });
    },
    drawBalanceChart: function() {
      var labels: any[] = [];
      var values: any[] = [];
      var self = this;
      var income: number = 0;
      var spending: number = 0;
      this.incomes.forEach((e: any) => (income += e.amount));
      this.spendings.forEach((e: any) => (spending += e.amount * -1));

      var options = {
        legend: { display: false },
        scales: { xAxes: [{ ticks: { beginAtZero: true, min: 0 } }] }
      };
      var balanceChart = new chart("balanceChart", {
        type: "horizontalBar",
        data: {
          labels: ["収入", "支出"],
          datasets: [
            {
              data: [income, spending],
              backgroundColor: ["#7fc2ef", "#d685b0"]
            }
          ]
        },
        options: options
      });
    },
    drawSpendingsChart: function() {
      var labels: any[] = [];
      var values: any[] = [];
      var self = this;
      this.spendings.forEach((e: any) => {
        labels.push(self.getAccountName(e.account));
        values.push(e.amount * -1);
      });

      var options = {
        scales: { yAxes: [{ ticks: { beginAtZero: true, min: 0 } }] }
      };

      var spendigsChart = new chart("spendingsChart", {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              backgroundColor: [
                "#e2b2c0",
                "#fff353",
                "#a5d1f4",
                "#e4ad6d",
                "#d685b0",
                "#dbe159",
                "#7fc2ef",
                "#c4a6ca",
                "#eabf4c",
                "#f9e697",
                "#b3d3ac",
                "#eac7cd"
              ],
              data: values
            }
          ]
        }
        //options: options
      });
    },
    back: function() {
      router.push(this.$route.path.substring(0, 8));
    },
    getAccountName: function(value: any) {
      for (let index = 0; index < this.settings.accounts.length; index++) {
        const element = this.settings.accounts[index];
        if (element.value == value) {
          return element.text;
        }
      }
    }
  }
});
</script>