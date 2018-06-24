<template>
  <b-card id="listCard" header-tag="header">
      <h4 slot="header" class="mb-0">
      {{title}}
      </h4>
    <div class="row">
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days" @row-clicked="rowClicked"></b-table>
      </div>
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days2" @row-clicked="rowClicked"></b-table>
      </div>
      <div class="col-lg-4">
        <b-table small hover :fields="fields" :items="days3" @row-clicked="rowClicked"></b-table>
      </div>
    </div>
  </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      fields: ["date", "cash", "bank", "credit"],
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
        for (let index = 0; index < value.data.length; index++) {
          const element = value.data[index];
          var amount = element.cash + element.bank + element.credit;
          if (amount <= -10000) {
            element._rowVariant = 'danger';
          }

          if (index < 10) {
            self.days.push(element);
          } else if (index < 20) {
            self.days2.push(element);
          } else {
            self.days3.push(element);
          }
        }
      });
    },
    rowClicked: function(item: any, index: number, event: any) {
      this.$emit("date-clicked", item.date);
    }
  }
});
</script>
