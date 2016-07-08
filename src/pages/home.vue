<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-panel i-grew-h">
    <div class="i-panel-header">
      sample
    </div>
    <div class="i-panel-body">
      <div class="i-btn-g">
        <button type="button" v-on:click='pathTo("form")'>
          new
        </button>
      </div>
      <br>
      <i_table
        v-ref:table
      >
      </i_table>
    </div>
    <div class="i-panel-footer">

    </div>
  </div>
</template>
<style>
  td.i-t-center {
    text-align: center;
  }
</style>
<script>
  export default {
    data () {
      return {
        sexMap: {
          '0': '男',
          '1': '女'
        },
        dataList: [{
          id: "001",
          name: "管理员",
          sex: "1"
        }]
      }
    },
    ready(){
      let self = this;
      this.$refs.table.checkboxFlag = false;
      this.$refs.table.titleList = [
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
      this.$refs.table.dataList = this.dataList;
      this.$refs.table.pageMaker = {
        pageIndex: 1,
        pageSize: 10,
        totalPage: 3,
        pages: [1, 2, 3],
        rowCount: 10,
        sizes: 31
      }
    },
    methods: {
      pathTo(path){
        this.$dispatch("link", path)
      }
    }
  }
</script>
