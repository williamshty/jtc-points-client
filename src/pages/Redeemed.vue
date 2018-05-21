<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-card v-for="QR in this.$store.state.ajax.allQR" :key="QR._id">
       <div class="title">
           {{QR.name}}
       </div>
       <div class="content">
        <img :src="baseUrl+'product/qr/getById/'+QR._id" :alt="QR.name" style="width:100%">
        <v-ons-row>
      </v-ons-row>
      <v-ons-row>
        <v-ons-col width="20px"></v-ons-col>
        <v-ons-col width="120px"><span style="font-size:18px;">Redeemed at:</span></v-ons-icon> </v-ons-col>
        <v-ons-col ><b style="font-size:18px;">{{QR.dateCreated.substring(0, QR.dateCreated.length - 3)}}</b></v-ons-col>
      </v-ons-row>
       </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import { baseUrl } from "../const.js";
export default {
  data() {
    return {
        baseUrl:baseUrl
    };
  },
  methods: {
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
