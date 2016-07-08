'use strict';
let c_file = require("./file.vue");
let c_avatar = require("./avatar.vue");
let c_avatar_file = require("./avatar-file.vue");
let c_checkbox = require("./checkbox.vue");
let c_pagination = require("./pagination.vue");
let c_radio = require("./radio.vue");
let c_navigation = require("./navigation.vue");
let c_search = require("./search.vue");
let c_select_multi = require("./select-multi.vue");
let c_select_single = require("./select-single.vue");
let c_switch_toggle = require("./switch-toggle.vue");
let c_table = require("./table.vue");
let c_table_server = require("./table-server.vue");
let c_user_avatar = require("./user-avatar.vue");
let dialog = require('../plugins/dialog.js');
let scrollTop = require('../plugins/scrollTop.js');
let componentMap = {
  file: c_file,
  avatar: c_avatar,
  avatar_file: c_avatar_file,
  checkbox: c_checkbox,
  pagination: c_pagination,
  navigation: c_navigation,
  radio: c_radio,
  search: c_search,
  select_multi: c_select_multi,
  select_single: c_select_single,
  switch_toggle: c_switch_toggle,
  table: c_table,
  table_server: c_table_server,
  user_avatar: c_user_avatar
};
function install(option) {
  option = option || {prefix: "i_"};
  return function (Vue) {
    let keys = Object.keys(componentMap);
    for (let key of keys) {
      Vue.component(`${option.prefix}${key}`, componentMap[key]);
    }
    Object.defineProperties(Vue.prototype, {
      $dialog: {
        get: function () {
          return dialog;
        }
      },
      $scrollTop: {
        get: function () {
          return scrollTop.show();
        }
      },
      $getUUID: {
        get: function () {
          return function (radix, len) {
            var chars = 'abcdefghijklmnopqrstuvwxyz'.split('');
            var uuid = [], i;
            radix = radix || chars.length;
            if (len) {
              // Compact form
              for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
            } else {
              // rfc4122, version 4 form
              var r;
              // rfc4122 requires these characters
              uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
              uuid[14] = '4';
              // Fill in random data.  At i==19 set the high bits of clock sequence as
              // per rfc4122, sec. 4.1.5
              for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                  r = 0 | Math.random() * 16;
                  uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
              }
            }
            return uuid.join('');
          }
        }
      }
    });
  }
}
if (window.Vue) {
  Vue.use(install());
}
module.exports = install;
