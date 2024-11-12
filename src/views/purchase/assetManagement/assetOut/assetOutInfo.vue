<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产报废管理', '资产报废列表', '资产报废详情']" />
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <!-- <div class="p1item">
                <span>报 废 编 号</span>
                <span><InputTip :width="inputTipWidth" :text="form.id"></InputTip></span>
              </div> -->

              <!-- <div class="p1item">
                <span>报 废 名 称</span>
                <span><InputTip :width="inputTipWidth" :text="form.name"></InputTip></span>
              </div> -->
              <!-- <div class="p1item">
                <span>合同编号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.contNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>合同名称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.contName"></InputTip></span>
              </div> -->

              <!-- <div class="p1item">
                <span>供应商名称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.supplierName"></InputTip></span>
              </div> -->
              <!-- <div class="p1item">
                <span>报 废 仓 库</span>
                <span> <InputTip :width="inputTipWidth" :text="form.storeName"></InputTip></span>
              </div> -->

              <!-- <div class="p1item">
                <span>仓库管理员</span>
                <span> <InputTip :width="inputTipWidth" :text="form.storeUser"></InputTip></span>
              </div> -->

              <div class="p1item">
                <span>报 废 部 门</span>
                <span> <InputTip :width="inputTipWidth" :text="form.applyDept"></InputTip></span>
              </div>

              <div class="p1item">
                <span>报 废 人</span>
                <span> <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip></span>
              </div>

              <!-- <div class="p1item">
                <span>报 废 地 点</span>
                <span> <InputTip :width="inputTipWidth" :text="form.useAddr"></InputTip></span>
              </div> -->

              <!-- <div class="p1item">
                <span>出库类型</span>
                <span>{{ form.outType ? dict.type.store_out_type[form.outType].label : null }}</span>
              </div> -->

              <!-- <div class="p1item">
                <span>报 废 备 注</span>
                <span> <InputTip :width="inputTipWidth" :text="form.remark"></InputTip></span>
              </div> -->

              <div class="p1item">
                <span>报 废 时 间</span>
                <span> {{ form.inventoryDate }}</span>
              </div>
            </div>

            <div class="p2">
              <!-- <div class="p2item">
                  <div class="p2iteml">
                    <span>联 系 地 址</span>
                  </div>
                  <div class="p2itemr">
                    <el-input
                      type="textarea"
                      autosize
                      resize="none"
                      readonly
                      v-model="form.address"
                    ></el-input>
                  </div>
                </div>  -->
              <!-- <div class="p2item">
                <div class="p2iteml">
                  <span class="p2itemlt">主 要 条 款</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.clause"
                  ></el-input>
                </div>
              </div> -->
              <div class="p2item">
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
              </div>
              <!-- <div class="p2item">
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
                </div>-->
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="main2">
          <div class="m2top">
            报废清单
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
              :data="form.materials"
              style="padding: 20px"
              max-height="560"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
              <!-- <el-table-column prop="materialCode" label="物料ID"> </el-table-column>
              <el-table-column prop="materialName" label="物料名称"> </el-table-column>
              <el-table-column prop="batchNumber" label="规格型号"> </el-table-column>
              <el-table-column prop="materialModel" label="批次号"> </el-table-column>
              <el-table-column prop="manufacturer" label="品牌"> </el-table-column>
              <el-table-column label="单位">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="inventoryQuantity" label="出入库数量"> </el-table-column> -->
              <!-- <el-table-column prop="unitCost" label="单价"> </el-table-column> -->

              <el-table-column prop="assetNumber" label="资产编号"> </el-table-column>
              <el-table-column prop="materialName" label="资产名称" :show-overflow-tooltip="false">
              </el-table-column>
              <el-table-column label="资产类别" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.property_type2"
                    :value="scope.row.propertyType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <el-table-column prop="voucherTime" label="凭证时间"> </el-table-column>
              <!-- <el-table-column prop="" label="入库时间"> </el-table-column> -->
              <!-- <el-table-column prop="materialTotalValue" label="购入原值(元)"> </el-table-column> -->
              <!-- <el-table-column prop="unitPrice" label="单价(元)"> </el-table-column> -->
              <el-table-column prop="num" label="报废数量"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="main3" v-show="commonFun.approveReasonShow(approves)">
          <div class="m3top">审批意见</div>
          <div class="m3main">
            <div class="p3">
              <div class="p3item" style="width: 100%">
                <span><i style="visibility: hidden">*</i>意 见 内 容</span>
                <el-input v-model="form.userRemark" placeholder="请输入内容"></el-input>
              </div>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button
            v-show="approves.find((c) => c.status == 1) && approves.find((c) => c.status == 1).show"
            @click="handleWork(1)"
            >通过</el-button
          >
          <el-button
            v-show="approves.find((c) => c.status == 2) && approves.find((c) => c.status == 2).show"
            @click="handleWork(2)"
            >驳回</el-button
          >
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { stockInfo, stockApproveBack, stockOutC0Info } from '@/api/data/asset';

export default {
  name: 'AssetOutInfo', //资产报废信息
  dicts: ['project_scale', 'store_out_type', 'unit_of_measurement', 'property_type2'],
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      approves: [], // 审批菜单
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        stockOutC0Info(this.$route.query.id).then((response) => {
          this.form = response.data;
        });
      }
      if (this.$route.query.approves) {
        this.approves = this.$route.query.approves;
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

    //审批处理操作
    handleWork(status) {
      let data = {
        id: this.form.id, //编号(申请单ID)
        status: status, //状态,暂时固定填6即可
        remark: '', //备注
        type: 1, //0入库审批1报废审批2出库审批
      };
      stockApproveBack(data).then((res) => {
        if (res.code == 200) {
          this.$message.success(`已提交请求`);
          this.goback();
        } else {
          this.$message.error(`请求失败`);
        }
      });
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
        width: 100%;
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

      .main3 {
        margin-top: 20px;
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
          .p3 {
            position: relative;
            display: inline-block;
            .p3item {
              margin: 4px 10px 0 4px;
              float: left;
              width: 390px;
              height: 60px;
              display: flex;
              span {
                width: 100px;
                margin-left: 20px;
                float: left;
                text-align: center;
                line-height: 60px;
                font-size: 16px;
              }

              .el-input,
              .el-date-editor,
              .el-select {
                flex: 1;
                width: 100% !important;
                float: left;
                margin: 10px 10px 0 10px;
                width: 240px;
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
