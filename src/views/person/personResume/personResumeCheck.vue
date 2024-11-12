<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '履职经历管理', '履职经历列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input v-model="queryParams.userName" placeholder="用户名称" clearable></el-input>
            </div>
            <!-- <div class="p1item">
              <el-input v-model="queryParams.certName" placeholder="合同名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-input v-model="queryParams.certName" placeholder="人员名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-select v-model="queryParams.certType" placeholder="状态" clearable>
                <el-option
                  v-for="item in dict.type.cert_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>-->
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
            </div>  -->
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button v-hasPermi="['person:work:add']" type="primary" @click="addC"
              >添加</el-button
            >
            <!-- <el-button type="warning" @click="addC" :disabled="chooseItems.length == 0"
              >导出</el-button
            > -->
            <el-button
              v-hasPermi="['person:work:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              >删除</el-button
            >
            <!-- <div class="p2choose">
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
            >
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="userName" label="用户名称"> </el-table-column>
              <el-table-column prop="startDate" label="开始时间"> </el-table-column>
              <el-table-column prop="endDate" label="结束时间"> </el-table-column>
              <el-table-column prop="unitName" label="单位名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门"> </el-table-column>
              <el-table-column prop="postName" label="职位"> </el-table-column>
              <el-table-column prop="certifier" label="证明人"> </el-table-column>
              <!-- <el-table-column prop="certNumber" label="合同编号"> </el-table-column>
              <el-table-column prop="certName" label="证书名称"> </el-table-column>
              <el-table-column label="证书种类">
                <template slot-scope="scope">
                  {{
                    dict.type.cert_type[scope.row.certType]
                      ? dict.type.cert_type[scope.row.certType].label
                      : ''
                  }}
                </template>
              </el-table-column>
              <el-table-column label="证书预览">
                  <template slot-scope="scope">
                  <el-popover
                    v-if="scope.row.files && scope.row.files.length > 1"
                    trigger="hover"
                    placement="top"
                  >
                    <ul style="padding: 0px; margin: 0px 5px; list-style-type: none">
                      <li
                        @click="preview([c])"
                        style="cursor: hand"
                        v-for="c in scope.row.files"
                        :key="c.index"
                      >
                        <svg-icon icon-class="file" />
                        <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                      </li>
                    </ul>
                    <div slot="reference" class="name-wrapper">
                      <el-link type="primary" :underline="false" size="medium">{{
                        scope.row.files && scope.row.files.length > 0
                          ? scope.row.files[0].originalName
                          : null
                      }}</el-link>
                    </div>
                  </el-popover>

                  <el-link
                    v-else
                    type="primary"
                    :underline="false" @click="preview(scope.row.files)">
                    {{
                      scope.row.files && scope.row.files.length > 0
                        ? scope.row.files[0].originalName
                        : null
                    }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="authority" label="颁发机构"> </el-table-column>
              <el-table-column prop="issueDate" label="颁发时间"> </el-table-column>
              <el-table-column prop="userName" label="用户"> </el-table-column>
              <el-table-column prop="deptName" label="组织"> </el-table-column> -->
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['person:work:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['person:work:edit']"
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

          <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
            <iframe width="100%" height="100%" :src="fileview"></iframe>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { workList, workDelete } from '@/api/data/person';
export default {
  name: 'PersonResumeCheck', //查看履职经历
  //dicts: ['certificate_category', 'cert_type'],
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      //联动类
      certChildTypes: [],
      certGrandsonTypes: [],
      // 日期范围
      beginTime: '',
      endTime: '',
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: '', //
        startTime: null,
        endTime: null,
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
      console.log(this.queryParams);
      workList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //附件判断预览
    filePreview(row) {
      if (Array.isArray(row)) {
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            if (
              this.commonFun.limitFt.includes(
                row[i].originalName.substr(row[i].originalName.lastIndexOf('.') + 1),
              )
            ) {
              return row[i].originalName;
            }
          }
          return '';
        } else {
          return '';
        }
      }
    },

    //预览  先处理可以预览的文件
    preview(row) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + row[0].annexId;
      }, 200);

      this.dialogTableVisible = true;
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.dateRange2 = [];
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
      workDelete(params.join(',')).then((res) => {
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
      this.$router.push({ path: '/person-d/personResumeInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/person-d/personResumeEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/person-d/personResumeAdd' });
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
          width: 100%;
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
