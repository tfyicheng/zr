<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>

        <div class="body">
          <div class="bodyl">
            <div
              class="bodyli"
              v-for="(c, index) in contlist"
              :key="index"
              style="cursor: pointer"
              @click="chooseCont(c)"
            >
              <svg-icon icon-class="filelogo" />

              <span :style="c.uid == uid ? 'color:#409EFF;' : 'color: #333333;'">{{
                c.contName
              }}</span>
            </div>
          </div>
          <div class="bodyr">
            <div class="main">
              <div class="p2">
                <div class="p2choose">
                  <span>已选择</span>
                  <span class="p2chooses">
                    <span v-for="c in chooseItemss" :key="c.index">{{ c.planName }}</span>
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
                >
                  <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
                </el-table-column> :checked="chooseItems.includes(userName)":checked="iscludes(row)" -->
                  <el-table-column type="selection" width="55" reserve-selection />
                  <el-table-column prop="planName" label="计划名称"> </el-table-column>
                  <el-table-column prop="distribution" label="阶段比例"> </el-table-column>
                  <el-table-column prop="planDesc" label="计划描述"> </el-table-column>
                  <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
                </el-table>

                <div style="height: 10px"></div>
              </div>

              <div class="p4">
                <el-button @click="goback">返回</el-button>
                <el-button type="primary" @click="save">保存</el-button>
              </div>
            </div>
          </div>
        </div>

        <div class="main" v-if="false">
          <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.planName }}</span>
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
              <!-- <el-table-column prop="id" label="Id"> </el-table-column> -->
              <el-table-column prop="planName" label="计划名称"> </el-table-column>
              <el-table-column prop="planDesc" label="计划说明"> </el-table-column>
              <el-table-column prop="weight" label="权重"> </el-table-column>
              <el-table-column prop="startDate" label="开始时间"> </el-table-column>
              <el-table-column prop="endDate" label="结束时间"> </el-table-column>
              <el-table-column label="节点名称">
                <template slot-scope="scope">
                  {{ ShowNode(scope.row.nodeList) }}
                  <!-- {{
                    ShowNode(scope.row.nodeList)
                    // dict.type.project_scale[scope.row.nodeList]
                    //   ? dict.type.project_scale[scope.row.meterId].label
                    //   : ''
                  }} -->
                </template>
              </el-table-column>
            </el-table>

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
import { projContPlanList, projPlan } from '@/api/data/project';
export default {
  name: 'PlanList', //选择计划节点
  dicts: ['project_scale'],
  props: {
    id: null,
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '选择计划节点',
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [], //表格数据
      contlist: [],
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        materialName: '',
        manufacturer: '',
        //placeholder: '', //关键字
      },
      uid: null,
    };
  },

  created() {
    this.getList();
  },

  mounted() {},
  methods: {
    //加载列表
    getList() {
      // console.log(this.id);
      // projContPlanList(this.id).then((response) => {
      //   this.loading = false;
      //   this.tableData = response.data;
      // });

      projPlan(this.id).then((response) => {
        if (response.code == 200) {
          this.contlist = response.data.map((c) => {
            return { uid: Math.floor(Math.random() * 100) + 1, ...c };
          });
          if (this.contlist.length > 0) {
            this.chooseCont(this.contlist[0]);
          }
          console.log(this.contlist);
        }
      });
    },

    //获取选择的合同id
    chooseCont(val) {
      // this.tableData = val.panList.map((c) => {
      //   return { ...c, nodeType: val.type };
      // });
      this.tableData = val.panList;
      this.uid = val.uid;
    },

    ShowNode(arr) {
      let str = '';
      if (arr && arr.length > 0) {
        arr.forEach((item) => {
          str += item.nodeName;
        });
      }
      return str;
    },

    addItem() {
      this.$router.push({ path: '/purchase-d/assetInAdd' });
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
        }
      } else {
        this.$emit('getChoose', this.chooseItemss);
      }
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
    },

    //返回
    goback() {
      this.$emit('closeChoose');
    },
  },
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

  .body {
    display: flex;
    .bodyl {
      border-right: 1px solid #e4e6ed;
      margin-top: 10px;
      margin: 0 10px;
      padding-right: 10px;
      min-width: 270px;
      max-width: 270px;
      max-height: 650px;
      overflow: auto;
      .bodyli {
        line-height: 16px;
        margin: 10px 0;
        font-size: 16px;
        svg {
          margin-right: 3px;
        }
      }
    }
    .bodyr {
      flex: 1;
      .main {
        background: #fff;
        border-radius: 4px;
        margin-top: 20px;
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
            .el-button:last-child {
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

  .main {
    background: #fff;
    border-radius: 4px;
    .p1 {
      // background: red;
      position: relative;
      /// float: left;
      display: inline-block;
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        // background: pink;
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
