<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          劳动合同信息
        </div>
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>合 同 编 号</span>
                <span><InputTip :width="inputTipWidth" :text="form.contId"></InputTip></span>
              </div>
              <div class="p1item">
                <span>合 同 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.contName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>甲 方</span>
                <span>{{ form.firstPartyStr }}</span>
              </div>

              <div class="p1item">
                <span>办 公 地 址</span>
                <span>{{ form.officeAddr }}</span>
              </div>

              <div class="p1item">
                <span>用 人 部 门</span>
                <span>{{ form.deptName }}</span>
              </div>

              <div class="p1item">
                <span>签 约 日 期</span>
                <span>{{ form.signingDate }}</span>
              </div>

              <div class="p1item">
                <span>合同有效期</span>
                <span>{{ form.validity ? form.validity + '年' : '' }}</span>
              </div>

              <div class="p1item">
                <span>人 员 名 称</span>
                <span>{{ form.secondParty }}</span>
              </div>

              <div class="p1item">
                <span>身 份 证 号</span>
                <span>{{ form.idNum }}</span>
              </div>

              <div class="p1item">
                <span>联 系 号 码</span>
                <span>{{ form.phone }}</span>
              </div>

              <div class="p1item">
                <span>邮 箱 地 址</span>
                <span>{{ form.email }}</span>
              </div>
            </div>
            <div class="p2">
              <div class="p2item">
                <div class="p2iteml">
                  <span>联 系 地 址</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.userAddr"
                  ></el-input>
                </div>
              </div>
              <div class="p2item">
                <div class="p2iteml">
                  <span class="p2itemlt">合 同 条 款</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.contTerm"
                  ></el-input>
                </div>
              </div>
              <!-- <div class="p2item">
                <div class="p2iteml">
                  <span>备注</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.remark"
                  ></el-input>
                </div>
              </div> -->
              <div class="p2item">
                <div class="p2iteml">
                  <span>合 同 附 件</span>
                </div>
                <div class="p2itemr">
                  <ul>
                    <li
                      @click="filePreview(c.annexId)"
                      style="cursor: hand"
                      v-for="c in form.files"
                      :key="c.index"
                    >
                      <svg-icon icon-class="file" />
                      <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
        </div>
        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.contName"
          :downSourceId="form.id"
          :type="7"
        />
        <BeforeDown ref="BeforeDown" :type="7" />
      </div>
    </div>
  </div>
</template>

<script>
import { lcontExport } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import { laborContInfo } from '@/api/data/contract';
export default {
  name: 'LaborContractInfo', //劳动合同信息
  components: { ApplyDown },
  data() {
    return {
      maxtbheigth: '300',
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      fileview: '', //文件预览地址
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        laborContInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      if ((this.form.files && this.form.files.length == 0) || this.form.files == null) {
        this.$message.error('没有可导出的附件');
        return;
      }
      // lcontExport(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },
    //文件预览
    filePreview(val) {
      this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      this.dialogTableVisible = true;
    },
  },
  computed: {
    //组织或人员
    foreignCertName: function () {
      let foreignCertNames = '';
      for (var i = 0; i < this.form.foreignCert.length; i++) {
        foreignCertNames +=
          this.form.foreignCert[i].userOrDeptName +
          (i + 1 == this.form.foreignCert.length ? '' : '/');
      }
      return foreignCertNames;
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        // this.$tab.refreshPage();
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
        display: inline-block;
        .mainl {
          float: left;
        }
        .mainr {
          float: right;
          text-align: center;
          .el-button {
            margin-top: 25px;
            display: inline-block;
            width: 100px;
            height: 40px;
          }
        }
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
            span:first-child {
              width: 100px;
            }

            .el-button {
              margin-left: 12px;
            }
            //下划线标记
            .mark {
              color: #409eff;
              text-decoration-line: underline;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            height: auto;
            margin-bottom: 35px;
            margin-top: 20px;
            vertical-align: bottom;
            .p2iteml {
              flex: 1;
              height: 24px;
              float: left;
              span {
                display: inline-block;
                text-align: center;
                margin: 0 25px;
                font-size: 16px;
                font-weight: 500;
                height: auto;
                width: 100px;
              }
              div {
                display: inline-block;
              }
            }

            .p2itemr {
              display: inline-block;
              flex: 1;
              ::v-deep .el-textarea {
                width: 1050px;
                max-height: 300px !important;
                border-radius: 4px;
                background: #fff;

                .el-textarea__inner {
                  max-height: 300px;
                  border: 0;
                  padding: 0px;
                  font-family: Alibaba PuHuiTi 2;
                  font-size: 16px;
                  font-weight: 400;
                  letter-spacing: 0em;
                }
              }
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
