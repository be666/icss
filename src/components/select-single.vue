<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-select-single" v-bind:class="[active?'i-active':'']">
    <button type="button"
            v-on:click="toggle"
    >
      {{showText()}}
      <span></span>
    </button>
    <ul v-if="itemList.length > 0">
      <template v-for="item in itemList">
        <li
          v-on:click="clicked(item[id],item[text])"
        >
          <a>
            {{item[text]}}
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "i_select_single",
    props: {
      pid: {
        default(){
          return this.$getUUID(5)
        }
      },
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
      active: {
        default(){
          return 0
        }
      },
      selected: {
        default(){
          return {}
        }
      },
      unSelected: {
        default(){
          return {
            id: "",
            text: "请选择"
          }
        }
      },
      itemList: {
        default(){
          return []
        }
      }
    },
    methods: {
      toggle() {
        this.active = 1 - this.active;
      },
      clicked(idVal, textVal) {
        var selected = {};
        selected[this.id] = idVal;
        selected[this.text] = textVal;
        this.selected = selected;
        this.active = 0;
        this.$dispatch("selecting", this.pid, idVal, textVal);
      },
      equal (v1, v2) {
        return v1 == v2;
      },
      showText(){
        if (this.selected) {
          if (typeof this.selected[this.id] != 'undefined') {
            return this.selected[this.text]
          }
        }
        return this.unSelected[this.text]
      }
    }
  };
</script>
