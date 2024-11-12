<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员证书管理 ', '人员证书列表']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <el-input
                v-model="queryParams.certNumber"
                :maxlength="commonFun.inputMax"
                placeholder="证书编号"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.userName"
                :maxlength="commonFun.inputMax"
                placeholder="人员名称"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.certName"
                :maxlength="commonFun.inputMax"
                placeholder="证书名称"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <CertCascader :data.sync="queryParams.cert" :type="1" />
            </div>

            <!-- <div class="p1item">
              <el-select
                v-model="queryParams.certParentType"
                placeholder="证书大类"
                clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
                @change="certPChange"
              >
                <el-option
                  v-for="item in dict.type.person_cert"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">

              <el-select
                v-model="queryParams.certChildType"
                placeholder="请先选择证书大类"
                clearable
                @change="certCChange"
              >
                <el-option
                  v-for="item in certChildTypes"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <el-select
                v-model="queryParams.certGrandsonType"
                placeholder="请先选择证书中类"
                clearable
              >
                <el-option
                  v-for="item in certGrandsonTypes"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                >
                </el-option>
              </el-select>
            </div> -->
            <!-- <div class="p1item">
              <el-select v-model="queryParams.certType" placeholder="证书类型" clearable>
                <el-option
                  v-for="item in dict.type.cert_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div> -->

            <div class="p1item">
              <el-date-picker
                v-model="queryParams.year"
                type="year"
                placeholder="选择年份"
                clearable
                value-format="yyyy"
              >
              </el-date-picker>
            </div>
            <!-- <div class="p1item">
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
            <div class="p1item">
              <el-input v-model="queryParams.placeholder" placeholder="关键词" clearable></el-input>
            </div> -->
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <el-button type="primary" @click="addC" v-hasPermi="['certificate:cert1:add']"
              >添加</el-button
            >
            <!-- <el-button type="danger" @click="deleteT" :disabled="chooseItems.length == 0"
              >删除</el-button
            > -->
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
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
              </el-table-column> -->
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <el-table-column prop="certNumber" label="证书编号">
                <template slot-scope="scope">
                  <!-- 到期标志 -->
                  <svg-icon
                    icon-class="xm_jjcq"
                    v-show="scope.row.dueStatus === 2"
                    style="width: 30px; height: 30px; margin: auto 0"
                  />
                  {{ scope.row.certNumber }}
                </template>
              </el-table-column>
              <!-- <el-table-column prop="certName" label="证书名称">
                <template slot-scope="scope">
                
                  <svg-icon
                    icon-class="xm_jjcq"
                    v-show="scope.row.dueStatus === 2"
                    style="width: 30px; height: 30px; margin: auto 0"
                  />
                  {{ scope.row.certName }}
                </template>
              </el-table-column> -->
              <el-table-column label="证书大类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.person_cert"
                    :value="scope.row.certParentType"
                  />
                </template>
              </el-table-column>
              <el-table-column label="证书中类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.person_cert"
                    :value="[scope.row.certParentType, scope.row.certChildType]"
                  />
                </template>
              </el-table-column>
              <el-table-column label="证书小类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.person_cert"
                    :value="[
                      scope.row.certParentType,
                      scope.row.certChildType,
                      scope.row.certGrandsonType,
                    ]"
                  />
                </template>
              </el-table-column>
              <!-- <el-table-column label="证书种类">
                <template slot-scope="scope">
                  {{
                    dict.type.cert_type[scope.row.certType]
                      ? dict.type.cert_type[scope.row.certType].label
                      : ''
                  }}
                </template>
              </el-table-column> -->
              <!-- <el-table-column label="最近三个月浏览/使用数">
                <template slot-scope="scope">
                  {{
                    (scope.row.browseNum ? scope.row.browseNum : '0') +
                    '/' +
                    (scope.row.useNum ? scope.row.useNum : '0')
                  }}
                </template>
              </el-table-column> -->

              <el-table-column label="最近三个月浏览数">
                <template slot-scope="scope">
                  {{ scope.row.browseNum != null ? scope.row.browseNum : '0' }}
                </template>
              </el-table-column>
              <el-table-column label="证书预览" width="200" :show-overflow-tooltip="false">
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
              <el-table-column prop="authority" label="颁发机构"> </el-table-column>
              <el-table-column prop="issueDate" label="颁发时间"> </el-table-column>
              <el-table-column prop="userName" label="用户"> </el-table-column>
              <el-table-column prop="deptName" label="组织"> </el-table-column>
              <el-table-column
                fixed="right"
                width="200"
                label="操作"
                :show-overflow-tooltip="false"
              >
                <template slot-scope="scope">
                  <el-button
                    v-hasPermi="['certificate:cert1:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    v-hasPermi="['certificate:cert1:edit']"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
                  <el-button
                    v-hasPermi="['file:down:cert1']"
                    v-show="scope.row.canDown"
                    type="text"
                    size="small"
                    @click="exportT(scope.row)"
                    style="font-size: 14px; color: #fac06a"
                    >导出</el-button
                  >
                  <el-button
                    v-show="scope.row.canDel"
                    type="text"
                    size="small"
                    @click="deleteT(scope.row)"
                    style="font-size: 14px; color: red"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <!-- <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>-->
            <pagination
              v-show="total > 0"
              :total="total"
              :limit.sync="queryParams.pageSize"
              :page.sync="queryParams.pageNum"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>

          <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
            <iframe width="100%" height="100%" :src="fileview"></iframe>
          </el-dialog>

          <BeforeDown ref="BeforeDown" :type="13" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { certList1, certDel1 } from '@/api/data/certificate';
import { certDown } from '@/api/data/file';
export default {
  name: 'CertificatesCheck', //个人证书信息查看检索
  dicts: ['person_cert', 'cert_type'],
  data() {
    return {
      options: [],
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //证书信息表格数据
      // 总条数
      total: 0,
      //联动类
      certChildTypes: [],
      certGrandsonTypes: [],
      // 查询参数
      queryParams: {
        cert: [],
        pageNum: 1,
        pageSize: 10,
        certNumber: '', //证书编号
        certName: '', //证书名称
        certParentType: undefined, //证书大类
        certChildType: undefined, //证书中类
        certGrandsonType: undefined, //证书小类
        certType: 0, //证书类型  0个人证书
        year: '', //年份
        //placeholder: '', //关键字
      },
      dialogTableVisible: false,
      multipleSelection: [],
      fileview: '', //文件预览地址
    };
  },

  created() {
    //console.log(this.dict.type.person_cert); //输出字典
    this.getList();
  },

  mounted() {
    //自定义字典是Vue监控变量产生的，取值的方式是Ajax异步的，
    //所以需要等异步执行完毕后，才能取值，否则会取到undefined
    // setTimeout(()=>{
    //   console.log(this.dict.type.person_cert);//输出字典
    //   let copy = this.dict.type.person_cert.slice();
    //   this.certChildTypes = copy[this.queryParams.certParentType].children;//在没有初始选项时依旧是undefined
    // },800)
  },

  methods: {
    /** 查询列表 */
    getList() {
      if (this.$route.query.certParentType != null) {
        this.queryParams.certParentType = this.$route.query.certParentType;
        this.queryParams.cert = [this.$route.query.certParentType];
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }
      if (this.$route.query.year != null) {
        this.queryParams.year = this.$route.query.year + '';
        this.$router.push({ path: this.$router.currentRoute.path, query: null });
      }
      // console.log(this.queryParams,this.year);
      this.queryParams.certType = 0;
      //certList(this.addDateRange(this.queryParams, [this.beginTime, this.endTime])).then(
      certList1(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
      //this.initAlreadySelectItem();
    },

    // 初始化已选中的信息
    initAlreadySelectItem() {
      // 清理选中的行
      //this.$refs.multipleTable.clearSelection();
      this.tableData.forEach((item) => {
        // 必须要在this.$nextTick函数中调用this.$refs.multipleTable.toggleRowSelection，才会生效选中
        this.$nextTick(() => {
          // this.List : table对应的数据，一般是列表接口获取到的数据的保存字段
          this.chooseItems.find((e) => {
            if (e.id === item.id) {
              // this.$refs.multipleTable：选中当前表格，multipleTable 需要在表格的参数中添加 ref="multipleTable"
              // 调用选中行方法，使用table数据对应的行数据
              this.$refs.multipleTable.toggleRowSelection(e, true);
            }
          });
        });
      });
    },

    //切换大类联动中类
    certPChange() {
      this.certChildTypes =
        this.dict.type.person_cert[this.queryParams.certParentType].raw.children;
    },

    //切换中类联动小类
    certCChange() {
      this.certGrandsonTypes = this.certChildTypes[this.queryParams.certChildType].children;
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
      (this.queryParams.certParentType = this.commonFun.getArrVal(this.queryParams.cert, 0)), //证书大类
        (this.queryParams.certChildType = this.commonFun.getArrVal(this.queryParams.cert, 1)), //证书中类
        (this.queryParams.certGrandsonType = this.commonFun.getArrVal(this.queryParams.cert, 2)), //证书小类
        this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.dateRange2 = [];
      //this.resetForm('queryForm');
      this.queryParams = { pageNum: 1, pageSize: 10, cert: [] };
      this.handleQuery();
    },

    //选择
    handleSelectionChange(rows) {
      console.log('this.rows', rows);
      this.chooseItems = [];

      this.chooseItems = Array.from(new Set(rows));

      //this.chooseItems =this.commonFun.unique(this.chooseItems, 'id');

      console.log('this.chooseItems', this.chooseItems);
    },

    //取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          //toggleRowSelection(row，selected) 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //删除
    async deleteT(row) {
      if (!(await this.commonFun.sureDialog())) {
        return;
      }
      // console.log(this.$refs.multipleTable.selection[1].number)
      // for (let i = 0; i < this.$refs.multipleTable.selection.length; i++) {
      //   for (let t = 0; t < this.tableData.length; t++) {
      //     if (this.tableData[t].number === this.$refs.multipleTable.selection[i].number) {
      //       this.tableData.splice(t, 1);
      //     }
      //   }
      // }
      certDel1(row.id).then((res) => {
        if (res.code == 200) {
          this.$message.success(`删除成功`);
          this.getList();
        }
      });

      return;

      this.chooseItems.forEach((element) => {
        certDel(element.id).then((res) => {
          console.log(res);
          res.code == 200
            ? this.$message.success(`删除${element.certName} :${res.msg}`)
            : this.$message.error(`删除${element.certName} :${res.msg}`);
          this.chooseItems.splice(this.chooseItems.indexOf(element), 1);
        });
      });
      this.$refs.multipleTable.clearSelection();
      this.getList();
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: '/person-d/certificatesInfo',
        query: { id: row.id },
      });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/person-d/certificatesEdit', query: { id: row.id } });
    },

    //添加证书
    addC() {
      this.$router.push({ path: '/person-d/certificatesAdd' });
    },

    exportT(row) {
      if ((row.files && row.files.length == 0) || row.files == null) {
        this.$message.error('没有可导出的附件');
        return;
      }
      //certDown(row.id);
      this.$refs.BeforeDown.downSourceId = row.id;
      this.$refs.BeforeDown.show();
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
          border-bottom: 1px solid #ebeef5;
          .p1item {
            margin: 4px 0px 0 4px;
            float: left;
            width: 270px;
            height: 60px;
            .el-input,
            ::v-deep .el-cascader,
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
        // .p2::before{
        //   content: '';
        //   position: absolute;
        //   left: 0px;
        //   height: 1px;
        //   width: 100px;
        //   background-color: #284ac5;
        // }
        .p3 {
          margin: 15px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
          }
        }
      }

      ::v-deep .popperClass {
        //top: 200px !important;
        position: absolute !important;
      }
    }
  }
}
.collink {
  max-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ::v-deep .el-link--inner {
    max-width: 200px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
