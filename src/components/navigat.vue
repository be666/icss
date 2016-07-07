<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <ul v-bind:id="uuid">
    <template v-for='nav of navList'>
      <li
        v-on:click='navClick(nav)'
      >
        <span>
          {{nav[text]}}
        </span>
      </li>
    </template>
  </ul>
</template>
<style>

</style>
<script>

  export default{
    props: {
      navList: {
        type: 'Array',
        default(){
          return []
        }
      },
      text: {
        type: 'String',
        default() {
          return 'text';
        }
      },
      val: {
        type: 'String',
        default() {
          return 'value';
        }
      },
      subModule: {
        type: 'String',
        default() {
          return 'subNav';
        }
      },
      uuid: {
        default() {
          return this.$getUUID();
        }
      }
    }
  }
</script>
