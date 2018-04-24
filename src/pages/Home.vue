<template>
    <v-ons-page>
        <v-ons-card>

            <v-ons-card style="background-color:#F4D03F;height:40%;">
                <v-ons-icon icon="md-balance-wallet" size="100px" style="position:absolute;left:50%;top:-4%;transform:translate(-50%,50%)"></v-ons-icon>
                <h1 style="text-align:center;vertical-align:middle;margin-top:35%;font-size:40px;">{{this.$store.state.ajax.wallet.balance}} pts</h1>
            </v-ons-card>
            <v-ons-card>
                <v-ons-segment style="width: 100%;">
                    <button @click="loadView(-1)">Pay</button>
                    <!-- <button @click="$store.dispatch('ajax/login')">Login</button> -->
                    <!-- <button @click="$store.dispatch('ajax/getWallet')">Get all products</button> -->
                    <button @click="loadView(1)">Gain</button>
                    <button @click="loadView(0)">Explore</button>
                </v-ons-segment>
            </v-ons-card>

            <v-ons-list-header>Transaction History</v-ons-list-header>
            <v-ons-list>
                <v-ons-list-item modifier="chevron" tappable>
                    <div class="left">
                        <v-ons-icon style="color:green;" icon="ion-plus-round" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        Gain from XXXX Event
                    </div>
                    <div class="right" style="font-weight:bold;color:green">
                        +5
                    </div>
                </v-ons-list-item>
                <v-ons-list-item modifier="chevron" tappable>
                    <div class="left">
                        <v-ons-icon style="color:red;" icon="ion-minus-round" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        Redeem Orange Juice
                    </div>
                     <div class="right" style="font-weight:bold;color:red">
                        -10
                    </div>
                </v-ons-list-item>
                <v-ons-list-item modifier="chevron" tappable>
                    <div class="left">
                        <v-ons-icon style="color:green;" icon="ion-plus-round" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        Gain from XXXX Event
                    </div>
                    <div class="right" style="font-weight:bold;color:green">
                        +15
                    </div>
                </v-ons-list-item>
                <v-ons-list-item modifier="chevron" tappable>
                    <div class="left">
                        <v-ons-icon style="color:red;" icon="ion-minus-round" class="list-item__icon"></v-ons-icon>
                    </div>
                    <div class="center">
                        Set up YYY Event
                    </div>
                     <div class="right" style="font-weight:bold;color:red">
                        -20
                    </div>
                </v-ons-list-item>

            </v-ons-list>

        </v-ons-card>

    </v-ons-page>
</template>
<script>
import Login from './Login.vue';
export default {
  data() {
    return {
    state: 'initial',
        login:{
          component:Login,
          label: 'Log In'
        }
    };
  },

  methods: {
    push(page, key) {
      this.$store.commit("navigator/push", {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: "Home",
              title: key
            }
          };
        }
      });
    },
    forcePush(page, key) {
      this.$store.commit("navigator/push", {
        extends: page,
        data() {
          return {
            toolbarInfo: {
            backLabel: false,
            title: key
            }
          };
        }
      });
    },
    loadView(index) {
      this.$store.commit("tabbar/set", index + 1);
      // this.$store.commit('splitter/toggle');
    }
  },
  beforeMount () {
    console.log(this.$store.state.ajax.logIn)
    if(!this.$store.state.ajax.logIn) {
        this.forcePush(this.login.component, this.login.label)
    }
  }
};
</script>

<style>
.intro {
  text-align: left;
  padding: 0 22px;
  margin-top: 20px;
  font-size: 14px;
  line-height: 1.4;
  color: rgba(0, 0, 0, 0.54);
}

ons-card {
  cursor: pointer;
  color: #333;
}

.card__title,
.card--material__title {
  font-size: 20px;
}
</style>
