<template>
    <b-card id="listCard" header-tag="header">
      <h4 slot="header" class="mb-0">
      <b-button @click="back"><i class="fas fa-arrow-left"></i></b-button>
      {{title}}
      </h4>
      <b-card>
        <b-form inline>
            <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-select v-model="type" :options="settings.types"/>
            </b-input-group>
            <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-select v-model="account" :options="settings.accounts"/>
            </b-input-group>
            <b-input-group  class="mb-2 mr-sm-2 mb-sm-0">
                <b-form-input  type="number" v-model="amount" placeholder="金額"></b-form-input>
            </b-input-group>
            <b-button variant="primary" size="sm" @click="regist" >regist</b-button>
        </b-form>
      </b-card>
      <b-table small :fields="fields" :items="items">
        <template slot="typeColumn" slot-scope="data">{{getTypeName(data.item.type)}}</template>
        <template slot="accountColumn" slot-scope="data">{{getAccountName(data.item.account)}}</template>
        <template slot="deleteColumn" slot-scope="data">
          <b-button variant="secondary" size="sm" @click="deleteDetail(data.item.id)">削除</b-button>
        </template>
      </b-table>
    </b-card>
</template>

<script lang="ts">
import Vue from "vue";
import moment from "moment";
import axios from "axios";
import router from "./router";

export default Vue.extend({
  data() {
    return {
      fields: [
        { key: "date", label: "日付", sortable: true },
        { key: "typeColumn", label: "種別", sortable: true },
        { key: "accountColumn", label: "科目", sortable: true },
        { key: "amount", label: "金額", sortable: true },
        { key: "deleteColumn", label: "", sortable: false }
      ],
      items: [],
      id: null,
      type: 10,
      account: 500,
      amount: 0,
      selectedDate: null
    };
  },
  props: ["settings"],
  watch: { $route: "show" },
  computed: {
    title: function() {
      return this.selectedDate;
    }
  },
  created: function() {
    this.show();
  },
  methods: {
    regist: function() {
      var value;
      if (this.account >= 500) {
        value = this.amount * -1;
      } else {
        value = this.amount;
      }

      var data = {
        date: this.selectedDate,
        type: this.type,
        account: this.account,
        amount: value
      };

      var self = this;
      axios.put("./details", data).then(value => self.show());
    },
    deleteDetail: function(value: any) {
      var self = this;
      axios.delete("./details?id=" + value).then(value => self.show());
    },
    initial: function() {
      var nowDate = new Date();
      this.type = 10;
      this.account = 500;
      this.mount = 0;
    },
    show: function() {
      var value: string = this.$route.path;
      value = value.substring(1);
      this.selectedDate = value.replace(/\//g, "-");
      var self = this;
      axios.get("./details?date=" + this.selectedDate).then(value => {
        self.items = value.data;
      });
    },
    back: function() {
      router.push(this.$route.path.substring(0, 8));
    },
    getTypeName: function(value: any) {
      for (let index = 0; index < this.settings.types.length; index++) {
        const element = this.settings.types[index];
        if (element.value == value) {
          return element.text;
        }
      }
    },
    getAccountName: function(value: any) {
      for (let index = 0; index < this.settings.accounts.length; index++) {
        const element = this.settings.accounts[index];
        if (element.value == value) {
          return element.text;
        }
      }
    }
  }
});
</script>

<style>
.listCard {
  padding-top: 4.5rem;
}

.custom-select {
  -webkit-appearance: none;
  -moz-appearance: none;
}
</style>
 
