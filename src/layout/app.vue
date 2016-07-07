<template>
  <div class="i-row i-row-keep">
    <div class="i-col-3">
      <nav>
        <ul>
          <li>
            <a>
              layout
            </a>
          </li>
          <li>
            <a>
              ui
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
    }
  }
</script>
