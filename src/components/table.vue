<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="i-table">
    <table>
      <thead>
      <tr>
        <th v-if='checkboxFlag'>
          <input v-on:change="toggleAll" type="checkbox"/>
        </th>
        <template v-for="title in titleList">
          <th v-bind:width="title.width" v-bind:class="title.className">
            {{title.text}}
          </th>
        </template>
      </tr>
      </thead>
      <tbody v-if="dataList && dataList.length>0 ">
      <template v-for="data in dataList">
        <tr v-on:click="rowClick($event,data)">
          <td v-if='checkboxFlag'>
            <input type="checkbox" v-model="checkbox" value="{{data[pk]}}">
          </td>
          <template v-for="title in titleList">
            <td v-bind:class="title.className">
              {{{ render(data,title,$index) }}}
            </td>
          </template>
        </tr>
      </template>
      </tbody>
      <tfoot v-if='pageMaker.totalPage'>
      <tr>
        <td v-bind:colspan="pageColSpan()">
          <i_pagination
            v-on:page-click="pageClick"
            :page-maker.sync="pageMaker"
          >
          </i_pagination>
        </td>
      </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
  export default {
    name: 'i_table',
    props: {
      pk: {
        type: String,
        default() {
          return 'id';
        }
      },
      titleList: Array,
      dataList: Array,
      pageMaker: {
        default(){
          return {
            pageIndex: 0,
            pageSize: 10,
            totalPage: 0,
            pages: [],
            rowCount: 0,
            totalCount: 0
          };
        }
      },
      checkboxFlag: {
        type: Boolean,
        default(){
          return true;
        }
      },
      selected: {
        type: Array,
        default(){
          return [];
        }
      },
      pid: {
        type: String,
        default() {
          return this.$getUUID(5);
        }
      }
    },
    methods: {
      render(data, title, $index){
        if (title.render) {
          return title.render(data, data[title['id']], $index);
        }
        return data[title['id']]
      },
      pageColSpan(){
        let titleList = this.titleList || [];
        return this.checkboxFlag ? (titleList.length + 1) : titleList.length;
      },
      toggleAll(event) {
        this.checkbox.splice(0, this.checkbox.length);
        if (event.target.checked) {
          let dLength = this.dataList.length;
          for (var i = 0; i < dLength; i++) {
            this.checkbox.push(String(i));
          }
        }
      },
      rowClick(event, data){
        let target = event.target;
        let option = target.getAttribute('data-option');
        this.$dispatch('table-click', this.pid, option, data);
      },
      pageClick (index, size) {
        this.$dispatch('table-page-click', index, size)
      }
    }
  }
</script>
