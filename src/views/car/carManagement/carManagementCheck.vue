<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '车辆统计', '车辆列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.brand"
                placeholder="品牌"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>
            <div class="p1item">
              <el-input
                v-model="queryParams.engineNumber"
                placeholder="发动机号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.frameNumber"
                placeholder="车架号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.model"
                placeholder="型号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.plateNumber"
                placeholder="车牌号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-date-picker
                v-model="buyDate"
                type="daterange"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>

              <!-- <el-date-picker
                v-model="queryParams.buyDate"
                type="date"
                placeholder="购买日期"
                clearable
                value-format="yyyy-MM-dd"
              >
              </el-date-picker> -->
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="车辆状态" clearable>
                <el-option
                  v-for="item in dict.type.cat_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value + ''"
                  @input="$forceUpdate()"
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
            <el-button v-hasPermi="['car:car:add']" type="primary" @click="addC">添加</el-button>
            <el-button
              v-hasPermi="['property:car:export']"
              type="warning"
              @click="exportList"
              :disabled="tableData.length == 0"
              >导出</el-button
            >
            <el-button
              v-hasPermi="['car:car:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              style="font-size: 14px"
              >删除</el-button
            >
            <!-- <div class="p2choose">
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
              row-key="id"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <!-- <el-table-column prop="ID" label="Id"> </el-table-column> -->
              <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
              <el-table-column prop="brand" label="品牌"> </el-table-column>
              <!-- <el-table-column prop="buyDate" label="购买日期"> </el-table-column>
              <el-table-column prop="engineNumber" label="发动机号"> </el-table-column>
              <el-table-column prop="frameNumber" label="车架号"> </el-table-column>
              <el-table-column prop="model" label="型号"> </el-table-column> -->
              <el-table-column prop="userName" label="出行人员"> </el-table-column>
              <el-table-column prop="destination" label="用车目的地"> </el-table-column>
              <el-table-column prop="day" label="用车天数"> </el-table-column>
              <el-table-column prop="time" label="用车/出库时间"> </el-table-column>

              <el-table-column label="车辆状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.cat_status"
                    :value="scope.row.status"
                  />
                  <!-- <span v-if="scope.row.status === 0" style="color: #409eff">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 2" style="color: red">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 3" style="color: #fac06a">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 4" style="color: #fac06a">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 5" style="color: #fac06a">{{
                    dict.type.cat_status[scope.row.status].label
                  }}</span> -->
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['car:car:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['car:car:edit']"
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
import { carList, carDelete, carExportList } from '@/api/data/car';
export default {
  name: 'CarManagementCheck', //查看车辆管理
  dicts: ['cat_status'],
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      buyDate: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        brand: null,
        engineNumber: null,
        frameNumber: null,
        model: null,
        plateNumber: null,
        status: null,
      },
      multipleSelection: [],
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      if (this.$route.query.status != null) {
        this.queryParams.status = this.$route.query.status;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }
      if (this.buyDate && this.buyDate.length > 0) {
        this.queryParams.startTime = this.buyDate[0];
        this.queryParams.endTime = this.buyDate[1];
      } else {
        this.queryParams.startTime = null;
        this.queryParams.endTime = null;
      }
      console.log(this.queryParams);
      carList(this.queryParams).then((response) => {
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
      this.dateRange = [];
      this.dateRange2 = [];
      this.buyDate = [];
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    //导出列表
    exportList() {
      carExportList(this.queryParams);
    },

    //删除
    async deleteT(row) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.id);
      });
      carDelete(params.join(',')).then((res) => {
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
      this.$router.push({ path: '/car-d/CarManagementInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/car-d/CarManagementEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/car-d/carManagementAdd' });
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
