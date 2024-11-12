<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['人员管理', '履职经历管理', '履职经历列表', '履职经历详情']" />
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>开 始 时 间</span>
                <span><InputTip :width="inputTipWidth" :text="form.startDate"></InputTip></span>
              </div>
              <div class="p1item">
                <span>结 束 日 期</span>
                <span> <InputTip :width="inputTipWidth" :text="form.endDate"></InputTip></span>
              </div>
              <div class="p1item">
                <span>人 员 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.userName"></InputTip></span>
              </div>
              <div class="p1item">
                <span>单 位 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.unitName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>部 门 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.deptName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>职 位 名 称</span>
                <span> <InputTip :width="inputTipWidth" :text="form.postName"></InputTip></span>
              </div>

              <div class="p1item">
                <span>证 明 人</span>
                <span> <InputTip :width="inputTipWidth" :text="form.certifier"></InputTip></span>
              </div>

              <div class="p1item">
                <span>证明人号码</span>
                <span>
                  <InputTip :width="inputTipWidth" :text="form.certifierPhone"></InputTip
                ></span>
              </div>
            </div>
            <div class="p2">
              <div class="p2item">
                <div class="p2iteml">
                  <span class="p2itemlt">经 历 描 述</span>
                </div>
                <div class="p2itemr">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.careerDesc"
                  ></el-input>
                </div>
              </div>

              <!-- <div class="p2item">
                <div class="p2iteml">
                  <span>合 同 附 件</span>
                </div>
                
                <div class="p2itemr">
                  <FilePreview :data="form.files" />
                 
                </div>
              </div> -->
            </div>
          </div>
          <div style="height: 20px"></div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button @click="Output" type="warning">导出</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { workInfo } from '@/api/data/person';

export default {
  name: 'PersonResumeInfo', //履职经历信息

  data() {
    return {
      maxtbheigth: '300',
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
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
        workInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //导出
    Output() {},

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
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        //this.getInfo();
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
        display: inline-block;
        .mainl {
          float: left;
        }
        .mainr {
          float: right;
          text-align: center;
          .el-button {
            margin-top: 25px;
            display: inline-block;
            width: 100px;
            height: 40px;
          }
        }
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
            span:first-child {
              width: 100px;
            }

            .el-button {
              margin-left: 12px;
            }
            //下划线标记
            .mark {
              color: #409eff;
              text-decoration-line: underline;
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
              height: 24px;
              float: left;
              span {
                display: inline-block;
                text-align: center;
                margin: 0 25px;
                font-size: 16px;
                font-weight: 500;
                height: auto;
                width: 100px;
              }
              div {
                display: inline-block;
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
                  font-family: Alibaba PuHuiTi 2;
                  font-size: 16px;
                  font-weight: 400;
                  letter-spacing: 0em;
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
