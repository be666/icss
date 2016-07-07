<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i_switch" v-on:click='clickSwitch' v-bind:class="{'i_switch_off':!active}">
    <span class="i_switch_left">{{open}}</span>
    <span class="i_switch_right">{{close}}</span>
  </div>
</template>
<style lang="less">

  .i_switch {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    border-color: #ffffff;
    position: relative;
    background: linear-gradient(to bottom, #ffffff, #e6e6e6);
    overflow: hidden;
    .i_switch_left, .i_switch_right {
      position: absolute;
      display: inline-block;
      width: 50%;
      height: 100%;
      padding: 0;
      margin: 0;
      top: 0;
      text-align: center;
    }
    .i_switch_left {
      left: 0;
      color: #ffffff;
      background-color: #3ECDA6;
      background-image: linear-gradient(to bottom, #47e6ba, #3ECDA6);
      text-shadow: 0 -1px #ffffff;
      border-right: 1px solid #cccccc;
      transition: left 0.5s;
    }
    .i_switch_right {
      left: 120px;
      color: #000000;;
      background-color: #f0f0f0;
      background-image: linear-gradient(to bottom, #e6e6e6, #ffffff);
      text-shadow: 0 -1px 0 #000000;
      border-left: 1px solid #cccccc;
      transition: left 0.5s;
    }

    &.i_switch_off {
      .i_switch_left {
        left: -60px;
      }
      .i_switch_right {
        left: 60px;
      }
    }
  }


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
          return false
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
        console.log(1);
        this.$dispatch('switch-change', this.active);
      }
    }
  }
</script>
