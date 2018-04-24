<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo" backLabel="Home"></custom-toolbar>
    <div style="height: 20vh"></div>
    <v-ons-card>
        <v-ons-list>
            <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        
        <label class="center">
            Key in your credentials below
        </label>
      </v-ons-list-item>
        <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          username
        </div>
        <label class="center">
          <v-ons-input float maxlength="40"
            type="text" placeholder="user name" v-model="username"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
        <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          password
        </div>
        <label class="center">
          <v-ons-input float maxlength="40"
            type="password" placeholder="password" v-model="password"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
    <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        
        <label class="center">
            <v-ons-button modifier="large" @click="login()">Log In</v-ons-button>
        </label>
      </v-ons-list-item>
        </v-ons-list>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import Home from './Home.vue';
export default {
  data() {
    return {
        username: '',
        password: ''
    };
  },
  methods: {
      login () {
        this.$store.dispatch("ajax/login", {account: this.username, password: this.password})
        setTimeout(()=>{
            this.$store.dispatch('ajax/getWallet')
            this.$store.commit('navigator/pop')
        }, 3000)
        
      },
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
