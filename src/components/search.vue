<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-cf i-input-group i-search-warp">
    <input type="text" placeholder="{{placeholder}}" class="i-search-field" v-model="keyWord">
    <span class="i-input-search-label">
      <button type="button" v-on:click="searched">
        {{tips}}
      </button>
    </span>
  </div>
</template>
<style>
  .i-search-warp {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .i-search-warp .i-search-field {
    display: inline-block;
    height: inherit;
    line-height: 1.5rem;
    vertical-align: middle;
    float: left;
  }

  .i-input-search-label {
    display: inline-block;
    height: inherit;
    float: left;
  }

  .i-input-search-label button {
    height: inherit;
  }

</style>
<script>
  export default {
    props: {
      "keyWord": {
        type: String,
        default(){
          return null;
        }
      },
      "placeholder": {
        type: String,
        default(){
          return '输入';
        }
      },
      "tips": {
        type: String,
        default(){
          return '查询';
        }
      },
      "formId": {
        type: String,
        default(){
          return this.$getUUID(5)
        }
      }
    },
    methods: {
      searched() {
        this.$dispatch("searched")
      }
    }
  }
</script>
