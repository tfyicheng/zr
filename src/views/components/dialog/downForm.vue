<template class="app-container">
  <div class="mbody">
    <div class="appc">
      <div class="top">{{ title }}</div>
      <div class="main">
        <el-form ref="loginForm">
          <div class="p1">
            <!-- <div class="p1item">
              <span>项 目 名 称</span>
              <el-input
                v-model="queryParams.prjName"
                placeholder="请输入"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div> -->

            <div class="p1item" v-show="type == 1 || type == 2">
              <span>负责人</span>
              <el-input
                v-model="queryParams.prjLeader"
                placeholder="请输入"
                :maxlength="commonFun.inputMax"
              ></el-input>
            </div>

            <div class="p1item" v-show="type == 1 || type == 2">
              <span>开 始 日 期</span>
              <el-date-picker
                v-model="queryParams.startTime"
                type="date"
                placeholder="开始时间"
                value-format="yyyy-MM-dd"
                popper-class="popperClass"
              >
              </el-date-picker>
            </div>

            <div class="p1item" v-show="type == 1 || type == 2">
              <span>结 束 日 期</span>
              <el-date-picker
                v-model="queryParams.endTime"
                type="date"
                placeholder="开始时间"
                value-format="yyyy-MM-dd"
                popper-class="popperClass"
              >
              </el-date-picker>
            </div>

            <div class="p1item">
              <span>项 目 类 型</span>
              <el-select v-model="queryParams.prjTypes" placeholder="点击选择">
                <el-option
                  v-for="item in dict.type.project_type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <span>项 目 区 域</span>
              <el-cascader
                v-model="area"
                :props="props"
                ref="cascaderAddr"
                placeholder="请选择区域"
                @change="areaChange"
                clearable
              ></el-cascader>
            </div>

            <div class="p1item" v-show="type == 0">
              <span>年份</span>
              <el-date-picker
                v-model="queryParams.years"
                type="years"
                value-format="yyyy"
                placeholder="点击选择"
              >
              </el-date-picker>
            </div>
          </div>
        </el-form>

        <div class="p4">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
          <div style="clear: both"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCity, getProvince } from '@/api/system/user';
export default {
  name: 'DownForm', //下载弹窗
  dicts: ['project_type'],
  props: {
    type: null, //下载类型  0是项目业绩 1是项目 2 我的项目
  },
  data() {
    return {
      title: '',
      queryParams: {},
      area: [], //选择区域数组
      //区域级联选择配置
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            getCity().then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 1) {
            getProvince(node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 2) {
            getCity(node.parent.value, node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: node.level == 2,
              }));
              resolve(nodes);
            });
          } else if (node.level == 3) {
            resolve(null);
          }
        },
      },
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.title = this.type === 0 ? '导出项目业绩表' : '导出项目';
    },

    //选择区域的值
    areaChange(value) {
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.queryParams.areaProvince = '';
        this.queryParams.areaCity = '';
        this.queryParams.areaRegion = '';
      } else {
        const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes();
        // console.log(checkedNodes); // 获取当前点击的节点
        // console.log(checkedNodes[0].data.label); // 获取当前点击的节点的label
        // console.log(checkedNodes[0].pathLabels); // 获取由 label 组成的数组
        this.queryParams.areaProvince = checkedNodes[0].pathLabels[0]
          ? checkedNodes[0].pathLabels[0]
          : '';
        this.queryParams.areaCity = checkedNodes[0].pathLabels[1]
          ? checkedNodes[0].pathLabels[1]
          : '';
        this.queryParams.areaRegion = checkedNodes[0].pathLabels[2]
          ? checkedNodes[0].pathLabels[2]
          : '';
      }
    },

    //清空
    clearSel() {
      this.area = [];
      this.queryParams = {};
    },

    checkForm(val) {
      if (val) {
        if (val.prjTypes == null || val.prjTypes.length == 0) {
          this.$modal.msgError('项目类型不能为空');
          return false;
        }
        if (val.years == null || val.years.length == 0) {
          this.$modal.msgError('年份不能为空');
          return false;
        }
        if (val.approvals == null || val.approvals.length == 0) {
          this.$modal.msgError('批复不能为空');
          return false;
        }
        if (val.checks == null || val.checks.length == 0) {
          this.$modal.msgError('验收不能为空');
          return false;
        }
        if (val.areaProvince == null || val.areaCity == null || val.areaRegion == null) {
          this.$modal.msgError('省市区不能为空');
          return false;
        }
        if (val.prjCont == null) {
          this.$modal.msgError('项目合同不能为空');
          return false;
        }
        if (val.needBid == null) {
          this.$modal.msgError('中标通知不能为空');
          return false;
        }
        return true;
      } else {
        return false;
      }
    },

    save() {
      if (this.type == 2) {
        this.queryParams.userId = this.$store.state.user.id;
      }
      console.log(this.queryParams);
      this.$emit('getChoose', this.queryParams);
      // if (this.checkForm(this.queryParams)) {
      //   this.$emit('getChoose', this.queryParams);
      // }
    },

    //返回
    goback() {
      this.$emit('closeChoose');
    },
  },
};
</script>

<style lang="scss" scoped>
.mbody {
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
      .p1 {
        position: relative;
        display: inline-block;
        .p1item {
          margin: 4px 10px 0 4px;
          float: left;
          width: 380px;
          height: auto;
          span {
            width: 78px;
            margin-left: 20px;
            float: left;
            text-align: center;
            line-height: 60px;
            font-size: 16px;
          }
          .el-cascader,
          .el-input,
          .el-date-editor,
          .el-select {
            float: left;
            margin: 10px 10px 0 10px;
            width: 240px;
          }

          .el-button {
            margin-left: 12px;
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
          float: right;
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
  }
}
</style>
