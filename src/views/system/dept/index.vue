<template>
  <div class="app-container mbody">
    <NavTop :val="['人员管理', '珠荣公司组织架构图']" />
    <div class="body">
      <div class="lmain">
        <el-card class="box-card" shadow="never">
          <div slot="header">
            <el-row :gutter="20">
              <el-col :span="18" :xs="24">
                <el-input size="mini" v-model="deptName" placeholder="请输入部门名称"></el-input>
              </el-col>
              <el-col :span="6" :xs="24">
                <el-button type="primary" size="mini" @click="searchDept">搜索</el-button>
              </el-col>
            </el-row>
          </div>
          <el-tree
            ref="tree"
            v-loading="treeLoading"
            :expand-on-click-node="false"
            :check-on-click-node="true"
            :check-strictly="true"
            @check="treeNodeClick"
            :data="deptList"
            :default-expand-all="true"
            show-checkbox
            node-key="deptId"
            :filter-node-method="filterNode"
            :props="defaultProps"
          >
            <template v-slot="{ node }">
              <span :title="node.label" class="node-label">{{ node.label }}</span>
            </template>
          </el-tree>
        </el-card>
      </div>
      <div class="rmain">
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              @click="handlerAddDept"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              v-hasPermi="['system:dept:add']"
              v-if="!isShowEchart"
              >添加组织</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              @click="handlerAddSonDept"
              :disabled="single"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              v-hasPermi="['system:dept:add']"
              v-if="!isShowEchart"
              >添加下级</el-button
            >
          </el-col>
          <!-- {{ isShowEchart ? '返回' : '组织架构图' }} -->
          <el-col :span="1.5">
            <el-button
              v-show="isShowEchart"
              type="primary"
              @click="handlerDeptEchart"
              icon="el-icon-back"
              size="mini"
              >返回</el-button
            >
            <el-button
              v-show="!isShowEchart"
              type="primary"
              @click="handlerDeptEchart"
              icon="el-icon-view"
              size="mini"
              style="margin-left: 0"
              v-hasPermi="['system:dept:list']"
              >组织架构图</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              @click="handlerAddPost"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              v-hasPermi="['system:post:add']"
              v-if="!isShowEchart"
              >添加职位</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              @click="handleDeleteDept"
              :disabled="single"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              v-hasPermi="['system:dept:remove']"
              v-if="!isShowEchart"
              >删除</el-button
            >
          </el-col>
        </el-row>
        <el-card class="box-card" shadow="never">
          <el-tabs v-model="activeName" @tab-click="baesPostInfoTabClick" v-if="!isShowEchart">
            <el-tab-pane label="基本信息" name="baseInfo" v-loading="baseInfoLoading">
              <update-dept
                v-if="deptFlag == 0"
                :deptList="deptList"
                :deptForm="deptForm"
                :deptRules="deptRules"
              ></update-dept>
              <add-dept v-if="deptFlag == 1" :deptForm="deptForm" :deptRules="deptRules"></add-dept>
              <add-dept-child
                v-if="deptFlag == 2"
                :deptList="deptList"
                :deptForm="deptForm"
                :deptRules="deptRules"
              ></add-dept-child>
            </el-tab-pane>
            <el-tab-pane label="职位信息" name="postInfo">
              <el-table v-loading="postLoading" :data="postList">
                <el-table-column label="职位编号" align="center" prop="postId" width="80" />
                <el-table-column label="职位编码" align="center" prop="postCode" />
                <el-table-column label="职位名称" align="center" prop="postName" />
                <el-table-column label="所属部门" align="center" prop="deptName" />
                <!-- <el-table-column label="角色" align="center" prop="roleName">
                  <template slot-scope="scope">
                    <span>{{ parseRole(scope.row.roleName) }}</span>
                  </template>
                </el-table-column> -->
                <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                  <template slot-scope="scope">
                    <span>{{ parseTime(scope.row.createTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="备注" align="center" prop="remark" />
                <el-table-column
                  label="操作"
                  align="center"
                  width="250"
                  :show-overflow-tooltip="false"
                  class-name="small-padding fixed-width"
                >
                  <template slot-scope="scope">
                    <el-button
                      @click="handlePostUpdate(scope.row)"
                      size="mini"
                      type="text"
                      icon="el-icon-edit"
                      v-hasPermi="['system:post:edit']"
                      >修改</el-button
                    >

                    <el-button
                      @click="handlePersionSet(scope.row)"
                      size="mini"
                      type="text"
                      icon="el-icon-circle-check"
                      v-hasPermi="['system:user:list']"
                      >人员配置</el-button
                    >

                    <el-button
                      style="color: #f56c6c"
                      @click="handlePostDelete(scope.row)"
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                      v-hasPermi="['system:post:remove']"
                      >删除</el-button
                    >

                    <!-- <el-dropdown
                      size="mini"
                      @command="(command) => handleCommand(command, scope.row)"
                      v-hasPermi="['system:post:edit']"
                    >
                      <el-button size="mini" type="text" icon="el-icon-d-arrow-right"
                        >更多</el-button
                      >
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item
                          command="handlePostRole"
                          icon="el-icon-circle-check"
                          v-hasPermi="['system:role:edit']"
                          >分配权限</el-dropdown-item
                        >
                        <el-dropdown-item
                          command="handlePersionSet"
                          icon="el-icon-circle-check"
                          v-hasPermi="['system:user:list']"
                          >人员配置</el-dropdown-item
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
            </el-tab-pane>
          </el-tabs>
          <div class="echart">
            <div v-if="isShowEchart" style="float: left">
              <div style="color: #999999; font-size: 12px">部门人数</div>
              <div style="color: #666666; font-size: 24px; font-weight: 700">{{ total2 }}</div>
            </div>

            <dept-echart v-if="isShowEchart" :deptEchartData="deptEchartData"></dept-echart>
          </div>
          <div v-if="isShowEchart">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%; margin-top: 20px"
              max-height="420"
              ref="multipleTable"
              row-key="userId"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
              </el-table-column> :checked="chooseItems.includes(userName)":checked="iscludes(row)" -->
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <el-table-column prop="loginName" label="登录名称"> </el-table-column>
              <el-table-column prop="userName" label="人员名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门名称"> </el-table-column>
              <el-table-column prop="postName" label="职位名称"> </el-table-column>
              <!-- <el-table-column prop="role" label="角色"> </el-table-column> -->
              <el-table-column prop="sex" label="性别">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.sys_user_sex"
                    :value="scope.row.sex"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="education" label="学历">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.user_education"
                    :value="scope.row.education"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column prop="phoneNumber" label="联系号码"> </el-table-column>
              <el-table-column prop="dateOfBirth" label="出生日期"> </el-table-column> -->
              <el-table-column prop="joinDate" label="入职时间"> </el-table-column>
              <el-table-column prop="updateTime" label="最近更新时间"> </el-table-column>
              <!-- 工作状态 -->
              <!-- <el-table-column label="工作状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.user_job_status"
                    :value="scope.row.jobState"
                  />
                </template>
              </el-table-column> -->

              <el-table-column
                fixed="right"
                label="操作"
                width="200"
                :show-overflow-tooltip="false"
              >
                <template slot-scope="scope">
                  <!-- v-hasPermi="['person:dossier:query']" -->
                  <el-button
                    v-show="scope.row.canArchives"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >个人档案</el-button
                  >
                  <el-button
                    v-show="scope.row.canEdit"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >

                  <!-- v-hasPermi="['system:user:initPwd']" -->
                  <!-- <el-button
                    type="text"
                    size="small"
                    v-show="scope.row.canPwd"
                    @click="handleResetPwd(scope.row)"
                    style="font-size: 14px"
                    >重置密码</el-button
                  > -->
                  <el-button
                    v-show="scope.row.canDel"
                    type="text"
                    size="small"
                    @click="deleteT(scope.row)"
                    style="font-size: 14px; color: red"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <pagination
              v-show="total2 > 0"
              :total="total2"
              :page.sync="queryParams2.pageNum"
              :limit.sync="queryParams2.pageSize"
              @pagination="getPersonList"
            />
            <div style="height: 10px"></div>
          </div>
        </el-card>
      </div>

      <el-row :gutter="20" v-if="false">
        <el-col :span="6" :xs="24" class="min-width-row">
          <el-card class="box-card" shadow="never">
            <div slot="header">
              <el-row :gutter="20">
                <el-col :span="18" :xs="24">
                  <el-input size="mini" v-model="deptName" placeholder="请输入部门名称"></el-input>
                </el-col>
                <el-col :span="6" :xs="24">
                  <el-button type="primary" size="mini" @click="searchDept">搜索</el-button>
                </el-col>
              </el-row>
            </div>
            <el-tree
              ref="tree"
              v-loading="treeLoading"
              :expand-on-click-node="false"
              :check-on-click-node="true"
              :check-strictly="true"
              @check="treeNodeClick"
              :data="deptList"
              :default-expand-all="true"
              show-checkbox
              node-key="deptId"
              :filter-node-method="filterNode"
              :props="defaultProps"
            >
            </el-tree>
          </el-card>
        </el-col>
        <el-col :span="18" :xs="24" class="min-width-row2">
          <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
              <el-button
                @click="handlerAddDept"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                v-hasPermi="['system:dept:add']"
                v-if="!isShowEchart"
                >添加组织</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                @click="handlerAddSonDept"
                :disabled="single"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                v-hasPermi="['system:dept:add']"
                v-if="!isShowEchart"
                >添加下级</el-button
              >
            </el-col>
            <!-- {{ isShowEchart ? '返回' : '组织架构图' }} -->
            <el-col :span="1.5">
              <el-button
                v-show="isShowEchart"
                type="primary"
                @click="handlerDeptEchart"
                icon="el-icon-back"
                size="mini"
                >返回</el-button
              >
              <el-button
                v-show="!isShowEchart"
                type="primary"
                @click="handlerDeptEchart"
                icon="el-icon-view"
                size="mini"
                v-hasPermi="['system:dept:list']"
                >组织架构图</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                @click="handlerAddPost"
                type="primary"
                icon="el-icon-plus"
                size="mini"
                v-hasPermi="['system:post:add']"
                v-if="!isShowEchart"
                >添加职位</el-button
              >
            </el-col>
            <el-col :span="1.5">
              <el-button
                @click="handleDeleteDept"
                :disabled="single"
                type="danger"
                icon="el-icon-delete"
                size="mini"
                v-hasPermi="['system:dept:remove']"
                v-if="!isShowEchart"
                >删除</el-button
              >
            </el-col>
          </el-row>
          <el-card class="box-card" shadow="never">
            <el-tabs v-model="activeName" @tab-click="baesPostInfoTabClick" v-if="!isShowEchart">
              <el-tab-pane label="基本信息" name="baseInfo" v-loading="baseInfoLoading">
                <update-dept
                  v-if="deptFlag == 0"
                  :deptList="deptList"
                  :deptForm="deptForm"
                  :deptRules="deptRules"
                ></update-dept>
                <add-dept
                  v-if="deptFlag == 1"
                  :deptForm="deptForm"
                  :deptRules="deptRules"
                ></add-dept>
                <add-dept-child
                  v-if="deptFlag == 2"
                  :deptList="deptList"
                  :deptForm="deptForm"
                  :deptRules="deptRules"
                ></add-dept-child>
              </el-tab-pane>
              <el-tab-pane label="职位信息" name="postInfo">
                <el-table v-loading="postLoading" :data="postList">
                  <el-table-column label="职位编号" align="center" prop="postId" width="80" />
                  <el-table-column label="职位编码" align="center" prop="postCode" />
                  <el-table-column label="职位名称" align="center" prop="postName" />
                  <el-table-column label="所属部门" align="center" prop="deptName" />
                  <el-table-column label="角色" align="center" prop="roleName" />
                  <el-table-column label="创建时间" align="center" prop="createTime" width="180">
                    <template slot-scope="scope">
                      <span>{{ parseTime(scope.row.createTime) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="备注" align="center" prop="remark" />
                  <el-table-column
                    label="操作"
                    align="center"
                    width="250"
                    :show-overflow-tooltip="false"
                    class-name="small-padding fixed-width"
                  >
                    <template slot-scope="scope">
                      <el-button
                        @click="handlePostUpdate(scope.row)"
                        size="mini"
                        type="text"
                        icon="el-icon-edit"
                        v-hasPermi="['system:post:edit']"
                        >修改</el-button
                      >
                      <el-button
                        style="color: #f56c6c"
                        @click="handlePostDelete(scope.row)"
                        size="mini"
                        type="text"
                        icon="el-icon-delete"
                        v-hasPermi="['system:post:remove']"
                        >删除</el-button
                      >
                      <el-dropdown
                        size="mini"
                        @command="(command) => handleCommand(command, scope.row)"
                        v-hasPermi="['system:post:edit']"
                      >
                        <el-button size="mini" type="text" icon="el-icon-d-arrow-right"
                          >更多</el-button
                        >
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item
                            command="handlePostRole"
                            icon="el-icon-circle-check"
                            v-hasPermi="['system:role:edit']"
                            >分配权限</el-dropdown-item
                          >
                          <el-dropdown-item
                            command="handlePersionSet"
                            icon="el-icon-circle-check"
                            v-hasPermi="['system:user:list']"
                            >人员配置</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown>
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
              </el-tab-pane>
            </el-tabs>
            <dept-echart v-if="isShowEchart" :deptEchartData="deptEchartData"></dept-echart>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 添加或修改岗位对话框 :title="title"-->
    <el-dialog :visible.sync="open" width="500px" append-to-body>
      <span class="dialogt">{{ title }}</span>
      <el-form ref="postForm" :model="postForm" :rules="postRules" label-width="80px">
        <el-form-item label="职位名称" prop="postName">
          <el-input
            v-model="postForm.postName"
            @input="$forceUpdate()"
            placeholder="请输入岗位名称"
          />
        </el-form-item>
        <el-form-item label="职位编码" prop="postCode">
          <el-input
            v-model="postForm.postCode"
            @input="$forceUpdate()"
            placeholder="请输入编码名称"
          />
        </el-form-item>
        <el-form-item label="职位顺序" prop="postSort">
          <el-input-number
            v-model="postForm.postSort"
            @input="$forceUpdate()"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="postForm.remark"
            @input="$forceUpdate()"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitPostForm">确 定</el-button>
        <el-button style="background: #f3f4f8" @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 生成个人档案对话框 -->
    <el-dialog :visible.sync="dialogTableVisible" width="350px">
      <DossierList ref="doList" />
    </el-dialog>
  </div>
</template>

<script>
import DossierList from '@/views/components/dialog/dossierList';
import {
  personList,
  personDelete,
  personDossier,
  getDossier,
  userImportTemplate,
} from '@/api/data/person';
import { listDept, getDept, delDept, listDeptExcludeChild } from '@/api/system/dept';
import { listPost, getPost, delPost, addPost, updatePost } from '@/api/system/post';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import AddDept from './addDept';
import UpdateDept from './updateDept';
import AddDeptChild from './addDeptChild';
import deptEchart from './deptEchart.vue';

export default {
  name: 'Dept',
  dicts: ['sys_normal_disable', 'user_job_status', 'sys_user_sex', 'user_education'],
  components: { AddDept, UpdateDept, AddDeptChild, deptEchart, DossierList },
  data() {
    return {
      single: true,
      // 0组织基本信息1添加组织2添加下级
      deptFlag: 0,
      // 表格树数据
      deptList: [],
      // 树节点遮罩层
      treeLoading: true,
      // 基本信息遮罩层
      baseInfoLoading: true,
      defaultProps: {
        children: 'children',
        label: 'deptName',
      },
      // 部门树节点选中的值
      currentCheckData: {},
      // 搜索条件部门名称
      deptName: '',
      activeName: 'baseInfo',
      // 组织表单参数
      deptForm: {},
      // 组织表单校验
      deptRules: {
        deptName: [{ required: true, message: '组织名称不能为空', trigger: 'blur' }],
        orderNum: [{ required: true, message: '显示排序不能为空', trigger: ['blur', 'change'] }],
      },
      // 职位列表遮罩层
      postLoading: true,
      // 职位列表数据
      postList: [],
      // 职位查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: undefined,
        postName: undefined,
        status: undefined,
        deptId: undefined,
      },
      // 职位总条数
      total: 0,
      // 添加/修改职位弹出层标题
      title: '',
      // 添加/修改职位是否显示弹出层
      open: false,
      // 职位表单参数
      postForm: {},
      // 职位表单校验
      postRules: {
        postName: [{ required: true, message: '职位名称不能为空', trigger: 'blur' }],
        postCode: [{ required: true, message: '职位编码不能为空', trigger: 'blur' }],
        postSort: [{ required: true, message: '职位顺序不能为空', trigger: ['blur', 'change'] }],
      },
      isShowEchart: false,
      deptEchartData: {},
      dialogTableVisible: false, //生成档案弹窗
      loading: true, // 遮罩层
      tableData: [], //信息表格数据
      uid: '', //临时选择的用户id
      // 总条数
      total2: 0,
      // 查询参数
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        //phonenumber: '',
        deptIds: null,
        //postId: null,
        //jobState: null,
        //placeholder: '', //关键字
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    currentCheckData(val) {
      if (val.deptId) {
        this.single = false;
      } else {
        this.single = true;
      }
    },
  },
  created() {
    this.getList();
  },
  mounted() {
    this.$EventBus.$on('getList', () => {
      this.queryParams.deptId = undefined;
      this.getList();
    });
  },
  methods: {
    /** 提交按钮 */
    submitPostForm: function () {
      this.$refs['postForm'].validate((valid) => {
        if (valid) {
          this.postForm.deptId = this.queryParams.deptId;
          this.postForm.status = 0;
          if (this.postForm.postId != undefined) {
            updatePost(this.postForm).then((response) => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getPostList();
            });
          } else {
            addPost(this.postForm).then((response) => {
              this.$modal.msgSuccess('新增成功');
              this.open = false;
              this.getPostList();
            });
          }
        }
      });
    },
    // 更多操作触发
    handleCommand(command, row) {
      switch (command) {
        case 'handlePostRole':
          this.handlePostRole(row);
          break;
        case 'handlePersionSet':
          this.handlePersionSet(row);
          break;
        default:
          this.handlePersionSet(row);
          break;
      }
    },
    // 职位人员配置
    handlePersionSet(row) {
      this.$router.push('/system/post-auth/user/' + row.postId);
    },
    /** 权限按钮操作 */
    handlePostRole(row) {
      const postId = row.postId;
      this.$router.push('/system/post-auth/role/' + postId);
    },
    /** 添加职位按钮操作 */
    handlerAddPost() {
      this.reset();
      this.open = true;
      this.title = '添加职位';
      this.activeName = 'postInfo';
    },
    /** 修改按钮操作 */
    handlePostUpdate(row) {
      this.reset();
      const postId = row.postId || this.ids;
      getPost(postId).then((response) => {
        this.postForm = response.data;
        this.open = true;
        this.title = '修改职位';
      });
    },
    /** 删除按钮操作 */
    handlePostDelete(row) {
      const postIds = row.postId || this.ids;
      this.$modal
        .confirm('是否确认删除职位编号为"' + postIds + '"的数据项？')
        .then(function () {
          return delPost(postIds);
        })
        .then(() => {
          this.getPostList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    // 添加/修改职位取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 职位表单重置
    reset() {
      this.form = {
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        postSort: 0,
        status: '0',
        remark: undefined,
      };
      this.resetForm('postForm');
    },
    /** 查询岗位列表 */
    getPostList() {
      this.postLoading = true;
      listPost(this.queryParams).then((response) => {
        this.postList = response.rows;
        this.total = response.total;
        this.postLoading = false;
      });
    },
    //删除组织按钮点击事件
    handleDeleteDept() {
      this.$confirm(
        '是否确认删除名称为"' + this.currentCheckData.deptName + '"的数据项？',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          return delDept(this.currentCheckData.deptId);
        })
        .then(() => {
          this.queryParams.deptId = undefined;
          this.getList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    //添加下级组织按钮点击事件
    handlerAddSonDept() {
      this.deptForm = {};
      this.deptForm.parentId = this.currentCheckData.deptId;
      this.deptFlag = 2;
      this.activeName = 'baseInfo';
    },
    //添加组织按钮点击事件
    handlerAddDept() {
      this.deptForm = {};
      this.deptFlag = 1;
      this.activeName = 'baseInfo';
    },
    //组织架构图
    handlerDeptEchart() {
      this.isShowEchart = !this.isShowEchart;
    },
    // 基础信息/职位信息切换
    baesPostInfoTabClick(tab, event) {
      console.log(tab, event);
    },
    // 搜索过滤部门树
    searchDept() {
      this.$refs.tree.filter(this.deptName);
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.deptName.indexOf(value) !== -1;
    },
    // 部门树节点点击
    treeNodeClick(data) {
      this.loading = true;
      this.deptFlag = 0;
      // 点击时设置单选
      if (this.currentCheckData.deptId === data.deptId) {
        this.currentCheckData = {};
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.currentCheckData = data;
        this.$refs.tree.setCheckedKeys([data.deptId]);
      }
      this.deptForm = JSON.parse(JSON.stringify(data));
      this.baseInfoLoading = false;

      this.queryParams.deptId = data.deptId;
      this.deptEchartData = data;
      this.getPostList();
      this.getPersonList();
    },
    /** 查询部门列表 */
    getList() {
      this.treeLoading = true;
      listDept(this.queryParams).then((response) => {
        this.deptList = this.handleTree(response.data, 'deptId');
        if (this.deptList != null && this.deptList.length > 0) {
          this.treeNodeClick(this.deptList[0]);
        }
        this.treeLoading = false;
      });
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

    //#region 新增部门人员列表

    //加载列表
    getPersonList() {
      this.queryParams2.deptIds = this.queryParams.deptId;
      personList(this.queryParams2).then((response) => {
        this.tableData = response.rows;
        this.total2 = response.total;
        this.loading = false;
      });
    },

    //选择生成档案
    chooseDossier() {
      this.dialogTableVisible = true;
      if (this.$refs.doList) {
        this.$refs.doList.clearSel();
      } else {
        this.$nextTick(() => {
          this.$refs.doList.$off('getChoose', this.getChoose);
          this.$refs.doList.$on('getChoose', this.getChoose);
          this.$refs.doList.$on('closeChoose', this.closeChoose);
        }, 500);
      }
    },

    //获取选择
    getChoose(data) {
      this.dialogTableVisible = false;
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          //this.chooseItemss = data;
          // this.$router.push({
          //   path: '/data-d/personnelInfo',
          //   query: { id: this.uid, data: data.join(',') },
          // });
          getDossier(this.uid, data.join(',')).then((response) => {
            if (response.code == 200) {
              this.$router.push({ path: '/person-d/personnelInfo', query: { id: this.uid } });
            } else {
              this.$message.error(`生成异常`);
            }
          });
        }
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
      this.$refs.doList.clearSel();
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
      personDelete(row.userId).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getPersonList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
      this.getPersonList();

      return;
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.userId);
      });
      personDelete(params.join(',')).then((res) => {
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
      this.uid = row.userId;
      let _this = this;
      personDossier(row.userId).then((response) => {
        if (response.code === 201) {
          _this.chooseDossier();
        } else {
          _this.$router.push({ path: '/person-d/personnelInfo', query: { id: row.userId } });
        }
      });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/person-d/personnelInfoEdit', query: { id: row.userId } });
    },

    //#endregion
  },
};
</script>

<style scoped lang="scss">
.mbody {
  overflow: auto;
  .body {
    min-width: 1220px;
    display: flex;
    .lmain {
      width: 350px;
      margin-right: 20px;
      .el-tree-node {
        .node-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .rmain {
      flex: 1;
      padding-right: 5px;
      overflow: auto;
      // ::v-deep ::-webkit-scrollbar {
      //   height: 0px;
      // }
      //表格内换行
      ::v-deep .el-table .cell {
        white-space: pre-line;
      }
      .echart {
      }
    }
  }
}

::v-deep .vue-treeselect--disabled .vue-treeselect__control {
  background-color: #f5f7fa;
  border-color: #dfe4ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.deptInfoHeader {
  color: #333;
  font-family: PuHuiTiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 20px;
}

.deptInfoHeader span {
  display: inline-block;
  margin-right: 10px;
  width: 2px;
  height: 16px;
  background-color: #409eff;
}
.el-button {
  margin-right: 12px;
  // margin: 11px;
  //width: 100px;
  border: 0px;
  height: 35px;
  font-size: 14px;
}

// .min-width-row {
//   min-width: 330px;
// }

// .min-width-row2 {
//   min-width: 700px;
// }

::v-deep .el-card__header .el-row .el-input__inner {
  width: 240px;
  height: 35px;
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
