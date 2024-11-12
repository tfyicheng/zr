<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['contract:propertyBuy:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
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
              <el-input
                v-model="queryParams.applyUser"
                :maxlength="commonFun.inputMax"
                placeholder="申请人"
                clearable
              ></el-input>
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

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button class="graybtn" @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.contName }}</span>
              </span>
              <span class="p2choosed" @click="clearSel">清空</span>
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
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <el-table-column prop="deptName" label="采购部门"> </el-table-column>
              <el-table-column prop="leader" label="合同负责人"> </el-table-column>
              <el-table-column prop="totalAmount" label="总金额"> </el-table-column>
              <el-table-column prop="supplierName" label="供应商"> </el-table-column>
              <el-table-column prop="contacts" label="联系人"> </el-table-column>
              <!-- 合同状态 -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.contract_status"
                    :value="scope.row.status"
                  />
                  <!-- <span v-if="scope.row.status === 0" style="color: #409eff">{{
                    dict.type.contract_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
                    dict.type.contract_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 2" style="color: #ffba00">{{
                    dict.type.contract_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 3" style="color: red">{{
                    dict.type.contract_status[scope.row.status].label
                  }}</span> -->
                </template>
              </el-table-column>
              <!-- <el-table-column type="selection" width="55" reserve-selection />
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
              <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0" style="color: #409eff">执行中</span>
                  <span v-else-if="scope.row.status === 2" style="color: #07c15f">已完成</span>
                  <span v-else-if="scope.row.status === 3" style="color: #ff6161">已终止</span>
                  <span v-else style="color: #ffba00">已过期</span>
                </template>
              </el-table-column> -->
              <!-- <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                  <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >变更</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleSheet(scope.row)"
                    style="font-size: 14px"
                    >任务单</el-button
                  >
                </template>
              </el-table-column>-->
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

          <div class="p4">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import { purchaseContList } from '@/api/data/contract';
export default {
  name: 'AcontList', //选择资产采购合同列表
  props: {
    type: null, //合同类型
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  dicts: ['contract_status'],
  data() {
    return {
      title: '选择资产采购合同',
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      depts: [], //部门项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        contName: '', //合同名称
        applyUser: '', //申请人
        status: '', //状态
        applyDeptId: null, //申请人部门ID
      },
    };
  },
  created() {
    this.getList();
    this.getDeptList();
  },

  mounted() {},
  methods: {
    //加载合同列表
    getList() {
      console.log(this.queryParams);
      purchaseContList(this.queryParams).then((response) => {
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

    //添加项
    addItem() {
      this.$router.push({ path: '/data-d/fixedAssetsPCAdd' });
      this.goback();
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.getList();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItemss = [];
      rows.forEach((element) => {
        this.chooseItemss.push(element);
      });
    },

    //清空选中
    clearSel() {
      this.chooseItemss = [];
      this.$refs.multipleTable.clearSelection();
    },

    //保存
    save() {
      if (!this.Multiple) {
        if (this.chooseItemss.length > 1) {
          this.$modal.msgError('请勿选择多项数据');
          this.clearSel();
        } else {
          this.$emit('getChoose', this.chooseItemss);
          this.queryParams = { pageNum: 1, pageSize: 10 };
        }
      } else {
        this.$emit('getChoose', this.chooseItemss);
        this.queryParams = { pageNum: 1, pageSize: 10 };
      }
    },

    //返回
    goback() {
      this.$emit('closeChoose');
      this.queryParams = { pageNum: 1, pageSize: 10 };
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.appc {
  .top {
    font-family: Alibaba PuHuiTi 2;
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    letter-spacing: 0em;
    text-align: left;
    margin: 10px;
  }
  .top::before {
    content: '\00a0 ';
    border-left: 3px solid #4da0ff;
    margin-right: 5px;
  }
  i {
    float: right;
    cursor: pointer;
    font-weight: 700;
    font-size: 30px;
  }
  .main {
    background: #fff;
    border-radius: 4px;
    ::v-deep .el-input__inner {
      border-color: #c0c4cc;
    }
    .p1 {
      position: relative;
      display: inline-block;
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        width: 270px;
        height: 50px;
        .el-input,
        .el-date-editor,
        .el-select {
          margin: 10px 10px 0 10px;
          width: 240px;
          height: 40px;
        }
        .el-button {
          margin: 11px;
          width: 100px;
          border: 0px;
        }
        .el-button ~ .graybtn {
          background: #f3f4f8;
        }
      }
    }

    .p2 {
      margin: 15px;
      width: 98%;
      .el-button {
        margin: 20px 20px 20px 0px;
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
          width: 80%;
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
      margin-bottom: 0px;
      .pagination-container {
        margin-bottom: 0px;
        .el-pagination {
          margin: 15px;
          margin-top: 20px;
          text-align: right;
          padding-bottom: 0px;
        }
      }
    }

    .p4 {
      margin: 0px 15px;
      width: 98%;

      .el-button {
        border: 0;
        margin: 20px 20px 20px 0px;
        width: 100px;
        border-radius: 4px;
      }
      .el-button:first-child {
        background: #f3f4f8;
      }
    }
  }

  ::v-deep .popperClass {
    position: absolute !important;
  }
}
</style>
