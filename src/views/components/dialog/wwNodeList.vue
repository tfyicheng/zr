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
              @click="chooseCont(c.id)"
            >
              <svg-icon icon-class="filelogo" />

              <span :style="c.id == contId ? 'color:#409EFF;' : 'color: #333333;'">{{
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
                    <span v-for="c in chooseItemss" :key="c.index">{{ c.nodeName }}</span>
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
                  <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
                </el-table-column> :checked="chooseItems.includes(userName)":checked="iscludes(row)" -->
                  <el-table-column type="selection" width="55" reserve-selection />
                  <el-table-column prop="id" label="ID"> </el-table-column>
                  <el-table-column prop="period" label="期次"> </el-table-column>
                  <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
                  <el-table-column prop="amount" label="金额（元）"> </el-table-column>
                  <el-table-column prop="ratio" label="比例"> </el-table-column>
                  <el-table-column label="状态">
                    <template slot-scope="scope">
                      <dict-tag
                        :flag="false"
                        :options="dict.type.out_node_status"
                        :value="scope.row.status"
                      />
                      <!-- <span v-if="scope.row.status === 0" style="color: #999999">等待收款</span>
                      <span v-else-if="scope.row.status === 1" style="color: #ffba00"
                        >部分收款</span
                      >
                      <span v-else-if="scope.row.status === 2" style="color: #409eff">可收款</span>
                      <span v-else style="color: #07c15f">已收款</span> -->
                    </template>
                  </el-table-column>
                </el-table>

                <!-- <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNum"
              @pagination="getList"
            /> -->
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
    </div>
  </div>
</template>

<script>
import { paymentNodeList, outContNodeList } from '@/api/data/contract';
import { proContList } from '@/api/data/project';

export default {
  name: 'WwNodeList', //外委合同付款节点
  dicts: ['out_node_status'],
  props: {
    //type: null, //节点类型  0 是项目合同 (收款) 1是外委合同（付款）
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
    //id: '', //合同编号
    prjNumber: null, //项目编号
  },
  data() {
    return {
      title: '选择外委合同付款节点',
      options: [],
      loading: false, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [], //表格数据
      //inputTipWidth: this.commonFun.inputTipWidth,
      inputTipWidth: 270,
      contlist: [], //合同列表
      contId: '', //当前选择合同的id
    };
  },

  created() {
    this.getList();
  },

  mounted() {},
  methods: {
    //获取选择的合同id
    chooseCont(val) {
      this.contId = val;
      this.loading = true;
      this.getDate();
    },

    //先加载合同
    getList() {
      proContList(this.prjNumber, 1).then((response) => {
        this.contlist = response.data;
        if (this.contlist.length > 0) {
          this.contId = this.contlist[0].id;
          this.getDate();
        }
      });
    },

    //加载列表
    getDate() {
      outContNodeList(this.contId).then((response) => {
        this.tableData = response.rows;
        //this.total = response.total;
        //异步回显处理 watch中处理的时候table暂无数据
        // let resdata = JSON.parse(JSON.stringify(response.data));
        let resdata2 = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        this.tableData = [];
        response.data.paymentNodes.forEach((item, index) => {
          this.tableData.push(item);
          for (let i = 0; i < resdata2.length; i++) {
            if (resdata2[i].id == item.id) {
              // this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(item);
              if (!this.chooseItemss.includes(item)) {
                this.chooseItemss.push(item);
              }
              //});
            }
          }
        });
        this.loading = false;
      });
    },

    // /** 搜索按钮操作 */
    // handleQuery() {
    //   this.queryParams.pageNum = 1;
    //   this.getList();
    // },

    // /** 重置按钮操作 */
    // resetQuery() {
    //   this.queryParams = { pageNum: 1, pageSize: 10 };
    //   this.getList();
    // },

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
      this.queryParams = { pageNum: 1, pageSize: 10 };
      //this.clearSel();
    },
  },
  watch: {
    // id: {
    //   handler(val) {
    //     if (val) {
    //       console.log('获取参数:' + val);
    //       this.getList();
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
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

  ::v-deep .popperClass {
    position: absolute !important;
  }
}
</style>
