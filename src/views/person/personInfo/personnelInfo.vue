<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '人员信息管理', '人员信息列表', '人员信息详情']" />
        <div class="top">
          <img class="topbg" src="@/assets/images/infobg.svg" />
        </div>
        <div class="main">
          <div class="mt">
            <img class="" :src="form.avatar" style="visibility: collapse" />
            <span> {{ dossier.userInfo.userName }}</span>
            <el-button style="background: #f3f4f8" @click="goback">返回</el-button>
            <el-button v-show="!dossier.canDown" type="primary" @click="exportApply"
              >申请导出</el-button
            >
            <el-button v-show="dossier.canDown" type="warning" @click="Output">导出</el-button>
            <el-button type="primary" @click="reMark">重新生成档案</el-button>
          </div>
          <div class="mb">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane v-loading="loading" label="个人档案表" name="record"
                ><Record ref="rec" :dossier="dossier"
              /></el-tab-pane>
              <el-tab-pane label="劳动合同" name="contract"
                ><Contract :uid="userId" ref="contract"
              /></el-tab-pane>
              <el-tab-pane label="个人证书" name="certificate"
                ><CertInfo :uid="userId" ref="certificate"
              /></el-tab-pane>
              <el-tab-pane label="履职经历" name="works"
                ><Work :uid="userId" ref="works"
              /></el-tab-pane>
              <el-tab-pane label="主要业绩" name="achievement"
                ><Performance :uid="userId" ref="achievement"
              /></el-tab-pane>
            </el-tabs>
          </div>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" width="350px">
          <DossierList ref="doList" />
        </el-dialog>
        <ApplyDown
          ref="ApplyDown"
          :downSourceName="dossier.userInfo.userName + '个人档案'"
          :downSourceId="userId"
          :type="8"
        />
        <BeforeDown ref="BeforeDown" :type="8" />
      </div>
    </div>
  </div>
</template>

<script>
import ApplyDown from '@/views/components/dialog/applyDown';
import DossierList from '@/views/components/dialog/dossierList';
import { personInfo, personDossier, getDossier, userExportList } from '@/api/data/person';
import Record from './tabs/Record';
import Contract from './tabs/Contract';
import CertInfo from './tabs/certInfo';
import Performance from './tabs/performance';
import Work from './tabs/work';

export default {
  name: 'PersonnelInfo', //人员信息
  components: { DossierList, Record, Contract, CertInfo, Performance, Work, ApplyDown },
  data() {
    return {
      loading: true,
      chooseItems: [],
      activeName: 'record',
      userId: '',
      userName: '',
      form: {
        userId: '',
        userName: '',
        avatar: require('@/assets/images/default_header.png'),
      },
      dialogTableVisible: false, //生成档案弹窗
      dossier: null,
    };
  },
  created() {
    // this.getInfo();
    this.getDossier();
  },
  methods: {
    //获取基本信息
    getInfo() {
      if (this.$route.query.id) {
        personInfo(this.$route.query.id).then((response) => {
          this.form = response.data;
          if (response.data.avatar == null || response.data.avatar == '') {
            this.form.avatar = require('@/assets/images/default_header.png');
          }
        });
      }
    },

    //获取档案信息
    getDossier() {
      // if (this.$route.query.id && this.$route.query.data) {
      //   this.loading = true;
      //   getDossier(this.$route.query.id, this.$route.query.data).then((response) => {
      //     if (response.code == 200) {
      //       this.dossier = response.data;
      //     }
      //     this.loading = false;
      //   });
      // } else
      if (this.$route.query.id) {
        this.userId = this.$route.query.id;
        personDossier(this.$route.query.id).then((response) => {
          this.dossier = response.data;
          this.loading = false;
        });
      }
    },

    //选择生成档案
    chooseDossier() {
      this.dialogTableVisible = true;
      if (this.$refs.doList) {
        this.$refs.doList.clearSel();
      } else {
        this.$nextTick(() => {
          this.$refs.doList.$on('getChoose', this.getChoose);
          this.$refs.doList.$on('closeChoose', this.closeChoose);
        }, 500);
      }
    },

    //获取选择
    getChoose(data) {
      this.dialogTableVisible = false;
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          //this.chooseItemss = data;
          this.loading = true;
          getDossier(this.$route.query.id, data.join(',')).then((response) => {
            if (response.code == 200) {
              this.dossier = response.data;
            }
            this.loading = false;
          });
        }
      }
    },

    handleClick(val) {
      switch (this.activeName) {
        case 'contract':
          this.$refs.contract.getList(this.$route.query.id);
          break;
        case 'certificate':
          this.$refs.certificate.getList(this.$route.query.id);
          break;
        case 'works':
          this.$refs.works.getList(this.$route.query.id);
          break;
        case 'achievement':
          this.$refs.achievement.getList(this.$route.query.id);
          break;
        default:
          break;
      }
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      // userExportList(this.$route.query.id);
      this.$refs.BeforeDown.downSourceId = this.$route.query.id;
      this.$refs.BeforeDown.show();
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
      this.$refs.doList.clearSel();
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //重新生成
    reMark() {
      this.chooseDossier();
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        this.getDossier();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    padding: 20px;
    min-width: 1220px;
    .top {
      margin: 0px;
      padding: 0px;
      background: pink;
      .topbg {
        display: block;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .main {
      background: #fff;

      .mt {
        font-family: Alibaba PuHuiTi 2;
        font-size: 24px;
        font-weight: 500;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: left;
        padding: 10px 10px;
        height: 100px;
        img {
          transform: translate(0, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 5px solid #fff;
        }
        span {
          display: inline-block;
          //transform: translate(25px, -90px);头像展示后位置
          transform: translate(-90px, -90px);
        }
        .el-button {
          float: right;
          margin-left: 15px;
          border: 0;
          min-width: 100px;
        }
      }

      .mb {
        ::v-deep .el-tabs {
          .el-tabs__nav-wrap {
            padding-left: 20px;
          }

          .el-tabs__content {
            padding: 20px;
          }
        }
      }
    }

    // ::v-deep .el-dialog {
    //   width: 350px;
    //   min-width: 350px;
    // }
    // ::v-deep .el-dialog:not(.is-fullscreen) {
    //   margin-top: 20vh !important;
    // }
  }
}
</style>
