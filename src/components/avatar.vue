<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="img-main">
    <div class="img-l" v-bind:id="'scope_'+sId"
         v-bind:style="{height:warpSize.height + 'px',width:warpSize.width + 'px'}"
    >
      <div class="scope-inner">
        <div class="img-warp">
          <img v-bind:src="imgUrl"
               v-bind:style="{width:scope.width+'px',height:scope.height+'px'}"
               class="img-upload">
        </div>
        <div class="draw-warp"
             v-show='imgUrl'
             v-bind:style="{width:scope.width+'px',height:scope.height+'px'}"
        >
          <div
            class="img-light-block"
            v-bind:style="{width: block.length + 'px',height: block.length + 'px', left: poi.left + 'px', top:  poi.top + 'px' }"
          >
            <img
              class="img-upload img-show"
              v-bind:src="imgUrl"
              v-bind:style="{width: scope.width + 'px',height: scope.height + 'px', left:- poi.left + 'px', top: -poi.top + 'px'}"
            >
          </div>
          <div class="resize-block"
               v-bind:style="{width: scope.width + 'px',height: scope.height + 'px'}"
          >
          <span class="re-show"
                v-bind:id="'block_'+sId"
                v-bind:style="{width: block.length + 'px',height: block.length + 'px', left: poi.left + 'px', top:  poi.top + 'px'}"
          ></span>
          <span class="re-block re-lt"
                v-bind:id="'lt_'+sId"
                v-bind:style="{left:poi.left - 4  + 'px', top: poi.top-4 + 'px'}"
          ></span>
          <span class="re-block re-ct"
                v-bind:id="'ct_'+sId"
                v-bind:style="{left:poi.left - 4 + (block.length / 2)  + 'px', top: poi.top -4 + 'px'}"
          ></span>
          <span class="re-block re-rt"
                v-bind:id="'rt_'+sId"
                v-bind:style="{left:poi.left -4 + (block.length)  + 'px', top: poi.top -4 + 'px'}"
          ></span>
          <span class="re-block re-lm"
                v-bind:id="'lm_'+sId"
                v-bind:style="{left:poi.left - 4  + 'px', top: poi.top - 4 + (block.length / 2) + 'px'}"
          ></span>
          <span class="re-block re-rm"
                v-bind:id="'rm_'+sId"
                v-bind:style="{left:poi.left - 4 + (block.length)  + 'px', top: poi.top-4 + (block.length/2)  + 'px'}"
          ></span>
          <span class="re-block re-lb"
                v-bind:id="'lb_'+sId"
                v-bind:style="{left:poi.left - 4  + 'px', top: poi.top-4 + (block.length) +  'px'}"
          ></span>
          <span class="re-block re-cb"
                v-bind:id="'cb_'+sId"
                v-bind:style="{left:poi.left - 4  + (block.length/2)+'px', top: poi.top-4 + (block.length)  + 'px'}"
          ></span>
          <span class="re-block re-rb"
                v-bind:id="'rb_'+sId"
                v-bind:style="{left:poi.left - 4 + block.length + 'px', top: poi.top -4 + (block.length) +  'px'}"
          ></span>
          </div>
        </div>
      </div>
    </div>
    <div class="img-r" v-show='imgUrl'>
      <template v-for="size of sizes">
        <div class="img-size-warp" v-bind:style="{width: size+ 'px',height:size + 'px'}">
          <img v-bind:src="imgUrl"
               class="img-size-show"
               v-bind:style="{width: scale( scope.width ,size)+ 'px',height:scale( scope.height ,size) + 'px',left: scale(-poi.left ,size)+ 'px', top: scale(-poi.top,size) + 'px' }"
          >
          <div class="img-face"
               v-bind:style="{width: size *3/2+ 'px',height:size*3/2 + 'px','border-width':size / 4 +'px','border-radius':size* 3/4+'px',left:-size/4 +'px',top:-size/4 +'px'}"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>
<style>
  .img-main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    padding: 10px;
  }

  .img-l, .img-r {
    display: inline-block;
    margin-right: 10px;
  }

  .scope-inner {
    position: relative;
  }

  .img-l {
    border: #ececec 1px solid;
    box-sizing: content-box;
  }

  .img-warp {
    position: absolute;
    left: 0;
    top: 0;
  }

  .img-warp:after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    background: #000;
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }

  .draw-warp {
    position: absolute;
    left: 0;
    top: 0;
  }

  .img-light-block {
    display: inline-block;
    overflow: hidden;
    position: relative;
  }

  .img-show {
    position: absolute;
    left: 0;
    top: 0;
  }

  .img-size-warp {
    position: relative;
    overflow: hidden;
  }

  .img-face {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 0 solid #FFFFFF;
  }

  .img-size-show {
    position: absolute;
    left: 0;
    right: 0;
  }

  .resize-block {
    position: absolute;
    top: 0;
    right: 0;
  }

  .re-block {
    position: absolute;
    opacity: 0.5;
    border: 1px #eee solid;
    background-color: #333;
    display: inline-block;
    width: 7px;
    height: 7px;
    cursor: move;
  }

  .re-lt {
    cursor: nwse-resize;
  }

  .re-ct {
    cursor: ns-resize;
  }

  .re-rt {
    cursor: ne-resize;
  }

  .re-lm {
    cursor: w-resize;
  }

  .re-rm {
    cursor: e-resize;
  }

  .re-lb {
    cursor: sw-resize;
  }

  .re-cb {
    cursor: s-resize;
  }

  .re-rb {
    cursor: se-resize;
  }
</style>
<script>
  let {Drag} = require('../plugins/drag.js');
  export default{
    props: {
      sId: {
        type: 'String',
        default(){
          return this.$tools.getEUID(5);
        }
      },
      imgUrl: {
        type: String,
        default(){
          return null;
        }
      },
      minLength: {
        type: Number,
        default(){
          return 40
        }
      },
      scope: {
        default(){
          return {
            width: 400,
            height: 200
          }
        }
      },
      warpSize: {
        default(){
          return {
            width: 400,
            height: 200
          }
        }
      },
      block: {
        default(){
          return {
            length: 40
          }
        }
      },
      sizes: {
        default(){
          return [
            120,
            80,
            60
          ]
        }
      },
      poi: {
        default(){
          return {
            left: 0,
            top: 0
          }
        }
      }
    },
    events: {
      bind(){
        this.$dispatch('bindBlock');
        this.$dispatch('bindLT');
        this.$dispatch('bindCT');
        this.$dispatch('bindRT');
        this.$dispatch('bindLM');
        this.$dispatch('bindRM');
        this.$dispatch('bindLB');
        this.$dispatch('bindCB');
        this.$dispatch('bindRB');
      },
      bindBlock(){
        let $this = this;
        let block = document.querySelector(`#block_${this.sId}`);
        let drapBlock = new Drag(block, {container: `#scope_${this.sId}`});
        let s = false;
        drapBlock.onStart(function(x, y) {
          s = true;
        });
        drapBlock.onMove(function(x, y) {
          if (!s) {
            return
          }
          if (x < 0) {
            x = 0;
          } else if (x > $this.scope.width - $this.block.length) {
            x = $this.scope.width - $this.block.length;
          }
          if (y < 0) {
            y = 0;
          } else if (y > $this.scope.height - $this.block.length) {
            y = $this.scope.height - $this.block.length;
          }
          $this.poi.left = x;
          $this.poi.top = y;
        });
        drapBlock.onStop(function(x, y) {
          s = false;
          if (x < 0) {
            x = 0;
          } else if (x > $this.scope.width - $this.block.length) {
            x = $this.scope.width - $this.block.length;
          }
          if (y < 0) {
            y = 0;
          } else if (y > $this.scope.height - $this.block.length) {
            y = $this.scope.height - $this.block.length;
          }
          $this.poi.left = x;
          $this.poi.top = y;
        })
      },
      bindLT(){
        let $this = this;
        let LT = document.querySelector(`#lt_${this.sId}`);
        let dragLT = new Drag(LT, {container: `#scope_${this.sId}`});
        dragLT.onMove(function(x, y) {
          if (x < 0) {
            x = 0;
          } else if (x > $this.poi.left + $this.block.length - $this.minLength) {
            x = $this.poi.left + $this.block.length - $this.minLength;
          }
          if (y < 0) {
            y = 0;
          } else if (y > $this.poi.top + $this.block.length - $this.minLength) {
            y = $this.poi.top + $this.block.length - $this.minLength;
          }
          let length = Math.min($this.poi.left + $this.block.length - x,
            $this.poi.top + $this.block.length - y);
          $this.poi.left = $this.poi.left + $this.block.length - length;
          $this.poi.top = $this.poi.top + $this.block.length - length;
          $this.block.length = length;
          dragLT.reset($this.poi.left - 3, $this.poi.top - 3)
        });
        dragLT.onStop(function() {
          dragLT.reset($this.poi.left - 3, $this.poi.top - 3)
        })
      },
      bindCT(){
        let $this = this;
        let CT = document.querySelector(`#ct_${this.sId}`);
        let dragCT = new Drag(CT, {container: `#scope_${this.sId}`});
        dragCT.onMove(function(x, y) {
          if (y < 0) {
            y = 0;
          } else if (y > $this.poi.top + $this.block.length - $this.minLength) {
            y = $this.poi.top + $this.block.length - $this.minLength;
          }
          let length = Math.min($this.poi.top + $this.block.length - y,
            $this.poi.left + $this.block.length
          );
          $this.poi.left = $this.poi.left + $this.block.length - length;
          $this.poi.top = $this.poi.top + $this.block.length - length;
          $this.block.length = length;
          dragCT.reset($this.poi.left + $this.block.length / 2 - 3, $this.poi.top - 3)
        });
        dragCT.onStop(function() {
          dragCT.reset($this.poi.left + $this.block.length / 2 - 3, $this.poi.top - 3)
        })
      },
      bindRT(){
        let $this = this;
        let RT = document.querySelector(`#rt_${this.sId}`);
        let dragRT = new Drag(RT, {container: `#scope_${this.sId}`});
        dragRT.onMove(function(x, y) {
          if (x < $this.poi.left + $this.minLength) {
            x = $this.poi.left + $this.minLength;
          } else if (x > $this.scope.width) {
            x = $this.scope.width;
          }
          if (y < 0) {
            y = 0;
          } else if (y > $this.poi.top + $this.block.length - $this.minLength) {
            y = $this.poi.top + $this.block.length - $this.minLength;
          }
          let length = Math.min(x - $this.poi.left, $this.poi.top + $this.block.length - y);
          $this.poi.top = $this.poi.top + $this.block.length - length;
          $this.block.length = length;
          dragRT.reset($this.poi.left + $this.block.length - 3, $this.poi.top - 3)
        });
        dragRT.onStop(function() {
          dragRT.reset($this.poi.left + $this.block.length - 3, $this.poi.top - 3)
        })
      },
      bindLM(){
        let $this = this;
        let LM = document.querySelector(`#lm_${this.sId}`);
        let dragLM = new Drag(LM, {container: `#scope_${this.sId}`});
        dragLM.onMove(function(x, y) {
          if (x < 0) {
            x = 0;
          } else if (x > $this.poi.left + $this.block.length - $this.minLength) {
            x = $this.poi.left + $this.block.length - $this.minLength;
          }
          let length = Math.min($this.poi.left + $this.block.length - x,
            $this.poi.top + $this.block.length);
          $this.poi.left = $this.poi.left + $this.block.length - length;
          $this.poi.top = $this.poi.top + $this.block.length - length;
          $this.block.length = length;
          dragLM.reset($this.poi.left - 3, $this.poi.top + $this.block.length / 2 - 3)
        });
        dragLM.onStop(function() {
          dragLM.reset($this.poi.left - 3, $this.poi.top + $this.block.length / 2 - 3)
        })
      },
      bindRM(){
        let $this = this;
        let RM = document.querySelector(`#rm_${this.sId}`);
        let dragRM = new Drag(RM, {container: `#scope_${this.sId}`});
        dragRM.onMove(function(x, y) {
          if (x < $this.poi.left + $this.minLength) {
            x = $this.poi.left + $this.minLength;
          } else if (x > $this.scope.width) {
            x = $this.scope.width;
          }
          let length = Math.min(x - $this.poi.left,
            $this.poi.top + $this.block.length);
          $this.poi.top = $this.poi.top + $this.block.length - length;
          $this.block.length = length;
          dragRM.reset($this.poi.left + $this.block.length - 3, $this.poi.top + $this.block.length / 2 - 3)
        });
        dragRM.onStop(function() {
          dragRM.reset($this.poi.left + $this.block.length - 3, $this.poi.top + $this.block.length / 2 - 3)
        })
      },
      bindLB(){
        let $this = this;
        let LB = document.querySelector(`#lb_${this.sId}`);
        let dragLB = new Drag(LB, {container: `#scope_${this.sId}`});
        dragLB.onMove(function(x, y) {
          if (x < 4) {
            x = 0;
          } else if (x > $this.poi.left + $this.block.length - $this.minLength) {
            x = $this.poi.left + $this.block.length - $this.minLength;
          }
          if (y > $this.scope.height) {
            y = $this.scope.height;
          } else if (y < $this.poi.top + $this.minLength) {
            y = $this.poi.top + $this.minLength;
          }
          let length = Math.min($this.poi.left + $this.block.length - x,
            y - $this.poi.top);
          $this.poi.left = $this.poi.left + $this.block.length - length;
          $this.block.length = length;
          dragLB.reset($this.poi.left - 3, $this.poi.top + $this.block.length - 3)
        });
        dragLB.onStop(function() {
          dragLB.reset($this.poi.left - 3, $this.poi.top + $this.block.length - 3)
        })
      },
      bindCB(){
        let $this = this;
        let CB = document.querySelector(`#cb_${this.sId}`);
        let dragCB = new Drag(CB, {container: `#scope_${this.sId}`});
        dragCB.onMove(function(x, y) {
          if (y > $this.scope.height) {
            y = $this.scope.height;
          } else if (y < $this.poi.top + $this.minLength) {
            y = $this.poi.top + $this.minLength;
          }
          let length = Math.min($this.poi.left + $this.block.length,
            y - $this.poi.top);
          $this.poi.left = $this.poi.left + $this.block.length - length;
          $this.block.length = length;
          dragCB.reset($this.poi.left + $this.block.length / 2 - 3, $this.poi.top + $this.block.length - 3)
        });
        dragCB.onStop(function() {
          dragCB.reset($this.poi.left + $this.block.length / 2 - 3, $this.poi.top + $this.block.length - 3)
        })
      },
      bindRB(){
        let $this = this;
        let RB = document.querySelector(`#rb_${this.sId}`);
        let dragRB = new Drag(RB, {container: `#scope_${this.sId}`});
        dragRB.onMove(function(x, y) {
          if (y > $this.scope.height) {
            y = $this.scope.height;
          } else if (y < $this.poi.top + $this.minLength) {
            y = $this.poi.top + $this.minLength;
          }
          if (x < $this.poi.left + $this.minLength) {
            x = $this.poi.left + $this.minLength;
          } else if (y > $this.scope.width) {
            x = $this.scope.width;
          }
          let length = Math.min(x - $this.poi.left,
            y - $this.poi.top);
          $this.block.length = length;
          dragRB.reset($this.poi.left + $this.block.length - 3, $this.poi.top + $this.block.length - 3)
        });
        dragRB.onStop(function() {
          dragRB.reset($this.poi.left + $this.block.length - 3, $this.poi.top + $this.block.length - 3)
        })
      }
    },
    ready(){
      this.$dispatch('bind')
    },
    methods: {
      scale(length, size){
        if (!size) {
          return length;
        }
        return size / this.block.length * length;
      }
    }
  }
</script>
