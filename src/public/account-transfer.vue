<template>
  <b-card id="listCard" header-tag="header" footer-tag="footer">
    <h4 slot="header" class="mb-0">
      <b-button @click="back"><i class="fas fa-arrow-left"></i></b-button>
        transfer
      </h4>
      <b-container>
        <b-row class="my-1">
          <b-col sm="3"><label for="dateInput">date</label></b-col>
          <b-col sm="9"><b-form-input id="dateInput" type="date" v-model="item.date" /></b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3"><label for="fromInput">from</label></b-col>
          <b-col sm="9">
            <b-form-radio-group
                id="fromInput"
                buttons
                button-variant="outline-primary"
                v-model="item.from"
                :options="froms" />
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3"><label for="toInput">to</label></b-col>
          <b-col sm="9">
            <b-form-radio-group id="toInput"
                          buttons
                          button-variant="outline-primary"
                          v-model="item.to"
                          :options="tos"
                          class="mr-1" />
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3"><label for="amountInput">amount</label></b-col>
          <b-col sm="9">
            <b-form-input id="amountInput" type="number" v-model="item.amount" placeholder="amount" class="mr-1"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <b-input-group slot="footer">
        <b-button variant="primary" size="sm" @click="regist" >regist</b-button>
      </b-input-group>
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
      item: {
        date: moment(new Date()).format("YYYY-MM-DD"),
        from:20,to:10,
        amount: 0
      },
      froms: [{ text: "cash", value: 10 }, { text: "bank", value: 20 }],
      tos: [
        { text: "cash", value: 10 },
        { text: "bank", value: 20 },
        { text: "credit", value: 30 }
      ]
    };
  },
  props: ["settings"],
  created: function() {
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
    back: function() {
      router.push("/");
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
