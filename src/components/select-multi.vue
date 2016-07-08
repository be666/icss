<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-select-multi">
    <ul v-if="itemList.length">
      <template v-for="item in itemList">
        <li
          v-on:click="toggle(item[id])"
          v-bind:class="{'i-active':isSelected(item[id])}"
        >
          <a>
            {{item[text]}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<style lang="less">

</style>
<script>
  let inArray = function (arr, el, comp) {
    arr = arr || [];
    for (var i = 0, k = arr.length; i < k; i++) {
      if (typeof comp == "function") {
        if (comp(arr[i], el)) {
          return true;
        }
      }
      else if (el == arr[i]) {
        return true;
      }
    }
  };
  export default {
    name: "i_select_multi",
    props:{
      id: {
        default(){
          return 'id'
        }
      },
      text: {
        default(){
          return 'text'
        }
      },
      selected: {
        default(){
          return {}
        }
      },
      itemList: {
        default(){
          return []
        }
      }
    },
    methods: {
      toggle(id) {
        let $this = this;
        if (!$this.selected) {
          $this.selected = [];
        }
        var $selected = this.selected;
        if (inArray($selected, id)) {
          for (var i = 0; i < $selected.length; i++) {
            var $s = $selected[i];
            if ($s == id) {
              $selected.splice(i, 1);
              break;
            }
          }
        } else {
          $selected.push(id);
        }
      },
      isSelected(id) {
        return inArray(this.selected, id);
      }
    }
  };
</script>
