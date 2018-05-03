<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
    <h3 v-if="this.QR_Content!==''">QR Content Loaded! Please wait</h3>
    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="attendSuccessDialogVisible"
    >
      <span slot="title">Congratulations!</span>
      You have successfully signed attendence to Event {{this.$store.state.ajax.attendEventStatus.name}}
      <template slot="footer">
        <v-ons-alert-dialog-button @click="attendSuccessDialogVisible = false">Cancel</v-ons-alert-dialog-button>
        <v-ons-alert-dialog-button @click="attendSuccessDialogVisible = false">Confirm</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>
    <v-ons-alert-dialog modifier="rowfooter"
      :visible.sync="attendFailDialogVisible"
    >
      <span slot="title">Attendence Failed</span>
      Please make sure you have scanned the correct QR code.
      <template slot="footer">
        <v-ons-alert-dialog-button @click="attendFailDialogVisible = false">Cancel</v-ons-alert-dialog-button>
        <v-ons-alert-dialog-button @click="attendFailDialogVisible = false">Confirm</v-ons-alert-dialog-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>

export default {
  data() {
    return {
      state: 'initial',
      QR_Content: '',
      attendSuccessDialogVisible: false,
      attendFailDialogVisible:false
    };
  },
  computed: {
      isAttended () {
          return this.$store.state.ajax.attendEventStatus
      }
  },
  watch: {
      isAttended(value) {
          if(value===false) {
              this.attendFailDialogVisible = true
          }
          else{
            this.attendSuccessDialogVisible = true
          }
      }
  },
  methods: {
    onDecode (content) {
      console.log(content)
      this.QR_Content = content
      this.$store.dispatch('ajax/attendEvent', {encode: content})
    }
  }
};
</script>

<style scoped>
.camera {
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  vertical-align: middle;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.focus {
  width: 100px;
  height: 100px;
  border: 12px solid whitesmoke;
  border-radius: 100%;
}
</style>
