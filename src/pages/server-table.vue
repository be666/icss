<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel i-grew-h">
    <div class="i-panel-header">
      sample
    </div>
    <div class="i-panel-body">
      <i_table_server
        data-url="/static/data-{pageIndex}-{pageSize}.json"
        count-url="/static/data-count.json"
        v-ref:table10
      >
      </i_table_server>
      <br>
      <i_table_server
        page-size="20"
        data-url="/static/data-{pageIndex}-{pageSize}.json"
        count-url="/static/data-count.json"
        v-ref:table20
      >
      </i_table_server>
    </div>
    <div class="i-panel-footer">

    </div>
  </div>
</template>
<style>

</style>
<script>

  export default{
    data(){
      return {
        sexMap: {
          '0': '男',
          '1': '女'
        }
      }
    },
    ready(){
      let self = this;
      this.$refs.table10.checkboxFlag = false;
      this.$refs.table10.titleList = [
        {
          id: 'id',
          text: 'id',
          width: '10%'
        },
        {
          id: 'name',
          text: '姓名',
          width: '40%'
        },
        {
          id: 'sex',
          text: '性别',
          width: '20%',
          render(el, attr, index){
            return self.sexMap[attr]
          }
        },
        {
          id: 'id',
          text: 'option',
          width: '25%',
          className: 'i-t-center',
          render(el, attr, index){
            return `<div class="i-btn-g" data=""><button>编辑</button><button>删除</button></div>`
          }
        }
      ];
      this.$refs.table20.titleList = [
        {
          id: 'id',
          text: 'id',
          width: '10%'
        },
        {
          id: 'name',
          text: '姓名',
          width: '50%'
        },
        {
          id: 'sex',
          text: '性别',
          width: '10%',
          render(el, attr, index){
            return self.sexMap[attr]
          }
        },
        {
          id: 'id',
          text: 'option',
          width: '25%',
          className: 'i-t-center',
          render(el, attr, index){
            return `<div class="i-btn-g" data=""><button>编辑</button><button>删除</button></div>`
          }
        }
      ];
    }
  }
</script>
