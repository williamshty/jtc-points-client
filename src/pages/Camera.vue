<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <qrcode-reader @decode="onDecode"></qrcode-reader>
    {{QR_Content}}
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
    <!-- <div @click='TakePictureType(1)'>相机</div>  
      <div @click='TakePictureType(2)'>图库</div>   -->
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
    // TakePicture: function (mySourceType) {  
    //    navigator.camera.getPicture(this.onSuccess, this.onFail, {  
    //    quality: 50,  
    //    destinationType: Camera.DestinationType.DATA_URL,  
    //    encodingType: Camera.EncodingType.JPEG,  
    //    sourceType: mySourceType  
    //   })  
    // },
    // dataURLtoFile: function (dataurl, filename) {  
    //     var arr = dataurl.split(',')  
    //     var mime = arr[0].match(/:(.*?);/)[1]  
    //     var bstr = window.atob(arr[1])  
    //     var n = bstr.length  
    //     var u8arr = new Uint8Array(n)  
    //     while (n--) {  
    //       u8arr[n] = bstr.charCodeAt(n)  
    //     }  
    //     var blob = new Blob([u8arr], {type: mime})  
    //     blob.lastModifiedDate = new Date()  
    //     blob.name = filename  
    //     return blob
    // }  
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
