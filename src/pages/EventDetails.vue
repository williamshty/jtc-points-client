<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo" title="Event Detail"></custom-toolbar>
      <v-ons-card>
      <div class="title">
        {{eventDetail.name}}
      </div>
      <img :src="baseUrl+'event/avatar/'+eventDetail.eventId" :alt="eventDetail.name" style="width:100%">
      <v-ons-card>
                <v-ons-row>
                    <v-ons-col width="30px">
                        <v-ons-icon icon="ion-ios-calendar" size="30px"></v-ons-icon>
                    </v-ons-col>
                    <v-ons-col vertical-align="center">
                        <b style="font-size:16px;">{{parseDate(eventDetail.end.substr(0,10))}}</b>
                    </v-ons-col>
                    <v-ons-col width="30px">
                        <v-ons-icon icon="ion-clock" size="30px"></v-ons-icon>
                    </v-ons-col>
                    <v-ons-col vertical-align="center">
                        <b style="font-size:16px;">{{parseTime(eventDetail.start.substr(11,5))}} to {{parseTime(eventDetail.end.substr(11,5))}}</b>
                    </v-ons-col>
                </v-ons-row>
                <div style="height:10px;"></div>
                <v-ons-row>
                    <v-ons-col width="30px" vertical-align="center">
                        <v-ons-icon icon="ion-android-pin" size="30px"></v-ons-icon>
                    </v-ons-col>
                    <v-ons-col vertical-align="center">
                        <b style="font-size:16px;padding-top:10px;">{{eventDetail.address}}
                            <br/>Singapore {{eventDetail.zip}}</b>
                    </v-ons-col>
                </v-ons-row>
            </v-ons-card>
            <v-ons-card>
                <v-ons-row style="height:20px;"></v-ons-row>
                <v-ons-row>
                    Description
                </v-ons-row>
                <v-ons-row style="height:20px;"></v-ons-row>
                <v-ons-row>
                    <v-ons-col>{{eventDetail.description}}</v-ons-col>
                </v-ons-row>
            </v-ons-card>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import { baseUrl } from "../const.js";
export default {
  data() {
    return {
      baseUrl: baseUrl,
      state: 'initial',
      carouselIndex: 0,
      eventDetail:{
        name: '',
        start:'',
        end:'',
        address:'',
        venue:'',
        zip:'',
        description:'',
        eventId:'',
      }
    };
  },
  computed: {
      isEventChanged () {
        return this.$store.state.ajax.currentEvent
      },
  },
  watch: {
      isEventChanged (value) {
        this.eventDetail = value
        // 
        console.log(this.$store.state.navigator.stack.length)
        if(this.$store.state.navigator.stack.length === 1) this.$store.state.ajax.currentEvent = {}
        // if(this.$store.state.navigator.stack.) this.$store.state.ajax.currentEvent = {}
      }
  },
  methods: {
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

<style>
</style>
