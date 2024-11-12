<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '安全生产资料管理']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.title"
                :maxlength="commonFun.inputMax"
                placeholder="标题"
                clearable
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
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.type" placeholder="资料类型" clearable>
                <el-option
                  v-for="item in dict.type.safety_production_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
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

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button type="primary" @click="addC">添加</el-button>
            <!-- <el-button
              v-hasPermi="['file:down:contTemplate']"
              type="warning"
              @click="exportList"
              :disabled="tableData.length == 0"
              >导出</el-button
            >-->
            <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0"
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
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="id" label="资料编号"></el-table-column>
              <el-table-column prop="title" label="资料标题" width="360" />
              <el-table-column label="资料类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.safety_production_type"
                    :value="scope.row.type"
                  />
                </template>
              </el-table-column>
              <el-table-column label="点击数">
                <template slot-scope="scope">
                  {{ scope.row.clickNum != null ? scope.row.clickNum : '0' }}
                </template>
              </el-table-column>

              <el-table-column prop="deptName" label="供稿部门"> </el-table-column>
              <el-table-column prop="releaseTime" label="发布时间"> </el-table-column>
              <!-- <el-table-column prop="updateTime" label="最近更新时间"> </el-table-column> -->
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
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
import { listDept } from '@/api/system/dept';
import { safeList, safeDelete } from '@/api/data/safe';
export default {
  name: 'SafetyCheck', //查看安全专题
  dicts: ['safety_production_type'],
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //
      depts: [], //部门
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        templateName: '', //名称
        title: null,
        deptId: null,
        type: null,
        startTime: null,
        endTime: null,
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
      console.log(this.queryParams);
      safeList(this.queryParams).then((response) => {
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
      safeDelete(params.join(',')).then((res) => {
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
      this.$router.push({ path: '/data-d/safetyInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/safetyEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/data-d/safetyAdd' });
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
.collink {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ::v-deep .el-link--inner {
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
