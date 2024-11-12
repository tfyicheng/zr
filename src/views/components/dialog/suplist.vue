<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['property:supplier:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.supplierName"
                placeholder="供应商名称"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.unitLeader"
                placeholder="供应商联系人"
                clearable
              ></el-input>
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
                <span v-for="c in chooseItemss" :key="c.index">{{ c.supplierName }}</span>
              </span>
              <span class="p2choosed" @click="clearSel">清空</span>
            </div>
          </div>

          <div class="p3">
            <!-- row-key="id"  row-key设置null不展开行-->
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="420"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="supplierId" label="Id"> </el-table-column>
              <el-table-column prop="supplierName" label="供应商名称"> </el-table-column>
              <el-table-column prop="addr" label="供应商地址"> </el-table-column>
              <!-- <el-table-column prop="unitLeader" label="联系人"> </el-table-column>
              <el-table-column prop="unitLeaderPhone" label="联系电话"> </el-table-column> -->
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
import { supplierList } from '@/api/data/asset';
export default {
  name: 'SupList', //选择供应商列表
  props: {
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '选择供应商',
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [{}], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        supplierName: '',
        unitLeader: '',
        //deptId: 0,
        // postId: 0,
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
      supplierList(this.queryParams).then((response) => {
        this.loading = false;
        this.tableData = response.data;
        //this.total = response.total;
        //异步回显处理 watch中处理的时候table暂无数据
        // let resdata = JSON.parse(JSON.stringify(response.data));
        let resdata2 = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        this.tableData = [];
        response.rows.forEach((item, index) => {
          this.tableData.push(item);
          for (let i = 0; i < resdata2.length; i++) {
            if (resdata2[i].supplierId == item.supplierId) {
              // this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(item);
              if (!this.chooseItemss.includes(item)) {
                this.chooseItemss.push(item);
              }
              //});
            }
          }
        });
      });
    },

    addItem() {
      this.$router.push({ path: '/purchase-d/supplierAdd' });
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
