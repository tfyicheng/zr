<template class="app-container">
  <div class="main">
    <div class="p1">
      <!-- <div class="p1item">
        <el-input
          v-model="queryParams.prjNumber"
          :maxlength="commonFun.inputMax"
          placeholder="项目编号"
          clearable
        ></el-input>
      </div> -->
      <div class="p1item">
        <el-input
          v-model="queryParams.prjName"
          :maxlength="commonFun.inputMax"
          placeholder="项目名称"
          clearable
        ></el-input>
      </div>
      <!-- <div class="p1item">
        <el-input
          v-model="queryParams.clientName"
          :maxlength="commonFun.inputMax"
          placeholder="客户名称"
          clearable
        ></el-input>
      </div> -->
      <div class="p1item">
        <el-input
          v-model="queryParams.prjLeader"
          :maxlength="commonFun.inputMax"
          placeholder="项目负责人"
          clearable
        ></el-input>
      </div>
      <div class="p1item">
        <el-select v-model="queryParams.prjType" placeholder="项目类型" clearable>
          <el-option
            v-for="item in dict.type.project_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="p1item">
        <el-select
          v-model="queryParams.status2"
          placeholder="状态"
          multiple
          collapse-tags
          clearable
        >
          <el-option
            v-for="item in dict.type.project_status"
            :key="item.value"
            :label="item.label"
            :value="item.value + ''"
            @input="$forceUpdate()"
          >
          </el-option>
        </el-select>
      </div>

      <div class="p1item">
        <el-cascader
          v-model="area"
          :props="props"
          ref="cascaderAddr"
          placeholder="请选择区域"
          @change="areaChange"
          clearable
        ></el-cascader>
      </div>
      <div class="p1item">
        <el-date-picker
          v-model="queryParams.startTime"
          type="date"
          placeholder="开始时间"
          popper-class="popperClass"
          value-format="yyyy-MM-dd"
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

    <div class="p2">
      <el-button v-hasPermi="['project:project:add']" type="primary" @click="addC">添加</el-button>
      <el-button v-hasPermi="['project:project:export']" type="warning" @click="exportT"
        >导出</el-button
      >
      <!-- <el-button
        v-hasPermi="['project:project:remove']"
        type="danger"
        @click="deleteT"
        :disabled="chooseItems.length == 0"
        >删除</el-button
      > -->
      <!-- <div class="p2choose" >
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
        <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
        <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
        <el-table-column prop="prjName" label="项目名称">
          <template slot-scope="scope">
            <!-- 到期标志 -->
            <svg-icon
              icon-class="xm_jjcq"
              v-show="scope.row.dueStatus === 2"
              style="width: 30px; height: 30px; margin: auto 0"
            />
            <!-- <el-tag
              type="warning"
              v-show="scope.row.dueStatus === 2"
              style="height: auto; text-align: center"
              >{{ '即 将到 期' }}</el-tag
            > -->
            {{ scope.row.prjName }}
          </template>
        </el-table-column>
        <el-table-column label="项目类型">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.project_type" :value="scope.row.prjType" />
          </template>
        </el-table-column>
        <el-table-column label="项目阶段">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.project_plan" :value="scope.row.prjPhase" />
          </template>
        </el-table-column>
        <!-- 项目状态 -->
        <!-- <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.project_status" :value="scope.row.status" />
           
          </template>
        </el-table-column> -->
        <!-- <el-table-column prop="clientName" label="客户"> </el-table-column> -->
        <el-table-column prop="prjLeader" label="主管领导"> </el-table-column>
        <el-table-column prop="deptName" label="参与部门"> </el-table-column>
        <el-table-column prop="deliveryDate" label="计划完成时间"> </el-table-column>
        <el-table-column prop="planDate" label="预计完成时间"> </el-table-column>
        <el-table-column label="项目进度">
          <template slot-scope="scope">
            <el-progress
              :percentage="scope.row.progress"
              :color="customColorMethod"
              :show-text="false"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="question" label="存在问题"> </el-table-column>

        <el-table-column prop="person" label="主要参与人"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <!-- v-hasPermi="['project:project:query']" -->
            <el-button
              v-show="scope.row.canQuery"
              @click="handleCheck(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
            <!--  v-hasPermi="['project:project:edit']" -->
            <el-button
              v-show="scope.row.canEdit"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              style="font-size: 14px"
              >编辑</el-button
            >
            <!--  v-hasPermi="['project:project:termination']"-->
            <el-button
              type="text"
              size="small"
              @click="TerminatedT(scope.row)"
              style="font-size: 14px; color: #ff4949"
              v-show="scope.row.status != 2 && scope.row.canSuspend"
              >中止</el-button
            >

            <el-button
              type="text"
              size="small"
              @click="deleteT(scope.row)"
              style="font-size: 14px; color: #ff4949"
              v-show="scope.row.canDel"
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
      <el-dialog :visible.sync="dialogTableVisible" width="400px">
        <DownForm v-show="this.ChooseOne == 'downForm'" :type="1" ref="downForm" />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { projectList, projectDelete, projectTermination, projExport } from '@/api/data/project';
import { getCity, getProvince } from '@/api/system/user';
import DownForm from '@/views/components/dialog/downForm';
import { tansParams } from '@/utils/guangwei';
export default {
  name: 'ProjectAll', //所有项目列表
  dicts: ['project_status', 'project_type', 'project_plan'],
  components: { DownForm },
  data() {
    return {
      area: [], //选择区域数组
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        prjNumber: '', //项目编号
        prjName: '', //项目名称
        clientName: '', //客户名称
        prjLeader: null, //项目负责人
        prjType: null, //项目类型
        status: null, //状态
        status2: [], //状态
        areaProvince: null, //区域省
        areaCity: null, //区域市
        areaRegion: null, //区域县(区)
        // 日期范围
        startTime: null,
        endTime: null,
        //placeholder: '', //关键字
      },

      //区域级联选择配置
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            getCity().then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 1) {
            getProvince(node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 2) {
            getCity(node.parent.value, node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: node.level == 2,
              }));
              resolve(nodes);
            });
          } else if (node.level == 3) {
            resolve(null);
          }
        },
      },
      dialogTableVisible: false,
      ChooseOne: '',
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList(queryParam) {
      let newqp = null;
      if (queryParam) {
        if (queryParam) {
          this.queryParams.status2 = [queryParam.status];
          if (queryParam.status == -1) {
            this.queryParams.status2 = [0];
            newqp = { status: -1, pageNum: 1, pageSize: 10 };
          } else {
            this.queryParams.status = queryParam.status;
          }
        }
        console.log(newqp ? newqp : this.queryParams);
        this.$forceUpdate();
      } else if (this.queryParams.status2 && this.queryParams.status2.length > 0) {
        this.queryParams.status = this.queryParams.status2.join(',');
      }

      if (this.queryParams.status2) {
        if (this.queryParams.status2.length == 0) {
          this.queryParams.status = null;
        }
      }

      projectList(newqp ? newqp : this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    chooseDownF() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'downForm';
      //
      this.$nextTick(() => {
        this.$refs.downForm.$off('getChoose', this.getDownF);
        this.$refs.downForm.$on('getChoose', this.getDownF);
        this.$refs.downForm.$on('closeChoose', this.closeChoose);
      }, 500);
      this.$refs.downForm.clearSel();
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    getDownF(data) {
      this.dialogTableVisible = false;
      projExport(data);
      // if (data) {
      //   let url =
      //     process.env.VUE_APP_BASE_API +
      //     '/project/project/export' +
      //     (this.queryParams ? '?' + tansParams(data) : null);
      //   let newurl = url.substr(0, url.length - 1);
      //   window.location.href = newurl;
      // }
    },

    //选择区域的值
    areaChange(value) {
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.queryParams.areaProvince = '';
        this.queryParams.areaCity = '';
        this.queryParams.areaRegion = '';
      } else {
        const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes();
        // console.log(checkedNodes); // 获取当前点击的节点
        // console.log(checkedNodes[0].data.label); // 获取当前点击的节点的label
        // console.log(checkedNodes[0].pathLabels); // 获取由 label 组成的数组
        this.queryParams.areaProvince = checkedNodes[0].pathLabels[0]
          ? checkedNodes[0].pathLabels[0]
          : '';
        this.queryParams.areaCity = checkedNodes[0].pathLabels[1]
          ? checkedNodes[0].pathLabels[1]
          : '';
        this.queryParams.areaRegion = checkedNodes[0].pathLabels[2]
          ? checkedNodes[0].pathLabels[2]
          : '';
      }
    },

    //自动进度条颜色
    customColorMethod(percentage) {
      if (percentage < 30) {
        return '#909399';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else if (percentage < 100) {
        return '#409eff';
      } else {
        return '#2FD052';
      }
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.$router.push({ path: '/project-d/projectCheck', query: null });
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.$router.push({ path: '/project-d/projectCheck', query: null });
      this.area = [];
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
      // let ct = [];
      // this.chooseItems.forEach((element) => {
      //   ct.push(element.id);
      // });
      //projectDelete(ct.join(',')).then((res) => {
      projectDelete(row.id).then((res) => {
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
    async TerminatedT(row) {
      if (!(await this.commonFun.sureDialog('是否确定中止？'))) {
        return;
      }
      projectTermination(row.id).then((res) => {
        if (res.code == 200) {
          this.$message.success(`中止成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`中止失败`);
        }
      });
    },

    //导出
    exportT() {
      this.chooseDownF();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: '/project-d/projectInfo',
        query: { id: row.id, name: row.prjName, prjNumber: row.prjNumber },
      });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/project-d/projectEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/project-d/projectAdd' });
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
      .el-cascader,
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
.el-tag {
  white-space: normal;
  height: 50px;
  width: 50px;
}
</style>
