<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '收款节点管理', '收款节点列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input v-model="queryParams.certName" placeholder="合同名称" clearable></el-input>
            </div>

            <div class="p1item">
              <el-input v-model="queryParams.prjName" placeholder="项目名称" clearable></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.status" placeholder="状态" clearable>
                <el-option
                  v-for="item in dict.type.in_node_status"
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
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="contName" label="合同名称"> </el-table-column>
              <el-table-column prop="prjName" label="项目名称"> </el-table-column>
              <!-- 收款节点状态 -->
              <!-- <el-table-column label="状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0" style="color: #666666">{{
                    dict.type.in_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
                    dict.type.in_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 2" style="color: red">{{
                    dict.type.in_node_status[scope.row.status].label
                  }}</span>
                  <span v-else-if="scope.row.status === 3" style="color: #fac06a">{{
                    dict.type.in_node_status[scope.row.status].label
                  }}</span>
                </template>
              </el-table-column> -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <!-- 合同状态 -->
                  <!-- <span v-if="scope.row.children && scope.row.children.length > 0"> -->
                  <span v-if="scope.row.children != null">
                    <dict-tag
                      :flag="false"
                      :options="dict.type.contract_status"
                      :value="scope.row.status"
                    />
                  </span>
                  <!-- 收款节点状态-->
                  <span v-else>
                    <dict-tag
                      :flag="false"
                      :options="dict.type.in_node_status"
                      :value="scope.row.status"
                    />
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="amount" label="金额"> </el-table-column>
              <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
              <el-table-column prop="period" label="期次"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <!-- <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  > -->
                  <el-button
                    v-hasPermi="['contract:payment0:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { incomeNodeList } from '@/api/data/contract';
export default {
  name: 'IncomeNodeCheck', //查看收款节点
  dicts: ['in_node_status', 'contract_status'],
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        // 日期范围
        startTime: '',
        endTime: '',
        contName: '', //合同名称
        prjName: '', //项目名称
        status: '', //状态
      },
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表

    getList() {
      if (this.$route.query.status != null) {
        this.queryParams.status = this.$route.query.status;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      incomeNodeList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItems = [];
      this.chooseItems = Array.from(new Set(rows));
    },

    // //查看
    // handleCheck(row) {
    //   console.log(row);
    //   this.$router.push({ path: '/production-d/incomeNodeInfo', query: { id: row.id } });
    // },

    //编辑
    handleEdit(row) {
      let data = null;
      //遍历整个table数据
      this.tableData.forEach((item) => {
        //判断该行是否有子节点
        if ('children' in item) {
          //遍历子节点
          item.children.forEach((item2) => {
            //判断该节点是否为我点击的节点
            if (item2 == row) {
              data = item;
            }
          });
        }

        if (data) {
          this.$router.push({
            path: '/production-d/incomeNodeEdit',
            query: { id: data.id },
          });
        } else {
          this.$router.push({
            path: '/production-d/incomeNodeEdit',
            query: { id: row.id },
          });
        }
      });
    },

    // //添加
    // addC() {
    //   this.$router.push({ path: '/production-d/incomeNodeAdd' });
    // },
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
.appo {
  overflow: auto;
  .appi {
    margin: 20px;
    min-width: 1220px;
    .appc {
      .top {
        font-family: Alibaba PuHuiTi 2;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }
      .top::before {
        content: '\00a0 ';
        border-left: 3px solid #4da0ff;
        margin-right: 5px;
      }
      .main {
        background: #fff;
        border-radius: 4px;
        .p1 {
          position: relative;
          display: inline-block;
          padding-bottom: 10px;
          width: 100%;
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
    }
  }
}
</style>
