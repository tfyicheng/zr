<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目进度管理', '项目进度列表', '项目进度填报']" />
        <div class="main">
          <div class="p1">
            <!-- <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>项 目 编 号</span>
              <el-input v-model="form.id" placeholder="系统填写" :disabled="true"></el-input>
            </div> -->

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>项 目 名 称</span>
              <el-input v-model="form.prjName" placeholder="系统填写" :disabled="true"></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>计 划 名 称</span>
              <el-input v-model="form.planName" placeholder="系统填写" :disabled="true"></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>项 目 进 度</span>
              <el-input
                v-model="data.progress"
                @input="$forceUpdate()"
                @blur="(e) => (data.progress = e.target.value)"
                oninput="value=value.replace(/[^0-9.]/g,'')"
                placeholder="请输入"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>附 件 类 型</span>
              <el-select v-model="data.fileType" placeholder="点击选择" @change="typeChange">
                <el-option
                  v-for="item in dict.type.file_type"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <div class="p1item">
              <span><i style="color: red">*</i>项 目 名 称</span>
              <el-input
                v-model="data.prjName"
                placeholder="系统填写"
                :disabled="true"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <!-- <div style="height: 20px"></div> -->
          </div>
          <div class="p2">
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>工 作 内 容</span>
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="data.progressDesc"
                maxlength="500"
                show-word-limit
                resize="none"
              >
              </el-input>
            </div>
            <div class="p2item">
              <span><i style="color: red; visibility: hidden">*</i>附 件</span>
              <FileUpload2 ref="uList" :upType="data.fileType" :mustType="true" />
            </div>
          </div>
        </div>

        <!-- <div class="main2">
          <div class="m2top">当前进度汇报</div>
          <div class="m2main">
  

          </div>
        </div> -->

        <div class="main2">
          <div class="m2top">
            历史汇报记录
            <div class="m2topm">
              <span
                v-show="paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="paymentShow">
            <div class="m2mt" v-show="form.history && form.history.length > 0">
              <!-- <div class="m2mb" style="max-width: 100px">ID</div> -->
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>项目名称</div>
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>计划名称</div>
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>当前进度</div>
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>进度说明</div>
              <!-- <div class="m2mb" style="max-width: 60px">操作</div> -->
            </div>
            <div class="m2mt" v-for="(c, index) in form.history" :key="index">
              <!-- <div class="m2mb" style="max-width: 100px">
                <el-input v-model="c.id" :disabled="true"></el-input>
              </div> -->
              <div class="m2mb">
                <el-input v-model="c.prjName" :disabled="true"></el-input>
              </div>
              <div class="m2mb">
                <el-input v-model="c.planName" :disabled="true"></el-input>
              </div>
              <div class="m2mb">
                <el-input v-model="c.progress" :disabled="true"></el-input>
              </div>
              <div class="m2mb">
                <el-input v-model="c.progressDesc" :disabled="true"></el-input>
              </div>

              <!-- <div class="m2mb" style="max-width: 100px">
                <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.userId)" />
              </div> -->
            </div>

            <!-- <div>
              <el-button type="primary" @click="addPayments">添加人员</el-button>
            </div> -->
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <!-- 
        <el-dialog :visible.sync="dialogTableVisible">
          <PersonList v-show="this.ChooseOne == 'pList'" ref="pList" />
        </el-dialog> -->
      </div>
    </div>
  </div>
</template>

<script>
//import PersonList from '@/views/components/dialog/personlist';
import { projProgressEdit, projProgressInfo } from '@/api/data/project';
export default {
  name: 'ProjectProcessEdit', //进度汇报
  dicts: ['file_type'],
  //components: { PersonList },
  data() {
    return {
      data: {
        annexFile: [],
      }, //填报数据
      form: {}, //详情数据
      paymentShow: true,
      dialogTableVisible: false,
      flagId: null,
      //ChooseOne: '', //当前弹窗目标
    };
  },
  mounted() {
    this.$refs.uList.$on('upload', this.getUlist);
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projProgressInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
        });
      }
    },

    //类型切换事件
    typeChange(val) {
      console.log(val);
      if (val != this.data.fileType) {
        // this.data.annexFile = [];
      }
    },

    // //选择用户id
    // chooseUser() {
    //   this.dialogTableVisible = true;
    //   this.ChooseOne = 'pList';
    //   this.$nextTick(() => {
    //      this.$refs.pList.$off('getChoose', this.getUser);
    //  this.$refs.pList.$on('getChoose', this.getUser);
    //     this.$refs.pList.$on('closeChoose', this.closeChoose);
    //     this.$refs.pList.getList();
    //   }, 500);
    // },

    // //获取用户id
    // getUser(data) {
    //   this.dialogTableVisible = false;
    //   if (data && data.length > 0) {
    //     // this.userName = data[0].userName;
    //     // this.form.userId = data[0].userId;
    //     data.forEach((item) => {
    //       if (this.form.personList.findIndex((c) => c.userId == item.userId) == -1) {
    //         this.form.personList.push(item);
    //       }
    //     });
    //   }
    // },

    //关闭选择弹窗
    // closeChoose() {
    //   this.dialogTableVisible = false;
    // },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
    //添加节点
    // addPayments() {
    //   this.chooseUser();
    // },
    //删除节点
    // delpm(id) {
    //   this.form.personList.splice(
    //     this.form.personList.findIndex((item) => item.userId === id),
    //     1,
    //   );
    // },

    // 获取上传的附件
    // getUlist(data) {
    //   console.log(data);
    //   if (data && data.length > 0) {
    //     //  this.form.eduList.find((item) => item.id === this.id).annexId = data[0].annexId;
    //     // this.form.eduList.find((item) => item.id === this.id).originalName = data[0].name;
    //     // this.$refs.uList.clearn();
    //     // this.$forceUpdate();
    //     this.data.annexFile = data;

    //   }
    // },

    //文件上传方案2
    // 获取上传的文件
    getUlist(data) {
      console.log('获取上传的文件:', data);
      this.data.annexFile = data;
    },

    save2() {
      if (this.data.progress == 100) {
        if (this.data.fileType == null || this.data.fileType == undefined) {
          this.$message.error('附件类型不能为空');
          return;
        }
        if (this.data.annexFile.length == 0) {
          this.$message.error('进度百分百时，附件不能为空');
          return;
        }
      }
      this.$modal.loading('正在提交，请稍候...');
      projProgressEdit(this.data)
        .then((res) => {
          this.$modal.closeLoading();
          console.log(res);
          if (res.code == 200) {
            this.$message.success('填报成功');
            this.goback();
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    // 保存
    save() {
      this.data.planId = this.form.id;
      console.log(this.data);
      if (this.data.progress == null || this.data.progress == '') {
        this.$message.error('填报进度不能为空');
        return;
      }

      if (this.data.progress > 100 || this.data.progress <= 0) {
        this.$message.error('填报进度错误');
        return;
      }

      this.$refs.uList.asyncUpFile().then((res) => {
        if (res) {
          this.save2();
        }
      });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.getInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    margin: 20px;
    min-width: 1220px;
    .appc {
      .top {
        font-family: Alibaba PuHuiTi 2;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }

      .main {
        background: #fff;
        border-radius: 4px;
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 390px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
            .el-cascader,
            .el-input,
            .el-date-editor,
            .el-select {
              float: right;
              margin: 10px 10px 0 10px;
              width: 240px;
            }
            .el-button {
              margin-left: 12px;
            }

            ::v-deep.el-input-group .el-input-group__prepend {
              width: 100px;
              padding: 0;
              margin: 0;
              height: 22px;
            }
            .selprepend {
              width: 120px;
              height: 34px;
              padding: 0;
              margin: 0;
            }
          }
          // .p1item:last-child {
          //   width: 795px;
          //   .el-input {
          //     width: 645px;
          //   }
          // }
        }

        .p2 {
          margin-top: 10px;

          .p2item {
            margin-bottom: 10px;
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 37px 0 25px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 200px !important;
              width: 1050px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 200px !important;
              }
            }
            .el-button {
              width: 240px;
              height: 48px;
              border-radius: 4px;
              color: #409eff;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .upload-file {
              margin-top: 30px;
              width: 400px;
              display: inline-block;
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -130px;
            }
          }
          .p2item:last-child {
            span {
              width: 83px;
              float: left;
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m2topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m2top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m2main {
          border-top: 1px solid #e4e6ed;
          .m2mt {
            height: 60px;
            display: flex;
            line-height: 60px;
            .m2mb {
              flex: 1;
              margin: 0px 10px 10px 20px;
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input-inner {
                display: flex;
                flex: 1;
              }
              svg {
                width: 40px;
                height: 40px;
                margin-top: 10px;
              }
            }
          }
          .el-button {
            border: 0;
            margin: 20px 20px 20px 20px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }

      .p3 {
        margin: 0px 0px;
        width: 98%;
        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
