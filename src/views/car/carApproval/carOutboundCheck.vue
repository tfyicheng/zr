<template class="app-container">
  <div class="main">
    <div class="p1">
      <div class="p1item">
        <div class="p1item">
          <el-input
            v-model="queryParams.id"
            placeholder="申请编号"
            clearable
            :maxlength="commonFun.inputMax"
          ></el-input>
        </div>

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
      </div>

      <div class="p1item">
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
      <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键字"></el-input>
            </div> -->
      <div class="p1item">
        <el-button type="primary" @click="handleQuery">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
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
        <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
        <!-- <el-table-column prop="id" label="编号"></el-table-column> -->
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>
        <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
        <el-table-column prop="projectName" label="项目名称"> </el-table-column>
        <el-table-column prop="useDept" label="部门"> </el-table-column>
        <el-table-column prop="usePersonNum" label="用车人数"> </el-table-column>
        <el-table-column prop="useTime" label="用车时间"> </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" :width="200" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['car:outbound:query']"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >

            <el-button
              v-show="
                scope.row.approve &&
                scope.row.approve.find((c) => c.status == 6) &&
                scope.row.approve.find((c) => c.status == 6).show
              "
              @click="
                handleWork(
                  scope.row,
                  scope.row.approve.find((c) => c.status == 6),
                )
              "
              type="text"
              size="small"
              style="font-size: 14px"
              >撤销</el-button
            >

            <el-button
              v-show="scope.row.approve && scope.row.approve.length >= 2"
              @click="handleEdit(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >

            <!-- <el-button
                    v-for="(c, index) in scope.row.approve"
                    :key="index"
                    v-show="c.show"
                    @click="handleWork(scope.row, c)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >{{ c.name }}</el-button
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
      <div style="height: 10px"></div>
    </div>

    <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
      <iframe width="100%" height="100%" :src="fileview"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import { carApplyListInfot, carOutCancel } from '@/api/data/car';
export default {
  name: 'CarOutboundCheck', //查看出库审批
  dicts: ['approval_status'],
  data() {
    return {
      depts: [], //部门项
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      dialogTableVisible: false,
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
        type: 0,
        id: null,
      },
      fileview: '',
    };
  },

  created() {
    this.getList();
    this.getDeptList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList(queryParam) {
      if (queryParam) {
        if (queryParam.id != null) {
          this.queryParams.id = queryParam.id;
        }
        if (queryParam.status != null) {
          this.queryParams.status = queryParam.status;
        }

        if (queryParam.year != null) {
          this.queryParams.startTime = queryParam.year[0];
          this.queryParams.endTime = queryParam.year[1];
        }
        this.$forceUpdate();
      }

      this.queryParams.type = 0;
      console.log(this.queryParams);
      carApplyListInfot(this.queryParams).then((response) => {
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

    //附件判断预览
    filePreview(row) {
      if (Array.isArray(row)) {
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            if (
              this.commonFun.limitFt.includes(
                row[i].originalName.substr(row[i].originalName.lastIndexOf('.') + 1),
              )
            ) {
              return row[i].originalName;
            }
          }
          return '';
        } else {
          return '';
        }
      }
    },

    //预览  先处理可以预览的文件
    preview(row) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + row[0].annexId;
      }, 200);

      this.dialogTableVisible = true;
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.$router.push({ path: '/car-d/carApprovalCheck', query: null });
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.$router.push({ path: '/car-d/carApprovalCheck', query: null });
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    //处理
    async handleWork(row, handle) {
      if (!(await this.commonFun.sureDialog('是否确定撤销？'))) {
        return;
      }
      console.log(row, handle);
      if (handle.status == 6) {
        let data = {
          id: row.id, //编号(申请单ID)
          status: handle.status, //状态,暂时固定填6即可
          approvalDesc: '', //备注
        };
        this.$modal.loading('正在提交，请稍候...');
        carOutCancel(data)
          .then((res) => {
            this.$modal.closeLoading();
            if (res.code == 200) {
              this.$message.success(`已提交请求`);
              this.getList();
            } else {
              this.$message.error(`请求失败`);
            }
          })
          .catch((error) => {
            this.$modal.closeLoading();
          });
      }
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/car-d/carOutboundInfo', query: { id: row.id } });
    },

    //处理
    handleEdit(row) {
      this.$router.push({
        path: '/car-d/carOutboundHandle',
        query: { id: row.id, approve: row.approve },
      });
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
      margin: 0px 20px 20px 0px;
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
</style>
