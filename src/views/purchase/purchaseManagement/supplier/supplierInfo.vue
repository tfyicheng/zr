<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资产采购管理', '供应商管理', '供应商列表', '供应商详情']" />
        <div class="main">
          <div class="mainl">
            <img class="mlt" src="@/assets/images/customer_header.svg" />

            <div class="mlu">{{ form.supplierName }}</div>
            <div class="mll">{{ form.creditCode }}</div>
            <!-- <el-tag>
              <dict-tag :options="dict.type.client_type" :value="form.clientType" />
            </el-tag> -->
            <div style="clear: both"></div>
            <!-- <div class="mln">{{ form.creditCode }}</div> -->
            <div class="mli">
              <span class="mlil">注册地址</span>
              <span class="mlir">{{ form.addrArea }}</span>
            </div>
          </div>
          <div class="mainr">
            <div class="mrtb">
              <div class="mrtop">
                供应商联系人
                <!-- <div class="mrtopbtn" style="float: right">
                <el-button style="float: right; width: 100px" type="primary" @click="handleQuery"
                  >搜索</el-button
                >
                <el-input
                  style="float: right; width: 240px; margin-right: 10px"
                  v-model="queryParams.placeholder"
                  placeholder="关键字"
                ></el-input>
              </div> -->
              </div>
              <div class="mrmain" style="padding: 0 20px; padding-top: 10px">
                <el-table
                  :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
                  :cell-style="{ textAlign: 'left' }"
                  :data="tableData3"
                  style="width: 100%"
                  max-height="560"
                  ref="multipleTable"
                  row-key="id"
                >
                  <el-table-column prop="dept" label="部门科室"> </el-table-column>
                  <el-table-column prop="name" label="联系人"> </el-table-column>
                  <el-table-column prop="phone" label="联系号码"> </el-table-column>
                  <el-table-column prop="remark" label="备注"> </el-table-column>
                </el-table>
              </div>
            </div>

            <div class="mrtb">
              <el-tabs v-model="activeName">
                <el-tab-pane label="资产采购合同" name="first">
                  <!-- <div class="mrtop2">
                    <div class="mrtopbtn" style="float: right">
                      <el-button
                        style="float: right; width: 100px"
                        type="primary"
                        @click="handleQuery"
                        >搜索</el-button
                      >
                      <el-input
                        style="float: right; width: 240px; margin-right: 10px"
                        v-model="queryParams.placeholder"
                        placeholder="关键字"
                      ></el-input>
                    </div>
                  </div> -->
                  <div class="mrmain" style="padding: 0 20px; padding-top: 10px">
                    <el-table
                      :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
                      :cell-style="{ textAlign: 'left' }"
                      :data="tableData"
                      style="width: 100%"
                      max-height="560"
                      ref="multipleTable"
                      row-key="id"
                    >
                      <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
                      <el-table-column prop="contName" label="合同名称"> </el-table-column>
                      <el-table-column prop="leader" label="合同负责人"> </el-table-column>
                      <el-table-column prop="applyDept" label="采购部门"> </el-table-column>
                      <el-table-column prop="totalAmount" label="总金额"> </el-table-column>
                      <el-table-column prop="contStartDate" label="签约日期"> </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-button
                            @click="handleCheck(scope.row)"
                            type="text"
                            size="small"
                            style="font-size: 14px"
                            >查看</el-button
                          >
                          <el-button
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
                    /></div
                ></el-tab-pane>
                <el-tab-pane label="服务采购合同" name="second">
                  <!-- <div class="mrtop2">
                    <div class="mrtopbtn" style="float: right">
                      <el-button
                        style="float: right; width: 100px"
                        type="primary"
                        @click="handleQuery"
                        >搜索</el-button
                      >
                      <el-input
                        style="float: right; width: 240px; margin-right: 10px"
                        v-model="queryParams.placeholder"
                        placeholder="关键字"
                      ></el-input>
                    </div>
                  </div> -->
                  <div class="mrmain" style="padding: 0 20px; padding-top: 10px">
                    <el-table
                      :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
                      :cell-style="{ textAlign: 'left' }"
                      :data="tableData2"
                      style="width: 100%"
                      max-height="560"
                      ref="multipleTable"
                      row-key="id"
                    >
                      <el-table-column prop="contNumber" label="合同编号"> </el-table-column>
                      <el-table-column prop="contName" label="合同名称"> </el-table-column>
                      <el-table-column prop="leader" label="合同负责人"> </el-table-column>
                      <el-table-column prop="applyDept" label="采购部门"> </el-table-column>
                      <el-table-column prop="totalAmount" label="总金额"> </el-table-column>
                      <el-table-column prop="contStartDate" label="签约日期"> </el-table-column>
                      <el-table-column fixed="right" label="操作" width="150">
                        <template slot-scope="scope">
                          <el-button
                            @click="handleCheck1(scope.row)"
                            type="text"
                            size="small"
                            style="font-size: 14px"
                            >查看</el-button
                          >
                          <el-button
                            type="text"
                            size="small"
                            @click="handleEdit1(scope.row)"
                            style="font-size: 14px"
                            >编辑</el-button
                          >
                        </template>
                      </el-table-column>
                    </el-table>

                    <pagination
                      v-show="total2 > 0"
                      :total="total2"
                      :page.sync="queryParams2.pageNum"
                      :limit.sync="queryParams2.pageSize"
                      @pagination="getList2"
                    /></div
                ></el-tab-pane>
              </el-tabs>
              <!-- <div class="mrtop">
                服务采购合同
              </div> -->
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-hasPermi="['property:supplier:edit']" @click="handleEditInfo"
            >编辑</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supplierlistCont, supplierContactsInfo, supplierContacts } from '@/api/data/asset';

export default {
  name: 'SupplierInfo', //供应商信息
  dicts: ['certificate_category', 'cert_type', 'cert_years'],
  components: {},
  data() {
    return {
      activeName: 'first',
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {},
      tableData: [], //表格数据
      tableData2: [], //表格数据
      tableData3: [], //表格数据
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: 0,
        supplierId: null,
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        type: 1,
        supplierId: null,
      },
      // 总条数
      total: 0,
      total2: 0,
      chooseList: '', //选择的人员或组织
      dialogTableVisible: false,
    };
  },

  mounted() {},

  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      if (this.$route.query.id) {
        supplierContactsInfo(this.$route.query.id).then((res) => {
          if (res.data) {
            this.form = { ...this.form, ...res.data };
            this.commonFun.ShowAreaVal(this.form, res.data);
          }
        });
        this.queryParams.supplierId = this.$route.query.id;
        supplierlistCont(this.queryParams).then((response) => {
          if (response.rows) {
            this.total = response.total;
            this.tableData = response.rows;
          }
        });
        this.queryParams2.supplierId = this.$route.query.id;
        supplierlistCont(this.queryParams2).then((response) => {
          if (response.rows) {
            this.total2 = response.total;
            this.tableData2 = response.rows;
          }
        });
        supplierContacts(this.$route.query.id).then((res) => {
          if (res.data) {
            this.tableData3 = res.data;
          }
        });
      }
    },

    getList() {
      supplierlistCont(this.queryParams).then((response) => {
        if (response.rows) {
          this.total = response.total;
          this.tableData = response.rows;
        }
      });
    },

    getList2() {
      supplierlistCont(this.queryParams2).then((response) => {
        if (response.rows) {
          this.total2 = response.total;
          this.tableData2 = response.rows;
        }
      });
    },

    //选择人员
    choosePerson() {
      if (this.form.certType == undefined) {
        this.$message.error('请先选择证书类型');
        return;
      }

      this.dialogTableVisible = true;
      if (this.form.certType == 0) {
        this.$nextTick(() => {
          this.$refs.pList.$off('getChoose', this.getChoose);
          this.$refs.pList.$on('getChoose', this.getChoose);
          this.$refs.pList.$on('closeChoose', this.closeChoose);
        }, 500); //在el-dialog打开后，再执行$on方法否则refs为空则没有监听事件
      } else {
        this.$nextTick(() => {
          this.$refs.dList.$off('getChoose', this.getChoose);
          this.$refs.dList.$on('getChoose', this.getChoose);
          this.$refs.dList.$on('closeChoose', this.closeChoose);
        }, 500);
      }
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
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

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/data-d/fixedAssetsPCInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/data-d/fixedAssetsPCEdit', query: { id: row.id } });
    },

    //查看
    handleCheck1(row) {
      console.log(row);
      this.$router.push({ path: '/data-d/servicePCInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit1(row) {
      this.$router.push({ path: '/data-d/servicePCEdit', query: { id: row.id } });
    },

    //编辑
    handleEditInfo() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({
        path: '/purchase-d/supplierEdit',
        query: { id: this.form.supplierId },
      });
    },

    // 保存
    save() {},

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  computed: {},
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        // this.$tab.refreshPage();
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

      .main {
        background: #fff;
        border-radius: 4px;
        display: flex;
        .mainl {
          border-right: 1px solid #e6e6e6;
          width: 350px;
          text-align: center;
          .mlt {
            margin: 60px 0 15px 0;
          }
          .el-tag {
            height: 25px;
            line-height: 25px;
            position: relative;
            top: -185px;
            left: -80px;
            float: right;
          }
          .mlu {
            font-family: Alibaba PuHuiTi 2;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            letter-spacing: 0em;
            padding: 0 12px;
          }
          .mll {
            margin: 15px 0 0px 0;
            padding-bottom: 30px;
            color: #666666;
            border-bottom: 1px solid #e6e6e6;
          }
          .mln {
            text-align: left;
            margin: 0 20px;
            padding: 30px 0 20px 0px;
            font-size: 18px;
            border-bottom: 1px solid #e6e6e6;
          }
          .mln::before {
            content: '\00a0';
            border-left: 3px solid #4da0ff;
            margin-right: 5px;
          }
          .mli {
            margin: 5px 12px 20px 12px;
            background: #fff;
            font-family: Alibaba PuHuiTi 2;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;

            .svg-icon {
              float: left;
              margin-top: 2px;
            }
            ::v-deep .content {
              color: #666666;
              margin-left: 5px;
            }
            .mlil {
              width: 100px;
              color: #666666;
              display: inline-block;
            }
            .mlir {
              color: #666666;
              vertical-align: top;
              width: 210px;
              display: inline-block;
              word-wrap: break-word;
              word-break: normal;
            }
          }
        }
        .mainr {
          flex: 1;
          .mrtop {
            margin: 20px;
            font-family: Alibaba PuHuiTi 2;
            font-size: 20px;
            font-weight: 500;
            line-height: 28px;
            letter-spacing: 0em;
            text-align: left;
            .mrtopbtn {
              //width: 100%;
              display: inline-block;
            }
          }
          .mrtop2 {
            margin: 20px;
            font-size: 20px;
            font-weight: 500;
            line-height: 30px;
            height: 30px;
            letter-spacing: 0em;
            text-align: left;
            .mrtopbtn {
              //width: 100%;
              display: inline-block;
            }
          }
          .mrtop::before {
            content: '\00a0    ';
            border-left: 3px solid #4da0ff;
          }
          .mrtb {
            margin-bottom: 50px;
            .el-tabs {
              ::v-deep.el-tabs__nav {
                margin-left: 20px;
              }
              //去掉tabs底部的下划线
              ::v-deep .el-tabs__nav-wrap::after {
                position: static !important;
              }

              ::v-deep.el-tabs__item {
                font-size: 20px;
              }
            }
          }
        }
      }

      .p3 {
        margin: 0px 0px;
        width: 98%;

        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
