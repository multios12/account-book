<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <b-navbar-brand class="navbar-brand"><router-link to="/">account-book</router-link></b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-form-select v-model="selectedMonth" :options="months" @change="changeMonth" />
        </b-navbar-nav>
          <b-nav-text> 残高{{balance}}</b-nav-text>
      </b-collapse>
      <b-navbar-nav is-nav class="float-left">
        <b-nav-item active @click="dateClicked()">today</b-nav-item>
      </b-navbar-nav>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    </nav>    
</template>

<script lang="ts">
import Vue from 'vue'
import moment from "moment";
import axios from "axios";
import router from './router'

export default Vue.extend({
  data() {
    return {
      months: [],
      balance: 0
    };
  },
  props:['settings', 'selectedMonth'],
  created: function() {
    var nowDate = new Date();
    for (let index = -6; index <= 6; index++) {
      var targetDate = moment(nowDate).add(index, "months");
      this.months.push({
        value: targetDate.format("YYYY-MM"),
        text: targetDate.format("YYYY-MM")
      });
    }
  },
  methods:{
    changeMonth: function(value: any) {
      if (value == null) {
        value = this.selectedMonth;
        return;
      }

      value = value + '-01'
      var d = moment(value);
      var p = d.format("/YYYY/MM");

      router.push(p);
    },
    changeMonthToNow: function() {
      var targetDate = moment(new Date()).format("YYYY-MM");
      this.changeMonth(targetDate);
    },
    dateClicked: function(targetdate: string) {
      var d = moment(new Date());
      var p = d.format("/YYYY/MM/DD");
      router.push(p);
    },
  }
})
</script>

<style>
.custom-select {
    -webkit-appearance: none;
    -moz-appearance: none;
}
</style>
 