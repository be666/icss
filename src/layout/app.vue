<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-row i-row-keep">
    <div class="i-col-3">
      <nav>
        <ul>
          <li
            v-bind:class="activePath('home')"
            v-on:click="pathTo('home')"
          >
            <a>
              home
            </a>
          </li>
          <li
            v-bind:class="activePath('table-server')"
            v-on:click="pathTo('table-server')"
          >
            <a>
              table-server
            </a>
          </li>
          <li
            v-bind:class="activePath('form')"
            v-on:click="pathTo('form')"
          >
            <a>
              form
            </a>
          </li>
          <li
            v-bind:class="activePath('avatar')"
            v-on:click="pathTo('avatar')"
          >
            <a>
              avatar
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
    methods: {
      pathTo(path){
        this.$dispatch("link", path)
      },
      activePath(path){
        return path == this.$route.name ? 'i-active' : '';
      }
    }
  }
</script>
