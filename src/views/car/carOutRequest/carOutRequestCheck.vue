<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '用车出库管理', '用车出库列表']" />
        <div class="main">
          <div class="p1">
            <!-- <div class="p1item">
              <el-input
                v-model="queryParams.applyUser"
                placeholder="申请人"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.deptId" placeholder="部门" clearable>
                <el-option
                  v-for="item in depts"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                >
                </el-option>
              </el-select>
            </div> -->

            <!-- <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="状态" clearable>
                <el-option
                  v-for="item in dict.type.approval_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value + ''"
                  @input="$forceUpdate()"
                >
                </el-option>
              </el-select>
            </div> -->

            <div class="p1item">
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
            </div>
            <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键字"></el-input>
            </div> -->
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button v-hasPermi="['car:car:outbound']" type="primary" @click="addC"
              >添加</el-button
            >
            <el-button
              v-hasPermi="['property:outbound:export']"
              type="warning"
              @click="exportList"
              :disabled="tableData.length == 0"
              >导出</el-button
            >
            <!-- <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0"
              >删除</el-button
            > -->
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
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="id" label="出库编号"></el-table-column>
              <el-table-column prop="carNumber" label="车牌号"> </el-table-column>
              <!-- <el-table-column prop="applyUser" label="申请人"> </el-table-column>
              <el-table-column prop="applyDept" label="申请部门"> </el-table-column> -->
              <!-- <el-table-column prop="outboundUser" label="出库人"> </el-table-column> -->
              <el-table-column prop="outboundTime" label="出库时间"> </el-table-column>
              <el-table-column prop="outboundRemark" label="出库事由"> </el-table-column>
              <!-- <el-table-column label="审批状态">
                <template slot-scope="scope">
                   <dict-tag :flag="false" :options="dict.type.approval_status" :value="scope.row.status" />
                </template>
              </el-table-column> -->

              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['car:outbound:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >

                  <el-button
                    v-for="(c, index) in scope.row.approve"
                    :key="index"
                    v-show="c.show"
                    @click="handleWork(scope.row, c)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >{{ c.name }}</el-button
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
import { listDept } from '@/api/system/dept';
import { carOutList, carOutCancel, carOutExportList } from '@/api/data/car';
export default {
  name: 'CarOutRequestCheck', //查看出库申请
  dicts: ['approval_status'],
  data() {
    return {
      depts: [], //部门项
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [
        // {
        //   approve: [
        //     {
        //       name: '撤销', //名称,会有撤销、领用、归还车辆
        //       status: 6, //状态
        //       show: true, //是否显示
        //     },
        //     {
        //       name: '领用', //名称,会有撤销、领用、归还车辆
        //       status: 6, //状态
        //       show: true, //是否显示
        //     },
        //     {
        //       name: '归还车辆', //名称,会有撤销、领用、归还车辆
        //       status: 6, //状态
        //       show: false, //是否显示
        //     },
        //   ],
        // },
      ], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        // 日期范围
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        applyUser: null,
        deptId: null,
        status: null,
      },
    };
  },

  created() {
    this.getList();
    this.getDeptList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      if (this.$route.query.status != null) {
        this.queryParams.status = this.$route.query.status;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }
      console.log(this.queryParams);
      carOutList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
      this.loading = false;
    },

    //获取部门列表
    getDeptList() {
      listDept().then((response) => {
        console.log(response);
        this.depts = response.data;
      });
    },

    //导出列表
    exportList() {
      carOutExportList(this.queryParams);
    },

    //处理
    handleWork(row, handle) {
      console.log(row, handle);
      if (handle.status == 6) {
        let data = {
          id: row.id, //编号(申请单ID)
          status: handle.status, //状态,暂时固定填6即可
          approvalDesc: '', //备注
        };
        carOutCancel(data).then((res) => {
          if (res.code == 200) {
            this.$message.success(`已提交请求`);
            this.getList();
          } else {
            this.$message.error(`请求失败`);
          }
        });
      }
    },

    exportT() {
      //this.$router.push({ path: '/car-d/carRequestReback', query: { id: '1748172804156628992' } });
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
        params.push(element.id);
      });
      bidDelete(params.join(',')).then((res) => {
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
      this.$router.push({ path: '/car-d/carOutRequestInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/car-d/carOutRequestEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/car-d/carOutRequestAdd' });
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
          width: 100%;
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
