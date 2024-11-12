<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['certificate:cert0:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

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
                v-model="queryParams.certName"
                :maxlength="commonFun.inputMax"
                placeholder="证书名称"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <CertCascader :data.sync="queryParams.cert" />
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
                  v-for="item in dict.type.certificate_category"
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
            <div class="p1item">
              <el-select v-model="queryParams.certType" placeholder="证书类型" clearable>
                <el-option
                  v-for="item in dict.type.cert_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

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
            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button class="graybtn" @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.certName }}</span>
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
              max-height="560"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
              </el-table-column> -->
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="certNumber" label="证书编号"> </el-table-column>
              <el-table-column prop="certName" label="证书名称">
                <template slot-scope="scope">
                  <!-- 到期标志 -->
                  <svg-icon
                    icon-class="xm_jjcq"
                    v-show="scope.row.dueStatus === 2"
                    style="width: 30px; height: 30px; margin: auto 0"
                  />
                  {{ scope.row.certName }}
                </template>
              </el-table-column>
              <el-table-column label="证书大类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.certificate_category"
                    :value="scope.row.certParentType"
                  />
                </template>
              </el-table-column>
              <el-table-column label="证书中类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.certificate_category"
                    :value="[scope.row.certParentType, scope.row.certChildType]"
                  />
                </template>
              </el-table-column>
              <el-table-column label="证书小类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.certificate_category"
                    :value="[
                      scope.row.certParentType,
                      scope.row.certChildType,
                      scope.row.certGrandsonType,
                    ]"
                  />
                </template>
              </el-table-column>
              <el-table-column label="证书种类">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.cert_type"
                    :value="scope.row.certType"
                  />
                </template>
              </el-table-column>
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
              <!-- <el-table-column label="证书预览">
                <template slot-scope="scope">
                  <el-button type="text" @click="preview(scope.row.files)">{{
                    filePreview(scope.row.files)
                  }}</el-button>
                </template>
              </el-table-column> -->
              <el-table-column prop="authority" label="颁发机构"> </el-table-column>
              <el-table-column prop="issueDate" label="颁发时间"> </el-table-column>
              <el-table-column prop="userName" label="用户"> </el-table-column>
              <el-table-column prop="deptName" label="组织"> </el-table-column>
              <!-- <el-table-column fixed="right" label="操作" width="150">
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
              </el-table-column> -->
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
import { certList } from '@/api/data/certificate';
export default {
  name: 'CertList', //选择证书列表
  dicts: ['certificate_category', 'cert_type'],
  props: {
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '选择证书',
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      //联动类
      certChildTypes: [],
      certGrandsonTypes: [],
      tableData: [
        // {
        //   userId: 5, //用户ID
        //   userName: '赵六', //用户名称
        //   email: '125@qq.com', //邮箱
        //   phoneNumber: '15912345679', //联系电话
        //   fullAddr: null, //详细地址
        //   jobState: 1, //工作状态,参考字典值
        //   deptName: '珠荣工程设计有限公司', //部门
        //   postName: '软件测试', //职位
        // },
      ], //表格数据
      // 总条数
      total: 0,
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
        certType: undefined, //证书类型
        year: '', //年份
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
      certList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        //异步回显处理 watch中处理的时候table暂无数据
        // let resdata = JSON.parse(JSON.stringify(response.data));
        let resdata2 = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        this.tableData = [];
        response.rows.forEach((item, index) => {
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

    //切换大类联动中类
    certPChange() {
      this.certChildTypes =
        this.dict.type.certificate_category[this.queryParams.certParentType].raw.children;
    },

    //切换中类联动小类
    certCChange() {
      this.certGrandsonTypes = this.certChildTypes[this.queryParams.certChildType].children;
    },

    //添加项
    addItem() {
      this.$router.push({ path: '/data-d/certificatesAdd' });
      this.goback();
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
      this.queryParams = { pageNum: 1, pageSize: 10, cert: [] };
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
  watch: {},
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
      position: relative;
      display: inline-block;
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        width: 270px;
        height: 50px;
        .el-input,
        ::v-deep .el-cascader,
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
