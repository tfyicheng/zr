<template class="app-container">
  <div class="main">
    <div class="p1">
      <div class="p1item">
        <el-input v-model="queryParams.contNumber" placeholder="合同编号" clearable></el-input>
      </div>

      <div class="p1item">
        <el-input
          v-model="queryParams.contName"
          :maxlength="commonFun.inputMax"
          placeholder="合同名称"
          clearable
        ></el-input>
      </div>

      <div class="p1item">
        <el-input
          v-model="queryParams.applyUser"
          :maxlength="commonFun.inputMax"
          placeholder="申请人"
          clearable
        ></el-input>
      </div>

      <div class="p1item">
        <el-select v-model="queryParams.applyDeptId" placeholder="申请部门" clearable>
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
            v-for="item in dict.type.contract_status"
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
      <!-- <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键词" clearable></el-input>
            </div> -->
      <div class="p1item">
        <el-button type="primary" @click="handleQuery">搜索</el-button>
        <el-button @click="resetQuery">重置</el-button>
      </div>
    </div>

    <div class="p2">
      <el-button v-hasPermi="['contract:serviceBuy:add']" type="primary" @click="addC"
        >添加</el-button
      >
      <el-button
        v-hasPermi="['contract:serviceBuy:exportList']"
        type="warning"
        @click="exportList"
        :disabled="tableData.length == 0"
        >导出</el-button
      >
      <el-button
        v-hasPermi="['contract:serviceBuy:termination']"
        type="danger"
        @click="TerminatedT"
        :disabled="chooseItems.length == 0"
        >中止</el-button
      >
      <el-button
        v-hasPermi="['contract:serviceBuy:remove']"
        type="danger"
        @click="deleteT"
        :disabled="chooseItems.length == 0"
        >删除</el-button
      >
      <!-- <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.contName }}</span>
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
        <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
        <el-table-column prop="contName" label="合同名称"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>
        <el-table-column prop="applyDept" label="申请部门"> </el-table-column>
        <el-table-column prop="totalAmount" label="总金额"> </el-table-column>
        <el-table-column prop="supplierName" label="供应商"> </el-table-column>
        <el-table-column prop="contacts" label="联系人"> </el-table-column>
        <el-table-column prop="phone" label="联系电话"> </el-table-column>
        <el-table-column prop="email" label="联系邮箱"> </el-table-column>
        <el-table-column prop="addr" label="联系地址"> </el-table-column>
        <el-table-column prop="contStartDate" label="签约日期"> </el-table-column>
        <!-- 合同状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.contract_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['contract:serviceBuy:query']"
              @click="handleCheck(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
            <el-button
              v-hasPermi="['contract:serviceBuy:edit']"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              style="font-size: 14px"
              >变更</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :limit.sync="queryParams.pageSize"
        :page.sync="queryParams.pageNum"
        @pagination="getList"
      />
      <div style="height: 10px"></div>
    </div>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import DeptList from '@/views/components/dialog/deptlist';
import {
  serviceContList,
  serviceContDelete,
  serviceContTermination,
  serContExportList,
} from '@/api/data/contract';
export default {
  name: 'ServicePCIndex', //服务采购合同
  dicts: ['contract_status'],
  components: { DeptList },
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      depts: [], //部门项
      tableData: [], //证书信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        // 日期范围
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        contName: '', //合同名称
        applyUser: '', //申请人
        status: '', //状态
        applyDeptId: null, //申请人部门ID
        //placeholder: '', //关键字
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
      serviceContList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //获取部门列表
    getDeptList() {
      listDept().then((response) => {
        console.log(response);
        this.depts = response.data;
      });
    },

    //选择部门id
    chooseDept() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'dList';
      this.$nextTick(() => {
        this.$refs.dList.$off('getChoose', this.getDept);
        this.$refs.dList.$on('getChoose', this.getDept);
        this.$refs.dList.$on('closeChoose', this.closeChoose);
        this.$refs.dList.getList();
      }, 500);
    },

    getDept(data) {
      this.dialogTableVisible = false;
      if (data) {
        this.ChooseDept = data[0].deptName;
        this.queryParams.applyDeptId = data[0].deptId;
      }
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
      //this.$refs.dList.clearSel();
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.dateRange2 = [];
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    //导出列表
    exportList() {
      serContExportList(this.queryParams);
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
      serviceContDelete(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
    },

    //中止
    async TerminatedT() {
      if (!(await this.commonFun.sureDialog('是否确定中止？'))) {
        return;
      }
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.id);
      });
      serviceContTermination(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`中止成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`中止失败`);
        }
      });
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/data-d/servicePCInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/servicePCEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/data-d/servicePCAdd' });
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
</style>
