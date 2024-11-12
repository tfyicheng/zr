<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['生产管理', '客户管理', '客户列表', '客户信息详情 ']" />
        <div class="main">
          <!-- <div class="mainl">
            <img class="mlt" src="@/assets/images/customer_header.svg" />
            <div class="mlu">{{ form.name }}</div>
            <el-tag>{{
              form.clientType != null ? dict.type.client_type[form.clientType].label : ''
            }}</el-tag>
            <div class="mln">{{ form.creditCode }}</div>
            <div class="mli">
              <svg-icon icon-class="jobM" />
              <InputTip :width="inputTipWidth" :text="form.userDept"></InputTip>
            </div>
            <div class="mli">
              <svg-icon icon-class="phoneM" />
              <InputTip :width="inputTipWidth" :text="form.telephone"></InputTip>
            </div>
            <div class="mli">
              <svg-icon icon-class="emailM" />
              <InputTip :width="inputTipWidth" :text="form.userEmail"></InputTip>
            </div>
            <div class="mli">
              <svg-icon icon-class="messageM" /><InputTip
                :width="inputTipWidth"
                :text="form.remark"
              ></InputTip>
            </div>
          </div> -->
          <div class="mainl">
            <img class="mlt" src="@/assets/images/customer_header.svg" />

            <div class="mlu">{{ form.name }}</div>
            <div class="mll">{{ form.creditCode }}</div>
            <el-tag>
              <dict-tag :options="dict.type.client_type" :value="form.clientType" />
            </el-tag>
            <div style="clear: both"></div>
            <!-- <div class="mln">{{ form.creditCode }}</div> -->
            <div class="mli">
              <span class="mlil">所在区域</span>
              <span class="mlir">{{ form.area }}</span>
            </div>
            <div class="mli">
              <span class="mlil">单位号码</span>
              <span class="mlir">{{ form.telephone }}</span>
            </div>
            <div class="mli">
              <span class="mlil">注册地址</span>
              <span class="mlir">{{ form.addrArea }}</span>
            </div>
            <div class="mli">
              <span class="mlil">邮寄地址</span>
              <span class="mlir">{{ form.mailArea }}</span>
            </div>

            <div class="mli">
              <span class="mlil">开户行账号</span>
              <span class="mlir">{{ form.bankAccount }}</span>
            </div>

            <div class="mli">
              <span class="mlil">开户支行</span>
              <span class="mlir">{{ form.bankName }}</span>
            </div>

            <div class="mli">
              <span class="mlil">协作类别</span>
              <span class="mlir">
                <dict-tag :options="dict.type.project_type" :value="form.prjType" />
              </span>
            </div>

            <div class="mli">
              <span class="mlil">附件信息</span>
              <span class="mlir"> <FilePreview :data="form.files" /></span>
            </div>
          </div>
          <div class="mainr">
            <div class="mrtop">
              客户联系人
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
                :data="tableData"
                max-height="560"
                ref="multipleTable"
                row-key="id"
                v-loading="loading"
              >
                <el-table-column prop="name" label="联系人姓名"></el-table-column>
                <el-table-column prop="phone" label="联系人电话"> </el-table-column>
                <el-table-column prop="dept" label="联系人部门"> </el-table-column>
                <!-- <el-table-column prop="email" label="联系人邮箱"> </el-table-column> -->
                <el-table-column prop="remark" label="备注"> </el-table-column>
              </el-table>
              <div style="height: 50px"></div>
              <!-- <pagination
                v-show="total > 0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
              /> -->
            </div>

            <div class="mrtop">
              项目合同
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
                :data="tableData2"
                max-height="560"
                ref="multipleTable"
                row-key="id"
                v-loading="loading2"
              >
                <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
                <el-table-column prop="contNumber" label="合同编号"></el-table-column>
                <el-table-column prop="contName" label="合同名称"> </el-table-column>
                <!-- <el-table-column label="预览">
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
                </el-table-column> -->
                <!-- <el-table-column prop="deptName" label="部门名称"> </el-table-column> -->
                <el-table-column prop="prjName" label="项目名称"> </el-table-column>
                <el-table-column label="工程类型">
                  <template slot-scope="scope">
                    <dict-tag
                      :flag="false"
                      :options="dict.type.project_type"
                      :value="scope.row.prjType"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="leader" label="负责人"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button
                      v-hasPermi="['contract:project:query']"
                      @click="handleCheck(scope.row)"
                      type="text"
                      size="small"
                      style="font-size: 14px"
                      >查看</el-button
                    >
                    <el-button
                      v-hasPermi="['contract:project:edit']"
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
                @pagination="getDataTable2"
              />
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-hasPermi="['produce:client:edit']" @click="handleEditInfo"
            >编辑</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { custInfo, custPrjList, custClientList, custContList } from '@/api/data/customer';

export default {
  name: 'CustomerManagementInfo', //客户管理-详情
  dicts: ['client_type', 'project_type'],
  components: {},
  data() {
    return {
      loading: true, // 遮罩层
      loading2: true, // 遮罩层
      // form: {
      //   clientType: 0,
      //   unit: '广州移动工程建设有限公司',
      //   name: '广州移动工程建设有限公司刘德设有限公司刘德华',
      //   jod: '行政主管',
      //   email: '39267110@qq.com',
      //   phone: '13612341234',
      //   creditCode: '1361234123413612341234',
      //   remark: '39267110@qq.com39267110@qq.com39267110@qq.com39267110@qq.com',
      // },
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {},
      tableData: [], //信息表格数据
      tableData2: [], //信息表格数据
      queryParams: {
        clientId: '',
        pageSize: 10,
        pageNum: 1,
      },
      // 总条数
      total: 0,
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
        custInfo(this.$route.query.id).then((response) => {
          console.log(response);
          this.form = response.data;
          this.commonFun.ShowAreaVal(this.form, response.data);

          this.queryParams.clientId = response.data.id;
          this.getDataTable(this.queryParams);
          this.getDataTable2(this.queryParams);
        });
      }
    },

    getDataTable(queryParams) {
      if (queryParams) {
        custClientList(queryParams.clientId).then((response) => {
          console.log(response);
          this.tableData = response.data;
          this.loading = false;
        });
      }
    },

    getDataTable2(queryParams) {
      if (queryParams) {
        custContList(queryParams).then((response) => {
          console.log(response);
          this.total = response.total;
          this.tableData2 = response.rows;
          this.loading2 = false;
        });
      }
    },

    //查看
    handleCheck(row) {
      console.log(row);
      if (this.form.type == 0) {
        // 0 外委
        this.$router.push({ path: '/data-d/outsourcingContractInfo', query: { id: row.id } });
      } else {
        this.$router.push({ path: '/data-d/projectContractInfo', query: { id: row.id } });
      }
    },

    //编辑
    handleEdit(row) {
      if (this.form.type == 0) {
        this.$router.push({ path: '/data-d/outsourcingContractEdit', query: { id: row.id } });
      } else {
        this.$router.push({ path: '/data-d/projectContractEdit', query: { id: row.id } });
      }
    },

    //编辑
    handleEditInfo() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.push({
        path: '/production-d/customerManagementEdit',
        query: { id: this.form.id },
      });
    },

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
          .mrtop::before {
            content: '\00a0    ';
            border-left: 3px solid #4da0ff;
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
