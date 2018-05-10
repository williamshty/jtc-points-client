<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-header>Event Picture</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="validator.submissionClicked&&!validator.picture">
        <label class="center">
          <b style="color:#96281B;">Please make sure you have uploaded picture</b>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <label class="center">
          <v-ons-button modifier="large" style="background-color:#26A65B;">
            <label for="upload-photo">
              <v-ons-icon icon="ion-android-upload" size="30px"></v-ons-icon>
              &nbsp;Upload Your Picture Here</label>
            </v-ons-button>
          <input type="file" @change="onFileChange" id="upload-photo" v-show="false">
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''" v-if="fileName!==''">
        <label class="center">
          <b style="color:#26A65B;text-align:center;">Uploaded: {{fileName}}</b>
        </label>
      </v-ons-list-item>
      <v-ons-list-header>Event Information</v-ons-list-header>
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
      <v-ons-list-header>Date and Time</v-ons-list-header>
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
       <v-ons-list-header>Venue</v-ons-list-header>
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
      
    </v-ons-list>
          <v-ons-card>
              <v-ons-button modifier="large" @click="onFormSubmit()">Submit</v-ons-button>
          </v-ons-card>
    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="addEventFailDialogVisible"
    >
      <span slot="title">Add New Event Failed</span>
      Please make sure you have points balance more than 5.
      <template slot="footer">
        <v-ons-alert-dialog-button @click="addEventFailDialogVisible = false">Cancel</v-ons-alert-dialog-button>
        <v-ons-alert-dialog-button @click="addEventFailDialogVisible = false">Confirm</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      state: 'initial',
      fileName:'',
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
      },
      validator:{
        nameDesc:true,
        dateTime:true,
        address:true,
        picture:true,
        submissionClicked:false
      },
      addEventFailDialogVisible:false
    };
  },
  computed: {
      isPictureUploaded () {
        return this.$store.state.ajax.currentEventIdForUpload
      },
      isAddEventSuccessful () {
        return this.$store.state.ajax.addEventStatus
      }
  },
  watch: {
      isPictureUploaded (value) {
        this.form.id = value
        this.validator.picture = true
      },
      isAddEventSuccessful (value) {
        if(!value) {
          this.addEventFailDialogVisible = true
          this.$store.commit("ajax/setAddEventStatus", '')
        }
      }
  },
  methods: {
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) console.log('image wrong')
      else console.log(files)
      this.fileName = files[0].name
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
        id:this.$store.state.ajax.currentEventIdForUpload
      }
      this.$store.dispatch("ajax/addNewEvent", payload)
    }
  }
};
</script>

<style>
</style>
