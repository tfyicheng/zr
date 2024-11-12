<template>
  <!-- -->
  <el-dialog :visible.sync="visible" width="400px" top="45vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <el-form :model="queryParams" :inline="true" ref="form" :rules="ruleData">
            <el-form-item label="水印" prop="watermark">
              <el-input
                v-model="queryParams.watermark"
                placeholder="请输入"
                :maxlength="20"
                clearable
              />
            </el-form-item>
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
import {
  certDown,
  certDown2,
  dataDown,
  bidExport,
  contExport,
  ocontExport,
  lcontExport,
  acontExport,
  scontExport,
  templateExport,
  cont5Export,
  cont6Export,
  cont8Export,
  cont9Export,
  cont10Export,
  cont11Export,
  cont12Export,
} from '@/api/data/file';
import { userExportList } from '@/api/data/person';
export default {
  name: 'BeforeDown', //下载准备弹窗
  dicts: ['reason_type'],
  props: {
    type: {
      type: Number,
      default: 0,
    },
    //下载类型
    //0公司证书1项目资料2投标资料3项目合同附件4外委合同附件
    //5固定资产采购合同附件6服务采购合同附件7劳动合同附件8用户档案9合同范本
    //10项目合同变更文件11外委合同变更文件12项目归档资料13人员证书14开票15收票16收款17付款
    // 下载资源id
    downSourceId: {
      type: [Number, String],
    },
    downSourceName: '',
  },
  data() {
    return {
      title: '下载',
      // 遮罩层
      visible: false,
      queryParams: {
        watermark: null,
      },
      ruleData: {
        watermark: [{ required: true, message: '水印不能为空', trigger: 'blur' }],
      },
      downSourceId2: null, //外部赋值prop再使用会出bug
    };
  },

  created() {
    this.init();
  },

  methods: {
    init() {
      this.getConfigKey('sys_project.watermark').then((response) => {
        this.queryParams.watermark = response.data;
      });
      switch (this.type) {
        case 0:
          this.title = '下载公司证书';
          break;
        case 1:
          this.title = '下载项目资料';
          break;
        case 2:
          this.title = '下载投标资料';
          break;
        case 3:
          this.title = '下载项目合同附件';
          break;
        case 4:
          this.title = '下载外委合同附件';
          break;
        case 5:
          this.title = '下载固定资产采购合同附件';
          break;
        case 6:
          this.title = '下载服务采购合同附件';
          break;
        case 7:
          this.title = '下载劳动合同附件';
          break;
        case 8:
          this.title = '下载用户档案';
          break;
        case 9:
          this.title = '下载合同范本';
          break;
        case 10:
          this.title = '下载项目合同变更文件';
          break;
        case 11:
          this.title = '下载外委合同变更文件';
          break;
        case 12:
          this.title = '下载项目归档资料';
          break;
        case 13:
          this.title = '下载人员证书';
          break;
        case 14:
          this.title = '下载开票附件';
          break;
        case 15:
          this.title = '下载收票附件';
          break;
        case 16:
          this.title = '下载收款附件';
          break;
        case 17:
          this.title = '下载付款附件';
          break;
        default:
          break;
      }
    },

    // 显示弹框
    show() {
      this.init();
      this.visible = true;
      this.downSourceId2 = this.downSourceId;
      console.log(this.type, this.downSourceId);
      // this.queryParams.downSourceId = this.downSourceId;
      // this.queryParams.type = this.type;
      // this.queryParams.applyDeptId = this.$store.state.user.deptId;
    },

    /** 确认操作 */
    save() {
      // this.$emit('ok', this.queryParams.downSourceId);
      // this.$modal.loading('正在提交，请稍候...');
      // fileApply(this.queryParams)
      //   .then((res) => {
      //     this.$modal.closeLoading();
      //     if (res.code === 200) {
      //       this.visible = false;
      //       this.$message.success('提交成功');
      //       this.$emit('ok');
      //     }
      //   })
      //   .catch((error) => {
      //     this.$modal.closeLoading();
      //   });
      console.log(this.type, this.downSourceId2, this.queryParams.watermark);
      switch (this.type) {
        case 0:
          this.save0();
          break;
        case 1:
          this.save1();
          break;
        case 2:
          this.save2();
          break;
        case 3:
          this.save3();
          break;
        case 4:
          this.save4();
          break;
        case 5:
          this.save5();
          break;
        case 6:
          this.save6();
          break;
        case 7:
          this.save7();
          break;
        case 8:
          this.save8();
          break;
        case 9:
          this.save9();
          break;
        case 10:
          this.save10();
          break;
        case 11:
          this.save11();
          break;
        case 12:
          this.save12();
          break;
        case 13:
          this.save13();
          break;
        case 14:
          this.save14();
          break;
        case 15:
          this.save15();
          break;

        case 16:
          this.save16();
          break;
        case 17:
          this.save17();
          break;
        default:
          break;
      }
    },

    save0() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          certDown(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save1() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          dataDown(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save2() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          bidExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save3() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          contExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save4() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          ocontExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save5() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          acontExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save6() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          scontExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save7() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          lcontExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save8() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          userExportList(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save9() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          templateExport(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save10() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont5Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save11() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont6Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save12() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont8Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save13() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          certDown2(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },

    save14() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont9Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },
    save15() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont10Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },
    save16() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont12Export(this.downSourceId2, this.queryParams.watermark);
        }
      });
    },
    save17() {
      this.$refs['form'].validateField('watermark', (valid) => {
        if (!valid) {
          this.visible = false;
          cont11Export(this.downSourceId2, this.queryParams.watermark);
        }
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
      margin: 20px 10px 0 10px;
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
