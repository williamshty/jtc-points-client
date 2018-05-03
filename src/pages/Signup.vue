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
                        <password 
                        placeholder="password" 
                        v-model="password"
                        :toggle="true"
                        @score="showScore"
                        @feedback="showFeedback"></password>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
                    <div class="left">
                        confirm
                    </div>
                    <label class="center">
                        <v-ons-input float maxlength="40" type="password" placeholder="enter your password again" v-model="password2">
                        </v-ons-input>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
                    <label class="center" v-if="(password!==password2)&&(password2!=='')&&(suggestions.length===0)">
                       <b style="color:#96281B;">Your two passwords do not match</b>
                    </label>
                    <label class="center" v-if="suggestions.length!==0">
                       <b style="color:#E67E22;">{{suggestions[0]}}</b>
                    </label>
                </v-ons-list-item>
                <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">

                    <label class="center">
                        <v-ons-button :disabled="(password!==password2)||(suggestions.length!==0)||(username==='')||(password==='')||(password2==='')" modifier="large" @click="signup()">Sign Up</v-ons-button>
                    </label>
                </v-ons-list-item>
            </v-ons-list>
        </v-ons-card>
    </v-ons-page>
</template>
<script>
// import Home from './Home.vue';
import Password from 'vue-password-strength-meter'
export default {
  data() {
    return {
        username: '',
        password: '',
        password2: '',
        suggestions:[]
    };
  },
  components: {
      Password
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
      },
      showFeedback ({suggestions, warning}) {
        console.log('🙏', suggestions)
        this.suggestions = suggestions
        console.log('⚠', warning)
      },
      showScore (score) {
        console.log('💯', score)
      }
  },
  beforeMount() {
  }
};
</script>

<style scoped>

</style>
