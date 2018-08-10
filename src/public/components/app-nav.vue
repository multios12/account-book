<template>
  <b-navbar class="navbar navbar-expand-md navbar-dark bg-dark fixed-top"  v-if="this.$route.path != '/login'">
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
        <router-link to="/transfer" class="btn btn-secondary mr-1"><i class="fas fa-exchange-alt"></i></router-link>
      </b-navbar-nav>
      <b-navbar-nav is-nav class="float-left" right>
        <router-link to="/today" class="btn btn-secondary mr-1">today</router-link>
      </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <i class="fas fa-user"></i>
        </template>
        <b-dropdown-item href="#/settings"><i class="fas fa-cog"></i>settings</b-dropdown-item>
        <b-dropdown-item href="#/logout"><i class="fas fa-sign-out-alt"></i>signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
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
 