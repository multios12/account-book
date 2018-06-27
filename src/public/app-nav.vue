<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <b-navbar-brand class="navbar-brand" @click="changeMonthToNow()">account-book</b-navbar-brand>
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

export default Vue.extend({
  data() {
    return {
      selectedDate: null,
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
})
</script>
