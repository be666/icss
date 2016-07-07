<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <img class="user-avatar" v-bind:src="userAvatar()" alt="头像">
</template>
<style lang="less">
  img.user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
</style>
<script>

  export default{
    props: {
      avatar: {
        default(){
          return null
        }
      },
      sex: {
        default(){
          return null
        }
      }
    },
    methods: {
      userAvatar(){
        if (this.avatar) {
          return this.avatar
        }
        if (this.sex == 1) {
//          return require('./image/touxiang_girl_default.png')
        }
//        return require('./image/touxiang_boy_default.png')
      }
    }
  }
</script>
