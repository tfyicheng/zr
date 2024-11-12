<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          服务采购合同信息
        </div>
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>合 同 编 号</span>
                <span>{{ form.contNumber }}</span>
              </div>
              <div class="p1item">
                <span>合 同 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.contName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>申 请 人</span>
                <span>{{ form.applyUser }}</span>
              </div>

              <div class="p1item">
                <span>申 请 部 门</span>
                <span>{{ form.applyDept }}</span>
              </div>

              <div class="p1item">
                <span>金 额(元)</span>
                <span>{{ commonFun.amountConversion2(form.totalAmount) }}</span>
              </div>
              <div class="p1item">
                <span>签 约 日 期</span>
                <span>{{ commonFun.coverTime(form.contStartDate) }}</span>
              </div>

              <div class="p1item">
                <span>交 货 日 期</span>
                <span>{{ commonFun.coverTime(form.arrivalDate) }}</span>
              </div>
              <div class="p1item">
                <span>供 应 商</span>
                <span>{{ form.supplierName }}</span>
              </div>

              <div class="p1item">
                <span>联 系 人</span>
                <span>{{ form.contacts }}</span>
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
                  <!-- <h>{{ form.address }}</h> -->
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.addr"
                  ></el-input>
                </div>
              </div>
              <div class="p2item">
                <div class="p2iteml">
                  <span class="p2itemlt">主 要 条 款</span>
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

        <!-- <div class="main2">
          <div class="m2top">
            物品清单
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
            <el-table
              :data="form.trades"
              style="width: 100%"
              :max-height="maxtbheigth"
              ref="multipleTable"
            >
              <el-table-column prop="materialName" label="资产名称"> </el-table-column>
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <el-table-column prop="manufacturer" label="品牌"> </el-table-column>
              <el-table-column prop="contQuantity" label="数量"> </el-table-column>
              <el-table-column prop="unitPrice" label="单价"> </el-table-column>
            </el-table>
          </div>
        </div> -->

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>
        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.contName"
          :downSourceId="form.id"
          :type="6"
        />
        <BeforeDown ref="BeforeDown" :type="6" />
      </div>
    </div>
  </div>
</template>

<script>
import { scontExport } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import { serviceContInfo } from '@/api/data/contract';
export default {
  name: 'ServicePCInfo', //服务采购合同信息
  components: { ApplyDown },
  dicts: [],
  data() {
    return {
      maxtbheigth: '300',
      form: {},
      paymentShow: true,
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
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
        serviceContInfo(this.$route.query.id).then((response) => {
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
      //scontExport(this.form.id);
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },

    //文件预览
    filePreview(val) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      }, 200);

      this.dialogTableVisible = true;
    },

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        //this.refreshView();
        this.$tab.refreshPage();
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
        //height: 950px;
        //width: 1632px;
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

          padding: 20px;
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
