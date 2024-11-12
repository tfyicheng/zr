<template>
  <div class="upload-file">
    <el-upload
      :auto-upload="autoUpload"
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      :file-list="fileList"
      :limit="limit"
      :on-progress="handleUploading"
      :on-change="handleChange"
      :on-error="handleUploadSuccess"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :headers="headers"
      :data="data2"
      class="upload-file-uploader"
      ref="fileUpload"
    >
    </el-upload>
    <!-- class="uphandle" -->
    <div>
      <div class="uphandle">
        <!-- 上传按钮 -->
        <el-button ref="ubtn" @click="(e) => openProcessDefinition(e)"
          ><svg-icon icon-class="upload" /> 选择文件</el-button
        >

        <!-- 附件类型 -->
        <el-select v-show="isShowType" v-model="data2.type" ref="seltype" placeholder="附件类型">
          <el-option
            v-for="item in dict.type.file_type"
            :key="item.value"
            :label="item.label"
            :value="Number(item.value)"
          >
          </el-option>
        </el-select>
      </div>

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
        <!-- 清除浮动 -->
        <!-- <div style="height: 10px"></div> -->
      </div>
      <div style="height: 10px"></div>
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
        <!-- :href="file.url"    target="_blank" fileList-->
        <el-link :underline="false">
          <span class="el-icon-document" :underline="false" style="margin-left: 10px">
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
    <div style="height: 10px"></div>
  </div>
</template>

<script>
import axios from 'axios';
import { getToken } from '@/utils/auth';
export default {
  name: 'FileUpload',
  dicts: ['reason_type', 'file_type'],
  props: {
    disabled: { type: Boolean, default: true },
    // 值
    value: [String, Object, Array],
    //上传额外参数
    data: {
      type: -1,
    }, // data: { type: Object, default: () => {} },
    //上传附件类型  参见watch-upType
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
    //  {
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

    //额外参数 判断数据绑定类型 0 默认id数组，1完整数据 2字符串逗号分隔拼接
    extra: {
      type: Number,
      default: () => {
        return 0;
      },
    },

    //是否预上传 false需要在保存表单的时候等待回调
    autoUpload: {
      type: Boolean,
      default: true,
    },

    //是否显示类型选择  true表示附件类型只用作上传时需要，提交表单不用，如表单有附件类型字段，直接绑定upType传入
    isShowType: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      //uploadFileUrl: process.env.VUE_APP_BASE_API + '/file/upload', // 上传文件服务器地址
      //uploadFileUrl: process.env.VUE_APP_BASE_API + '/file/uploadByType', // 上传文件服务器地址带类型
      uploadFileUrl: 'http://eip.gdzrsj.com/prod-api/file/uploadByType', //上传计费接口
      headers: {
        Authorization: 'Bearer ' + getToken(),
      },
      fileList: [],
      data2: {
        type: -1,
      }, //额外参数
      flag: false, //编辑时仅回显一次标记
      upStatus: 0, //上传接口状态  0空闲 1上传中 2成功 3失败
    };
  },
  watch: {
    //文件回传列表  process.env.NODE_ENV
    value: {
      handler(val) {
        if (val) {
          console.log('文件回传的值：', val);
          // if (!this.flag) {
          if (true) {
            //console.log('文件初次回传数据1:', val);
            this.flag = true;
            //数据回显处理
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

              //处理回显的数据用于提交
              this.$emit('update:value', this.listToId0(list));
            }
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
        if (newval !== oldval) {
          //console.log('上传附件类型:' + newval);
          this.data = { type: newval };
          this.data2 = this.data;
          console.log('上传参数:', this.data);
          this.upUrlChange(this.data.type);
          //this.$message.warning('文件上传列表已重置');
          //this.clearn(); //切换附件类型时清空附件
          //this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/file/uploadByType'; // 上传文件服务器地址
        }
      },
      deep: true,
      immediate: true,
    },

    //判断是否显示选择附件类型
    isShowType: {
      handler(newval, oldval) {
        if (newval) {
          this.data2 = { type: null };
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

    //根据上传类型改变上传路径
    upUrlChange(type) {
      switch (type) {
        case 999:
          //导入项目合同
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/contract/projectCont/change0/importTemplate';
          break;
        case 998:
          //导入外委合同
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/contract/outsourcing/change0/importTemplate';
          break;
        case 997:
          //导入人员基本信息
          this.uploadFileUrl = process.env.VUE_APP_BASE_API + '/person/user/importTemplate';
          break;
        case 996:
          //导入开票基本信息
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/produce/invoice/change0/importTemplate0';
          break;
        case 995:
          //导入收票基本信息
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/produce/invoice/change0/importTemplate1';
          break;
        case 994:
          //导入付款基本信息
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/produce/payment/change0/importTemplate0';
          break;
        case 993:
          //导入收款基本信息
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/produce/payment/change0/importTemplate1';
          break;
        case 992:
          //导入固定资产excel
          this.uploadFileUrl =
            process.env.VUE_APP_BASE_API + '/property/stock/change1/0/importTemplate0';
          break;
        default:
          break;
      }
    },

    //上传前置判断
    async openProcessDefinition(e) {
      // 利用js冒泡事件机制和模拟点击事件来实现a-upload组件的弹出框限制
      // 点击上传button按钮默认阻止冒泡事件传递
      e.stopPropagation(); // 阻止事件冒泡到父元素
      if (this.isShowType) {
        if (this.data2.type == null) {
          this.$modal.msgError(`请先选择附件类型`);
          return;
        } else {
          this.$refs['fileUpload'].$refs['upload-inner'].handleClick();
        }
      } else {
        this.$refs['fileUpload'].$refs['upload-inner'].handleClick();
      }
    },

    //触发上传
    clickUp() {
      this.$refs.fileUpload.submit();
      //this.$modal.loading('正在上传文件，请稍候...');
    },

    //引用触发选择文件
    clickEvent() {
      this.$refs.ubtn.$el.click();
    },

    //置空列表
    clearn() {
      this.number = 0;
      this.uploadList = [];
      this.fileList = [];
    },

    //先获取选择的文件
    handleChange(file) {
      //console.log('先获取选择的文件', file);
      if (this.fileList.findIndex((c) => c.uid == file.uid || c.name == file.name) == -1) {
        if (!this.autoUpload && this.handleBeforeUpload2(file)) {
          this.fileList.push(file);
          this.number++;
        }
      }
      console.log('选择文件', this.number, this.fileList);
    },

    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      if (!this.autoUpload) {
        return;
      }
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
      this.$modal.loading('正在上传文件，请稍候....');
      this.number++;
      // if (this.fileList.findIndex((c) => c.uid == file.uid || c.name == file.name) == -1) {
      //   this.fileList.push(file);
      // }
      return true;
    },

    //取消自动上传 手动校验文件
    handleBeforeUpload2(file) {
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
      return true;
    },

    // 文件个数超出
    handleExceed() {
      //console.log(this.number, this.fileList);
      this.$modal.msgError(`上传文件数量不能超过 ${this.limit} 个!`);
    },

    //上传时钩子
    handleUploading() {
      if (!this.autoUpload) {
        this.$modal.loading('正在提交，请稍候...');
      } else {
        this.$modal.loading('正在上传文件，请稍候...');
      }
    },

    // 上传失败  修改统一处理
    handleUploadError(err) {
      this.$modal.msgError('上传文件失败，请重试');
      this.$modal.closeLoading();
      //this.number--;
    },

    // 上传成功回调  同时绑定失败回调处理，解决number计数问题
    handleUploadSuccess(res, file) {
      if (res.code === 200) {
        if (res.data) {
          try {
            res.data.forEach((element) => {
              this.uploadList.push({
                name: element.originalName,
                url: element.remoteUrl,
                id: element.id,
              });
            });
          } catch (error) {}
        }

        if (this.data2.type > 100) {
          this.$message.success(res.msg);
          this.$emit('import', null);
          this.clearn();
          this.$modal.closeLoading();
        }

        // this.uploadList.push({ name: res.data.originalName, url: res.data.remoteUrl,id:res.data.id });
        this.uploadedSuccessfully();
      } else {
        this.upStatus = 3;
        this.$modal.closeLoading();
        this.$modal.msgError('上传文件失败，请重试 \n\r' + res.msg);
        //this.$modal.msgError(res.msg ? res.msg : '上传文件失败，请重试');
        //this.number--;
        //this.$refs.fileUpload.handleRemove(file);
        //this.uploadedSuccessfully();
        if (this.data2.type > 100) {
          //资料导入 不走手动异步触发就会走组件触发
          this.fileList = [];
          this.number = 0;
        }
      }
    },

    // 删除文件
    handleDelete(index) {
      if (!this.autoUpload && this.number > 0 && this.fileList[index].status != 'success') {
        this.number--;
      }
      this.fileList.splice(index, 1);
      if (!this.autoUpload) {
        if (this.number == 0) {
          //如果不是在预上传的情况，要在所有文件全部上传成功后再通知更新，因为更新会修改fileList导致文件status改变而无法触发上传
          this.$emit('update:value', this.listToId0(this.fileList));
        }
      } else {
        this.$emit('update:value', this.listToId0(this.fileList));
      }

      //console.log('删除文件', this.number, this.fileList);
    },

    // 上传结束处理
    uploadedSuccessfully() {
      //console.log('上传结束处理:', this.number, this.uploadList.length);
      if (this.number > 0 && this.uploadList.length === this.number) {
        // this.fileList = this.fileList.concat(this.uploadList);
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
        //  this.$emit('upload', this.limit == 1 ? this.fileList : this.listToId(this.fileList)); //当限制上传一个时为教育附件带上附件名
        this.$emit('update:value', this.listToId0(this.fileList));
        if (this.autoUpload) {
          this.$modal.closeLoading();
        }

        //console.log(this.fileList);
        //导入通知列表更新
        if (this.data2.type > 100) {
          this.$emit('import', null);
        }
      }
      if (this.autoUpload) {
        this.$modal.closeLoading();
      }
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
      return strs != '' ? strs.substr(0, strs.length - 1) : '';
    },

    //取出文件id和名称合成数组给调用组件
    listToId(list) {
      try {
        let li = [];
        for (let i in list) {
          li.push({ annexId: list[i].id.toString(), originalName: list[i].name });
        }
        return li;
      } catch (error) {
        console.log(error);
      }
    },

    //根据额外参数判断 传参类型 取出文件id合成数组给调用组件
    listToId0(list) {
      try {
        console.log('提交数据', list);
        if (this.extra == 0) {
          let li = [];
          for (let i in list) {
            if (list[i].annexId == null) {
              li.push(list[i].id.toString());
            } else {
              li.push(list[i].annexId.toString());
            }
          }
          return li;
        } else if (this.extra == 1) {
          let li = [];
          if (list.length > 0 && list[0].annexId != null) {
            li = list;
          } else {
            for (let i in list) {
              if (list[i].id == null) {
                li.push({ annexId: null, originalName: list[i].name });
              } else {
                li.push({ annexId: list[i].id.toString(), originalName: list[i].name });
              }
            }
          }

          return li;
        } else if (this.extra == 2) {
          var si = '';
          let li = [];
          for (let i in list) {
            if (list[i].annexId == null) {
              li.push(list[i].id.toString());
            } else {
              li.push(list[i].annexId.toString());
            }
          }

          if (li.length > 0) {
            si = li.join(',');
          }

          return si;
        }
      } catch (error) {
        console.log(error);
      }
    },

    //异步上传文件
    asyncUpFile() {
      return new Promise(async (resolve) => {
        console.log('异步上传文件', this.number, this.fileList);
        // && this.fileList.findIndex((c) => c.status == 'ready') != -1  || this.fileList.findIndex((c) => c.status != 'success') != -1
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
            console.log('等待上传完毕', this.number);
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
            //临时测试用
            // this.$emit(
            //   'update:value',
            //   this.listToId0([
            //     {
            //       annexId: 1775334518490259500,
            //     },
            //   ]),
            // );
            // resolve(true);

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
          //this.$modal.closeLoading();
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
              try {
                res2.data.data.forEach((element) => {
                  _vm.uploadList.push({
                    name: element.originalName,
                    url: element.remoteUrl,
                    id: element.id,
                  });
                });
              } catch (error) {}

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
              if (this.data2.type > 100) {
                _vm.fileList = [];
                _vm.number = 0;
              }
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
            if (this.data2.type > 100) {
              _vm.fileList = [];
              _vm.number = 0;
            }
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

.uphandle {
  width: 520px;
  height: 37px;
  .el-select {
    float: right;
    width: 240px;
    height: 36px;
    border-radius: 4px;
    margin-right: 15px;
    // margin-top: 10px;
    line-height: 10px;
    ::v-deep .el-input__icon.el-input__validateIcon {
      display: none;
    }
    ::v-deep .el-input__inner {
      width: 240px;
      height: 36px;
    }
  }
  .el-button {
    //  margin-top: 10px;
    float: left;
    width: 240px;
    height: 36px;
    line-height: 0px;
    border-radius: 4px;
    color: #409eff;
    font-family: Alibaba PuHuiTi 2;
    font-size: 16px;
    font-weight: 500;
  }
  .el-upload__tip {
    margin: 0;
    height: 20px;
  }
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
.el-upload__tip {
  margin: 0;
  height: 20px;
}
</style>
