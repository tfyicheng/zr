<template>
  <div class="app-container">
    <div class="appo">
      <div class="appi">
        <div class="appc">
          <div class="top">数据字典</div>
          <div class="main">
            <el-form
              :model="queryParams"
              ref="queryForm"
              size="small"
              :inline="true"
              v-show="showSearch"
              label-width="68px"
            >
              <el-form-item label="字典名称" prop="dictName">
                <el-input
                  v-model="queryParams.dictName"
                  placeholder="请输入字典名称"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="字典类型" prop="dictType">
                <el-input
                  v-model="queryParams.dictType"
                  placeholder="请输入字典类型"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <!-- <el-form-item label="状态" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="字典状态"
                  clearable
                  style="width: 240px"
                >
                  <el-option
                    v-for="dict in dict.type.sys_normal_disable"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item> -->
              <el-form-item label="分类" prop="status">
                <el-select
                  v-model="queryParams.dictAssort"
                  placeholder="字典分类"
                  clearable
                  style="width: 240px"
                >
                  <el-option
                    v-for="dict in dict.type.dict_assort"
                    :key="dict.value"
                    :label="dict.label"
                    :value="dict.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="dateRange"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button style="background: #f3f4f8" size="mini" @click="resetQuery"
                  >重置</el-button
                >
                <!-- <el-button icon="el-icon-refresh" size="mini" @click="test" >测试文件预览</el-button> -->
              </el-form-item>
            </el-form>
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleAdd"
                  v-hasPermi="['system:dict:add']"
                  >新增</el-button
                >
              </el-col>
              <el-col :span="1.5">
                <el-button
                  type="success"
                  size="mini"
                  :disabled="single"
                  @click="handleUpdate"
                  v-hasPermi="['system:dict:edit']"
                  >修改</el-button
                >
              </el-col>
              <!-- <el-col :span="1.5">
                <el-button
                  type="danger"
                  size="mini"
                  :disabled="multiple"
                  @click="handleDelete"
                  v-hasPermi="['system:dict:remove']"
                  >删除</el-button
                >
              </el-col> -->
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleRefreshCache"
                  v-hasPermi="['system:dict:remove']"
                  >刷新缓存</el-button
                >
              </el-col>
              <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
            </el-row>
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              style="width: 100%"
              max-height="560"
              v-loading="loading"
              :data="typeList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="字典编号" align="center" prop="dictId" />
              <el-table-column
                label="字典名称"
                align="center"
                prop="dictName"
                :show-overflow-tooltip="true"
              />
              <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <router-link
                    :to="'/system/dict-data/index/' + scope.row.dictId"
                    class="link-type"
                  >
                    <span>{{ scope.row.dictType }}</span>
                  </router-link>
                </template>
              </el-table-column>
              <el-table-column label="字典分类" align="center" prop="dictAssort">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.dict_assort"
                    :value="scope.row.dictAssort"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column label="状态" align="center" prop="status">
                <template slot-scope="scope">
                  <dict-tag :flag="false" :options="dict.type.sys_normal_disable" :value="scope.row.status" />
                </template>
              </el-table-column> -->
              <el-table-column
                label="备注"
                align="center"
                prop="remark"
                :show-overflow-tooltip="true"
              />
              <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="操作"
                align="center"
                width="200"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:dict:edit']"
                    >修改</el-button
                  >
                  <!-- <el-button
                    style="color: #f56c6c"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:dict:remove']"
                    >删除</el-button
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
            <!-- 添加或修改参数配置对话框 :title="title"-->
            <el-dialog :visible.sync="open" width="500px" append-to-body>
              <span class="dialogt">{{ title }}</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="字典名称" prop="dictName">
                  <el-input
                    v-model="form.dictName"
                    placeholder="请输入字典名称"
                    @input="$forceUpdate()"
                  />
                </el-form-item>
                <el-form-item label="字典类型" prop="dictType">
                  <el-input
                    v-model="form.dictType"
                    placeholder="请输入字典类型"
                    :disabled="this.title == '修改字典类型'"
                    @input="$forceUpdate()"
                  />
                </el-form-item>
                <el-form-item label="字典分类" prop="dictAssort">
                  <el-select v-model="form.dictAssort" placeholder="请选择字典分类" clearable>
                    <el-option
                      v-for="dict in dict.type.dict_assort"
                      :key="dict.value"
                      :label="dict.label"
                      :value="dict.value"
                    />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="状态" prop="status">
                  <el-radio-group v-model="form.status">
                    <el-radio
                      v-for="dict in dict.type.sys_normal_disable"
                      :key="dict.value"
                      :label="dict.value"
                      >{{ dict.label }}</el-radio
                    >
                  </el-radio-group>
                </el-form-item> -->
                <el-form-item label="备注" prop="remark">
                  <el-input
                    v-model="form.remark"
                    type="textarea"
                    placeholder="请输入内容"
                    @input="$forceUpdate()"
                  ></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
              </div>
            </el-dialog>
            <el-dialog title="文件预览" :visible.sync="preview" width="60%" append-to-body>
              <div style="width: 100%; height: 70vh">
                <iframe width="100%" height="100%" :src="previewSrc"></iframe>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  listType,
  getType,
  delType,
  addType,
  updateType,
  refreshCache,
} from '@/api/system/dict/type';
export default {
  name: 'Dict',
  dicts: ['sys_normal_disable', 'dict_assort'],
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
      // 字典表格数据
      typeList: [],
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
        dictName: undefined,
        dictType: undefined,
        status: undefined,
        dictAssort: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictName: [{ required: true, message: '字典名称不能为空', trigger: 'blur' }],
        dictType: [{ required: true, message: '字典类型不能为空', trigger: 'blur' }],
        dictAssort: [{ required: true, message: '字典分类不能为空', trigger: 'change' }],
      },
      preview: false, //文件预览测试
      previewSrc: undefined, //文件预览测试地址
    };
  },
  created() {
    this.getList();
  },
  methods: {
    test() {
      this.previewSrc = 'http://192.168.2.247/prod-api/file/preview/1739953314023002112';
      this.preview = true;
    },
    /** 查询字典类型列表 */
    getList() {
      this.loading = true;
      listType(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.typeList = response.rows;
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
        dictId: undefined,
        dictName: undefined,
        dictType: undefined,
        status: '0',
        remark: undefined,
        dictAssort: undefined,
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
      this.resetForm('queryForm');
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加字典类型';
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.dictId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const dictId = row.dictId || this.ids;
      getType(dictId).then((response) => {
        this.form = response.data;
        this.form.dictAssort = this.form.dictAssort + '';
        this.open = true;
        this.title = '修改字典类型';
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.dictId != undefined) {
            updateType(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addType(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功');
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const dictIds = row.dictId || this.ids;
      this.$modal
        .confirm('是否确认删除字典编号为"' + dictIds + '"的数据项？')
        .then(function () {
          return delType(dictIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'system/dict/type/export',
        {
          ...this.queryParams,
        },
        `type_${new Date().getTime()}.xlsx`,
      );
    },
    /** 刷新缓存按钮操作 */
    handleRefreshCache() {
      refreshCache().then(() => {
        this.$modal.msgSuccess('刷新成功');
        this.$store.dispatch('dict/cleanDict');
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
            margin-left: 4px;
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
