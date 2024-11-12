<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['property:material:add']" v-if="this.type == 0">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

            <div class="p1item" v-if="this.type == 0">
              <el-input
                v-model="queryParams.materialName"
                placeholder="资产名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.manufacturer"
                placeholder="品牌/厂家"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <div class="p1item" v-if="this.type == 1">
              <el-input
                v-model="queryParams.assetNumber"
                placeholder="资产编号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.manufacturer"
                placeholder="品牌/厂家"
                :maxlength="commonFun.inputMax" 
              ></el-input>
            </div> -->

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

            <div class="p1item" v-if="this.type == 2">
              <el-select v-model="queryParams.type" placeholder="库存类型" @change="$forceUpdate()">
                <el-option
                  v-for="item in stockType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button class="graybtn" @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.materialName }}</span>
              </span>
              <span class="p2choosed" @click="clearSel">清空</span>
            </div>
          </div>

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="420"
              ref="multipleTable"
              :row-key="type == 1 ? 'id' : 'materialId'"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="assetNumber" label="资产编号" v-if="type == 1 || type == 2">
              </el-table-column>
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
              <!-- <el-table-column prop="manufacturer" label="品牌/厂家">
              </el-table-column> -->
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <!-- <el-table-column label="单位" >
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>    
              </el-table-column> -->

              <!-- <el-table-column prop="batchNumber" label="批次号" v-if="type == 1">
              </el-table-column> -->
              <el-table-column prop="inventoryDate" label="购入时间" v-if="type == 1">
              </el-table-column>
              <el-table-column prop="voucherTime" label="凭证时间" v-if="type == 2">
              </el-table-column>
              <el-table-column prop="num" label="库存数量" v-if="type == 1"> </el-table-column>
              <el-table-column prop="canNum" label="可领用数量" v-if="type == 1"> </el-table-column>
              <!-- <el-table-column prop="storeName" label="所属仓库" v-if="type == 1">
              </el-table-column> -->
              <el-table-column prop="applyDept" label="现保管部门" v-if="type == 1 || type == 2">
              </el-table-column>

              <el-table-column prop="nowNum" label="现有数量" v-if="type == 1"></el-table-column>
              <el-table-column prop="num" label="现有数量" v-if="type == 2"> </el-table-column>
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

          <div class="p4">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  materialList,
  stockC0List,
  allStockList,
  allStockList1,
  stockCanList,
} from '@/api/data/asset';
export default {
  name: 'MatList', //选择资产列表  资产领用出库调的资产弹窗查的是资产查询列表的可用资产
  dicts: ['unit_of_measurement', 'property_type', 'property_type2'],
  props: {
    type: {
      //0资产编码列表入库添加用，1是资产库存列表，领用添加用, 2 资产库存列表  出库（报废）专用
      type: Number,
      default: 0,
    },
    defaultParam: {
      //调用时附加的默认参数
      type: Number,
      default: null,
    },

    // type: 0,
    storeId: null, //领用出库添加时需要先指定仓库
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: this.type == 0 ? '选择资产编码' : '选择资产',
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [{}], //表格数据
      stockType: [
        {
          value: 0,
          label: '库存',
        },
        {
          value: 1,
          label: '已领用',
        },
      ],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialName: '',
        manufacturer: '',
        materialType: null,
        type: 0,
        assetNumber: null,
        propertyType: null,
        //placeholder: '', //关键字
      },
    };
  },

  created() {
    this.getList();
  },

  mounted() {},
  methods: {
    //加载列表
    getList() {
      //console.log(this.type, this.defaultParam);
      if (this.type == 0) {
        if (this.defaultParam != null) {
          this.queryParams.materialType = this.defaultParam;
        }

        //查询资产编码
        materialList(this.queryParams).then((response) => {
          this.loading = false;
          this.tableData = response.rows;
          this.total = response.total;
        });
      } else if (this.type == 1) {
        //分别判断查询固定资产跟消耗品的库存
        if (this.defaultParam != null) {
          if (this.defaultParam == 0) {
            allStockList(this.queryParams).then((response) => {
              this.tableData = response.rows;
              this.total = response.total;
              this.loading = false;
            });
          } else if (this.defaultParam == 1) {
            allStockList1(this.queryParams).then((response) => {
              this.tableData = response.rows;
              this.total = response.total;
              this.loading = false;
            });
          }
        }
      } else if (this.type == 2) {
        //	0库存1已领用
        // if (this.defaultParam != null) {
        //   this.queryParams.type = this.defaultParam;
        // }
        //查询资产列表
        // if (this.storeId != null) {
        //   this.queryParams.storeId = this.storeId;
        // }
        if (
          this.queryParams.type === null ||
          this.queryParams.type === '' ||
          this.queryParams.type === undefined
        ) {
          this.queryParams.type = 0;
        }
        stockC0List(this.queryParams).then((response) => {
          this.tableData = response.rows;
          this.total = response.total;
          this.loading = false;
        });
      }
    },

    addItem() {
      this.$router.push({ path: '/purchase-d/assetCodeAdd' });
      this.goback();
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.getList();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItemss = [];
      rows.forEach((element) => {
        this.chooseItemss.push(element);
      });
    },

    //清空选中
    clearSel() {
      this.chooseItemss = [];
      this.$refs.multipleTable.clearSelection();
    },

    //保存
    save() {
      if (!this.Multiple) {
        if (this.chooseItemss.length > 1) {
          this.$modal.msgError('请勿选择多项数据');
          this.clearSel();
        } else {
          this.$emit('getChoose', this.chooseItemss);
          this.queryParams = { pageNum: 1, pageSize: 10 };
          this.clearSel();
        }
      } else {
        this.$emit('getChoose', this.chooseItemss);
        this.queryParams = { pageNum: 1, pageSize: 10 };
      }
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
    },

    //返回
    goback() {
      this.$emit('closeChoose');
      this.queryParams = { pageNum: 1, pageSize: 10 };
    },
  },
};
</script>

<style lang="scss" scoped>
.appc {
  .top {
    font-family: Alibaba PuHuiTi 2;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    margin: 10px;
  }
  .top::before {
    content: '\00a0 ';
    border-left: 3px solid #4da0ff;
    margin-right: 5px;
  }
  i {
    float: right;
    cursor: pointer;
    font-weight: 700;
    font-size: 30px;
  }
  .main {
    background: #fff;
    border-radius: 4px;
    ::v-deep .el-input__inner {
      border-color: #c0c4cc;
    }
    .p1 {
      // background: red;
      position: relative;
      /// float: left;
      display: inline-block;
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        // background: pink;
        width: 270px;
        height: 50px;
        .el-input,
        .el-date-editor,
        .el-select {
          margin: 10px 10px 0 10px;
          width: 240px;
          height: 40px;
        }
        .el-button {
          margin: 11px;
          width: 100px;
          border: 0px;
        }
        .el-button ~ .graybtn {
          background: #f3f4f8;
        }
      }
    }

    .p2 {
      margin: 15px;
      width: 98%;
      .el-button {
        margin: 20px 20px 20px 0px;
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
          width: 80%;
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
      margin-bottom: 0px;
      .pagination-container {
        margin-bottom: 0px;
        .el-pagination {
          margin: 15px;
          margin-top: 20px;
          text-align: right;
          padding-bottom: 0px;
        }
      }
    }

    .p4 {
      margin: 0px 15px;
      width: 98%;

      .el-button {
        border: 0;
        margin: 20px 20px 20px 0px;
        width: 100px;
        border-radius: 4px;
      }
      .el-button:first-child {
        background: #f3f4f8;
      }
    }
  }

  ::v-deep .popperClass {
    position: absolute !important;
  }
}
</style>
