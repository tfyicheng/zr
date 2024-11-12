<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">
          <svg-icon icon-class="back" style="cursor: hand" @click="goback" />
          人员外出信息
        </div>
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span>申 请 部 门</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.applyDept"></InputTip>
              </span>
            </div>

            <div class="p1item">
              <span>申 请 人</span>
              <span>
                <InputTip :width="inputTipWidth" :text="form.applyUser"></InputTip>
              </span>
            </div>
            <div class="p1item">
              <span>业 务 类 型</span>
              <span>
                <dict-tag :options="dict.type.out_type" :value="form.businessType" />
              </span>
            </div>

            <div class="p1item">
              <span>状 态</span>
              <span>
                <dict-tag :options="dict.type.approval_status" :value="form.status" />
              </span>
            </div>

            <div class="p1item">
              <span>开 始 时 间</span>
              <span>{{ form.startTime }}</span>
            </div>

            <div class="p1item">
              <span>结 束 时 间</span>
              <span>{{ form.endTime }}</span>
            </div>
          </div>

          <div class="p2">
            <div class="p2item">
              <div class="p2iteml" style="width: 120px; text-align: left">
                <span>事 由</span>
              </div>
              <div class="p2itemr">
                <el-input
                  type="textarea"
                  autosize
                  resize="none"
                  readonly
                  v-model="form.reason"
                ></el-input>
              </div>
            </div>
            <div class="p2item">
              <div class="p2iteml">
                <span>附 件</span>
              </div>
              <div class="p2itemr">
                <ul>
                  <li
                    @click="filePreview(c.annexId)"
                    style="cursor: hand"
                    v-for="c in form.annex"
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
        </div>

        <el-dialog :visible.sync="dialogTableVisible" class="iframe" v-el-drag-dialog>
          <iframe width="100%" height="100%" :src="fileview"></iframe>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { approveInfoo } from '@/api/data/person';
export default {
  name: 'PersonOutInfo', //人员外出信息
  dicts: ['approval_status', 'out_type'],
  data() {
    return {
      inputTipWidth: this.commonFun.inputTipWidth,
      form: {},
      dialogTableVisible: false,
      fileview: '', //文件预览地址
      flagId: null,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        approveInfoo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
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
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        //this.getInfo();
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
