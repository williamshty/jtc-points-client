<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo" title="Edit" :backLabel="this.$store.state.ajax.currentEvent.name"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-header>Name and Description</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="validator.submissionClicked&&!validator.nameDesc">
        <label class="center">
          <b style="color:#96281B;">Please make sure you have entered all fields for name and description</b>
        </label>
      </v-ons-list-item>
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
      <v-ons-list-header>Time</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="validator.submissionClicked&&!validator.dateTime">
        <label class="center">
          <b style="color:#96281B;">Please make sure you have entered all fields for date and time</b>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="!this.$moment(form.startDate).isAfter(new Date())&&form.startDate!==''">
        <label class="center">
          <b style="color:#96281B;">Please make sure you enter a date later than today</b>
        </label>
      </v-ons-list-item>
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
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="validator.submissionClicked&&!validator.address">
        <label class="center">
          <b style="color:#96281B;">Please make sure you have entered all fields for address</b>
        </label>
      </v-ons-list-item>
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
          <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="editEventFailDialogVisible"
    >
      <span slot="title">Edit Event Failed</span>
      Please make sure you have entered all fields
      <template slot="footer">
        <v-ons-alert-dialog-button @click="editEventFailDialogVisible = false">Cancel</v-ons-alert-dialog-button>
        <v-ons-alert-dialog-button @click="editEventFailDialogVisible = false">Confirm</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      state: 'initial',
      editEventFailDialogVisible:false,
      eventDetail: this.$store.state.ajax.currentEvent,
      validator:{
        nameDesc:true,
        dateTime:true,
        address:true,
        picture:true,
        submissionClicked:false
      },
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
    isEditEventSuccessful () {
        return this.$store.state.ajax.editEventStatus
    }
    
  },
  watch: {
    isEditEventSuccessful (value) {
        if(!value) {
          this.editEventFailDialogVisible = true
          this.$store.commit("ajax/setEditEventStatus", '')
        }
      }
  },

  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) console.log('image wrong')
      else console.log(files)
      this.$store.dispatch("ajax/uploadEventImage", files)
    },
    onFormSubmit () {
      this.validator.submissionClicked = false
      this.validator.nameDesc = true
      this.validator.dateTime = true
      this.validator.address = true
      this.validator.picture = true
      if(this.form.name!==''&&this.form.description!==''&&this.form.startDate!==''&&this.form.startTime!==''&&this.form.endTime!==''&&this.form.address!==''&&this.form.venue!==''&&this.form.zip!==''&this.form.id!==''){
        this.onInputValidated()
      } else {
        this.validator.submissionClicked = true
        if(this.form.name===''||this.form.description==='') this.validator.nameDesc = false
        if(this.form.startDate===''||this.form.startTime===''||this.form.endTime==='') this.validator.dateTime = false
        if(this.form.address===''||this.form.venue===''||this.form.zip==='') this.validator.address = false
        if(this.form.id==='') this.validator.picture = false
      }
      
    },
    onInputValidated () {
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
      if (newTime<10) newTime='0'+newTime
      return(newTime+':00')
    }
  }
};
</script>

<style>
</style>
