<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员信息管理', '人员信息列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.userName"
                :maxlength="commonFun.inputMax"
                placeholder="人员名称"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <DeptCascader :data.sync="queryParams.depts" @getSelect="itemChange" />
            </div>

            <div class="p1item" v-if="false">
              <el-select
                v-model="queryParams.deptId"
                placeholder="部门名称"
                clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
                @change="itemChange"
              >
                <el-option
                  v-for="item in deptIds"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.postId" placeholder="职位名称" clearable>
                <el-option
                  v-for="item in postIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.phonenumber"
                :maxlength="commonFun.inputMax"
                placeholder="联系号码"
                clearable
              ></el-input>
            </div>

            <!-- <div class="p1item">
              <el-select v-model="queryParams.jobState" placeholder="在职状态" clearable>
                <el-option
                  v-for="item in dict.type.user_job_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value + ''"
                  @input="$forceUpdate()"
                >
                </el-option>
              </el-select>
            </div> -->

            <div class="p1item">
              <el-select v-model="queryParams.sex" placeholder="性别" clearable>
                <el-option
                  v-for="item in dict.type.sys_user_sex"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.education" placeholder="学历" clearable>
                <el-option
                  v-for="item in dict.type.user_education"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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
            <el-button v-hasPermi="['person:user:add']" type="primary" @click="addC"
              >添加</el-button
            >

            <!-- <el-button type="warning" v-hasPermi="['person:user:import']" @click="importList"
              >导入</el-button
            > -->

            <!-- <el-button
              v-hasPermi="['person:user:userTemplate']"
              style="width: auto"
              type="primary"
              @click="downTemplate"
              >下载导入模版</el-button
            > -->

            <!-- <el-button type="danger" @click="deleteT" :disabled="chooseItemss.length == 0"
              >删除</el-button
            > -->
            <!-- <span style="color: gray">（重置密码为{{ initPassword }}）</span> -->
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
              <el-table-column prop="phoneNumber" label="联系号码"> </el-table-column>
              <el-table-column prop="dateOfBirth" label="出生日期"> </el-table-column>
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
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>

          <el-dialog :visible.sync="dialogTableVisible" width="350px">
            <DossierList ref="doList" />
          </el-dialog>
          <FileChoose
            ref="FileChoose"
            :upType="997"
            @import="getList()"
            style="display: none"
            :limit="1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DossierList from '@/views/components/dialog/dossierList';
import { resetUserPwd } from '@/api/system/user';
import {
  personList,
  personDelete,
  personDossier,
  getDossier,
  userImportTemplate,
} from '@/api/data/person';
import { listDept } from '@/api/system/dept';
import { listPost } from '@/api/system/post';
export default {
  name: 'PersonnelInfoCheck', //人员信息
  dicts: ['user_job_status', 'sys_user_sex', 'user_education'],
  components: { DossierList },
  data() {
    return {
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        phonenumber: '',
        deptId: null,
        postId: null,
        jobState: null,
        //placeholder: '', //关键字
      },
      deptIds: [], //部门项
      postIds: [], //职位项
      dialogTableVisible: false, //生成档案弹窗
      uid: '', //临时选择的用户id
      // 默认密码
      initPassword: undefined,
    };
  },

  created() {
    this.getList();
    this.getDeptlist();
    this.getConfigKey('sys_user.initPassword').then((response) => {
      this.initPassword = response.data;
    });
  },

  mounted() {},

  methods: {
    //加载列表
    getList() {
      if (this.$route.query.jobStatus != null) {
        this.queryParams.jobState = this.$route.query.jobStatus;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      personList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //加载部门列表生成级联下拉项
    getDeptlist() {
      listDept({ pageNum: 1, pageSize: 999 }).then((response) => {
        response.data.forEach((item, index) => {
          this.deptIds.push({ label: item.deptName, value: item.deptId });
        });
      });
    },

    // 查询岗位列表
    getPostList(did) {
      listPost({ pageNum: 1, pageSize: 999, deptId: did }).then((response) => {
        this.postIds = [];
        this.queryParams.postId = null;
        response.rows.forEach((item, index) => {
          this.postIds.push({ label: item.postName, value: item.postId });
        });
      });
    },

    //级联选择触发
    itemChange(data) {
      //this.getPostList(this.queryParams.deptId);
      //改为联动之后取数组最后一个id，且传参格式是逗号分隔
      if (Array.isArray(data) && data && data.length > 0) {
        this.getPostList(data[data.length - 1]);
        this.queryParams.deptIds = data.join(',');
      } else {
        this.postIds = [];
        this.queryParams.postId = null;
      }
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

    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt('请输入 "' + row.userName + '" 的新密码', '提示', {
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
      personDelete(row.userId).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
      this.getList();

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

    //添加
    addC() {
      this.$router.push({ path: '/person-d/personnelInfoAdd' });
    },

    //导入
    importList() {
      this.$refs.FileChoose.clickEvent();
    },

    //下载导入的合同模版
    downTemplate() {
      userImportTemplate();
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
            ::v-deep .el-cascader,
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

        //个别页面弹窗修改
        // ::v-deep .el-dialog {
        //   width: 350px;
        //   min-width: 350px;
        // }
        // ::v-deep .el-dialog:not(.is-fullscreen) {
        //   margin-top: 20vh !important;
        // }
      }
    }
  }
}
</style>
