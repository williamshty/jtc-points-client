<template>
  <v-ons-page>
    <!-- <qrcode-reader @decode="onDecode"></qrcode-reader>
    <h3>Your QR Content is: {{QR_Content}}</h3> -->
  </v-ons-page>
</template>

<script>

export default {
  data() {
    return {
      state: 'initial',
      QR_Content: ''
    };
  },
  methods: {
    onDecode (content) {
      console.log(content)
      this.QR_Content = content
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
