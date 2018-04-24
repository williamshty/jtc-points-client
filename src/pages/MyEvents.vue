<template>
  <v-ons-page>
    <!-- <custom-toolbar v-bind="toolbarInfo"></custom-toolbar> -->
    <v-ons-card>
      <v-ons-button 
    modifier="outline large" 
    style="margin: 6px 2px;" 
    @click="push(addEventPage.component, addEventPage.label)">
    Add New Event</v-ons-button>
    </v-ons-card>
    <v-ons-card @click="push(viewEventDetails.component, viewEventDetails.label)">
      <div class="title">
        Event 1
      </div>
      <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg" alt="Onsen UI" style="width: 100%;">
      <v-ons-row>
        <v-ons-col width="50px"><v-ons-icon icon="ion-clock" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">3pm to 5pm</b></v-ons-col>
        <v-ons-col width="50px"><v-ons-icon icon="ion-ios-calendar" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">18th Apr, 2018</b></v-ons-col>
      </v-ons-row>
       <v-ons-row>
        <v-ons-col width="50px" vertical-align="center"><v-ons-icon icon="ion-android-pin" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;padding-top:10px;">8 Jurong Town Hall Road
        , JTC Summit, Level 10 Sparks<br/>Singapore 111000 </b></v-ons-col>
      </v-ons-row>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import AddNewEvent from './AddNewEvent.vue'
import EventDetails from './EventDetails.vue'

export default {
  data() {
    return {
        addEventPage: {
          component: AddNewEvent,
          label: 'Add New Event'
        },
        viewEventDetails:{
          component:EventDetails,
          label: 'Event Details'
        }
    };
  },

  methods: {
    push(page, key) {
      this.$store.commit('navigator/push', {
        extends: page,
        data() {
          return {
            toolbarInfo: {
              backLabel: 'My Events',
              title: key
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
</style>

