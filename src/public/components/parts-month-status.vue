<template>
  <b-card-group deck style="margin-top:20px">
      <b-card bg-variant="light" header="expenses(cash)">
        <div class="row">
            <div class="col" v-for="item in items1" v-bind:key="item.group">
                <div>{{getGroupName(item.group)}}</div>
                <div>{{item.amount}}</div>
            </div>
        </div>
      </b-card>
      <b-card bg-variant="light" header="expenses(bank)">
        <div class="row">
            <div class="col" v-for="item in items2" v-bind:key="item.group">
                <div>{{getGroupName(item.group)}}</div>
                <div>{{item.amount}}</div>
            </div>
        </div>
      </b-card>
      <b-card bg-variant="light" header="expenses(credit)">
        <div class="row">
            <div class="col" v-for="item in items3" v-bind:key="item.group">
                <div>{{getGroupName(item.group)}}</div>
                <div>{{item.amount}}</div>
            </div>
        </div>
      </b-card>
  </b-card-group>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import axios from "../axiosForApi";

export default Vue.extend({
  data() {
    return {
      items1: [],
      items2: [],
      items3: []
    };
  },
  props: ["settings", "selectedMonth"],
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
      this.items = [];
      var url = "./status?month=" + this.selectedMonth;
      axios.get(url).then(value => {
        this.items1 = [];
        this.items2 = [];
        this.items3 = [];
        
        for (let index = 0; index < value.data.length; index++) {
          const element = value.data[index];
          if (element.group < 500) {
            continue;
          }

          if (element.type == 10) {
            this.items1.push(element);
          } else if (element.type == 20) {
            this.items2.push(element);
          } else {
            this.items3.push(element);
          }
        }
      });
    },
    getGroupName: function(value: any) {
      for (let index = 0; index < this.settings.groups.length; index++) {
        const element = this.settings.groups[index];
        if (element.value == value) {
          return element.text;
        }
      }
    }
  }
});
</script>
