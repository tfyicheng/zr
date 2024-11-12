<template>
  <div class="upload-file">
    <el-upload
      :auto-upload="false"
      multiple
      :action="uploadFileUrl"
      :file-list="fileList"
      :limit="limit"
      :on-change="handleChange"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-progress="handleUploading"
      :show-file-list="false"
      :headers="headers"
      :data="data2"
      class="upload-file-uploader"
      ref="fileUpload"
    >
      <!-- 上传按钮:before-upload="handleBeforeUpload" -->
      <el-button ref="ubtn"><svg-icon icon-class="upload" /> 选择文件</el-button>
      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b><br v-if="fileType" />
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </template>
        的文件
      </div>
    </el-upload>

    <!-- 文件列表 -->
    <transition-group
      class="upload-file-list el-upload-list el-upload-list--text"
      name="el-fade-in-linear"
      tag="ul"
    >
      <li
        :key="index + 1"
        class="el-upload-list__item ele-upload-list__item-content"
        v-for="(file, index) in fileList"
      >
        <!-- :href="file.url" :underline="false"  -->
        <el-link :underline="false" target="_blank">
          <span class="el-icon-document" style="margin-left: 10px">
            <InputTip
              :width="320"
              :text="getFileName(file.name)"
              style="display: inline; margin-left: 5px; height: 25px; line-height: 20px"
            ></InputTip>
            <!-- {{ getFileName(file.name) }} -->
          </span>
        </el-link>
        <div class="ele-upload-list__item-content-action">
          <el-link :underline="false" @click="handleDelete(index)" type="danger" style="width: 30px"
            >删除</el-link
          >
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';

export default {
  name: 'FileUpload',
  props: {
    disabled: { type: Boolean, default: true },
    // 值
    value: [String, Object, Array],
    //上传额外参数
    data: {}, // data: { type: Object, default: () => {} },
    //上传附件类型
    upType: {},
    // 数量限制
    limit: {
      type: Number,
      default: 10,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg', 'doc', 'xls', 'ppt', 'txt', 'pdf'],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data2: {}, //额外参数
      number: 0,
      uploadList: [],
      uploadFileUrl: process.env.VUE_APP_BASE_API + '/file/upload', // 上传文件服务器地址
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      fileList: [],
    };
  },
  watch: {
    //文件回传列表
    value: {
      handler(val) {
        if (val) {
          let temp = 1;
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(',');
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            // if (typeof item === "string") {
            //   item = { name: item, url: item };
            // }
            // item.uid = item.uid || new Date().getTime() + temp++;
            // return item;
            return { name: item.originalName, url: item.annexId, id: item.annexId };
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
    //判断是否带附件类型
    upType: {
      handler(newval, oldval) {
        if (newval) {
          //console.log('上传附件类型:' + newval);
          this.data = { type: newval };
          this.data2 = this.data;
          console.log('上传参数:', this.data);
          //this.clearn(); //切换附件类型时清空附件
          this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/file/uploadByType'; // 上传文件服务器地址
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  methods: {
    //触发上传事件
    clickUp() {
      //console.log(this.fileList.length + '=' + this.uploadList.length);
      this.$refs.fileUpload.submit();
    },

    //引用触发选择文件
    clickEvent() {
      this.$refs.ubtn.$el.click();
    },

    //置空列表
    clearn() {
      this.uploadList = [];
      this.fileList = [];
    },

    //先获取选择的文件
    handleChange(file) {
      //console.log(file);
      if (this.fileList.findIndex((c) => c.uid == file.uid || c.name == file.name) == -1) {
        if (this.handleBeforeUpload(file)) {
          this.fileList.push(file);
        }
      }
      return;
    },

    //上传时钩子
    handleUploading() {
      console.log('正在上传文件，请稍候...');
      this.$modal.loading('正在上传文件，请稍候...');
    },

    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType) {
        const fileName = file.name.split('.');
        const fileExt = fileName[fileName.length - 1];
        const isTypeOk = this.fileType.indexOf(fileExt) >= 0;
        if (!isTypeOk) {
          this.$modal.msgError(`文件格式不正确, 请上传${this.fileType.join('/')}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$modal.msgError(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      //this.$modal.loading('正在上传文件，请稍候...');
      this.number++;
      // if (this.fileList.findIndex((c) => c.uid == file.uid || c.name == file.name) == -1) {
      //   this.fileList.push(file);
      // }
      return true;
    },
    // 文件个数超出
    handleExceed() {
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },
    // 上传失败
    handleUploadError(err) {
      this.$modal.msgError('上传文件失败，请重试');
      this.$modal.closeLoading();
    },

    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        res.data.forEach((element) => {
          this.uploadList.push({
            name: element.originalName,
            url: element.remoteUrl,
            id: element.id,
          });
        });

        // this.uploadList.push({ name: res.data.originalName, url: res.data.remoteUrl,id:res.data.id });
        this.uploadedSuccessfully();
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$modal.msgError(res.msg);
        this.$refs.fileUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },

    // 删除文件
    handleDelete(index) {
      this.fileList.splice(index, 1);
      this.$emit('upload', {
        file: this.limit == 1 ? this.fileList : this.listToId(this.fileList),
        type: 1,
      });
    },

    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        //this.fileList = [];
        // this.fileList =this.fileList.concat(this.uploadList);
        // console.log('1', this.fileList);
        // console.log('2', this.uploadList);
        //上传之后的文件列表去替换待上传文件列表
        this.uploadList.forEach((item) => {
          if (this.fileList.findIndex((c) => c.name == item.name) != -1) {
            this.fileList.splice(
              this.fileList.findIndex((c) => c.name == item.name),
              1,
              item,
            );
          } else {
            this.fileList.push(item);
          }
        });

        this.uploadList = [];
        this.number = 0;
        this.$emit('upload', {
          file: this.limit == 1 ? this.fileList : this.listToId(this.fileList),
          type: 0,
        }); //当限制上传一个时为教育附件带上附件名
        this.$modal.closeLoading();
        //console.log(this.fileList);
        console.log('上传成功');
      }
      this.$modal.closeLoading();
    },
    // 获取文件名称
    getFileName(name) {
      return name;
      // if (name.lastIndexOf("/") > -1) {
      //   return name.slice(name.lastIndexOf("/") + 1);
      // } else {
      //   return "";
      // }
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = '';
      separator = separator || ',';
      for (let i in list) {
        strs += list[i].url + separator;
      }
      //移除最后一个字符串
      return strs != '' ? strs.substr(0, strs.length - 1) : '';
    },

    //取出文件id合成数组给调用组件
    listToId(list) {
      try {
        let li = [];
        for (let i in list) {
          li.push({ annexId: list[i].id.toString(), originalName: list[i].name });
        }
        return li;
      } catch (error) {
        console.log(error.msg);
        return list;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.el-button {
  width: 240px;
  height: 36px;
  border-radius: 4px;
  color: #409eff;
  font-family: Alibaba PuHuiTi 2;
  font-size: 16px;
  font-weight: 500;
}
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list {
  max-height: 200px;
  overflow-y: auto;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 0px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
</style>
