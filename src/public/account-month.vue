<template>
  <b-card id="listCard" header-tag="header">
      <h4 slot="header" class="mb-0">
      {{title}}
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
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import moment from "moment";

export default Vue.extend({
  data() {
    return {
      fields: [{key:"dateColumn", label:"date"}, "cash", "bank", "credit"],
      settings: {},
      days: [],
      days2: [],
      days3: []
    };
  },
  props: ["selectedDate", "selectedMonth"],
  computed: {
    title: function() {
      return this.selectedMonth;
    }
  },
  watch: {
    selectedMonth: function() {
      this.show();
    }
  },
  created: function() {
    this.show();
  },
  methods: {
    show: function() {
      var self = this;
      var url = "./days?month=" + this.selectedMonth;
      axios.get(url).then(value => {
        self.days = [];
        self.days2 = [];
        self.days3 = [];

        var nowDate = moment(new Date()).format('YYYY-MM-DD');
        var total: number = 0;
        for (let index = 0; index < value.data.length; index++) {
          const element = value.data[index];
          var amount = element.cash + element.bank + element.credit;
          total += amount;
          if (amount <= -10000) {
            element._rowVariant = 'danger';
          }

          var d = new Date(element.date);
          if(d.getDay() == 0) {
            element.class = "text-danger"; 
          } else if(d.getDay() == 6) {
            element.class = "text-primary";
          } else {
            element.class = "";
          }

          if(element.date == nowDate) {
            element.class += " font-weight-bold";
          }

          element.shortdate = moment(element.date).format('MM-DD');

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
      this.$emit("date-clicked", item.date);
    }
  }
});
</script>
