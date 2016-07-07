'use strict';
let Vue = require('vue');
let less = require('./scrollTop.less');
var sTopTemplate = [];
sTopTemplate.push(`<div class="i_scroll_top {{scrollTopClass}}" id="{{scrollTopId}}">
<div class="i_s_t_mobile">
<div class="i_s_t_code"></div>
</div>
<div class="i_s_t_text" v-on:click="flyingExec">
回到顶部
<br>
<div class="i_s_t_fly" v-bind:class="{'active':flying}"></div>
</div>
</div>`);
var VueScrollTop = Vue.extend({
  template: sTopTemplate.join('')
});
if (!document.getElementById('vue-ui-home')) {
  let uiHome = document.createElement('div');
  uiHome.style.width = 0;
  uiHome.style.height = 0;
  uiHome.id = 'vue-ui-home';
  var l = document.body.childNodes.length;
  document.body.insertBefore(uiHome, document.body.childNodes[l - 1]);
}
let _flyingExec = function(acceleration, stime) {
  let self = this;
  self.flying = true;
  acceleration = acceleration || 0.1;
  stime = stime || 10;
  let x1 = 0;
  let y1 = 0;
  let x2 = 0;
  let y2 = 0;
  if (document.documentElement) {
    x1 = document.documentElement.scrollLeft || 0;
    y1 = document.documentElement.scrollTop || 0;
  }
  if (document.body) {
    x2 = document.body.scrollLeft || 0;
    y2 = document.body.scrollTop || 0;
  }
  let x3 = window.scrollX || 0;
  let y3 = window.scrollY || 0;
  // 滚动条到页面顶部的水平距离
  let x = Math.max(x1, Math.max(x2, x3));
  // 滚动条到页面顶部的垂直距离
  let y = Math.max(y1, Math.max(y2, y3));
  // 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
  let speeding = 1 + acceleration;
  window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
  // 如果距离不为零, 继续调用函数
  if (x > 0 || y > 0) {
    window.setTimeout(function() {
      _flyingExec.apply(self, [acceleration, stime])
    }, stime);
  }
  setTimeout(function() {
    self.flying = false;
  }, 1100)
};
class ScrollTop {
  constructor({scrollTopClass,scrollTopId}) {
    this.vueScrollTop = new VueScrollTop({
      data(){
        return {
          scrollTopClass: scrollTopClass,
          scrollTopId: 'scrollTopId',
          flying: false
        }
      },
      methods: {
        flyingExec(){
          _flyingExec.apply(this)
        }
      }
    });
    this.vueScrollTop.$mount().$appendTo('#vue-ui-home');
  }
}
exports.show = function(option) {
  option = option || {};
  return new ScrollTop(option);
};
