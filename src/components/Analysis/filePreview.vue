<template class="app-container">
  <div>
    <ul>
      <li @click="filePreview(c.annexId)" style="cursor: hand" v-for="c in data" :key="c.index">
        <svg-icon icon-class="file" />
        <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
      </li>
    </ul>
    <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
      <iframe width="100%" height="100%" :src="fileview"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { backUp } from '@/api/data/file';
export default {
  name: 'FilePreview', //附件预览组件
  props: {
    //类型
    type: [Number], //0
    //参数
    data: [String, Object, Array, Number],
    extra: {
      type: String,
      default: () => {
        return null;
      },
    },
  },
  data() {
    return {
      dialogTableVisible: false,
      fileview: '', //文件预览地址
    };
  },
  created() {},
  methods: {
    //文件预览
    filePreview(val) {
      console.log(val, this.type, this.extra);
      if (this.type == 0) {
        //不用权限下载
        noAuthExport(this.type, this.extra, val);
      } else {
        this.fileview = 'about:blank';
        setTimeout(() => {
          // this.fileview = 'https://httpraccoons.com/200';
          if (this.type == 0) {
            //不用权限预览
            this.fileview =
              process.env.VUE_APP_BASE_API +
              'file/no/preview/' +
              val +
              '/?businessType=0&businessId=' +
              this.extra;
          } else {
            this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
          }
        }, 200);

        this.dialogTableVisible = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  max-height: 150px;
  overflow: auto;
  list-style-type: none;
  margin: 0px 5px;
  padding: 0px;

  li {
    margin-bottom: 5px;
  }
}
</style>
