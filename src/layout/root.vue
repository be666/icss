<template>
  <i_header></i_header>
  <section class="i-scope i-section">
    <router-view></router-view>
  </section>
  <i_footer></i_footer>
</template>
<script>
  export default  {
    components: {
      i_header: require("./header.vue"),
      i_footer: require("./footer.vue")
    },
    data () {
      return {}
    },
    route: {
      data (transition) {
      }
    }
  }
</script>
