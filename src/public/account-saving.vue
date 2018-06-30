<template>
    <b-card id="listCard" header-tag="header">
      <h4 slot="header" class="mb-0">
      <b-button @click="back"><i class="fas fa-arrow-left"></i></b-button>
      savings
      </h4>
      <b-card>
        <b-form inline>
          <b-form-group>
            <b-form-input type="date" v-model="item.date" class="mr-1" />
          </b-form-group>
          <b-form-group>
            <b-form-radio-group
                          buttons
                          button-variant="outline-primary"
                          v-model="item.action"
                          :options="actions" 
                          class="mr-1"/>
          </b-form-group><br class="visible-xs-block">
          <b-form-group>
            <b-form-radio-group id="btnradios2"
                          buttons
                          button-variant="outline-primary"
                          v-model="item.type"
                          :options="types" 
                          class="mr-1"/>
          </b-form-group>
            <b-input-group>
                <b-form-input  type="number" v-model="item.amount" placeholder="amount" class="mr-1"></b-form-input>
            </b-input-group>
            <b-button variant="primary" size="sm" @click="regist" >regist</b-button>
        </b-form>
      </b-card>
      <b-table small :fields="fields" :items="items">
        <template slot="typeColumn" slot-scope="data">{{getTypeName(data.item.type)}}</template>
        <template slot="deleteColumn" slot-scope="data">
          <b-button variant="secondary" size="sm" @click="deleteSaving(data.item.id)">削除</b-button>
        </template>
      </b-table>
    </b-card>
</template>
<script lang="ts">
import Vue from "vue";
import axios from "axios";
import moment from "moment";
import router from "./router";

export default Vue.extend({
  data() {
    return {
      seelected: null,
      item: {},
      items: [],
      date: null,
      actions: [{ text: "from", value: 1 }, { text: "to", value: -1 }],
      types: [{ text: "cash", value: 10 }, { text: "bank", value: 20 }],
      fields: [
        { key: "date", label: "日付" },
        { key: "typeColumn", label: "種別", sortable: true },
        { key: "amount", label: "金額", sortable: true },
        { key: "deleteColumn", label: "" }
      ]
    };
  },
  props: ["settings"],
  created: function() {
    var d = moment(new Date());
    this.item.date = d.format("YYYY-MM-DD");
    this.item.action = 1;
    this.item.type = 20;
    this.item.amount = 0;
    this.show();
  },
  methods: {
    regist: function() {
      this.item.amount = this.item.amount * this.item.action;

      var self = this;
      axios.put("./savings", this.item).then(value => {
        var v = {
          date: self.item.date,
          type: self.item.type,
          account: 991,
          amount: self.item.amount * -1
        };
        axios.put("./details", v);
        self.show();
      });
    },
    deleteSaving: function(value: any) {
      var self = this;
      axios.delete("./savings?id=" + value).then(value => self.show());
    },
    back: function() {
      router.push("/");
    },
    show: function() {
      this.selectedDate = this.$route.path.substring(1).replace(/\//g, "-");
      var self = this;
      axios.get("./savings").then(value => (self.items = value.data));
    },
    getTypeName: function(value: any) {
      for (let index = 0; index < this.settings.types.length; index++) {
        if (this.settings.types[index].value == value) {
          return this.settings.types[index].text;
        }
      }
    }
  }
});
</script>
