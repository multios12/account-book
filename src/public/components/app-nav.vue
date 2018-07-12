<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="navbar-brand" href="/">account-book</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-form-select v-model="selectedMonth" :options="months" @change="changeMonth" class="mr-1" />
        </b-navbar-nav>
          <b-nav-text class="mr-1"> 残高{{balance}}</b-nav-text>
      <b-navbar-nav is-nav class="mr-1 float-left">
        <router-link to="/saving" class="btn btn-secondary"><i class="fas fa-piggy-bank"></i></router-link>
      </b-navbar-nav>
      <b-navbar-nav is-nav class="mr-1 float-left">
        <router-link to="/transfer" class="btn btn-secondary"><i class="fas fa-exchange-alt"></i></router-link>
      </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav is-nav class="float-left">
        <router-link to="/today" class="btn btn-secondary mr-1">today</router-link>
        <router-link to="/settings" class="btn btn-secondary"><i class="fas fa-cog"></i></router-link>
      </b-navbar-nav>
    </nav>    
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import axios from "axios";
import router from "../router";

export default Vue.extend({
  data() {
    return {
      months: [],
      selectedMonth: null
    };
  },
  props: ["settings", "balance"],
  created: function() {
    var nowDate = new Date();
    for (let index = -6; index <= 6; index++) {
      var targetDate = moment(nowDate).add(index, "months");
      this.months.push({
        value: targetDate.format("YYYY-MM"),
        text: targetDate.format("YYYY-MM")
      });
    }
    this.selectedMonth = moment(new Date()).format("YYYY-MM");
  },
  methods: {
    changeMonth: function(value: any) {
      this.selectedMonth = value;
      router.push(moment(value + "-01").format("/YYYY/MM"));
    },
    changeMonthToNow: function() {
      this.selectedMonth = moment(new Date()).format("YYYY-MM");
      router.push(moment(new Date()).format("/YYYY/MM"));
    },
    dateClicked: function(targetdate: string) {
      var d = moment(new Date());
      var p = d.format("/YYYY/MM/DD");
      router.push(p);
    }
  }
});
</script>

<style>
.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
 