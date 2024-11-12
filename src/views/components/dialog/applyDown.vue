<template>
  <!-- -->
  <el-dialog :visible.sync="visible" width="400px" top="25vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <el-form ref="loginForm">
            <div class="p1">
              <div class="p1item">
                <span>资 料 名 称</span>
                <el-input
                  v-model="downSourceName"
                  placeholder="系统填写"
                  :maxlength="commonFun.inputMax"
                  disabled
                ></el-input>
              </div>

              <div class="p1item">
                <span>导 出 事 由</span>
                <el-select v-model="queryParams.reason" placeholder="点击选择">
                  <el-option
                    v-for="item in dict.type.reason_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="p1item">
                <span>备 注</span>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="queryParams.remark"
                  show-word-limit
                  resize="none"
                  :maxlength="50"
                >
                </el-input>
              </div>
            </div>
          </el-form>

          <div class="p4">
            <el-button @click="visible = false">返回</el-button>
            <el-button type="primary" @click="save">确定</el-button>
            <div style="clear: both"></div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fileApply } from '@/api/data/file';
export default {
  name: 'ApprovalDown', //申请导出弹窗
  dicts: ['reason_type'],
  props: {
    type: 0, //申请导出类型  0证书1项目资料2投标资料3项目合同附件4外委合同附件5固定资产采购合同附件6服务采购合同附件7劳动合同8用户档案9合同范本
    //10项目合同变更文件11外委合同变更文件12项目归档资料13人员证书14开票15收票16收款17付款
    // 下载资源id
    downSourceId: {
      type: [Number, String],
    },
    downSourceName: '',
  },
  data() {
    return {
      title: '申请导出',
      // 遮罩层
      visible: false,
      queryParams: {},
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.visible = true;
      this.queryParams.downSourceId = this.downSourceId;
      this.queryParams.type = this.type;
      // let data = this.commonFun.getUserDept(this.$store.state.user.id);
      // if (data) {
      //   this.queryParams.applyDeptId = data.deptId;
      // }
      this.queryParams.applyDeptId = this.$store.state.user.deptId;
    },

    /** 确认操作 */
    save() {
      // this.visible = false;
      // this.$emit('ok', this.queryParams.downSourceId);
      this.queryParams.name = this.downSourceName;
      this.$modal.loading('正在提交，请稍候...');
      fileApply(this.queryParams)
        .then((res) => {
          this.$modal.closeLoading();
          if (res.code === 200) {
            this.visible = false;
            this.$message.success('提交成功');
            this.$emit('ok');
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
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
          .el-textarea,
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
        margin: 0px 0px;
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
