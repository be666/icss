<template>
  <div class="i-rolling-panel">
    <template v-if='showPre()'>
      <div class="pre">
        <i-child
          v-bind:item='itemList[currentIndex-1]'
        >
        </i-child>
      </div>
    </template>
    <div class="current">
      <i-child
        v-bind:item='itemList[currentIndex]'
      >
      </i-child>
    </div>
    <template v-if='showNext()'>
      <div class="next">
        <i-child
          v-bind:item='itemList[currentIndex+1]'
        >
        </i-child>
      </div>
    </template>
  </div>
</template>
<style>

</style>
<script>
  require('./rollingPanel.less');
  export default{
    components: {
      'i-child': null
    },
    props: {
      itemList: {
        default(){
          return []
        }
      },
      currentIndex: {
        default(){
          return 0;
        }
      }
    },
    ready(){
    },
    methods: {
      showPre(){
        return this.currentIndex > 0;
      },
      showNext(){
        return this.currentIndex < this.itemList.length - 1;
      }
    }
  }
</script>
