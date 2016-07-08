<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel i-grew-h">
    <div class="i-panel-header">
      form
    </div>
    <div class="i-panel-body">
      <form class="i-form">
        <div class="i-row">
          <label class="i-col-2 i-text-al-r">
            姓名
          </label>
          <input type="text" class="i-col-4">
          <label class="i-col-2 i-text-al-r">
            性别
          </label>
          <div class="i-col-4 i-warp-none-al">
            <i_select_single
              id="sid"
              text="name"
              v-ref:select_single
            >
            </i_select_single>
          </div>
        </div>
        <div class="i-row">
          <label class="i-col-2 i-text-al-r">
            角色
          </label>
          <div class="i-col-4 i-warp-none-al">
            <i_select_multi
              id="rid"
              text="name"
              v-ref:select_multi
            >
            </i_select_multi>
          </div>
        </div>
        <div class="i-row">
          <label class="i-col-2 i-text-al-r">
            状态
          </label>
          <div class="i-col-4 i-warp-none-al">
            <i_switch_toggle
              open="启用"
              close="禁用"
            >
            </i_switch_toggle>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<style>

</style>
<script>

  export default{
    data(){
      return {
        sexList: [
          {
            sid: '',
            name: '请选择'
          },
          {
            sid: '0',
            name: '男'
          },
          {
            sid: '1',
            name: '女'
          }
        ],
        roleList: [
          {
            rid: '1',
            name: '超级管理员'
          },
          {
            rid: '2',
            name: '管理员'
          },
          {
            rid: '3',
            name: '运营者'
          },
          {
            rid: '5',
            name: '开发者'
          },
          {
            rid: '4',
            name: '客服'
          }
        ]
      }
    },
    ready(){
      this.$refs.select_single.itemList = this.sexList;
      this.$refs.select_single.selected = {
        sid: '',
        name: '请选择'
      };
      this.$refs.select_multi.itemList = this.roleList;
      this.$refs.select_multi.selected = [
        4
      ];
    }
  }
</script>
