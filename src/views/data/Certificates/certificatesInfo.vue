<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <!-- <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          证书信息
        </div> -->
        <NavTop :val="['资料管理', '证书管理', '证书列表', '查看证书']" />
        <div class="main">
          <div class="p1">
            <!-- 
            <div class="p1item">
              <span>证 书 类 型</span>
              <span>
                {{
                  dict.type.cert_type[form.certType] ? dict.type.cert_type[form.certType].label : ''
                }}</span
              >
            </div> -->

            <div class="p1item">
              <span>证 书 编 号</span>
              <span>{{ form.certNumber }}</span>
            </div>
            <div class="p1item">
              <span>证 书 名 称</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.certName"></InputTip>
              </span>
            </div>
            <div class="p1item">
              <span>证 书 大 类</span>
              <span>
                <dict-tag :options="dict.type.certificate_category" :value="form.certParentType" />
              </span>
            </div>
            <div class="p1item">
              <span>证 书 中 类</span>
              <span>
                <dict-tag
                  :options="dict.type.certificate_category"
                  :value="[form.certParentType, form.certChildType]"
                />
              </span>
            </div>
            <div class="p1item">
              <span>证 书 小 类</span>
              <span>
                <dict-tag
                  :options="dict.type.certificate_category"
                  :value="[form.certParentType, form.certChildType, form.certGrandsonType]"
                />
              </span>
            </div>
            <div class="p1item">
              <span>项 目 名 称</span>
              <span>{{ form.prjName }}</span>
            </div>

            <div class="p1item">
              <span>获 得 组 织</span>
              <span>
                <InputTip :width="inputTipWidth" :text="foreignCertName"></InputTip>
              </span>
            </div>
            <div class="p1item">
              <span>颁 发 机 构</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.authority"></InputTip>
              </span>
            </div>
            <div class="p1item">
              <span>颁 发 时 间</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.issueDate"></InputTip>
              </span>
            </div>

            <div class="p1item">
              <span>到 期 时 间</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.expireDate"></InputTip>
              </span>
            </div>
            <!-- <div class="p1item">
              <span>证书有效年限</span>
              <span>
                <dict-tag :options="dict.type.cert_years" :value="form.validity" />
              </span>
            </div> -->
            <!-- <div class="p1item">
              <span>水 印 名 称</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.watermark"></InputTip>
              </span>
            </div> -->
          </div>

          <div class="p2">
            <div class="p2item">
              <div class="p2iteml" style="width: 120px; text-align: left">
                <span>备 注</span>
              </div>
              <div class="p2itemr">
                <el-input
                  type="textarea"
                  autosize
                  resize="none"
                  readonly
                  v-model="form.remark"
                ></el-input>
              </div>
            </div>
            <div class="p2item">
              <div class="p2iteml">
                <span>证 书 附 件</span>
              </div>
              <div class="p2itemr">
                <ul>
                  <li
                    @click="filePreview(c.annexId)"
                    style="cursor: hand"
                    v-for="c in form.files"
                    :key="c.index"
                  >
                    <svg-icon icon-class="file" />
                    <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div style="height: 2px"></div>
        </div>
        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" v-show="!form.canDown" @click="exportApply">申请导出</el-button>
          <el-button type="warning" v-show="form.canDown" @click="Output">导出</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>
        <ApplyDown
          ref="ApplyDown"
          :downSourceName="form.certName"
          :downSourceId="form.id"
          :type="0"
          @ok="applyHandle"
        />
        <BeforeDown ref="BeforeDown" :type="0" />
      </div>
    </div>
  </div>
</template>

<script>
import { certDown } from '@/api/data/file';
import ApplyDown from '@/views/components/dialog/applyDown';
import { certInfo0 } from '@/api/data/certificate';
export default {
  name: 'CertificatesInfo', //证书信息
  dicts: ['certificate_category', 'cert_type', 'cert_years'],
  components: { ApplyDown },
  data() {
    return {
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {
        // name: '一级建造师',//名称
        // number: '75623565635256',//编号
        // type1: '资质证书',//大类
        // type2: '资质证书',//中类
        // type3: '资质证书',//小类
        // typeName: '人员证书',//类型名称
        // level: '3',//等级
        // age: '3',//年限
        // owner: '张学友',//获得组织、人员
        // institutional : '全国住房建设管理局',//颁发机构
        // time: '2020-11-11',//颁发时间
        // watermark: '珠荣工程设计有限公司',//水印
        // remark: '珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有珠荣工程设计有限公司所有',//备注
        // remark: '有限公司所有程有珠荣工程有珠荣工程有珠荣工程',//备注
        // att:'@/assets/401_images/401.gif'//附件
      },
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      canDown: false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.loading = true;
        certInfo0(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
        console.log(this.dict.type.cert_years);
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      //this.$router.push({ path: '/data-d/certificatesCheck' });
      this.$router.go(-1);
    },

    //文件预览
    filePreview(val) {
      this.fileview = 'about:blank';
      setTimeout(() => {
        this.fileview = process.env.VUE_APP_BASE_API + '/file/preview/' + val;
      }, 200);

      this.dialogTableVisible = true;
    },

    istooltipshow(val) {
      console.log(val.substr(-3));
      console.log(val);
      if (val.substr(-3) === '...') {
        return true;
      } else {
        return false;
      }
    },

    //刷新视图
    refreshView() {
      this.$store.dispatch('tagsView/delAllCachedViews', this.$route); //删除当前路径所有缓存视图
      const { fullPath } = this.$route; //获取全路径
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },

    //申请导出组件监听
    applyHandle(val) {
      if (val) {
        console.log(val);
      }
    },

    //申请导出
    exportApply() {
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output() {
      // certDown(this.form.id);
      if ((this.form.files && this.form.files.length == 0) || this.form.files == null) {
        this.$message.error('没有可导出的附件');
        return;
      }
      this.$refs.BeforeDown.downSourceId = this.form.id;
      this.$refs.BeforeDown.show();
    },
  },

  computed: {
    //组织或人员
    foreignCertName: function () {
      try {
        let foreignCertNames = '';
        for (var i = 0; i < this.form.foreignCert.length; i++) {
          foreignCertNames +=
            this.form.foreignCert[i].userOrDeptName +
            (i + 1 == this.form.foreignCert.length ? '' : '/');
        }
        return foreignCertNames;
      } catch (error) {
        return null;
      }
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name) {
        this.getInfo();
        //this.refreshView();
        this.$tab.refreshPage();
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
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 370px;
            height: 60px;
            span {
              margin-left: 20px;
              float: left;
              line-height: 60px;
              font-size: 16px;
            }
            span:last-child {
              width: 225px;
            }
            ::v-deep .el-input__inner {
              border: 0;
              width: 225px;
            }
            .el-button {
              margin-left: 12px;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            height: auto;
            margin-bottom: 35px;
            margin-top: 20px;
            vertical-align: bottom;
            .p2iteml {
              flex: 1;
              max-width: 130px;
              height: 24px;
              float: left;
              span {
                text-align: center;
                margin: 0 20px 0 25px;
                font-family: Alibaba PuHuiTi 2;
                font-size: 16px;
                font-weight: 500;
                height: auto;
              }
            }

            .p2itemr {
              display: inline-block;
              flex: 1;
              ::v-deep .el-textarea {
                width: 1050px;
                max-height: 300px !important;
                border-radius: 4px;
                background: #fff;
                .el-textarea__inner {
                  max-height: 300px;
                  border: 0;
                  padding: 0px;
                  font-size: 16px;
                  font-weight: 400;
                  letter-spacing: 0em;
                  font-family: Arial, Helvetica, sans-serif;
                }
              }
              ul {
                max-height: 150px;
                overflow: auto;
                list-style-type: none;
                margin: 0px 5px;
                padding: 0px;
                li {
                  margin-bottom: 5px;
                }
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
