<template>
  <div>
    <inner_table
      v-bind:pk.sync='pk'
      v-bind:checkbox-flag.sync='checkboxFlag'
      v-bind:title-list.sync='titleList'
      v-bind:data-list.sync='dataList'
      v-on:table-page-click='pageClick'
      v-ref:table>
    </inner_table>
  </div>
</template>
<style>

</style>
<script>

  export default{
    props: {
      pk: {
        type: String,
        default() {
          return "id";
        }
      },
      checkboxFlag: {
        default(){
          return true;
        }
      },
      titleList: 'Array',
      dataList: 'Array',
      index: {
        type: String,
        default(){
          return 'pageIndex'
        }
      },
      size: {
        type: String,
        default(){
          return 'pageSize'
        }
      },
      count: {
        type: String,
        default(){
          return 'count'
        }
      },
      item: {
        type: String,
        default(){
          return null
        }
      },
      pageIndex: {
        type: String,
        default(){
          return 1
        }
      },
      pageSize: {
        type: String,
        default(){
          return 10
        }
      },
      totalCount: {
        type: String,
        default(){
          return 0
        }
      },
      countUrl: String,
      dataUrl: String,
      where: {
        type: Object,
        default(){
          return {}
        }
      },
      query: {
        type: Object,
        default(){
          return {}
        }
      },
      httpMethod: {
        type: String,
        default(){
          return 'get'
        }
      }
    },
    components: {
      'inner_table': require('./table.vue')
    },
    events: {
      refresh(){
        let self = this;
        self.$dispatch('execCount')
      },
      execCount(){
        let self = this;
        let $http = self.$http;
        let dataMethod = $http[self.httpMethod];
        if (!self.countUrl) {
          return
        }
        dataMethod.apply($http, [self.countUrl, JSON.parse(JSON.stringify(self.where)), function (res, ste, req) {
          if (self.count) {
            res = res[self.count];
          }
          self.totalCount = res;
          if (!self.totalCount) {
            return self.$dispatch('refresh_inner')
          }
          self.$dispatch('execQuery')
        }]).error(function (ste) {

        })
      },
      execQuery(){
        let self = this;
        let $http = self.$http;
        let dataMethod = $http[self.httpMethod];
        if (!self.dataUrl) {
          return
        }
        self.dataList = [];
        let dataUrl = self.dataUrl;
        dataUrl = dataUrl.replace('{' + self.index + '}', self.pageIndex);
        dataUrl = dataUrl.replace('{' + self.size + '}', self.pageSize);
        dataMethod.apply($http, [dataUrl, self.query, function (res, ste, req) {
          if (self.item) {
            res = res[self.item];
          }
          self.dataList = res;
          self.$dispatch('refreshInner');
        }]).error(function (ste) {
        })
      },
      refreshInner(){
        let self = this;
        let totalPage = this.getTotalPage(self.totalCount, self.pageSize);
        if (totalPage > 0 && totalPage < self.pageIndex) {
          self.pageIndex = totalPage;
        }
        let pages = this.getPages(totalPage, self.pageIndex);
        let rowCount = self.dataList.length;
        self.$refs.table.pageMaker = {
          pageIndex: self.pageIndex,
          pageSize: self.pageSize,
          totalPage: totalPage,
          pages: pages,
          rowCount: rowCount,
          totalCount: self.totalCount
        }
      }
    },
    methods: {
      pageClick(index, size){
        this.pageIndex = index || this.pageIndex;
        this.pageSize = size || this.pageSize;
        this.$dispatch('refresh');
      },
      getTotalPage(totalRow, pageSize) {
        if (totalRow == 0) {
          return 0;
        }
        let totalPage;
        if (totalRow % pageSize == 0) {
          totalPage = totalRow / pageSize;
        } else {
          totalPage = (totalRow - totalRow % pageSize) / pageSize + 1;
        }
        return totalPage;
      },
      getPages(totalPage, pageIndex) {
        if (!totalPage) {
          return [];
        }
        let arr = [];
        if (pageIndex - 2 > 0) {
          arr.push(pageIndex - 2);
        }
        if (pageIndex - 1 > 0) {
          arr.push(pageIndex - 1);
        }
        arr.push(pageIndex);
        if (pageIndex + 1 <= totalPage) {
          arr.push(pageIndex + 1);
        }
        if (pageIndex + 2 <= totalPage) {
          arr.push(pageIndex + 2);
        }
        return arr;
      }
    },
    ready(){
      this.$dispatch('refresh');
    }
  }
</script>
