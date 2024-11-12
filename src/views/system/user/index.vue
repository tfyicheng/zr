<template>
  <div class="app-container">
    <div class="appo">
      <div class="appi">
        <div class="appc">
          <div class="top">账号列表</div>
          <div class="main">
            <el-form
              :model="queryParams"
              ref="queryForm"
              size="small"
              :inline="true"
              v-show="showSearch"
              label-width="68px"
            >
              <el-form-item label="名称" prop="userName">
                <el-input
                  v-model="queryParams.userName"
                  placeholder="请输入名称"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input
                  v-model="queryParams.phonenumber"
                  placeholder="请输入号码"
                  clearable
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="用户状态"
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
              <!-- icon="el-icon-search"  icon="el-icon-refresh" icon="el-icon-plus"icon="el-icon-delete"-->
              <el-form-item>
                <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
                <el-button style="background: #f3f4f8" size="mini" @click="resetQuery"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
            <el-row :gutter="10" class="mb8">
              <el-col :span="1.5">
                <el-button
                  type="primary"
                  size="mini"
                  @click="handleAdd"
                  v-hasPermi="['system:user:add']"
                  >新增</el-button
                >
              </el-col>
              <!--    <el-col :span="1.5">
        <el-button type="success"  icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['system:user:edit']">修改</el-button>
      </el-col> -->
              <el-col :span="1.5">
                <el-button
                  type="danger"
                  size="mini"
                  :disabled="multiple"
                  @click="handleDelete"
                  v-hasPermi="['system:user:remove']"
                  >删除</el-button
                >
              </el-col>
              <span style="color: gray; line-height: 57px">（超级管理员账号不允许操作）</span>

              <right-toolbar
                :showSearch.sync="showSearch"
                @queryTable="getList"
                :columns="columns"
              ></right-toolbar>
            </el-row>
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              style="width: 100%"
              max-height="560"
              v-loading="loading"
              :data="userList"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="50"
                align="center"
                :selectable="checkSelectable"
              />
              <el-table-column
                width="50"
                label="ID"
                align="center"
                key="userId"
                prop="userId"
                v-if="columns[0].visible"
              />
              <el-table-column
                label="登录账号"
                align="center"
                key="nickName"
                prop="nickName"
                v-if="columns[1].visible"
                :show-overflow-tooltip="true"
              />

              <el-table-column
                label="账号名称"
                align="center"
                key="userName"
                prop="userName"
                v-if="columns[1].visible"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="所属角色"
                align="center"
                key="roleName"
                prop="roleName"
                v-if="columns[2].visible"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{ parseRole(scope.row.roleName) }}</span>
                </template>
              </el-table-column>

              <el-table-column
                label="联系号码"
                align="center"
                key="phonenumber"
                prop="phonenumber"
                v-if="columns[3].visible"
                width="120"
              />
              <el-table-column
                label="邮箱"
                align="center"
                key="email"
                prop="email"
                v-if="columns[6].visible"
              />
              <el-table-column
                width="120"
                label="启用状态"
                align="center"
                key="status"
                v-if="columns[4].visible"
              >
                <template slot-scope="scope">
                  <el-switch
                    :disabled="scope.row.admin"
                    v-model="scope.row.status"
                    active-value="0"
                    inactive-value="1"
                    @change="handleStatusChange(scope.row)"
                  ></el-switch>
                </template>
              </el-table-column>
              <el-table-column
                label="创建时间"
                align="center"
                prop="createTime"
                v-if="columns[5].visible"
                width="160"
              >
                <template slot-scope="scope">
                  <span>{{ parseTime(scope.row.createTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注"
                align="center"
                key="remark"
                prop="remark"
                v-if="columns[7].visible"
                width="120"
              />
              <el-table-column
                label="操作"
                align="center"
                width="250"
                :show-overflow-tooltip="false"
                class-name="small-padding fixed-width"
              >
                <template slot-scope="scope" v-if="scope.row.userId !== 1">
                  <el-button
                    :disabled="scope.row.admin"
                    size="mini"
                    type="text"
                    icon="el-icon-edit"
                    @click="handleUpdate(scope.row)"
                    v-hasPermi="['system:user:edit']"
                    >修改</el-button
                  >

                  <el-button
                    :disabled="scope.row.admin"
                    style="color: #f56c6c"
                    size="mini"
                    type="text"
                    icon="el-icon-key"
                    v-hasPermi="['system:user:initPwd']"
                    @click="handleResetPwd(scope.row)"
                    >重置密码</el-button
                  >

                  <!-- <el-button
                    style="color: #f56c6c"
                    size="mini"
                    type="text"
                    icon="el-icon-delete"
                    @click="handleDelete(scope.row)"
                    v-hasPermi="['system:user:remove']"
                    >删除</el-button
                  > -->

                  <!-- <el-dropdown
                    size="mini"
                    @command="(command) => handleCommand(command, scope.row)"
                    v-hasPermi="['system:user:resetPwd', 'system:user:edit']"
                  >
                    <el-button size="mini" type="text" icon="el-icon-d-arrow-right">更多</el-button>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        command="handleResetPwd"
                        icon="el-icon-key"
                        v-hasPermi="['system:user:initPwd']"
                        >重置密码</el-dropdown-item
                      >
                      <el-dropdown-item
                        command="handleAuthRole"
                        icon="el-icon-circle-check"
                        v-hasPermi="['system:role:list']"
                        >分配角色</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown> -->
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
            <!-- 添加或修改用户配置对话框:title="title"-->
            <el-dialog :visible.sync="open" width="600px" append-to-body>
              <span class="dialogt">{{ title }}</span>
              <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="登录账号">
                      <el-input
                        v-model="form.nickName"
                        placeholder="系统填写"
                        maxlength="30"
                        disabled
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="账号名称" prop="userName">
                      <el-input
                        v-model="form.userName"
                        placeholder="请输入名称"
                        maxlength="30"
                        @blur="getLogin"
                        @input="$forceUpdate()"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="手机号码" prop="phonenumber">
                      <el-input
                        v-model="form.phonenumber"
                        placeholder="请输入号码"
                        maxlength="11"
                        @input="$forceUpdate()"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                      <el-input
                        v-model="form.email"
                        placeholder="请输入邮箱"
                        maxlength="50"
                        @input="$forceUpdate()"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="所属角色">
                      <el-select v-model="form.roleIds" multiple placeholder="请选择所属角色">
                        <el-option
                          v-for="item in roleOptions"
                          :key="item.roleId"
                          :label="item.roleName"
                          :value="item.roleId"
                          :disabled="item.status == 1"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item v-if="form.userId == undefined" label="密码" prop="password">
                      <el-input
                        v-model="form.password"
                        placeholder="请输入密码"
                        type="password"
                        maxlength="20"
                        show-password
                        @input="$forceUpdate()"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="状态">
                      <el-radio-group v-model="form.status">
                        <el-radio
                          v-for="dict in dict.type.sys_normal_disable"
                          :key="dict.value"
                          :label="dict.value"
                          >{{ dict.label }}</el-radio
                        >
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="备注">
                      <el-input
                        v-model="form.remark"
                        type="textarea"
                        placeholder="请输入内容"
                        @input="$forceUpdate()"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
              </div>
            </el-dialog>
            <!-- 用户导入对话框  :title="upload.title"-->
            <el-dialog :visible.sync="upload.open" width="400px" append-to-body>
              <span class="dialogt">{{ upload.title }}</span>
              <el-upload
                ref="upload"
                :limit="1"
                accept=".xlsx, .xls"
                :headers="upload.headers"
                :action="upload.url + '?updateSupport=' + upload.updateSupport"
                :disabled="upload.isUploading"
                :on-progress="handleFileUploadProgress"
                :on-success="handleFileSuccess"
                :auto-upload="false"
                drag
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip text-center" slot="tip">
                  <div class="el-upload__tip" slot="tip">
                    <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的用户数据
                  </div>
                  <span>仅允许导入xls、xlsx格式文件。</span>
                  <el-link
                    type="primary"
                    :underline="false"
                    style="font-size: 12px; vertical-align: baseline"
                    @click="importTemplate"
                    >下载模板</el-link
                  >
                </div>
              </el-upload>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitFileForm">确 定</el-button>
                <el-button @click="upload.open = false">取 消</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getLoginName } from '@/api/data/person';
import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
  deptTreeSelect,
} from '@/api/system/user';
import { getToken } from '@/utils/auth';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';

export default {
  name: 'User',
  dicts: ['sys_normal_disable', 'sys_user_sex'],
  components: { Treeselect },
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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: '',
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: 'Bearer ' + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + '/system/user/importData',
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        //userType: '00',
      },
      // 列信息
      columns: [
        { key: 0, label: `ID`, visible: true },
        { key: 1, label: `名称`, visible: true },
        { key: 2, label: `所属角色`, visible: true },
        { key: 3, label: `联系号码`, visible: true },
        { key: 4, label: `状态`, visible: true },
        { key: 5, label: `创建时间`, visible: true },
        { key: 6, label: `邮箱`, visible: true },
        { key: 7, label: `备注`, visible: true },
      ],
      // 表单校验
      rules: {
        userName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
          { min: 2, max: 20, message: '名称长度必须介于 2 和 20 之间', trigger: 'blur' },
        ],
        nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 5, max: 20, message: '密码长度必须介于 5 和 20 之间', trigger: 'blur' },
        ],
        email: [
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change'],
          },
        ],
        phonenumber: [
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getList();
    this.getDeptTree();
    this.getConfigKey('sys_user.initPassword').then((response) => {
      this.initPassword = response.data;
    });
  },
  mounted() {
    this.$EventBus.$on('getList', () => {
      this.getList();
    });
  },
  methods: {
    //获取登录名
    getLogin() {
      getLoginName(this.form.userName).then((response) => {
        if (response.code == 200) {
          this.form.nickName = response.data;
        }
      });
    },

    checkSelectable(row) {
      if (row.userName === 'admin') {
        return false; //禁用
      } else {
        return true; //不禁用
      }
    },

    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询部门下拉树结构 */
    getDeptTree() {
      deptTreeSelect().then((response) => {
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.handleQuery();
    },
    // 用户状态修改
    handleStatusChange(row) {
      let text = row.status === '0' ? '启用' : '停用';
      this.$modal
        .confirm('确认要"' + text + '""' + row.userName + '"用户吗？')
        .then(function () {
          return changeUserStatus(row.userId, row.status);
        })
        .then(() => {
          this.$modal.msgSuccess(text + '成功');
        })
        .catch(function () {
          row.status = row.status === '0' ? '1' : '0';
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
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: '0',
        remark: undefined,
        postIds: [],
        roleIds: [],
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
      this.queryParams.deptId = undefined;
      this.$refs.tree.setCurrentKey(null);
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case 'handleResetPwd':
          this.handleResetPwd(row);
          break;
        case 'handleAuthRole':
          this.handleAuthRole(row);
          break;
        default:
          break;
      }
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getUser().then((response) => {
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.open = true;
        this.title = '添加账号';
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids;
      getUser(userId).then((response) => {
        this.form = response.data;
        this.postOptions = response.posts;
        this.roleOptions = response.roles;
        this.$set(this.form, 'postIds', response.postIds);
        this.$set(this.form, 'roleIds', response.roleIds);
        this.open = true;
        this.title = '修改账号';
        this.form.password = '';
      });
    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入"' + row.userName + '"的新密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: '用户密码长度必须介于 5 和 20 之间',
        inputValue: this.initPassword,
        lockScroll: false,
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.$modal.msgSuccess('修改成功，新密码是：' + value);
          });
        })
        .catch(() => {});
    },
    /** 分配角色操作 */
    handleAuthRole: function (row) {
      const userId = row.userId;
      this.$router.push('/system/user-auth/role/' + userId);
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          //this.form.nickName = this.form.userName;
          this.form.nickName = this.form.nickName;
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
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
      const userIds = row.userId || this.ids;
      this.$modal
        .confirm('是否确认删除用户编号为"' + userIds + '"的数据项？')
        .then(function () {
          return delUser(userIds);
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
        'system/user/export',
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`,
      );
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = '用户导入';
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('system/user/importTemplate', {}, `user_template_${new Date().getTime()}.xlsx`);
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert(
        "<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" +
          response.msg +
          '</div>',
        '导入结果',
        { dangerouslyUseHTMLString: true },
      );
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },

    //表格内容换行转换
    parseRole(name) {
      if (name) {
        if (name.includes(',')) {
          return name.replace(',', '、\n\r');
        } else {
          return name;
        }
      }
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
          ::v-deep .cell {
            white-space: pre-line;
          }

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
