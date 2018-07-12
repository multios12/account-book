<template>
  <div class="container-fluid">
		<b-row>
			<b-nav class="col-md-2 d-none d-md-block bg-dark sidebar" style="min-height:600px;">
        <b-nav-item active class="flex-column"><router-link to="/settings/accounts">科目</router-link></b-nav-item>
        <b-nav-item><router-link to="/settings/outdates">締め日</router-link></b-nav-item>
      </b-nav>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
		</b-row>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import axios from "axios";
import router from "../router";

export default Vue.extend({
  data() {
    return {
      months: []
    };
  },
  props: ["settings"],
  created: function() {
    var nowMoment = moment(new Date());
    for (let index = 0; index <= 6; index++) {
      var targetDate = nowMoment.add(index, "months").format("YYYY-MM");
      this.months.push({ value: targetDate, text: targetDate });
    }
  },
  methods: {
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
