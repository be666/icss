let Vue = require('vue');
let less = require('./dialog.less');
var dialogTemplate = [];
dialogTemplate.push('<div class="i-modal {{dialogClass}}" id="{{dialogId}}">');
dialogTemplate.push('<div class="i-modal-dialog" >');
dialogTemplate.push('<div class="i-modal-hd">');
dialogTemplate.push('{{dialogTitle}}');
dialogTemplate.push('<a href="javascript: void(0)" class="am-close am-close-spin" v-on:click="close">&times;</a>');
dialogTemplate.push('</div>');
dialogTemplate.push('<div class="i-modal-bd">');
dialogTemplate.push('<dialog_content v-ref:content></dialog_content>');
dialogTemplate.push('</div>');
dialogTemplate.push('<div class="i-modal-footer" id="{{dialogId}}-btn" v-if="showBtn">');
dialogTemplate.push('</div>');
dialogTemplate.push('</div>');
dialogTemplate.push('</div>');
var VueDialog = Vue.extend({
  template: dialogTemplate.join('')
});
var VueDialogBtn = Vue.extend({
  template: '<span class="am-modal-btn {{className}}" v-on:click="btnClick" >{{text}}</span>'
});
class DialogStore {
  constructor() {
    this.store = [];
  };

  push($dialog) {
    this.store.push({
      id: $dialog.id,
      dialog: $dialog
    });
    this.watchModal();
  }

  pop($id) {
    let index = this.store.findIndex(({id})=> {
      return id == $id
    });
    if (index > -1) {
      this.store.splice(index, 1);
    }
    this.watchModal();
  }

  watchModal() {
    let dialogModal = document.getElementById('vue-ui-dialog-modal');
    let className = dialogModal.className;
    className = className.split(' ');
    let index = className.findIndex((n)=>n == 'am-active');
    if (index > -1) {
      className.splice(index, 1);
    }
    if (this.store.length > 0) {
      className.push('am-active');
      dialogModal.style.display = 'block';
    } else {
      dialogModal.style.display = 'none';
    }
    dialogModal.className = className.join(' ');
  }

  lockWindow() {
    let store = this.store;
    for (let item of store) {
      item.dialog.lockWindow();
    }
  }
}
window.dialogStore = window.dialogStore || new DialogStore();
class Dialog {
  constructor(dialogVue, {id, buttons=[],onClose,title,dialogClass}) {
    this.id = id;
    var $this = this;
    this.vueDialog = new VueDialog({
      components: {
        "dialog_content": dialogVue
      },
      data(){
        let classArr = [];
        classArr.push(buttons.length > 0 ? 'i-modal-confirm' : 'i-modal-no-btn');
        classArr.push(dialogClass);
        return {
          dialogId: id,
          dialogTitle: title,
          showBtn: buttons.length > 0,
          dialogClass: classArr.join(' ')
        };
      },
      methods: {
        close(){
          if (typeof onClose == 'function') {
            if (onClose($this.vueDialog, $this, id)) {
              $this.close();
            }
          } else {
            $this.close();
          }
        }
      },
      ready: function () {
        for (let {text,click,className=''} of buttons) {
          let dialogBtn = new VueDialogBtn({
            data(){
              return {
                text, className
              }
            },
            methods: {
              btnClick() {
                click && click($this.vueDialog, $this, id);
              }
            }
          });
          dialogBtn.$mount().$appendTo(`#${id}-btn`)
        }
      }
    });
    this.vueDialog.$mount().$appendTo('#vue-ui-home');
    this.show();
  }

  show() {
    var $this = this;
    this.css(this.vueDialog.$el, {
      opacity: 1,
      display: 'block'
    });
    window.dialogStore.push($this)
    $this.lockWindow($this.id);
  }

  css(target, styles) {
    for (var key in styles) {
      target.style[key] = styles[key];
    }
  }

  lockWindow(id) {
    id = id || this.id;
    let target = document.getElementById(id);
    let winWidth = window.innerWidth || document.body.clientWidth || 0;
    let winHeight = window.innerHeight || document.body.clientHeight || 0;
    let tWidth = target.offsetWidth || 0;
    let tHeight = target.offsetHeight || 0;
    let left = (winWidth - tWidth) / 2;
    let top = (winHeight - tHeight) / 2;
    if (left < 0) {
      left = 0;
    }
    if (top < 0) {
      top = 0;
    }
    this.css(target, {
      position: 'fixed',
      left: parseInt(left) + 'px',
      top: parseInt(top) + 'px'
    });
  }

  close() {
    this.vueDialog.$destroy(true);
    window.dialogStore.pop(this.id)
  }
}
var dialogModal = [];
dialogModal.push('<div class="am-dimmer" id="vue-ui-dialog-modal">');
dialogModal.push('</div>');
if (!document.getElementById('vue-ui-home')) {
  let uiHome = document.createElement('div');
  uiHome.style.width = 0;
  uiHome.style.height = 0;
  uiHome.id = 'vue-ui-home';
  var l = document.body.childNodes.length;
  document.body.insertBefore(uiHome, document.body.childNodes[l - 1]);
}
if (!document.getElementById('vue-ui-dialog-modal')) {
  let uiHome = document.getElementById('vue-ui-home');
  uiHome.innerHTML = dialogModal.join('');
  window.addEventListener(`resize`, function () {
    let dialogStore = window.dialogStore;
    dialogStore.lockWindow();
  });
}
let getEuId = function (len, radix) {
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
};
export let open = (dialogVue, {
  id,buttons,onSuccess,onCancel,title,onClose,dialogClass
  }={}) => {
  if (!id) {
    id = getEuId(10);
  }
  if (!buttons) {
    buttons = [];
    buttons.push({
      text: '取消',
      click: function (content, $this, id) {
        if (typeof onCancel == 'function') {
          if (onCancel(content, $this, id)) {
            $this.close();
          }
        } else {
          $this.close();
        }
      }
    });
    buttons.push({
      text: '确定',
      click: function (content, $this, id) {
        if (typeof onSuccess == 'function') {
          if (onSuccess(content, $this, id)) {
            $this.close();
          }
        } else {
          $this.close();
        }
      }
    })
  }
  return new Dialog(dialogVue, {id: id, buttons: buttons, title, onClose, dialogClass});
};
let DialogMsg = Vue.extend({
  template: '<div>{{dialogMsg}}</div>'
});
export let success = (msg, onclick)=> {
  let dialogMsg = DialogMsg.extend({
    data(){
      return {dialogMsg: msg}
    }
  });
  return open(dialogMsg, {
    buttons: [
      {
        text: '确定',
        click: function (content, $this, id) {
          if (typeof onclick == 'function') {
            if (onclick(content, $this, id)) {
              $this.close()
            }
          } else {
            $this.close()
          }
        }
      }
    ]
  });
};
export let error = (msg)=> {
  let dialogMsg = DialogMsg.extend({
    data(){
      return {dialogMsg: msg}
    }
  });
  return open(dialogMsg, {buttons: []});
};



