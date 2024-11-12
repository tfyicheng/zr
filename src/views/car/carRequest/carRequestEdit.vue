<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc"></div>
    </div>
  </div>
</template>

<script>
import { certAdd } from '@/api/data/certificate';
import PersonList from '@/views/components/dialog/personlist';
import DeptList from '@/views/components/dialog/deptlist';

export default {
  name: 'CarRequestEdit', //编辑用车申请
  dicts: ['certificate_category', 'cert_type', 'cert_years'],
  components: { PersonList, DeptList },
  data() {
    return {
      certChildTypes: [],
      certGrandsonTypes: [],
      options: [],
      textarea: '',
      form: {
        // authority: "颁发机构xxx",
        // issueDate: "2023-12-15",
        // certChildType: 0,
        // certParentType: 0,
        // certGrandsonType: 0,
        // certNumber: "202312201245217",
        // certName: "证书名称",
        // validity: 10,
        // watermark: "水印",
        // annexFile: [
        //   {
        //     annexId: "1735214359929446400"
        //   },
        //   {
        //     annexId: "1735214161396260864"
        //   }
        // ],
        // foreignCert: [
        //   {
        //     primaryId: "6",
        //     type: 0
        //   },
        //   {
        //     primaryId: "100",
        //     type: 1
        //   }
        // ]
      },
      payments: [
        {
          id: '1213',
          issue: '1',
          planname: '项目阶段计划名称',
          sum: 21.1,
          percentage: 0.5,
        },
      ],
      chooseList: '', //选择的人员或组织
      dialogTableVisible: false,
      paymentShow: true,
    };
  },

  mounted() {
    this.$refs.uList.$on('upload', this.getUlist);
  },

  created() {},
  methods: {
    //切换大类联动中类
    certPChange() {
      this.certChildTypes =
        this.dict.type.certificate_category[this.form.certParentType].raw.children;
    },

    //切换中类联动小类
    certCChange() {
      this.certGrandsonTypes = this.certChildTypes[this.form.certChildType].children;
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

    //获取选择的人员/组织 0=>人员 1=>组织
    getChoose(data) {
      this.form.foreignCert = [];
      this.dialogTableVisible = false;
      if (this.form.certType == 0) {
        if (data) {
          if (Array.isArray(data)) {
            let str = '';
            for (var i = 0; i < data.length; i++) {
              str += data[i].userName + (i + 1 == data.length ? '' : '/');
              this.form.foreignCert.push({
                primaryId: data[i].userId, //人员/组织ID
                type: 0, //类型:0人员1组织
              });
            }
            this.chooseList = str;
          }
        }
      } else {
        if (data) {
          if (Array.isArray(data)) {
            let str = '';
            for (var i = 0; i < data.length; i++) {
              str += data[i].deptName + (i + 1 == data.length ? '' : '/');
              this.form.foreignCert.push({
                primaryId: data[i].deptId, //人员/组织ID
                type: 1, //类型:0人员1组织
              });
            }
            this.chooseList = str;
          }
        }
      }
    },

    //关闭选择人员弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    // 获取上传的文件
    getUlist(data) {
      console.log(data);
      this.form.annexFile = data;
    },

    // 保存
    save() {
      console.log(this.form);
      this.$modal.loading('正在提交，请稍候...');
      certAdd(this.form)
        .then((res) => {
          console.log(res);
          this.$modal.closeLoading();
          if (res.code == 200) {
            this.$message.success('添加成功');
            this.$store.dispatch('tagsView/delView', this.$route);
            this.$router.push({ path: '/data-d/certificatesCheck' });
          }
        })
        .catch((error) => {
          this.$modal.closeLoading();
        });
    },

    // 取消
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route); //关闭当前标签页
      this.$router.go(-1);
    },
  },
  computed: {},
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
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 390px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }

            .el-input,
            .el-date-editor,
            .el-select {
              float: right;
              margin: 10px 10px 0 10px;
              width: 240px;
            }

            .el-button {
              margin-left: 12px;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 40px 0 30px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 100px !important;
              width: 645px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 100px !important;
              }
            }
            .el-button {
              width: 240px;
              height: 48px;
              border-radius: 4px;
              color: #409eff;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .upload-file {
              margin-top: 30px;
              width: 400px;
              display: inline-block;
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -35px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m2topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m2top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m2main {
          border-top: 1px solid #e4e6ed;
          .m2mt {
            height: 60px;
            display: flex;
            line-height: 60px;
            .m2mb {
              flex: 1;
              margin: 0px 10px 10px 20px;
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-select,
              .el-input-inner {
                display: flex;
                flex: 1;
              }
              svg {
                width: 40px;
                height: 40px;
                margin-top: 10px;
              }
            }
          }
          .el-button {
            border: 0;
            margin: 20px 20px 20px 20px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
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
