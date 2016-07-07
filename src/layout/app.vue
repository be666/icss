<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-row i-row-keep">
    <div class="i-col-3">
      <nav>
        <ul>
          <li>
            <a v-on:click="pathTo('table-server')"
            >
              table-server
            </a>
          </li>
          <li>
            <a v-on:click="pathTo('form')"
            >
              form
            </a>
          </li>
        </ul>
      </nav>
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
        moduleName: this.moduleName
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
    methods:{
      pathTo(path){
        this.$dispatch("link", path)
      }
    }
  }
</script>
