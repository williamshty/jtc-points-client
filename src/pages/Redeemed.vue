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
        <v-ons-col width="50px"></v-ons-col>
        <v-ons-col width="50px"><v-ons-icon icon="ion-ios-clock" size="40px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:20px;">{{QR.dateCreated}}</b></v-ons-col>
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
      redeemProduct (productId) {
          console.log(productId)
        this.$store.dispatch("ajax/redeemProduct", {productId:productId})
        setTimeout(()=>{
            this.$store.dispatch('ajax/getWallet')
            this.$store.dispatch('ajax/getAllProducts')
            this.$store.dispatch('ajax/getAllQR')
            this.$store.commit('navigator/pop')
        }, 3000)   
      }
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
