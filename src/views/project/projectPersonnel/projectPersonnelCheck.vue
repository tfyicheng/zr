<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目人员管理', '项目人员列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.contNumber"
                placeholder="合同编号"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.prjName"
                placeholder="项目名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.userName"
                placeholder="成员名称"
                clearable
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.prjRole" placeholder="项目角色" clearable>
                <el-option
                  v-for="item in dict.type.project_role"
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

          <!-- <div class="p2">
            <el-button type="primary" @click="addC">添加</el-button>
            <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0"
              >删除</el-button
            >
            <div class="p2choose" style="display: none">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div>
          </div> -->

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
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <!-- <el-table-column prop="personId" label="人员记录ID"></el-table-column> -->
              <el-table-column prop="contNumber" label="合同编号"></el-table-column>
              <el-table-column prop="prjName" label="项目名称"></el-table-column>
              <el-table-column label="项目角色">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_role"
                    :value="scope.row.prjRole"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="userName" label="人员名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门名称"> </el-table-column>
              <el-table-column prop="handoverUserName" label="交接人"> </el-table-column>

              <el-table-column label="交接状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.handover_status"
                    :value="scope.row.handoverStatus"
                  />
                  <!-- <span v-if="scope.row.handoverStatus === 0" style="color: #1890ff">{{
                    dict.type.handover_status[scope.row.handoverStatus].label
                  }}</span>
                  <span v-else-if="scope.row.handoverStatus === 1" style="color: #07c15f">{{
                    dict.type.handover_status[scope.row.handoverStatus].label
                  }}</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="handoverReason" label="交接原因"> </el-table-column>

              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-button
                    v-show="scope.row.canHandoverOk"
                    type="text"
                    size="small"
                    @click="handleChangeDown(scope.row)"
                    style="font-size: 14px; color: #2fd052"
                    >交接完成</el-button
                  >
                  <!-- width="350" -->
                  <el-button
                    v-show="scope.row.canHandover"
                    @click="handleChange(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >项目交接</el-button
                  >
                  <!-- v-hasPermi="['project:project:editPerson']" -->
                  <el-button
                    v-show="scope.row.children == null && scope.row.canEdit"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >

                  <el-button
                    v-show="scope.row.canBackHandover"
                    type="text"
                    size="small"
                    @click="handleWork(scope.row)"
                    style="font-size: 14px; color: #999999"
                    >撤销</el-button
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

          <el-dialog :visible.sync="dialogTableVisible">
            <PersonList
              v-show="this.ChooseOne == 'pList'"
              :Multiple="false"
              ref="pList"
              :type="4"
            />
          </el-dialog>

          <el-dialog :visible.sync="dialogTableVisible2" width="400px" append-to-body>
            <div style="height: 50px; font-size: 20px; margin: 7px">项目交接</div>
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="交接人员">
                <el-input
                  v-model="form.userName"
                  placeholder="点击选择"
                  @click.native="chooseUser"
                  readonly
                >
                  <svg-icon
                    slot="suffix"
                    icon-class="choose"
                    style="cursor: pointer; margin-right: 10px"
                  />
                </el-input>
              </el-form-item>

              <el-form-item label="交接原因" prop="status">
                <el-select v-model="form.reason" placeholder="点击选择" style="width: 100%">
                  <el-option
                    v-for="item in dict.type.reason_handover"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="交接备注" prop="remark">
                <el-input
                  class="finput"
                  v-model="form.handoverReason"
                  type="textarea"
                  maxlength="100"
                  resize="none"
                  placeholder="请输入内容"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="submitForm">确 定</el-button>
              <el-button @click="cancel">取 消</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PersonList from '@/views/components/dialog/personlist';
import {
  projPersonList,
  projPersonHandover,
  projPersonHandoverDown,
  projPersonHandoverCancel,
} from '@/api/data/project';
export default {
  name: 'ProjectPersonnelCheck', //查看项目人员
  dicts: ['handover_status', 'project_role', 'reason_handover'],
  components: { PersonList },
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      form: {
        reason: null, //交接原因
        personId: null, //人员记录ID
        handoverUserId: null, //交接人员ID
        handoverReason: '', //交接备注
      },
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        contNumber: null,
        prjName: null,
        userName: null,
        prjRole: null,
      },
      dialogTableVisible: false,
      dialogTableVisible2: false,
      fileview: '', //文件预览地址
      ChooseOne: '', //当前弹窗目标
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      if (this.$route.query.type != null) {
        this.queryParams.prjRole = this.$route.query.type;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      console.log(this.queryParams);
      projPersonList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowExpansion(this.tableData[0], true);
        });
      });
    },

    // //附件判断预览
    // filePreview(row) {
    //   if (Array.isArray(row)) {
    //     if (row.length > 0) {
    //       for (let i = 0; i < row.length; i++) {
    //         if (
    //           this.commonFun.limitFt.includes(
    //             row[i].originalName.substr(row[i].originalName.lastIndexOf('.') + 1),
    //           )
    //         ) {
    //           return row[i].originalName;
    //         }
    //       }
    //       return '';
    //     } else {
    //       return '';
    //     }
    //   }
    // },

    // //预览  先处理可以预览的文件
    // preview(row) {
    //   this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + row[0].annexId;
    //   this.dialogTableVisible = true;
    // },

    //选择用户id
    chooseUser() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'pList';
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getUser);
        this.$refs.pList.$on('getChoose', this.getUser);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
        this.$refs.pList.getList();
      }, 500);
    },

    closeChoose() {
      this.dialogTableVisible = false;
    },

    //获取用户id
    getUser(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.userName = data[0].userName;
        this.form.handoverUserId = data[0].userId;
      } else {
        this.form.userName = null;
        this.form.handoverUserId = null;
      }
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

    //申请交接
    handleChange(row) {
      this.dialogTableVisible2 = true;
      this.form.personId = row.personId;
    },

    //撤销交接
    async handleWork(row) {
      if (!(await this.commonFun.sureDialog('是否确定撤销？'))) {
        return;
      }
      //请求一下接口再重新获取列表
      this.$modal.loading('正在提交，请稍候...');
      projPersonHandoverCancel(row.personId)
        .then((response) => {
          this.$modal.closeLoading();
          if (response.code == 200) {
            this.$message.success('请求提交成功');
            this.getList();
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    //交接完成同上
    async handleChangeDown(row) {
      if (!(await this.commonFun.sureDialog('是否确定交接？'))) {
        return;
      }
      this.$modal.loading('正在提交，请稍候...');
      projPersonHandoverDown(row.personId)
        .then((response) => {
          this.$modal.closeLoading();
          if (response.code == 200) {
            this.$message.success('请求提交成功');
            this.getList();
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    //取消交接
    cancel() {
      this.dialogTableVisible2 = false;
      this.form = {
        userName: null,
        personId: null, //人员记录ID
        handoverUserId: null, //交接人员ID
        handoverReason: '', //交接原因
      };
    },

    //确定交接
    submitForm() {
      console.log(this.form);
      this.dialogTableVisible2 = false;
      this.$modal.loading('正在提交，请稍候...');
      projPersonHandover(this.form)
        .then((response) => {
          this.$modal.closeLoading();
          if (response.code == 200) {
            this.$message.success('请求提交成功');
            this.getList();
            this.form = {
              userName: null,
              personId: null, //人员记录ID
              handoverUserId: null, //交接人员ID
              handoverReason: '', //交接原因
              reason: null,
            };
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    // //删除
    //     async deleteT(row) {
    // if (!(await this.commonFun.sureDialog())) {
    //   return;
    // }
    //   let params = [];
    //   this.chooseItems.forEach((element) => {
    //     params.push(element.id);
    //   });
    //   custDelete(params.join(',')).then((res) => {
    //     if (res.code == 200) {
    //       this.$message.success(`删除成功`);
    //       this.$refs.multipleTable.clearSelection();
    //       this.getList();
    //     } else {
    //       this.$message.error(`删除失败`);
    //     }
    //   });
    //   this.$refs.multipleTable.clearSelection();
    //   this.getList();
    // },

    //查看
    // handleCheck(row) {
    //   console.log(row);
    //   this.$router.push({
    //     path: '/production-d/customerManagementInfo',
    //     query: { id: row.id, type: row.type },
    //   });
    // },

    //编辑
    handleEdit(row) {
      //遍历整个table数据
      this.tableData.forEach((item) => {
        //判断该行是否有子节点
        if ('children' in item) {
          //遍历子节点
          item.children.forEach((item2) => {
            //判断该节点是否为我点击的节点
            if (item2 == row) {
              // console.log('父节点', item); //输出父节点
              this.$router.push({
                path: '/project-d/projectPersonnelEdit',
                query: { id: item.id },
              });
            }
          });
        }
      });
      return;
    },

    // //添加
    // addC() {
    //   this.$router.push({ path: '/production-d/customerManagementAdd' });
    // },
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

        ::v-deep .dialogEvent {
          height: 300px;
        }

        .finput {
          height: 300px;
          ::v-deep .el-textarea {
            max-height: 300px !important;
            border-radius: 4px;
            background: #fff;
          }
        }
      }
    }
  }
}
</style>
