<template>
  <div class="app-container">
    <div class="appo">
      <div class="appi">
        <div class="appc">
          <div class="top">数据备份</div>
          <div class="main">
            <el-form
              :model="queryParams"
              ref="queryForm"
              size="small"
              :inline="true"
              v-show="showSearch"
              label-width="68px"
            >
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="queryParams.startTime"
                  type="date"
                  placeholder="开始时间"
                  value-format="yyyy-MM-dd"
                  popper-class="popperClass"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="queryParams.endTime"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="结束时间"
                >
                </el-date-picker>
              </el-form-item>

              <!-- <el-form-item label="创建时间">
                <el-date-picker
                  v-model="dateRange"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item> -->
              <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button size="mini" style="background: #f3f4f8" @click="resetQuery"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>

            <el-table
              v-loading="loading"
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              max-height="560"
              :data="configList"
              @selection-change="handleSelectionChange"
            >
              <!-- <el-table-column type="selection" width="55" align="center" /> -->
              <el-table-column label="ID" prop="id" width="200" />
              <el-table-column label="存放位置" prop="localPath" />

              <el-table-column label="备份时间" align="center" prop="createTime" width="180">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                class-name="small-padding fixed-width"
                :show-overflow-tooltip="false"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleDown(scope.row)"
                    v-hasPermi="['system:dbBackup:down']"
                    >下载</el-button
                  >
                  <el-button
                    size="mini"
                    type="text"
                    style="color: red"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:dbBackup:remove']"
                    >删除</el-button
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dbList, dbDelete } from '@/api/data/safe';
import { backUp } from '@/api/data/file';
export default {
  name: 'Backup',

  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startTime: null,
        endTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        configName: [{ required: true, message: '参数名称不能为空', trigger: 'blur' }],
        configKey: [{ required: true, message: '参数键名不能为空', trigger: 'blur' }],
        configValue: [{ required: true, message: '参数键值不能为空', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true;
      dbList(this.queryParams).then((response) => {
        this.configList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        configId: undefined,
        configName: undefined,
        configKey: undefined,
        configValue: undefined,
        configType: 'Y',
        remark: undefined,
      };
      this.resetForm('form');
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.queryParams.startTime = null;
      this.queryParams.endTime = null;
      this.resetForm('queryForm');
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加参数';
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.configId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      //const configIds = row.configId || this.ids;
      this.$modal
        .confirm('是否确认删除备份？')
        .then(function () {
          return dbDelete(row.id);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },

    /** 导出 */
    handleDown(row) {
      backUp(row.id);
      // this.download('system/db/down/' + row.id, {}, `backup_${new Date().getTime()}.sql`);
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'system/config/export',
        {
          ...this.queryParams,
        },
        `config_${new Date().getTime()}.xlsx`,
      );
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess('刷新成功');
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    //margin: 20px;
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
        .el-button {
          //margin-left: 12px;
          margin: 11px;
          width: 100px;
          border: 0px;
          height: 35px;
          font-size: 14px;
        }
        .el-form {
          .el-form-item {
            width: 245px;
            height: auto;
            margin: 15px;
            margin-bottom: 0px;
            ::v-deep .el-form-item__label {
              display: none;
            }

            ::v-deep .el-input__inner {
              width: 240px;
              height: 37px;
            }
          }
          .el-form-item:last-child {
            margin-top: 4px;
          }
        }

        .el-row {
          margin: 0 0px !important;
          .top-right-btn {
            display: none; //管理员额外菜单隐藏
            margin-top: 20px !important;
          }
        }

        .el-table {
          padding: 15px;
          .el-button {
            //margin-left: 12px;
            margin: 11px;
            width: auto;
            height: auto;
            border: 0px;
            font-size: 14px;
          }
        }

        .pagination-container {
          margin: 15px;
          margin-top: 20px;
          text-align: right;
        }
      }
    }
  }
}
.el-dialog__wrapper {
  //局部弹窗样式修改
  top: 20px;
  .el-dialog .dialogt {
    margin: 10px 10px;
    height: 20px;
    font-size: 20px;
    display: block;
  }
  .el-dialog .dialogt::before {
    content: '\00a0 ';
    border-left: 3px solid #4da0ff;
    margin-right: 5px;
  }
  .el-form {
    margin-top: 20px;
  }
}
</style>
