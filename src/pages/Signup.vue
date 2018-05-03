<template>
    <v-ons-page>
        <custom-toolbar v-bind="toolbarInfo" backLabel="Log In"></custom-toolbar>
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
                        <v-ons-input float maxlength="40" type="text" placeholder="user name" v-model="username">
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
                    <div class="left">
                        password
                    </div>
                    <label class="center">
                        <v-ons-input float maxlength="40" type="password" placeholder="password" v-model="password">
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
                    <div class="left">
                        confirm password
                    </div>
                    <label class="center">
                        <v-ons-input float maxlength="40" type="password" placeholder="password" v-model="password2">
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
                    <label class="center" v-if="password!==password2">
                       <b style="color:red;">Your two passwords do not match</b>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">

                    <label class="center">
                        <v-ons-button modifier="large" @click="signup()">Sign Up</v-ons-button>
                    </label>
                </v-ons-list-item>
            </v-ons-list>
        </v-ons-card>
    </v-ons-page>
</template>
<script>
// import Home from './Home.vue';
export default {
  data() {
    return {
        username: '',
        password: '',
        password2: ''
    };
  },
  computed: {
      isSignupSuccessful () {
          return this.$store.state.ajax.signupStatus
      }
  },
  watch: {
      isSignupSuccessful(value) {
          if(value!==true) {
              this.$ons.notification.alert('Your user name is already in use')
              this.$store.commit("ajax/setSignupStatus", true)
              this.username = ''
              this.password = ''
              this.password2 = ''
          }
      }
  },
  methods: {
      signup () {
        this.$store.dispatch("ajax/signup", {account: this.username, password: this.password})
      }
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
