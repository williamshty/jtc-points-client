<template>
  <v-ons-page>
      <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <!-- <v-ons-list-item v-for="eachEvent in allEvents" :key="eachEvent.eventId">{{eachEvent.name}}</v-ons-list-item> -->
      <v-ons-card v-for="eachEvent in allEvents" :key="eachEvent.eventId" @click="pushToDetails(eachEvent.eventId)">
      <div class="title">
        {{eachEvent.name}}
      </div>
      <img :src="baseUrl+'event/avatar/'+eachEvent.eventId" :alt="eachEvent.name" style="width:100%">
      <v-ons-row>
        <v-ons-col width="40px"><v-ons-icon icon="ion-ios-calendar" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">{{parseDate(eachEvent.end.substr(0,10))}}</b></v-ons-col>
        <v-ons-col width="40px"><v-ons-icon icon="ion-clock" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">{{parseTime(eachEvent.start.substr(11,5))}} to {{parseTime(eachEvent.end.substr(11,5))}}</b></v-ons-col>
      </v-ons-row>
       <v-ons-row>
        <v-ons-col width="40px" vertical-align="center"><v-ons-icon icon="ion-android-pin" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;padding-top:10px;">{{eachEvent.address}}<br/>Singapore {{eachEvent.zip}} </b></v-ons-col>
      </v-ons-row>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
// 2018-05-15T05:00:00.000Z
import { baseUrl } from "../const.js";
import EventDetails from './EventDetails.vue'
export default {
  data() {
    return {
      baseUrl: baseUrl,
      viewEventDetails:{
          component:EventDetails,
          label: 'Event Details'
        },
      allEvents: [
        {start:'',
        end:''}
      ]
    };
  },
  computed: {
      eventsLoaded () {
          return this.$store.state.ajax.allFavoriteEvents
      },
      isEventIdChanged () {
          return this.$store.state.ajax.currentEventId
      }
  },
  watch: {
      eventsLoaded (value) {
            console.log('event loaded detected')
            this.allEvents = value
            console.log(this.allEvents)
      },
      isEventIdChanged (value) {
        console.log(value)
        this.getEventDetail(value)
      }
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
    pushToDetails (eventId) {
      this.$store.commit('ajax/setCurrentEventId', eventId)
      this.$store.commit('navigator/push', {
        extends: this.viewEventDetails.component,
        data() {
          return {
            toolbarInfo: {
              backLabel: 'Favorites'
            }
          }
        }
      })
    },
    getEventDetail(eventId) {
      this.$store.dispatch('ajax/getEventDetail',{eventId:eventId})
      this.$store.commit('ajax/setCurrentEventId', '')
    },
    parseTime(time){
      var formattedTime = parseInt(time.substr(0,2))+8
      var postFix = 'am'
      if (formattedTime>=12) {
        postFix = 'pm'
        if (formattedTime>12) formattedTime = formattedTime - 12
      }
      return (formattedTime+ ' '+postFix)
    },
    parseDate(date){
      var year = date.substr(0,4)
      var month = parseInt(date.substr(5,2))
      var day = date.substr(8,2)
      var textMonth = ''
      if(month===1) textMonth = 'Jan'
      else if (month===2) textMonth = 'Feb'
      else if (month===3) textMonth = 'Mar'
      else if (month===4) textMonth = 'Apr'
      else if (month===5) textMonth = 'May'
      else if (month===6) textMonth = 'Jun'
      else if (month===7) textMonth = 'Jul'
      else if (month===8) textMonth = 'Aug'
      else if (month===9) textMonth = 'Sep'
      else if (month===10) textMonth = 'Oct'
      else if (month===11) textMonth = 'Nov'
      else textMonth = 'Dec'
      return(day+' '+textMonth+' '+year)
    }
  },
  beforeMount() {
      this.allEvents = this.$store.state.ajax.allFavoriteEvents
  }
};
</script>

<style scoped>
</style>