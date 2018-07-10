<template>
  <b-card id="listCard" header-tag="header" class="mx-1">
      <h4 slot="header" class="mb-0">
      {{selectedMonth}}
        <router-link :to="$route.path + '/report'">report</router-link>
      </h4>
    <div class="row">
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days" @row-clicked="rowClicked">
          <template slot="dateColumn" slot-scope="data"><span :class="data.item.class">{{data.item.shortdate}}</span></template>
        </b-table>
      </div>
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days2" @row-clicked="rowClicked">
          <template slot="dateColumn" slot-scope="data"><span :class="data.item.class">{{data.item.shortdate}}</span></template>
        </b-table>
      </div>
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days3" @row-clicked="rowClicked">
          <template slot="dateColumn" slot-scope="data"><span :class="data.item.class">{{data.item.shortdate}}</span></template>
        </b-table>
      </div>
    </div>
    <app-status :selected-month="selectedMonth" :settings="settings"></app-status>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import moment from "moment";
import statusComponent from "./parts-month-status.vue";
import router from "../router";

export default Vue.extend({
  data() {
    return {
      fields: [{ key: "dateColumn", label: "date" }, "cash", "bank", "credit"],
      days: [],
      days2: [],
      days3: [],
      selectedMonth: null
    };
  },
  components: { "app-status": statusComponent },
  props: ["settings"],
  computed: {
    title: function() {
      this.selectedMonth;
    }
  },
  watch: { $route: "show" },
  created: function() {
    this.show();
  },
  methods: {
    show: function() {
      var value: string = this.$route.path;
      value = value.substring(1);
      this.selectedMonth = value.replace(/\//g, "-");

      var self = this;
      var url = "./days?month=" + this.selectedMonth;
      axios.get(url).then(value => {
        self.days = [];
        self.days2 = [];
        self.days3 = [];

        var nowDate = moment(new Date()).format("YYYY-MM-DD");
        var total: number = 0;
        for (let index = 0; index < value.data.length; index++) {
          const element = value.data[index];
          var amount = element.cash + element.bank + element.credit;
          total += amount;
          if (amount <= -10000) {
            element._rowVariant = "danger";
          }

          var d = new Date(element.date);
          if (d.getDay() == 0) {
            element.class = "text-danger";
          } else if (d.getDay() == 6) {
            element.class = "text-primary";
          } else {
            element.class = "";
          }

          if (element.date == nowDate) {
            element.class += " font-weight-bold";
          }

          element.shortdate = moment(element.date).format("MM-DD");

          if (index < 10) {
            self.days.push(element);
          } else if (index < 20) {
            self.days2.push(element);
          } else {
            self.days3.push(element);
          }
        }
        this.$emit("balance-changed", total);
      });
    },
    rowClicked: function(item: any, index: number, event: any) {
      var d = moment(item.date);
      var p = d.format("/YYYY/MM/DD");
      router.push(p);
    }
  }
});
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
 
