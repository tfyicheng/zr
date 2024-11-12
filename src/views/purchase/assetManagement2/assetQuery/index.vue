<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '消耗品查询']" />
        <div class="main">
          <div class="p1">
            <!-- <div class="p1item">
              <el-select v-model="queryParams.storeId" placeholder="仓库" clearable>
                <el-option
                  v-for="item in stores"
                  :key="item.storeId"
                  :label="item.storeName"
                  :value="item.storeId"
                >
                </el-option>
              </el-select>
            </div> -->

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.batchNumber"
                placeholder="批次号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <div class="p1item">
              <el-input
                v-model="queryParams.assetNumber"
                placeholder="资产编号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.materialName"
                placeholder="资产名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.propertyType" placeholder="资产类别" clearable>
                <el-option
                  v-for="item in dict.type.property_type2"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.materialModel"
                placeholder="规格型号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->
            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.certName"
                placeholder="品牌厂家"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.minStockNum"
                @input="$forceUpdate()"
                @blur="(e) => (queryParams.minStockNum = e.target.value)"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="库存最小量"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.maxStockNum"
                @input="$forceUpdate()"
                @blur="(e) => (queryParams.maxStockNum = e.target.value)"
                oninput="value=value.replace(/[^\d]/g,'')"
                placeholder="库存最大量"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <!-- <el-button
                v-hasPermi="['property:store:export']"
                type="warning"
                @click="exportList"
                :disabled="tableData.length == 0"
                >导出</el-button
              > -->
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>
          <!-- 
          <div class="p2">
            <el-button type="primary" @click="addC">添加</el-button>
            <el-button type="warning" @click="addC" :disabled="chooseItems.length == 0">导出</el-button>
            <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0">删除</el-button>
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div>
          </div> -->

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
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
              <!-- <el-table-column prop="batchNumber" label="批次号"> </el-table-column> -->
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <!-- <el-table-column prop="manufacturer" label="品牌厂家"> </el-table-column> -->
              <!-- <el-table-column label="单位">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>
              </el-table-column> -->
              <!-- <el-table-column prop="stockNum" label="库存数量"> </el-table-column> -->
              <!-- <el-table-column prop="storeName" label="所属仓库"> </el-table-column> -->
              <el-table-column prop="voucherTime" label="凭证时间"> </el-table-column>
              <el-table-column prop="inventoryDate" label="购入时间"> </el-table-column>
              <el-table-column prop="totalValue" label="购入原值(元)"> </el-table-column>
              <el-table-column prop="price" label="单价(元)"> </el-table-column>
              <el-table-column prop="num" label="入库数量"> </el-table-column>
              <el-table-column prop="nowNum" label="现有数量">
                <template slot-scope="scope">
                  <el-link :underline="false" type="success">{{ scope.row.nowNum }}</el-link>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="100" v-if="false">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['property:stock1:stock:list']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <!-- <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  > -->
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { allStockList1, stockCanList, storeList } from '@/api/data/asset';
export default {
  name: 'AssetQueryIndex', //消耗品库存查询
  dicts: ['project_scale', 'unit_of_measurement', 'property_type2'],
  data() {
    return {
      stores: [], //仓库项
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        storeId: null,
        batchNumber: null,
        materialName: null,
        materialModel: null,
        manufacturer: null,
        minStockNum: null,
        maxStockNum: null,
        assetNumber: null,
        propertyType: null,
      },
    };
  },

  created() {
    this.getList();
    //this.getStoreList();
  },

  mounted() {},

  methods: {
    //获取仓库列表
    // getStoreList() {
    //   storeList().then((response) => {
    //     console.log(response);
    //     this.stores = response.data;
    //   });
    // },

    //查询列表
    getList() {
      console.log(this.queryParams);
      allStockList1(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //导出列表
    exportList() {},

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.dateRange2 = [];
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    exportT() {},

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/purchase-d/assetQueryInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '' });
    },
  },

  watch: {
    $route: function (to, from) {
      this.getList();
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
      .top::before {
        content: '\00a0 ';
        border-left: 3px solid #4da0ff;
        margin-right: 5px;
      }
      .main {
        background: #fff;
        border-radius: 4px;
        .p1 {
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
          border-bottom: 1px solid #ebeef5;
          .p1item {
            margin: 4px 0px 0 4px;
            float: left;
            width: 270px;
            height: 60px;
            .el-input,
            .el-date-editor,
            .el-select {
              margin: 10px 10px 0 10px;
              width: 240px;
              height: 40px;
            }
            .el-button {
              margin-left: 12px;
              margin: 11px;
              width: 100px;
              border: 0px;
            }
            .el-button:last-child {
              background: #f3f4f8;
            }
          }
          .p1item:last-child {
            width: 600px;
          }
        }

        .p2 {
          margin: 15px;
          width: 98%;
          .el-button {
            margin: 0px 20px 20px 0px;
            width: 100px;
            border: 0px;
          }
          .p2choose {
            width: 100%;
            border-radius: 4px;
            line-height: 40px;
            font-family: Alibaba PuHuiTi 2;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0em;
            background: #409eff1a;
            span {
              vertical-align: top;
              color: #409eff;
              margin: 0px 15px;
            }
            span:first-child {
              vertical-align: top;
              float: left;
            }
            .p2choosed {
              cursor: pointer;
              float: right;
            }
            .p2chooses {
              display: inline-block;
              width: 85%;
              max-height: 80px;
              overflow-y: auto;

              span {
                vertical-align: top;
                margin-left: 0;
                margin-bottom: 0;
                padding: 0;
              }
            }
          }
        }
        .p3 {
          margin: 15px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
