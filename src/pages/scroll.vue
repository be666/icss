<template>
  <div>
    <v-rolling-panel
      v-bind:item-list="itemList"
      v-ref:rollingPanel
    >
    </v-rolling-panel>
  </div>
</template>
<style>

</style>
<script>
  let Vue = require('vue');
  let rollingPanel = require('vue-view-components').component("rolling-panel");
  export default{
    components: {
      'v-rolling-panel': Vue.extend(rollingPanel).extend({
        components: {
          'i-child': require('./panel_tpl.vue')
        }
      })
    },
    data(){
      return {
        itemList: [{
          item: 'k12'
        }, {
          item: 'k13'
        }, {
          item: 'k14'
        }]
      }
    }
  }
</script>
