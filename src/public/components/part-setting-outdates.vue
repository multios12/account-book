<template>
  <div>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">締め日の変更</h1>
      <!--設定をデフォルトにもどす
      <b-btn-toolbar class="mb-2 mb-md-0">
        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
        <span data-feather="calendar"></span>initialize Settings
        </button>
      </b-btn-toolbar>
      -->
    </div>
    <div class="table-responsive">
      <b-form inline>
        <b-form-select v-model="selectedMonth" :options="months" @change="changeMonth" class="mr-1" />
        -
        <b-input v-model="selectedDay" type="number" />
        <b-button variant="primary" size="sm" @click="regist" >regist</b-button>
      </b-form>
      <b-table small :fields="fields" :items="settings.outdates">
        <template slot="deleteColumn" slot-scope="data">
          <b-button variant="secondary" size="sm" @click="deleteRow(data.index)">delete</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "../axiosForApi";
import moment from "moment";

export default Vue.extend({
  data() {
    return {
      fields: [
        { key: "outdate", sortable: true },
        { key: "deleteColumn", label: " " }
      ],
      items: [],
      months: [],
      selectedMonth: null,
      selectedDay: null
    };
  },
  props: ["settings"],
  created: function() {
    var nowDate = new Date();
    for (let index = -6; index <= 6; index++) {
      var targetDate = moment(nowDate).add(index, "months");
      this.months.push({
        value: targetDate.format("YYYY-MM"),
        text: targetDate.format("YYYY-MM")
      });
    }
    this.items = this.settings.outdates;
    this.selectedMonth = moment(new Date()).format("YYYY-MM");
    this.changeMonth();
  },
  watch: {
    items: function() {
      this.items = this.settings.outdates;
    }
  },
  methods: {
    changeMonth: function() {
      var dates = this.getFirstAndLastDay(this.selectedMonth);
      this.selectedDay = moment(dates.endDate).format("DD");
    },
    regist: function() {
      var self = this;
      axios
        .post("./settings/outdates", {
          outdate: self.selectedMonth + "-" + self.selectedDay
        })
        .then(value =>{
          self.settings.outdates.splice(0, self.settings.outdates.length);
          self.settings.outdates.push(value.data);
          console.log(self.settings.outdates);
        });
    },
    deleteRow: function(index: number) {
      this.items.splice(index, 1);
      this.items.sort();
    },
    getFirstAndLastDay: function(month: string) {
      var startDate = new Date(month + "-1");
      var endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
      );
      var startMoment = moment(startDate).format("YYYY-MM-DD");
      var endMoment = moment(endDate).format("YYYY-MM-DD");

      return {
        start: startMoment,
        end: endMoment,
        startDate: startDate,
        endDate: endDate
      };
    }
  }
});
</script>
