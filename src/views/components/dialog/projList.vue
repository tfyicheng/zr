<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['project:project:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.prjNumber"
                :maxlength="commonFun.inputMax"
                placeholder="项目编号"
                clearable
              ></el-input>
            </div>
            <div class="p1item">
              <el-input
                v-model="queryParams.prjName"
                :maxlength="commonFun.inputMax"
                placeholder="项目名称"
                clearable
              ></el-input>
            </div>
            <div class="p1item">
              <el-input
                v-model="queryParams.clientName"
                :maxlength="commonFun.inputMax"
                placeholder="客户名称"
                clearable
              ></el-input>
            </div>
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
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="状态" clearable>
                <el-option
                  v-for="item in dict.type.project_status"
                  :key="item.value"
                  :label="item.label"
                  :value="Number(item.value)"
                >
                </el-option>
              </el-select>
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
                <span v-for="c in chooseItemss" :key="c.index">{{ c.prjName }}</span>
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
              max-height="420"
              ref="multipleTable"
              row-key="id"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="prjName" label="项目名称"> </el-table-column>
              <el-table-column label="项目类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_type"
                    :value="scope.row.prjType"
                  />
                </template>
              </el-table-column>
              <!-- 项目状态 -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_status"
                    :value="scope.row.status"
                  />
                </template>
              </el-table-column>
              <el-table-column label="项目进度">
                <template slot-scope="scope">
                  <el-progress
                    :percentage="scope.row.progress"
                    :color="customColorMethod"
                    :show-text="false"
                  ></el-progress>
                </template>
              </el-table-column>
              <el-table-column prop="clientName" label="客户"> </el-table-column>
              <el-table-column prop="prjLeader" label="项目负责人"> </el-table-column>
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
import { projectList } from '@/api/data/project';
export default {
  name: 'ProjList', //选择项目列表
  dicts: ['project_status', 'project_type'],
  props: {
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
    status: [String, Object, Number],
  },
  data() {
    return {
      title: '选择项目',
      options: [],
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [
        {
          id: '1', //ID
          prjNumber: '1753229808014807040', //项目编号
          prjName: '项目名称', //项目名称
          clientName: '广州xxxfds有限科技f公f司', //客户
          prjLeader: '丁九', //项目负责人
          prjType: 0, //项目类型
          status: 0, //状态
          progress: 0, //进度
        },
      ], //表格数据
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
        status: null, //状态    选择项目只能选执行中，默认选择进行中，查询条件去掉
        areaProvince: null, //区域省
        areaCity: null, //区域市
        areaRegion: null, //区域县(区)
        // 日期范围
        startTime: null,
        endTime: null,
        //placeholder: '', //关键字
      },
    };
  },

  created() {
    this.getList();
  },

  mounted() {},
  methods: {
    //加载列表
    getList() {
      //this.queryParams.status = 0;
      if (this.status != null) {
        this.queryParams.status = this.status;
      }
      projectList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        //异步回显处理 watch中处理的时候table暂无数据
        // let resdata = JSON.parse(JSON.stringify(response.data));
        //let resdata2 = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        // this.tableData = [];
        // response.rows.forEach((item, index) => {
        //   this.tableData.push(item);
        //   for (let i = 0; i < resdata2.length; i++) {
        //     if (resdata2[i].id == item.id) {
        //       this.$refs.multipleTable.toggleRowSelection(item);
        //       if (!this.chooseItemss.includes(item)) {
        //         this.chooseItemss.push(item);
        //       }
        //     }
        //   }
        // });
        this.loading = false;
      });
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

    //添加项
    addItem() {
      this.$router.push({ path: '/project-d/projectAdd' });
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
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
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
