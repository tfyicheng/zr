<template>
  <div class="upload-file">
    <el-upload
      :auto-upload="false"
      multiple
      :action="uploadFileUrl"
      :file-list="fileList"
      :limit="limit"
      :on-change="handleChange"
      :on-error="handleUploadSuccess"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :on-progress="handleUploading"
      :show-file-list="false"
      :headers="headers"
      :data="data2"
      class="upload-file-uploader"
      ref="fileUpload"
    >
    </el-upload>

    <div>
      <!-- 上传按钮:before-upload="handleBeforeUpload" @click="upFile"-->
      <el-button ref="ubtn" @click="(e) => openProcessDefinition(e)"
        ><svg-icon icon-class="upload" />选择文件</el-button
      >

      <!-- <el-button @click="test">测试</el-button> -->

      <!-- 上传提示 -->
      <div class="el-upload__tip" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b> 的文件<br />
        </template>
        <template v-if="fileType">
          格式为 <b style="color: #f56c6c">{{ fileType.join('/') }}</b>
        </template>
        <!-- 的文件 -->
        <div style="height: 10px"></div>
      </div>
    </div>

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
        <!-- :href="file.url" :underline="false" -->
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
import axios from 'axios';
export default {
  name: 'FileUpload2',
  props: {
    disabled: { type: Boolean, default: true },
    // 值
    value: [String, Object, Array],
    mustType: false, //文件是否必填类型
    //上传额外参数
    data: {
      type: -1,
    }, // data: { type: Object, default: () => {} },
    //上传附件类型
    upType: {},
    // 数量限制
    limit: {
      type: Number,
      default: 999,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 500,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: null,
    // {
    //   type: Array,
    //   default: () => [
    //     'png',
    //     'jpg',
    //     'jpeg',
    //     'doc',
    //     'docx',
    //     'xls',
    //     'xlsx',
    //     'ppt',
    //     'txt',
    //     'pdf',
    //     'dwg',
    //     'dxf',
    //     'psd',
    //   ],
    // },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data2: {
        type: -1,
      }, //额外参数
      number: 0,
      uploadList: [],
      //uploadFileUrl: process.env.VUE_APP_BASE_API + '/file/uploadByType', // 上传文件服务器地址
      uploadFileUrl: 'http://eip.gdzrsj.com/prod-api/file/uploadByType', //上传计费接口
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      fileList: [],
      upStatus: 0, //上传接口状态  0空闲 1上传中 2成功 3失败
    };
  },
  watch: {
    //文件回传列表
    value: {
      handler(val) {
        if (val) {
          if (val.length > 0 && val[0].originalName) {
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
          }
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
        if (newval != oldval) {
          //console.log('上传附件类型:' + newval);
          this.data = { type: newval };
          this.data2 = this.data;
          console.log('上传参数:', this.data);
          //this.clearn(); //切换附件类型时清空附件
          //this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/file/uploadByType'; // 上传文件服务器地址
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
    test() {
      if (this.uploadFileUrl == process.env.VUE_APP_BASE_API + '/file/uploadByType') {
        this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/file/uploadByType1';
        this.$message.success('切换接口false');
      } else {
        this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/file/uploadByType';
        this.$message.success('切换接口ture');
      }
    },

    //确认上传前置判断
    async openProcessDefinition(e) {
      // 利用js冒泡事件机制和模拟点击事件来实现a-upload组件的弹出框限制
      // 点击上传button按钮默认阻止冒泡事件传递
      e.stopPropagation(); // 阻止事件冒泡到父元素
      if (this.mustType) {
        if (
          this.data2.type == '' ||
          this.data2.type == null ||
          this.data2.type == undefined ||
          this.data2.type == -1
        ) {
          if (this.data2.type == 0) {
            this.$refs['fileUpload'].$refs['upload-inner'].handleClick();
          } else {
            this.$modal.msgError(`请先选择附件类型`);
            return;
          }
        } else {
          this.$refs['fileUpload'].$refs['upload-inner'].handleClick();
        }
      } else {
        this.$refs['fileUpload'].$refs['upload-inner'].handleClick();
      }
    },

    upFile() {},

    //触发上传事件  //当上传文件状态成功不是准备时不会触发上传动作
    clickUp() {
      console.log(this.fileList, this.uploadList);
      if (this.fileList.findIndex((c) => c.status == 'ready') == -1) {
        this.$emit('upload', this.limit == 1 ? this.fileList : this.listToId(this.fileList));
      }
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
      if (this.fileList.findIndex((c) => c.uid == file.uid || c.name == file.name) == -1) {
        if (this.handleBeforeUpload(file)) {
          this.number++;
          this.fileList.push(file);
        }
      }
      console.log('获取选择的文件', this.number, file);
      // return;
    },

    //上传时钩子
    handleUploading() {
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
      //  this.number++;
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
        this.uploadedSuccessfully();
      } else {
        this.upStatus = 3;
        this.$modal.closeLoading();
        this.$modal.msgError('上传文件失败，请重试 \n\r' + res.msg);
        //this.$modal.msgError(res.msg ? res.msg : '上传文件失败，请重试');
        //this.number--;
        //this.$refs.fileUpload.handleRemove(file);
        //this.uploadedSuccessfully();
      }
    },

    // 删除文件
    handleDelete(index) {
      if (this.number > 0 && this.fileList[index].status != 'success') {
        this.number--;
      }
      this.fileList.splice(index, 1);
      this.$emit('upload', this.limit == 1 ? this.fileList : this.listToId(this.fileList));
      // this.$emit('upload', {
      //   file: this.limit == 1 ? this.fileList : this.listToId(this.fileList),
      //   type: 1,
      // });
    },

    // 上传结束处理
    uploadedSuccessfully() {
      //console.log('上传结束处理', this.number, this.uploadList.length);
      if (this.number > 0 && this.uploadList.length === this.number) {
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
        this.$emit('upload', this.limit == 1 ? this.fileList : this.listToId(this.fileList)); //当限制上传一个时为教育附件带上附件名

        //  this.$modal.closeLoading();
        //console.log(this.fileList);
        //console.log('上传成功');
      }
      // this.$modal.closeLoading();
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

    //异步上传
    asyncUpFile() {
      console.log('异步上传文件', this.number, this.fileList);
      return new Promise(async (resolve) => {
        if (this.number > 0) {
          // // 先删除
          // this.$refs['fileUpload'].clearFiles();
          // this.$nextTick(() => {
          //   // 再导入
          //   this.fileList.forEach((item) => {
          //     if (item.status == 'ready') {
          //       this.$refs['fileUpload'].handleStart(item.raw);
          //     }
          //   });

          //   this.isUpdateSupport = 1;
          //   // 再重新提交上传
          //   this.$refs.fileUpload.submit();
          // });

          //this.$refs.fileUpload.submit();

          this.submitUpload();

          let i = 1;
          let timeout = this.number * 610; //总超时时间，文件数*接口超时时间
          while (true) {
            i++;
            console.log('等待上传完毕');
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (this.number == 0 || this.upStatus == 3 || i > timeout) {
              break;
            }
          }

          if (this.number == 0 || this.upStatus == 0 || this.upStatus == 2) {
            console.log('上传完毕');
            this.upStatus = 0;
            resolve(true);
          } else if (this.upStatus == 3 || i > timeout) {
            console.log('上传失败');
            if (i > timeout) {
              this.$modal.msgError('上传文件异常超时，请刷新页面重试');
            }
            this.upStatus = 0;
            resolve(false);
          } else {
            console.log('上传结束');
            this.upStatus = 0;
            resolve(true);
          }
        } else {
          console.log('没有上传文件');
          resolve(true);
        }
      });
    },

    //遍历上传（取消并发）
    submitUpload(i = 0) {
      //跳过已经上传过的文件
      if (this.fileList[i].status == 'success' || !this.fileList[i].raw) {
        this.submitUpload(i + 1);
        return;
      }

      if (this.fileList.length > 0) {
        this.$modal.loading('正在上传提交中，请稍候...');
        this.fileNum = new FormData(); // new formData对象
        this.fileNum.append('file', this.fileList[i].raw); // append增加数据
        this.fileNum.append('type', this.data2.type); // append增加数据
        let _vm = this;
        axios({
          url: this.uploadFileUrl,
          //url: 'http://eip.gdzrsj.com/prod-api/file/uploadByType',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + getToken(),
          },
          method: 'post',
          data: this.fileNum,
          timeout: 600000,
        })
          .then((res2) => {
            console.log('上传返回', res2);
            if (res2.data.code == 200) {
              // this.$message({
              //   message: "上传成功",
              //   type: 'success'
              // })

              //手动上传不会触发组件事件需要自己处理
              res2.data.data.forEach((element) => {
                _vm.uploadList.push({
                  name: element.originalName,
                  url: element.remoteUrl,
                  id: element.id,
                });
              });

              if (this.data2.type > 100) {
                _vm.$message.success(res2.data.msg);
              }

              if (i + 1 == this.fileList.length) {
                _vm.uploadedSuccessfully();
              } else {
                // 进行递归 上传下一个
                this.submitUpload(i + 1);
              }
            } else {
              _vm.$message({
                message: res2.data.msg || '上传文件失败，请重试',
                type: 'error',
              });
              _vm.$modal.closeLoading();
              _vm.upStatus = 3;
              _vm.uploadList = [];
              // 进行递归 上传下一个
              //this.showDesc = '上传结束，部分文件上传失败'
              //this.submitUpload2()
            }
          })
          .catch((error) => {
            _vm.$message({
              message: error || '上传失败',
              type: 'error',
            });
            _vm.$modal.closeLoading();
            _vm.upStatus = 3;
            _vm.uploadList = [];
            // 进行递归 上传下一个
            //this.showDesc = '上传结束，部分文件上传失败'
            //this.submitUpload2()
          });
      } else {
        this.uploadedSuccessfully();
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
  // margin-bottom: 5px;
  height: 0px;
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
