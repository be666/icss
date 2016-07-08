<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <nav class="i_navigation">
    <ul>
      <template v-for='nav of navList'>
        <li
          v-bind:class="[activeNav(nav)?activeClass:'']"
          v-on:click="navClick(nav)"
        >
          <a>
            {{nav[text]}}
          </a>
        </li>
      </template>
    </ul>
  </nav>
</template>
<style>

</style>
<script>

  export default{
    props: {
      navList: {
        type: Array,
        default(){
          return []
        }
      },
      text: {
        type: String,
        default() {
          return 'text';
        }
      },
      id: {
        type: String,
        default() {
          return 'id';
        }
      },
      activeClass: {
        type: String,
        default() {
          return 'i-active';
        }
      },
      subModule: {
        type: String,
        default() {
          return 'subNav';
        }
      },
      selected: {
        default(){
          return {}
        }
      }
    },
    methods: {
      activeNav(nav){
        if (this.selected) {
          if (typeof this.selected[this.id] != 'undefined') {
            return this.selected[this.id] == nav[this.id];
          }
        }
        return false;
      },
      navClick(nav){
        this.selected = nav;
        this.$dispatch('nav-click', nav[this.id])
      }
    }
  }
</script>
