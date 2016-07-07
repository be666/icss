<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel i-grew-h">
    <div class="i-panel-header">
      avatar
    </div>
    <div class="i-panel-body">
      <i_avatar
        v-bind:min-ength="40"
        v-bind:img-url="avatar.filePath"
        v-bind:scope="showSize(avatar.showSize)"
        v-bind:poi.sync="avatar.poi"
        v-bind:block.sync="avatar.block"
        v-bind:sizes="avatarSize"
        v-bind:warp-size="warpSize"
      >
      </i_avatar>
    </div>
  </div>
</template>
<style>

</style>
<script>

  let showSize = function (size) {
    if (!size || !size.height) {
      return
    }
    let p = size.width / size.height;
    if (p > 4 / 3) {
      return {
        width: 300,
        height: 300 / size.width * size.height
      }
    } else {
      return {
        width: 225 / size.height * size.width,
        height: 225
      }
    }
  };

  export default{
    data(){
      console.log(showSize({
        width: 600,
        height: 475
      }));
      return {
        warpSize: {
          width: 300,
          height: 225
        },
        avatarSize: [100],
        avatar: {
          filePath: '/static/avatar.jpeg',
          showSize: {
            width: 600,
            height: 475
          },
          poi: {
            left: 0,
            top: 0
          },
          block: {
            length: 40
          }
        }
      }
    },
    methods: {
      showSize: showSize
    }
  }
</script>
