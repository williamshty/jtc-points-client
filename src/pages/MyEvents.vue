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
    <div>
    <v-ons-card v-for="eachEvent in allOwnEvents" :key="eachEvent.eventId" @click="pushToDetails(eachEvent.eventId)">
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
    </div>
  </v-ons-page>
</template>

<script>
import { baseUrl } from "../const.js";
import AddNewEvent from './AddNewEvent.vue'
import MyEventDetails from './MyEventDetails.vue'

export default {
  data() {
    return {
        baseUrl: baseUrl,
        addEventPage: {
          component: AddNewEvent,
          label: 'Add New Event'
        },
        viewEventDetails:{
          component:MyEventDetails,
          label: 'Event Details'
        },
        allOwnEvents:[
          {start:'',
        end:''}
        ]
    };
  },
  computed: {
      eventsLoaded () {
          return this.$store.state.ajax.allOwnEvents
      },
      isEventIdChanged () {
          return this.$store.state.ajax.currentEventId
      }
  },
  watch: {
      eventsLoaded (value) {
          if (value!==[]) {
            // console.log(value)
            this.allOwnEvents = value
            console.log(this.allOwnEvents)
          }
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
    getEventDetail(eventId) {
      this.$store.dispatch('ajax/getEventDetail',{eventId:eventId})
      this.$store.commit('ajax/setCurrentEventId', '')
    },
    pushToDetails (eventId) {
      this.$store.commit('ajax/setCurrentEventId', eventId)
      this.$store.commit('navigator/push', {
        extends: this.viewEventDetails.component,
        data() {
          return {
            toolbarInfo: {
              backLabel: 'My Events'
            }
          }
        }
      })
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
  }
};
</script>

<style scoped>
</style>

