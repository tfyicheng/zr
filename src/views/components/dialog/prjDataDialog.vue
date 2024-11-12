<template>
  <el-dialog :visible.sync="visible" top="25vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['project:data:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

            <div class="p1item">
              <el-input v-model="queryParams.dataName" placeholder="资料名称" clearable></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.fileType" placeholder="资料类型" clearable>
                <el-option
                  v-for="item in dict.type.project_plan"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.prjPhase" placeholder="项目阶段" clearable>
                <el-option
                  v-for="item in dict.type.file_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-date-picker
                v-model="queryParams.prjYear"
                type="year"
                placeholder="选择年份"
                clearable
                value-format="yyyy"
              >
              </el-date-picker>
            </div>

            <!-- <div class="p1item">
              <el-input v-model="queryParams.userName" placeholder="人员名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-select
                v-model="queryParams.jobState"
                placeholder="状态" clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
              >
                <el-option
                  v-for="item in dict.type.user_job_status"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div> -->

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
              row-key="userId"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="prjName" label="项目名称"> </el-table-column>

              <el-table-column label="项目阶段">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan"
                    :value="scope.row.prjPhase"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="dataNumber" label="资料编号"> </el-table-column>
              <el-table-column prop="dataName" label="资料名称"> </el-table-column>
              <el-table-column label="资料类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.file_type"
                    :value="scope.row.fileType"
                  />
                </template>
              </el-table-column>

              <el-table-column prop="prjYear" label="年份"> </el-table-column>
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
  </el-dialog>
</template>

<script>
import { prjDataListCheck } from '@/api/data/project';
import { listDept } from '@/api/system/dept';
import { listPost } from '@/api/system/post';
export default {
  name: 'PrjDataList', //选择项目资料
  dicts: ['file_type', 'project_plan'],
  props: {
    type: {
      type: Number,
      default: 0,
    }, //选择类型，
    value: [String, Object, Array],
    id: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '选择项目资料',
      // 遮罩层
      visible: false,
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        //placeholder: '', //关键字
      },
    };
  },

  created() {
    this.getList();
  },

  methods: {
    // 显示弹框
    show() {
      this.visible = true;
      this.getList();
    },

    //保存
    save() {
      if (!this.Multiple) {
        if (this.chooseItemss.length > 1) {
          this.$modal.msgError('请勿选择多项数据');
          this.clearSel();
        } else {
          this.visible = false;
          this.$emit('getChoose', this.chooseItemss);
          this.queryParams = { pageNum: 1, pageSize: 10 };
        }
      } else {
        this.visible = false;
        this.$emit('getChoose', this.chooseItemss);
        this.queryParams = { pageNum: 1, pageSize: 10 };
      }
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
    },

    //加载列表
    getList() {
      this.queryParams.prjId = this.id;
      if (this.queryParams.prjId == null) {
        return;
      }
      prjDataListCheck(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //添加项
    addItem() {
      this.$router.push({ path: '/data-d/projectDataAdd' });
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
      try {
        this.chooseItemss = [];
        this.$refs.multipleTable.clearSelection();
      } catch (error) {}
    },

    //返回
    goback() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mbody {
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
  }
}
</style>
