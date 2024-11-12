<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '项目资料管理', '项目资料列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input v-model="queryParams.dataName" placeholder="资料名称" clearable></el-input>
            </div>

            <div class="p1item">
              <el-input v-model="queryParams.prjName" placeholder="项目名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-input v-model="queryParams.prjNumber" placeholder="项目编号" clearable></el-input>
            </div>

            <div class="p1item">
              <el-select v-model="queryParams.prjPhase" placeholder="项目阶段" clearable>
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
              <el-select multiple collapse-tags v-model="prjType" placeholder="资料类型" clearable>
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
            <el-button v-hasPermi="['project:data:add']" type="primary" @click="addC"
              >添加</el-button
            >
            <!-- <el-button type="warning" @click="addC" :disabled="chooseItems.length == 0">导出</el-button> -->
            <!-- <el-button
              v-hasPermi="['project:data:remove']"
              type="danger"
              @click="deleteT"
              :disabled="chooseItems.length == 0"
              >删除</el-button
            > -->

            <!-- <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItems" :key="c.index">{{ c.certName }}</span>
              </span>
              <span class="p2choosed" :disabled="chooseItems.length == 0">导出</span>
            </div>  -->
          </div>

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :data="tableData"
              :cell-style="{ textAlign: 'left' }"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="prjName" label="项目名称"> </el-table-column>
              <el-table-column label="资料类型">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.file_type"
                    :value="scope.row.fileType"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column label="预览">
                <template slot-scope="scope">
                  <el-button type="text" @click="preview(scope.row.files)">{{
                    filePreview(scope.row.files)
                  }}</el-button>
                </template>
              </el-table-column> -->
              <el-table-column prop="dataNumber" label="资料编号"> </el-table-column>
              <el-table-column prop="dataName" label="资料名称"> </el-table-column>
              <el-table-column label="项目阶段">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan"
                    :value="scope.row.prjPhase"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column prop="areaProvince" label="区域"> </el-table-column> -->
              <el-table-column label="预览" width="200" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-popover
                    v-if="scope.row.files && scope.row.files.length > 0"
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
                    :underline="false"
                    @click="preview(scope.row.files)"
                  >
                    {{
                      scope.row.files && scope.row.files.length > 0
                        ? scope.row.files[0].originalName
                        : null
                    }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column prop="prjYear" label="年份"> </el-table-column>
              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <el-button
                    v-show="scope.row.children != null"
                    v-hasPermi="['project:data:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-show="scope.row.children == null && scope.row.canEditOrDel"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >

                  <el-button
                    v-show="scope.row.canEditOrDel"
                    type="text"
                    size="small"
                    @click="deleteT(scope.row)"
                    style="font-size: 14px; color: red"
                    >删除</el-button
                  >

                  <el-button
                    v-show="scope.row.canDown"
                    type="text"
                    size="small"
                    @click="Output(scope.row)"
                    style="font-size: 14px"
                    >导出</el-button
                  >

                  <el-button
                    v-show="!scope.row.canDown && scope.row.children == null"
                    type="text"
                    size="small"
                    @click="exportApply(scope.row)"
                    style="font-size: 14px"
                    >申请导出</el-button
                  >
                  <!-- 
                                   <el-button
                    v-show="scope.row.canDown"
                    type="text"
                    size="small"
                    @click="Output(scope.row)"
                    style="font-size: 14px"
                    >申请下载</el-button
                  > -->
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
          <ApplyDown ref="ApplyDown" :type="1" />
          <BeforeDown ref="BeforeDown" :type="1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { projDataList, projDataDelete } from '@/api/data/project';
import { dataDown } from '@/api/data/file';
export default {
  name: 'ProjectDataCheck', //项目资料检索
  dicts: ['file_type', 'project_plan'],
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //信息表格数据
      // 总条数
      total: 0,
      // 查询参数
      prjType: [],
      queryParams: {
        // 日期范围
        startTime: '',
        endTime: '',
        pageNum: 1,
        pageSize: 10,
        prjName: '', //项目名称
        dataName: '', //资料名称
        prjTypes: [], //资料类型
        prjPhase: null, //项目阶段
        prjNumber: null, //项目编号
      },
      dialogTableVisible: false,
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
      if (this.$route.query.prjType != null) {
        this.prjType = [this.$route.query.prjType];
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }

      this.queryParams.prjTypes = this.prjType.join(',');

      console.log(this.queryParams);
      projDataList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        //默认展开第一行数据
        this.$nextTick(() => {
          this.$refs.multipleTable.toggleRowExpansion(this.tableData[0], true);
        });
      });
      this.loading = false;
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
      this.prjType = [];
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
      // let params = [];
      // this.chooseItems.forEach((element) => {
      //   params.push(element.id);
      // });
      // projDataDelete(params.join(',')).then((res) => {
      //   if (res.code == 200) {
      //     this.$message.success(`删除成功`);
      //     this.$refs.multipleTable.clearSelection();
      //     this.getList();
      //   } else {
      //     this.$message.error(`删除失败`);
      //   }
      // });
      projDataDelete(row.id).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.$refs.multipleTable.clearSelection();
          this.getList();
        } else {
          this.$message.error(`删除失败`);
        }
      });
    },

    //查看
    handleCheck(row) {
      console.log(row);
      //遍历整个table数据
      // this.tableData.forEach((item) => {
      //   //判断该行是否有子节点
      //   if ('children' in item) {
      //     //遍历子节点
      //     item.children.forEach((item2) => {
      //       //判断该节点是否为我点击的节点
      //       if (item2 == row) {
      //         //console.log('父节点', item); //输出父节点
      //         this.$router.push({ path: '/data-d/projectDataInfo', query: { id: item.id } });
      //       }
      //     });
      //   }
      // });
      this.$router.push({ path: '/data-d/projectDataInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/projectDataEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/data-d/projectDataAdd' });
    },

    //申请导出
    exportApply(row) {
      this.$refs.ApplyDown.downSourceId = row.id;
      this.$refs.ApplyDown.downSourceName = row.dataName;
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output(row) {
      //节点下的id
      if (row.children != null) {
        let params = [];
        row.children.forEach((element) => {
          params.push(element.id);
        });
        // dataDown(params.join(','));
        this.$refs.BeforeDown.downSourceId = params.join(',');
        this.$refs.BeforeDown.show();
      } else {
        //dataDown(row.id);
        this.$refs.BeforeDown.downSourceId = row.id;
        this.$refs.BeforeDown.show();
      }
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
