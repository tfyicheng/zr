<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '资产编码列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
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
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <!-- <div class="p1item">
              <el-date-picker
                v-model="queryParams.startTime"
                type="date"
                placeholder="开始时间"
                value-format="yyyy-MM-dd"
                popper-class="popperClass"
              >
              </el-date-picker>
            </div>
            <div class="p1item">
              <el-date-picker
                v-model="queryParams.endTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
              >
              </el-date-picker>
            </div> -->

            <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键字"></el-input>
            </div> -->

            <div class="p1item">
              <el-select v-model="queryParams.materialType" placeholder="资产类型" clearable>
                <el-option
                  v-for="item in dict.type.property_type"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
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

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button v-hasPermi="['property:material:add']" type="primary" @click="addC"
              >添加</el-button
            >
            <el-button
              v-hasPermi="['property:material:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              >删除</el-button
            >
            <!-- <div class="p2choose" style="display: none">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div> -->
          </div>

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="420"
              ref="multipleTable"
              row-key="materialId"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <!-- <el-table-column prop="materialId" label="Id"> </el-table-column> -->
              <el-table-column prop="materialName" label="资产名称"> </el-table-column>

              <el-table-column label="资产类别">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.property_type2"
                    :value="scope.row.propertyType"
                  />
                </template>
              </el-table-column>

              <el-table-column label="资产类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.property_type"
                    :value="scope.row.materialType"
                  />
                </template>
              </el-table-column>

              <!-- <el-table-column prop="manufacturer" label="品牌/厂家"> </el-table-column> -->
              <el-table-column prop="materialModel" label="规格型号"> </el-table-column>
              <!-- <el-table-column label="单位">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.unit_of_measurement"
                    :value="scope.row.meterId"
                  />
                </template>
              </el-table-column> -->
              <el-table-column
                fixed="right"
                label="操作"
                width="100"
                :show-overflow-tooltip="false"
              >
                <template slot-scope="scope">
                  <!-- <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  > -->
                  <el-button
                    v-hasPermi="['property:material:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
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
import { materialList, materialDelete } from '@/api/data/asset';
export default {
  name: 'AssetCodeIndex', //资产编码统计

  dicts: ['project_scale', 'unit_of_measurement', 'property_type', 'property_type2'],
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialName: '',
        manufacturer: '',
        materialType: null,
        propertyType: null,
      },
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      console.log(this.queryParams);
      materialList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    //删除
    async deleteT(row) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.materialId);
      });
      materialDelete(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
      this.$refs.multipleTable.clearSelection();
      this.getList();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/purchase-d/assetCodeInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({
        path: '/purchase-d/assetCodeEdit',
        query: { id: row.id, data: JSON.stringify(row) },
      });
    },

    //添加
    addC() {
      this.$router.push({ path: '/purchase-d/assetCodeAdd' });
    },
  },

  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getList();
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
          width: 100%;
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
        }

        .p2 {
          margin: 15px;
          width: 98%;
          .el-button {
            margin: 0px 20px 5px 0px;
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
