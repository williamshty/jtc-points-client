<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
      <v-ons-card>
      <div class="title">
        Event 1
      </div>
      <v-ons-carousel fullscreen swipeable auto-scroll overscrollable
      :index.sync="carouselIndex"
    >
      <v-ons-carousel-item >
        <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Water-Lilies.-Image-via-wikimedia.com_.jpg" alt="Onsen UI" style="width: 100%;">
      </v-ons-carousel-item>
      <v-ons-carousel-item >
        <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Claude-Monet-Haystack.-End-of-the-Summer-detail-1042x695.jpg" alt="Onsen UI" style="width: 100%;">
      </v-ons-carousel-item>
      <v-ons-carousel-item >
        <img src="https://d2jv9003bew7ag.cloudfront.net/uploads/Henri-Rousseau-The-Dream.-Image-via-monsieurmecenat.tumblr.com_-1042x695.jpg" alt="Onsen UI" style="width: 100%;">
      </v-ons-carousel-item>
    </v-ons-carousel>
      <v-ons-row>
        <v-ons-col width="50px"><v-ons-icon icon="ion-clock" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">3pm to 5pm</b></v-ons-col>
        <v-ons-col width="50px"><v-ons-icon icon="ion-ios-calendar" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;">18th Apr, 2018</b></v-ons-col>
      </v-ons-row>
       <v-ons-row>
        <v-ons-col width="50px" vertical-align="center"><v-ons-icon icon="ion-android-pin" size="30px"></v-ons-icon> </v-ons-col>
        <v-ons-col vertical-align="center"><b style="font-size:16px;padding-top:10px;">8 Jurong Town Hall Road
        , JTC Summit, Level 10 Sparks<br/>Singapore 111000 </b></v-ons-col>
      </v-ons-row>
      <v-ons-row style="height:20px;"></v-ons-row>
       <v-ons-row>
           Description
       </v-ons-row>
       <v-ons-row style="height:20px;"></v-ons-row>
       <v-ons-row>
           <v-ons-col>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus nisi, ab asperiores animi rerum esse odio itaque quos quisquam nulla provident aspernatur quod, aut quibusdam earum cumque nobis natus ipsam.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus nisi, ab asperiores animi rerum esse odio itaque quos quisquam nulla provident aspernatur quod, aut quibusdam earum cumque nobis natus ipsam.</v-ons-col>
       </v-ons-row>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      state: 'initial',
      carouselIndex: 0
    };
  },

  methods: {
  }
};
</script>

<style>
</style>
