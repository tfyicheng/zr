<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '客户管理', '客户列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input v-model="queryParams.name" placeholder="客户名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-select v-model="queryParams.type" placeholder="客户类型" clearable>
                <el-option
                  v-for="item in dict.type.client_type"
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

          <div class="p2">
            <el-button v-hasPermi="['produce:client:add']" type="primary" @click="addC"
              >添加</el-button
            >
            <el-button
              v-hasPermi="['produce:client:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              >删除</el-button
            >
            <div class="p2choose" style="display: none">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
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
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="name" label="客户名称"> </el-table-column>
              <el-table-column label="客户类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.client_type"
                    :value="scope.row.clientType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="telephone" label="联系号码"> </el-table-column>
              <el-table-column prop="mailAddr" label="邮寄地址"> </el-table-column>
              <el-table-column prop="addr" label="联系地址"> </el-table-column>
              <el-table-column prop="updateTime" label="最近一次修改时间"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['produce:client:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['produce:client:edit']"
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
import { custList, custDelete } from '@/api/data/customer';
export default {
  name: 'CustomerManagementCheck', //客户管理-查看
  dicts: ['client_type'],
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: '', //客户名称
        type: '', //客户类型
        startTime: '',
        endTime: '',
      },
      input: '',
      dialogTableVisible: false,
      multipleSelection: [],
      fileview: '', //文件预览地址
    };
  },

  created() {
    this.getList();
  },

  mounted() {},

  methods: {
    //查询列表
    getList() {
      if (this.$route.query.year != null) {
        this.queryParams.startTime = this.$route.query.year[0];
        this.queryParams.endTime = this.$route.query.year[1];
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      if (this.$route.query.type != null) {
        this.queryParams.type = this.$route.query.type;
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      console.log(this.queryParams);
      custList(this.queryParams).then((response) => {
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

    //删除
    async deleteT(row) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      let params = [];
      this.chooseItems.forEach((element) => {
        params.push(element.id);
      });
      custDelete(params.join(',')).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
      this.$refs.multipleTable.clearSelection();
      this.getList();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: '/production-d/customerManagementInfo',
        query: { id: row.id },
      });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/production-d/customerManagementEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/production-d/customerManagementAdd' });
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
    }
  }
}
</style>
