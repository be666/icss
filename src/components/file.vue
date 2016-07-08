<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div class="i-cf i-file-group">
    <input type="text" placeholder="{{placeholder}}" class="i-file-field" v-model="name"
           readonly="readonly">
    <span class="i-input-group-label">
      <button class="i-file-warp" type="button">
        {{tips}}
        <form onsubmit="return false" enctype="multipart/form-data" v-bind:id="formId">
          <input type="file" v-on:change="submit($event)"
                 class="i-file" multiple="multiple"
                 name="fileUpload"
                 id="fileUpload">
        </form>
      </button>
    </span>
  </div>
</template>
<style>
  .i-file-group {
    display: inline-block;
    width: 100%;
    height: 32px;

  }

  .i-file-group input[type=text].i-file-field {
    display: inline-block;
    width: 60%;
    height: inherit;
    float: left;
  }

  .i-input-group-label {
    display: inline-block;
    width: 40%;
    height: inherit;
    float: left;
  }

  .i-file-warp {
    position: relative;
    display: inline-block;
    overflow: hidden;
    text-decoration: none;
    width: 100%;
    height: 32px;
  }

  .i-file {
    width: 100%;
    height: 32px;
  }

  .i-file-warp .i-file {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }

  .i-file-warp:hover {
    text-decoration: none;
  }
</style>
<script>
  export default {
    name: 'i_file',
    props: {
      name: 'String',
      size: 'String',
      path: 'String',
      placeholder: {
        default(){
          return '请选择文件!'
        }
      },
      tips: {
        default(){
          return '选择文件'
        }
      },
      ext: {
        default(){
          return 'doc|pdf|jpg'
        }
      },
      formId: {
        default(){
          return this.$getUUID(5);
        }
      }
    },
    methods: {
      submit: function (event) {
        var $this = this;
        let filePath = event.target.value;
        let exts = $this.ext.split("|");
        if (filePath.indexOf(".") == -1) {
          $this.$dialog.error('请选择正确的文件上传!');
          return false;
        }
        let extR = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
        if (exts.findIndex(function (x) {
            return x == extR
          }) == -1) {
          $this.$dialog.error('请选择正确的文件上传!');
          return false;
        }
        var formData = new FormData(document.forms.namedItem($this.formId));
        $this.tips = '上传中...';
        $this.$http.post($this.$config.uploadUrl, formData, function (data, state, req) {
          document.forms.namedItem($this.formId).reset();
          $this.name = data.name;
          $this.size = data.size;
          $this.path = data.path;
          $this.tips = '上传完成!';
          $this.$dispatch("upload-success")
        }, {
          headers: {
            "Content-Type": "multipart/form-data;"
          }
        }).error(function (res) {
          $this.tips = '上传失败!';
          $this.$dialog.error(res.error.message);
          document.forms.namedItem($this.formId).reset();
        })
      }
    }
  }
</script>
