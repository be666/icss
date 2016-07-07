<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <ul class="i-pagination">
    <li v-if="pageMaker.pageIndex > 1">
      <a href="javascript:void(0)" v-on:click.stop="indexClick(pageMaker.pageIndex - 1)">
        上一页
      </a>
    </li>
    <template v-for="pg in pageMaker.pages">
      <li v-bind:class="{ 'i-active': pageMaker.pageIndex == pg }">
        <a href="javascript:void(0)" v-on:click="indexClick(pg )">
          {{pg}}
        </a>
      </li>
    </template>
    <li v-if="pageMaker.pageIndex < pageMaker.totalPage">
      <a href="javascript:void(0)" v-on:click="indexClick(pageMaker.pageIndex +1 )">
        下一页
      </a>
    </li>
    <li>
      <a href="javascript:void(0)">
        当前{{pageMaker.rowCount}}条/共{{pageMaker.totalPage}}页
      </a>
    </li>
  </ul>
</template>
<style>

</style>
<script>
  export default{
    name: "i_pagination",
    props: {
      pageMaker: {
        default(){
          return {
            pageIndex: 0,
            pageSize: 10,
            totalPage: 0,
            pages: [],
            rowCount: 0,
            sizes: 0
          }
        }
      }
    },
    methods: {
      sizeClick (size) {
        this.$dispatch('page-click', 1, size)
      },
      indexClick (index) {
        this.$dispatch('page-click', index, this.size)
      }
    }
  }
</script>
