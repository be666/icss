<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-row i-row-keep">
    <div class="i-col-3">
      <i_navigation
        id="nid"
        text="name"
        v-on:nav-click="navClick"
        v-ref:navigation
      >
      </i_navigation>
    </div>
    <div class="i-col-fill">
      <router-view>

      </router-view>
    </div>
  </div>
</template>
<style>

</style>
<script>
  export default {
    compiled () {
    },
    data () {
      return {
        navList: [
          {
            nid: "home",
            name: "home"
          },
          {
            nid: "form",
            name: "form"
          },
          {
            nid: "table-server",
            name: "table-server"
          },
          {
            nid: "avatar",
            name: "avatar"
          }
        ],
        moduleName: this.moduleName
      }
    },
    ready(){
      this.$refs.navigation.navList = this.navList;
      this.$refs.navigation.selected = {
        nid: this.$route.name
      }
    },
    route: {
      data (transition) {
        var to = transition.to;
        if (to.matched && to.matched[1]) {
          this.moduleName = transition.to.matched[1].handler.name;
        }
      }
    },
    methods: {
      pathTo(path){
        this.$dispatch("link", path)
      },
      activePath(path){
        return path == this.$route.name ? 'i-active' : '';
      },
      navClick(name){
        this.$dispatch("link", name)
      }
    }
  }
</script>
