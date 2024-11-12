<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产查询', '资产查询详情']" />
        <div class="main2">
          <!-- <div class="m2top">
            库存列表
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
          </div> -->

          <div class="m2main" v-show="paymentShow">
            <el-table
              :data="form.data"
              style="padding: 20px"
              max-height="560"
              row-key="id"
              ref="multipleTable"
            >
              <!-- <el-table-column prop="id" label="ID"> </el-table-column> -->
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
              <el-table-column prop="inventoryDate" label="购入时间"> </el-table-column>
              <el-table-column prop="materialTotalValue" label="购入原值(元)"> </el-table-column>
              <el-table-column prop="unitPrice" label="单价(元)"> </el-table-column>
              <el-table-column prop="num" label="总数量"> </el-table-column>
              <el-table-column prop="nowNum" label="现有数量"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            操作记录
            <div class="m2topm">
              <span
                v-show="paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow2"
                @click="paymentShow2 ? (paymentShow2 = false) : (paymentShow2 = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>

          <div class="m2main" v-show="paymentShow2">
            <AssetRecord :maxtbheigth="maxtbheigth" :data="form.recordList" ref="AssetRecord" />
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssetRecord from '@/views/components/table/assetRecord';
import { allStockInfo } from '@/api/data/asset';
export default {
  name: 'AssetQueryInfo',
  dicts: ['property_type2'],
  components: {
    AssetRecord,
  },
  data() {
    return {
      maxtbheigth: '300',
      paymentShow: true,
      paymentShow2: true,
      form: {
        data: [],
        recordList: [],
        // recordList: [
        //   {
        //     id: '14',
        //     type: 2, //0库存1领用2报废
        //     applyUser: '张三', //操作人
        //     applyDept: '珠荣工程设计有限公司', //部门
        //     createTime: '2024-08-23 16:13:48', //操作时间
        //     num: 1, //数量
        //   },
        //   {
        //     id: '24',
        //     type: 0, //0库存1领用2报废
        //     applyUser: '张ss', //操作人
        //     applyDept: '珠荣工程设计有限公司', //部门
        //     createTime: '2014-08-23 16:13:48', //操作时间
        //     num: 9999, //数量
        //   },
        // ],
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        allStockInfo(this.$route.query.id).then((response) => {
          if (response.data) {
            this.form.recordList = response.data.recordList;
            const { recordList, ...ndata } = response.data;
            //this.form.data[0] = ndata;
            this.form.data.push(ndata);
            console.log(this.form);
            this.$forceUpdate();
          }
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },
  },

  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
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
    padding: 20px;
    min-width: 1220px;

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
</style>
