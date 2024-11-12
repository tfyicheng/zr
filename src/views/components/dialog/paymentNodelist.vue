<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
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
              row-key="userId"
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
                    v-if="type === 0"
                    :flag="false"
                    :options="dict.type.in_node_status"
                    :value="scope.row.status"
                  />
                  <dict-tag
                    v-else
                    :flag="false"
                    :options="dict.type.out_node_status"
                    :value="scope.row.status"
                  />
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
</template>

<script>
import { paymentNodeList, outContNodeList } from '@/api/data/contract';
export default {
  name: 'PaymentNodeList', //收付款节点
  dicts: ['in_node_status', 'out_node_status'],
  props: {
    type: null, //节点类型  0 是项目合同 (收款) 1是外委合同（付款）
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
    id: {
      type: String,
      default: null,
    }, //合同编号   根据合同编号去查关联的收付款节点
  },
  data() {
    return {
      title: '选择节点',
      options: [],
      loading: false, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [
        // {
        //   id: '13', //节点ID
        //   amount: 2000, //金额
        //   nodeName: '节点名称1', //节点名称
        //   period: '1', //期次
        //   ratio: 10, //比例
        //   status: 0, //状态
        // },
        // {
        //   id: '14', //节点ID
        //   amount: 2070, //金额
        //   nodeName: '节点名称2', //节点名称
        //   period: '2', //期次
        //   ratio: 10.35, //比例
        //   status: 0, //状态
        // },
        // {
        //   id: '15', //节点ID
        //   amount: 2070, //金额
        //   nodeName: '节点名称3', //节点名称
        //   period: '2', //期次
        //   ratio: 10.35, //比例
        //   status: 0, //状态
        // },
      ], //表格数据
    };
  },

  created() {
    this.Init();
  },

  mounted() {},
  methods: {
    //初始化界面
    Init() {
      this.title = this.type == 0 ? '选择收款节点' : '选择付款节点';
      this.getList();
    },

    //加载列表
    getList() {
      console.log('查询节点id', this.id);
      if (this.type == 0) {
        if (this.id) {
          paymentNodeList(this.id).then((response) => {
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
        }
      } else {
        if (this.id) {
          outContNodeList(this.id).then((response) => {
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
        }
      }
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
// .appo {
//   overflow: auto;
//  .appi {
//   padding: 20px;
//   min-width: 1220px;
//  }
// }
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
    margin-top: 40px;
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

  ::v-deep .popperClass {
    position: absolute !important;
  }
}
</style>
