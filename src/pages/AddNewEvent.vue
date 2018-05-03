<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-header>Name and Description</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Name&nbsp;&nbsp;
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="text" placeholder="name" v-model="form.name"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Description&nbsp;&nbsp;
        </div>
        <label class="center">
          <textarea class="textarea textarea--transparent" 
          rows="3" 
          placeholder="Your event description"
          v-model="form.description"></textarea>
        </label>
      </v-ons-list-item>
      <v-ons-list-header>Start and End</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          <v-ons-icon icon="ion-ios-calendar" class="list-item__icon"></v-ons-icon>&nbsp;&nbsp;&nbsp;&nbsp;
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
          <v-ons-icon icon="ion-clock" class="list-item__icon"></v-ons-icon>&nbsp;&nbsp;&nbsp;&nbsp;
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
          <v-ons-icon icon="ion-clock" class="list-item__icon"></v-ons-icon>&nbsp;&nbsp;&nbsp;&nbsp;
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
          Address&nbsp;&nbsp;
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
          Venue&nbsp;&nbsp;
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
          Zip Code&nbsp;&nbsp;
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="number" v-model="form.zip"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-header>Event Picture</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Picture
        </div>
        <label class="center">
          <input type="file" @change="onFileChange">
        </label>
      </v-ons-list-item>
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
      form: {
        name: '',
        startDate: '',
        startTime: '',
        endTime: '',
        address: '',
        venue: '',
        zip: '',
        description: '',
        id:''
      }
    };
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
        id:this.$store.state.ajax.currentEventIdForUpload
      }
      this.$store.dispatch("ajax/addNewEvent", payload)
    }
  }
};
</script>

<style>
</style>
