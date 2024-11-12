<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['车辆管理', '车辆统计', '车辆列表', '车辆详情']" />
        <div class="main">
          <div class="mainl">
            <div class="p1">
              <div class="p1item">
                <span>品 牌</span>
                <span><InputTip :width="inputTipWidth" :text="form.brand"></InputTip></span>
              </div>
              <div class="p1item">
                <span>购 买 日 期</span>
                <span> <InputTip :width="inputTipWidth" :text="form.buyDate"></InputTip></span>
              </div>

              <div class="p1item">
                <span>状 态</span>
                <span>
                  <dict-tag :options="dict.type.cat_status" :value="form.status" />
                </span>
              </div>

              <div class="p1item">
                <span>发 动 机 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.engineNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>车 架 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.frameNumber"></InputTip></span>
              </div>

              <div class="p1item">
                <span>型 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.model"></InputTip></span>
              </div>

              <div class="p1item">
                <span>车 牌 号</span>
                <span> <InputTip :width="inputTipWidth" :text="form.plateNumber"></InputTip></span>
              </div>
            </div>
            <div class="p2">
              <div class="p2item">
                <div class="p2iteml">
                  <span>车 辆 照 片</span>
                </div>
                <div class="p2itemr">
                  <FilePreview :data="form.carPicFile" />
                  <!-- <ul>
                    <li
                      @click="filePreview(c.annexId)"
                      style="cursor: hand"
                      v-for="c in form.carPicFile"
                      :key="c.index"
                    >
                      <svg-icon icon-class="file" />
                      <a style="cursor: hand; color: #409eff"> {{ c.originalName }}</a>
                    </li>
                  </ul> -->
                </div>
              </div>
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
import { carInfo } from '@/api/data/car';
export default {
  name: 'CarManagementInfo', //车辆信息
  dicts: ['approval_status', 'cat_status'],
  data() {
    return {
      maxtbheigth: '300',
      form: {},
      inputTipWidth: this.commonFun.inputTipWidth,
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
        carInfo(this.$route.query.id).then((response) => {
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
              // ul {
              //   max-height: 150px;
              //   overflow: auto;
              //   list-style-type: none;
              //   margin: 0px 5px;
              //   padding: 0px;
              //   li {
              //     margin-bottom: 5px;
              //   }
              // }
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
