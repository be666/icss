<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i_switch" v-on:click='clickSwitch' v-bind:class="{'i_switch_off':!active}">
    <span class="i_switch_left">{{open}}</span>
    <span class="i_switch_right">{{close}}</span>
  </div>
</template>
<style lang="less">

</style>
<script>

  export default{
    name: 'i_chose_btn',
    props: {
      open: {
        default(){
          return '开'
        }
      },
      active: {
        default(){
          return true
        }
      },
      close: {
        default(){
          return '关'
        }
      }
    },
    methods: {
      clickSwitch(){
        this.active = !this.active;
        this.$dispatch('switch-change', this.active);
      }
    }
  }
</script>
