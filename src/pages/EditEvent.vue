<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo" title="Edit" :backLabel="this.$store.state.ajax.currentEvent.name"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-header>Name and Description</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Name
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="text" placeholder="name" v-model="form.name" :value="eventDetail.name"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Description
        </div>
        <label class="center">
          <textarea class="textarea textarea--transparent" 
          rows="3" 
          placeholder="Your event description"
          v-model="form.description"></textarea>
        </label>
      </v-ons-list-item>
      <v-ons-list-header>Time</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Date
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="date" v-model="form.startDate" 
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Start
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="time" v-model="form.startTime"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          End
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="time" v-model="form.endTime"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-header>Address</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Address
        </div>
        <label class="center">
          <v-ons-input float maxlength="100"
            type="text" placeholder="Building Address" v-model="form.address"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Venue
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="text" placeholder="Room Unit Number" v-model="form.venue"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Zip Code
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="number" v-model="form.zip"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <!-- <v-ons-list-header>Event Picture</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Picture
        </div>
        <label class="center">
          <input type="file" @change="onFileChange">
        </label>
      </v-ons-list-item> -->
    </v-ons-list>
          <v-ons-card>
              <v-ons-button modifier="large" @click="onFormSubmit()">Submit</v-ons-button>
          </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      state: 'initial',
      eventDetail: this.$store.state.ajax.currentEvent,
      form: {
        name: this.$store.state.ajax.currentEvent.name,
        startDate: this.$store.state.ajax.currentEvent.start.substr(0,10),
        startTime: this.parsedTime(this.$store.state.ajax.currentEvent.start),
        endTime: this.parsedTime(this.$store.state.ajax.currentEvent.end),
        address: this.$store.state.ajax.currentEvent.address,
        venue: this.$store.state.ajax.currentEvent.venue,
        zip: this.$store.state.ajax.currentEvent.zip,
        description: this.$store.state.ajax.currentEvent.description,
        id:this.$store.state.ajax.currentEvent.eventId
      }
    };
  },
  computed: {
    
  },
  watch: {
  },

  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) console.log('image wrong')
      else console.log(files)
      this.$store.dispatch("ajax/uploadEventImage", files)
    },
    onFormSubmit () {
      const payload = {
        name:this.form.name,
        start:this.form.startDate+'T'+this.form.startTime+':00+08:00',
        end:this.form.startDate+'T'+this.form.endTime +':00+08:00',
        address:this.form.address,
        venue:this.form.venue,
        zip:this.form.zip,
        description:this.form.description,
        id:this.form.id
      }
      this.$store.dispatch("ajax/editEvent", payload)
    },
    parsedTime(time) {
      var newTime = (parseInt(time.substr(11,2))+8)%24
      if (newTime===0) newTime='00'
      return(newTime+':00')
    }
  }
};
</script>

<style>
</style>
