<template>
  <v-ons-page>
    <custom-toolbar v-bind="toolbarInfo"></custom-toolbar>
<password placeholder="password" v-model="password"></password>
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
