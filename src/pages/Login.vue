<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <div style="height: 20vh"></div>
    <v-ons-card>
        <v-ons-list>
            <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        
        <label class="center">
            Welcome to JTC Points!
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
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        
        <label class="center">
            <v-ons-button modifier="quiet" @click="toSignup()">Signup</v-ons-button>
        </label>
      </v-ons-list-item>
        </v-ons-list>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import Home from './Home.vue';
import Signup from './Signup.vue';
export default {
  data() {
    return {
        username: '',
        password: ''
    };
  },
  computed: {
      isLoginSuccessful () {
          return this.$store.state.ajax.loginStatus
      }
  },
  watch: {
      isLoginSuccessful(value) {
          if(value===false) {
              this.$ons.notification.alert('Your user name or password is entered incorrectly')
              this.$store.commit("ajax/setLoginStatus", '')
              this.username = ''
              this.password = ''
          }
          // else this.$store.commit("tabbar/set", 3, {root:true})
      }
  },
  methods: {
      login () {
        this.$store.dispatch("ajax/login", {account: this.username, password: this.password})
        console.log('done')
      },
      toSignup () {
        this.$store.commit("navigator/push", {
          extends: Signup,
          data() {
            return {
              toolbarInfo:{
                backLabel: 'Log In',
                title: 'Sign Up'
              }
            }
          }
        })
      }
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
