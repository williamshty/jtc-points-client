<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
    <v-ons-list>
      <v-ons-list-header>Name and Description</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Name
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="text" placeholder="name"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Event Description
        </div>
        <label class="center">
          <textarea class="textarea textarea--transparent" rows="3" placeholder="Your event description"></textarea>
        </label>
      </v-ons-list-item>
      <v-ons-list-header>Date and Time</v-ons-list-header>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          <v-ons-icon icon="ion-ios-calendar" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="date"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
      <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          <v-ons-icon icon="ion-clock" class="list-item__icon"></v-ons-icon>
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="time"
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
            type="text" placeholder="Building Address"
          >
          </v-ons-input>
        </label>
      </v-ons-list-item>
       <v-ons-list-item :modifier="$ons.platform.isAndroid() ? 'nodivider' : ''">
        <div class="left">
          Room
        </div>
        <label class="center">
          <v-ons-input float maxlength="20"
            type="text" placeholder="Room Unit Number"
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
            type="number"
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
          <input type="file">
        </label>
      </v-ons-list-item>
    </v-ons-list>
          <v-ons-card>
              <v-ons-button modifier="large">Submit</v-ons-button>
          </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      state: 'initial'
    };
  },

  methods: {
  }
};
</script>

<style>
</style>
