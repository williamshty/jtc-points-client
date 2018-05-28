<template>
    <v-ons-page>
        <v-ons-card>

            <v-ons-card class="card-wallet">
                <v-ons-icon icon="md-balance-wallet" size="100px" style="" class="wallet-icon"></v-ons-icon>
                <h4 style="text-align:center;vertical-align:middle;margin-top:5rem;font-size:20px;">Your Balance:</h4>
                <h1 style="text-align:center;vertical-align:middle;margin-top:-0.2rem;font-size:40px;">
                    {{this.$store.state.ajax.wallet.balance}} points</h1>
            </v-ons-card>
            <!-- <v-ons-card>
                <p>This is the balance points you can use to redeem products and create events</p>
            </v-ons-card> -->
            <!-- <v-ons-card>
                <v-ons-segment style="width: 100%;">
                    <button @click="push(favorite.component, favorite.label)">Favorites</button>
                    <button @click="push(redeemed.component, redeemed.label)">Redeemed</button>
                    <button @click="push(attend.component, attend.label)">Attend</button>
                </v-ons-segment>
            </v-ons-card> -->
        <v-ons-card class="card-add-new" @click="push(addNew.component, addNew.label)">
            <v-ons-icon class="card__icon--left" icon="fa-plus-circle" size="40px"></v-ons-icon>
                <div class="card__caption">Add Event</div>
                <div class="card__subtext">Add a new event</div>
        </v-ons-card>
        
        <v-ons-card class="card-favorite" @click="push(favorite.component, favorite.label)">
            <v-ons-icon class="card__icon--left" icon="ion-star" size="40px"></v-ons-icon>
                <div class="card__caption">Favorite</div>
                <div v-if="this.$store.state.ajax.allFavoriteEvents.length!==0" class="card__subtext">You have <b>{{this.$store.state.ajax.allFavoriteEvents.length}}</b> favorite events</div>
                <div v-else class="card__subtext">You do not have any favorite events</div>
        </v-ons-card>

        <v-ons-card class="card-redeemed" @click="push(redeemed.component, redeemed.label)">
            <v-ons-icon class="card__icon--left" icon="ion-trophy" size="40px"></v-ons-icon>
                <div class="card__caption">Redeemed</div>
                <div v-if="this.$store.state.ajax.allQR.length!==0" class="card__subtext">You have redeemed <b>{{this.$store.state.ajax.allQR.length}}</b> products</div>
                <div v-else class="card__subtext">You have not redeemed any product</div>
            
        </v-ons-card>

        <v-ons-card class="card-attend" @click="push(attend.component, attend.label)">
            <v-ons-icon class="card__icon--left" icon="ion-qr-scanner" size="40px"></v-ons-icon>
                <div class="card__caption">Attend</div>
                <div class="card__subtext">Open the QR scanner to scan the event QR code</div>
        </v-ons-card>
    </v-ons-card>

    </v-ons-page>
</template>
<script>
import Login from './Login.vue';
import Camera from './Camera.vue';
import Redeemed from './Redeemed.vue';
import Favorites from './Favorites.vue';
import AddNewEvent from './AddNewEvent.vue';
export default {
  data() {
    return {
    state: 'initial',
        login:{
          component:Login,
          label: 'Log In'
        },
        attend:{
            component: Camera,
            label: 'Attend an Event'
        },
        redeemed: {
            component: Redeemed,
            label: 'Redeemed Products'
        },
        favorite: {
            component: Favorites,
            label: 'Favorite Events'
        },
        addNew: {
            component: AddNewEvent,
            label: 'Add New Event'
        }
    };
  },
  computed: {
      isLoggedIn () {
          return this.$store.state.ajax.login
      }
  },
  watch: {
      isLoggedIn(value) {
          if(value!==true) {
              this.forcePush(this.login.component, this.login.label)
          }
      }
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
      console.log()
    if(localStorage.getItem('token')!==null&&localStorage.getItem('token')!==''){
        this.$store.commit("ajax/setLogin", true)
        this.$store.dispatch("ajax/getWallet")
        this.$store.dispatch("ajax/getAllProducts")
        this.$store.dispatch("ajax/getAllQR")
        this.$store.dispatch("ajax/getOwnEvent")
        this.$store.dispatch("ajax/getAllEvent")
        this.$store.dispatch("ajax/getAllFavoriteEvent")
    }
    if(!this.$store.state.ajax.login) {
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
.wallet-icon {
    position:absolute;
    left:50%;
    top:-1.6rem;
    transform:translate(-50%,50%);
}

.card__title,
.card--material__title {
  font-size: 20px;
}

.card__caption{
    position:relative;
    font-size:2.8rem;
    color:#ffffff;
    display:inline;
    top:-0.5rem;
    left:1rem;
}
.card__subtext{
    position:relative;
    font-size:0.8rem;
    color:#ffffff;
    top:-0.6rem;
    left:3.5rem;
    width:14rem;
}
.card__icon--left{
    position:relative;
    display:inline;
    color:#ffff;
}

.card__icon--right{
    position:relative;
    display:inline;
    color:#ffff;
}
.card-wallet{
    background-image: linear-gradient(to bottom,rgba(244, 208, 63,0.9),rgba(244, 208, 63,0.7));
    height:12.5rem;
}
.card-favorite{
    height: 6rem;
    background-image: linear-gradient(to right,rgba(140, 10, 85,0.9),rgba(140, 10, 85,0.55))
}
.card-redeemed{
    height: 6rem;
    background-image: linear-gradient(to right,rgba(0, 87, 185,0.9),rgba(0, 87, 185,0.55))
}
.card-attend{
    height: 6rem;
    background-image: linear-gradient(to right,rgba(5, 120, 130,0.8),rgba(5, 120, 130,0.55))
}
.card-add-new{
    height: 6rem;
    background-image: linear-gradient(to right,rgba(172, 25, 52, 0.9),rgba(172, 25, 52,0.55))
}
</style>
