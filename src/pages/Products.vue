<template>
  <v-ons-page>
    <!-- <custom-toolbar v-bind="toolbarInfo"></custom-toolbar> -->
    <div>
        <v-ons-card v-for="product in this.$store.state.ajax.products" :key="product.productId">
       <div class="title">
        {{product.name}}
       </div>
       <div class="content">
        <img :src="baseUrl+'product/avatar/'+product.productId" :alt="product.name" style="width:100%">
        <v-ons-row>
        <v-ons-col vertical-align="center">{{product.description}}</v-ons-col>
        <!-- <v-ons-col width="50px"><v-ons-icon icon="ion-ios-calendar" size="30px"></v-ons-icon> </v-ons-col> -->
      </v-ons-row>
      <v-ons-row v-if="parseInt(product.inventory) < 10 && parseInt(product.inventory)!==0">
        <v-ons-col vertical-align="center"><b style="font-size:16px;color:red">Only {{product.inventory}} left</b></v-ons-col>
        <v-ons-col width="40px"><v-ons-icon icon="ion-social-usd" size="40px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">{{product.price}} points</b></v-ons-col>
        <v-ons-col vertical-align="center"><v-ons-button @click="redeemProduct(product.productId)">Redeem</v-ons-button></v-ons-col>
      </v-ons-row>
      <v-ons-row v-else-if="parseInt(product.inventory) >= 10">
        <v-ons-col vertical-align="center"><b style="font-size:16px;color:green">Available</b></v-ons-col>
        <v-ons-col width="40px"><v-ons-icon icon="ion-social-usd" size="40px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">{{product.price}} points</b></v-ons-col>
        <v-ons-col vertical-align="center"><v-ons-button @click="redeemProduct(product.productId)">Redeem</v-ons-button></v-ons-col>
      </v-ons-row>
      <v-ons-row v-else-if="parseInt(product.inventory) <=0">
        <v-ons-col vertical-align="center"><b style="font-size:16px;color:red">Unavailable</b></v-ons-col>
        <v-ons-col width="40px"><v-ons-icon icon="ion-social-usd" size="40px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">{{product.price}} points</b></v-ons-col>
        <v-ons-col vertical-align="center"><v-ons-button :disabled="true" @click="redeemProduct(product.productId)">Redeem</v-ons-button></v-ons-col>
      </v-ons-row>
       </div>
    </v-ons-card>
    </div>
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
  computed: {
      isRedeemSuccessful () {
          return this.$store.state.ajax.redeemStatus
      }
  },
  watch: {
      isRedeemSuccessful(value) {
          if(value===false) {
              this.$ons.notification.alert('Your redemption failed, please make sure you have enough balance and we have enough stock')
              this.$store.commit("ajax/setRedeemStatus", '')
          }
          if(value===true) {
              this.$ons.notification.alert('Your redemption is successful, you can view your code redeemed in the products thread')
              this.$store.commit("ajax/setRedeemStatus", '')
          }
      }
  },
  methods: {
      redeemProduct (productId) {
          console.log(productId)
        this.$store.dispatch("ajax/redeemProduct", {productId:productId})
        // setTimeout(()=>{
        //     this.$store.dispatch('ajax/getWallet')
        //     this.$store.dispatch('ajax/getAllProducts')
        //     this.$store.dispatch('ajax/getAllQR')
        //     this.$store.commit('navigator/pop')
        // }, 3000)   
      }
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
