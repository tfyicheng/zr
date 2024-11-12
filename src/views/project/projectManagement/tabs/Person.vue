<template class="app-container">
  <div class="main">
    <div class="mt">
      <el-button round :type="flag == 0 ? 'primary' : null" @click="tolish">成员列表</el-button>
      <el-button round :type="flag == 1 ? 'primary' : null" @click="tohis">交接历史</el-button>
    </div>
    <div class="mb">
      <div v-show="flag == 0">
        <div class="p3">
          <el-table
            :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
            :cell-style="{ textAlign: 'left' }"
            :data="tableData"
            style="width: 100%"
            max-height="560"
            ref="multipleTable"
            row-key="id"
            v-loading="loading"
          >
            <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
            <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
            <!-- <el-table-column prop="personId" label="人员记录ID"></el-table-column> -->
            <!-- <el-table-column prop="prjNumber" label="项目编号"></el-table-column>
            <el-table-column prop="prjName" label="项目名称"></el-table-column> -->
            <el-table-column label="项目角色">
              <template slot-scope="scope">
                {{
                  dict.type.project_role && scope.row.prjRole != null
                    ? dict.type.project_role[scope.row.prjRole].label
                    : ''
                }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="人员名称"> </el-table-column>
            <el-table-column prop="deptName" label="部门名称"> </el-table-column>
            <el-table-column prop="handoverUserName" label="交接人"> </el-table-column>

            <el-table-column label="交接状态">
              <template slot-scope="scope">
                <span v-if="scope.row.handoverStatus === 0" style="color: #1890ff">{{
                  dict.type.handover_status[scope.row.handoverStatus].label
                }}</span>
                <span v-else-if="scope.row.handoverStatus === 1" style="color: #07c15f">{{
                  dict.type.handover_status[scope.row.handoverStatus].label
                }}</span>
                <span v-else-if="scope.row.handoverStatus === 2" style="color: red">{{
                  dict.type.handover_status[scope.row.handoverStatus].label
                }}</span>
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
                <el-button
                  v-show="scope.row.children == null"
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
          <div style="height: 10px"></div>
        </div>
      </div>
      <div v-show="flag == 1">
        <div class="p3">
          <el-table
            :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
            :cell-style="{ textAlign: 'left' }"
            :data="tableData2"
            style="width: 100%"
            max-height="560"
            ref="multipleTable"
            row-key="id"
            v-loading="loading2"
          >
            <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
            <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
            <!-- <el-table-column prop="personId" label="人员记录ID"></el-table-column> -->
            <!-- <el-table-column prop="prjNumber" label="项目编号"></el-table-column>
            <el-table-column prop="prjName" label="项目名称"></el-table-column> -->
            <el-table-column label="项目角色">
              <template slot-scope="scope">
                {{
                  dict.type.project_role && scope.row.prjRole != null
                    ? dict.type.project_role[scope.row.prjRole].label
                    : ''
                }}
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="人员名称"> </el-table-column>
            <el-table-column prop="deptName" label="部门名称"> </el-table-column>
            <el-table-column prop="handoverUserName" label="交接人"> </el-table-column>
            <!-- 交接状态 -->
            <el-table-column label="交接状态">
              <template slot-scope="scope">
                <dict-tag
                  :flag="false"
                  :options="dict.type.handover_status"
                  :value="scope.row.status"
                />
                <!-- <span v-if="scope.row.status === 0" style="color: #1890ff">{{
                  dict.type.handover_status[scope.row.status].label
                }}</span>
                <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
                  dict.type.handover_status[scope.row.status].label
                }}</span>
                <span v-else-if="scope.row.status === 2" style="color: red">{{
                  dict.type.handover_status[scope.row.status].label
                }}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="handoverReason" label="交接原因"> </el-table-column>
          </el-table>
          <div style="height: 10px"></div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogTableVisible">
      <PersonList v-show="this.ChooseOne == 'pList'" :Multiple="false" ref="pList" />
    </el-dialog>

    <!-- 个别页面弹窗 -->
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
</template>

<script>
import { proPersonList, proPersonhandoverList } from '@/api/data/project';
import PersonList from '@/views/components/dialog/personlist';
import {
  projPersonList,
  projPersonHandover,
  projPersonHandoverDown,
  projPersonHandoverCancel,
} from '@/api/data/project';
export default {
  name: 'Person', //项目成员
  props: { uid: null },
  dicts: ['handover_status', 'project_role', 'reason_handover'],
  components: { PersonList },
  data() {
    return {
      flag: 0,
      loading: true, // 遮罩层
      loading2: true, // 遮罩层
      form: {
        reason: null, //交接原因
        personId: null, //人员记录ID
        handoverUserId: null, //交接人员ID
        handoverReason: '', //交接备注
      },
      tableData: [], //信息表格数据
      tableData2: [], //信息表格数据
      dialogTableVisible: false,
      dialogTableVisible2: false,
      fileview: '', //文件预览地址
      ChooseOne: '', //当前弹窗目标
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      proPersonList(id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });

      proPersonhandoverList(id).then((response) => {
        this.tableData2 = response.data;
        this.loading2 = false;
      });
    },

    tolish() {
      this.flag = 0;
    },
    tohis() {
      this.flag = 1;
    },
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

    //获取用户id
    getUser(data) {
      this.dialogTableVisible = false;
      if (data && data.length > 0) {
        this.form.userName = data[0].userName;
        this.form.handoverUserId = data[0].userId;
      }
    },

    handleEdit(row) {
      this.$router.push({ path: '/project-d/projectPersonnelCheck' });
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
  },
  // watch: {
  //   uid: {
  //     handler(val) {
  //       if (val) {
  //         console.log('参数:' + val);
  //         this.getList(val);
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.main {
  .mb {
    margin-top: 20px;
  }
}
</style>
