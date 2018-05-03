<template>
  <v-ons-page modifier="white">
   <v-ons-list-title>Access</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item @click="logout()">
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" icon="ion-android-exit"></v-ons-icon>
        </div>
        <div class="center">
          Log Out
        </div>
        <div class="right">
          <!-- <v-ons-icon icon="fa-link"></v-ons-icon> -->
        </div>
      </v-ons-list-item>
      <!-- <v-ons-list-item v-for="(item, index) in access" :key="item.title"
        :modifier="md && 'nodivider'"
        @click="loadView(index)">
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-link"></v-ons-icon>
        </div>
      </v-ons-list-item> -->
    </v-ons-list>
    <!-- <v-ons-list-title style="margin-top: 10px">Links</v-ons-list-title>
    <v-ons-list>
      <v-ons-list-item v-for="item in links" :key="item.title"
        @click="loadLink(item.url)"
      >
        <div class="left">
          <v-ons-icon fixed-width class="list-item__icon" :icon="item.icon"></v-ons-icon>
        </div>
        <div class="center">
          {{ item.title }}
        </div>
        <div class="right">
          <v-ons-icon icon="fa-external-link"></v-ons-icon>
        </div>
      </v-ons-list-item>
    </v-ons-list> -->
  </v-ons-page>
</template>

<script>
import Login from './Login.vue'
export default {
  methods: {
    loadView(index) {
      this.$store.commit('tabbar/set', index + 1);
      this.$store.commit('splitter/toggle');
    },
    loadLink(url) {
      window.open(url, '_blank');
    },
    logout() {
      this.$store.dispatch('ajax/logout')
    }
  },
  data() {
    return {
      links: [
        {
          title: 'Web App',
          icon: 'ion-android-compass',
          url: 'https://williamshty.github.io/jtcpoints/'
        },
        {
          title: 'Github',
          icon: 'ion-social-github',
          url: 'https://github.com/williamshty/williamshty.github.io'
        },
        {
          title: 'Code',
          icon: 'ion-code',
          url: 'https://github.com/williamshty/williamshty.github.io/tree/master/jtcpoints'
        }
      ],
      access: [
        {
          title: 'Happenings',
          icon: 'ion-ios-flower, material: md-flower'
        },
        {
          title: 'MyEvents',
          icon: 'ion-ios-speedometer, material: md-landscape'
        },
        {
          title: 'Home',
          icon: 'ion-home, material:md-home'
        }
      ]
    };
  }
};
</script>

<style scoped>
.profile-pic {
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #DDD;
  color: rgba(0, 0, 0, .56);
  padding-bottom: 8px;
}
.page--material .profile-pic {
  background-color: #f6f6f6;
}

.profile-pic > img {
  display: block;
  max-width: 100%;
}
</style>

<style>
.page--material__background.page--white__background {
  background-color: #fff;
}
</style>
