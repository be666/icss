<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <header class="am-topbar" id="topbar">
    <div class="am-container">
      <h1 class="am-topbar-brand">
        <a href="/">{{siteName}}</a>
      </h1>
      <a href="/auth" style="float:right;line-height: 36px" v-if="isAdmin(userInfo)">我是管理员</a>
    </div>
  </header>
</template>
<script>
  export default {
    data () {
      return {
        siteName: this.$config.siteName
      }
    },
    props: ["userInfo"],
    methods: {
      logout () {
        this.$http.post(this.$tools.resolveUrl("/Users/logout"), function (data, status, request) {
          this.$auth.loginOut();
          this.$dispatch('link', "login");
        })
      },
      isAdmin: function (userInfo) {
        userInfo = userInfo || {};
        let rule = userInfo.rule || [];
        return rule.findIndex(function (a) {
            return a == 'admin'
          }) > -1;
      }
    }
  }
</script>
