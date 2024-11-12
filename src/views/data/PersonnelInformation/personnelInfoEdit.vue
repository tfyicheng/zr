<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback"/>
          编辑人员信息
        </div> -->
        <NavTop :val="['资料管理', '人员管理', '人员列表', '编辑人员']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span><i style="color: red">*</i>人 员 名 称</span>
              <el-input
                v-model="form.userName"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>性 别</span>
              <el-select v-model="form.sex" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.sys_user_sex"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>民 族</span>
              <el-input
                v-model="form.nation"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>籍 贯</span>
              <el-input
                v-model="form.nativePlace"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>出 生 日 期</span>
              <el-date-picker
                v-model="form.dateOfBirth"
                type="date"
                placeholder="选择时间"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>政 治 面 貌</span>
              <el-select v-model="form.political" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.user_political_outlook"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>学历</span>
              <el-select v-model="form.education" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.user_education"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>工作状态</span>
              <el-select v-model="form.jobState" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.user_job_status"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <span><i style="color: red; visibility: hidden">*</i>婚姻状况</span>
              <el-select v-model="form.maritalStatus" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.user_marital_status"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>毕业院校</span>
              <el-input
                v-model="form.graduationSch"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>联 系 号 码</span>
              <el-input
                v-model="form.phoneNumber"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>邮 箱 地 址 </span>
              <el-input
                v-model="form.email"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>现住址 </span>
              <el-input
                v-model="form.fullAddr"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>身份证号码 </span>
              <el-input
                v-model="form.idNum"
                placeholder="请输入内容"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <span><i style="color: red">*</i>证件有效期</span>
              <el-date-picker
                v-model="form.idNumValid"
                type="date"
                placeholder="选择时间"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="p2">
            <div class="p2item">
              <span>身份证附件</span>
              <!-- <FileUpload ref="uList" :value="form.idNumber" /> -->
              <FileChoose
                ref="FileChoose"
                :value.sync="form.idNumber"
                :extra="1"
                :autoUpload="false"
              />
            </div>
          </div>
        </div>

        <div class="main3">
          <div class="m3top">登录密码</div>
          <div class="m3main">
            <el-form :inline="true">
              <el-form-item label="密码">
                <el-input
                  v-model="form.password"
                  onkeyup="this.value=this.value.replace(/[^\w]/g,'')"
                  placeholder="请输入密码"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="新密码">
                <el-input
                  v-model="oldpw"
                  onkeyup="this.value=this.value.replace(/[^\w]/g,'')"
                  placeholder="请输入密码"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input
                  v-model="form.password"
                  onkeyup="this.value=this.value.replace(/[^\w]/g,'')"
                  placeholder="请再次输入"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </el-form-item> -->
            </el-form>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">教育信息</div>
          <div class="m2main">
            <div class="m2mt" v-show="form.eduList && form.eduList.length > 0">
              <div class="m2mb">开始时间</div>
              <div class="m2mb">结束时间</div>
              <div class="m2mb">学历</div>
              <div class="m2mb">毕业院校</div>
              <div class="m2mb">专业名称</div>
              <div class="m2mb">附件</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>
            <div class="m2mt" v-for="(c, index) in form.eduList" :key="index">
              <div class="m2mb">
                <el-date-picker
                  v-model="c.startDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="开始时间(必填)"
                >
                </el-date-picker>
              </div>
              <div class="m2mb">
                <el-date-picker
                  v-model="c.endDate"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束时间(必填)"
                >
                </el-date-picker>
              </div>
              <div class="m2mb">
                <el-select v-model="c.political" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.user_education"
                    :key="item.value"
                    :label="item.label"
                    :value="Number(item.value)"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="m2mb">
                <el-input
                  v-model="c.graduationSch"
                  placeholder="学校名称（必填）"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </div>
              <div class="m2mb">
                <el-input
                  v-model="c.speciality"
                  placeholder="专业名称"
                  :maxlength="commonFun.inputMax"
                ></el-input>
              </div>
              <div class="m2mb">
                <el-input
                  v-model="c.originalName"
                  placeholder="请点击选择"
                  @click.native="chooseMat(c.uid)"
                  readonly
                  ><svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                  />
                </el-input>
              </div>
              <div class="m2mb" style="max-width: 60px">
                <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
              </div>
            </div>

            <div>
              <el-button type="primary" @click="addPayments">添加</el-button>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <!-- <FileUpload ref="uuList" :limit="1" style="visibility: hidden" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { personInfo, personUpdate } from '@/api/data/person';
export default {
  name: 'PersonnelInfoEdit', //编辑人员信息
  dicts: [
    'sys_user_sex',
    'user_job_status',
    'user_health_status',
    'user_marital_status',
    'user_political_outlook',
    'user_education',
  ],
  components: {},
  data() {
    return {
      form: {
        idNumber: [],
        eduList: [],
      },
      oldpw: '',
      uid: '', //临时记录节点id
    };
  },
  created() {
    this.getInfo();
  },
  mounted() {
    // this.$refs.uList.$on('upload', this.getUlist);
    this.$refs.uuList.$on('upload', this.getUulist);
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        personInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
        });
      }
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },

    //选择资产id
    chooseMat(uid) {
      this.uid = uid;
      this.$refs.uuList.clickEvent();
    },

    // 获取上传的身份证附件
    getUlist(data) {
      console.log(data);
      this.form.idNumber = data;
    },

    // 获取上传的教育附件
    getUulist(data) {
      console.log(data);
      if (data && data.length > 0) {
        this.form.eduList.find((item) => item.uid === this.uid).annexId = data[0].annexId;
        this.form.eduList.find((item) => item.uid === this.uid).originalName = data[0].name;
        this.$refs.uuList.clearn();
        this.$forceUpdate();
      }
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
      };
      this.form.eduList.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.eduList.splice(
        this.form.eduList.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //保存
    save() {
      console.log(this.form);
      // if (this.oldpw != this.form.password) {
      //   this.$message.error('密码前后输入不一致');
      //   return;
      // }
      this.$refs.FileChoose.asyncUpFile().then((res) => {
        if (res) {
          this.$modal.loading('正在提交，请稍候...');
          personUpdate(this.form)
            .then((res) => {
              console.log(res);
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.goback();
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
        }
      });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
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
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 35px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 100px !important;
              width: 645px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 100px !important;
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
              margin-top: 0px;
              width: 400px;
              display: inline-block;
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -35px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        // height: 360px;
        // overflow: auto;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          margin: 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
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

              #file {
                display: none;
              }
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input__inner {
                display: flex;
                flex: 1;
                //width: 300px;
              }
              .el-input__suffix {
                .el-input__suffix-inner {
                  border-color: none;
                  .el-icon-circle-close:before {
                    content: '\e79d' !important;
                    font-size: 18px;
                  }
                }
              }
              svg {
                width: 40px;
                height: 40px;
                margin-top: 10px;
              }
              .el-date-editor.el-input,
              .el-date-editor.el-input__inner {
                width: 100% !important;
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

      .main3 {
        margin-top: 20px;
        // height: 360px;
        // overflow: auto;
        background: #fff;
        border-radius: 4px;
        .m3top {
          padding-top: 20px;
          margin: 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
        }
        .m3top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m3main {
          border-top: 1px solid #e4e6ed;
          .el-form-item {
            margin-top: 25px;
            margin-left: 25px;
            .el-input {
              width: 260px;
            }
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
