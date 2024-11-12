<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['资料管理', '安全生产资料管理', '安全生产资料详情']" />
        <div class="main" v-if="false">
          <div class="p0">
            <el-form :model="form" :inline="true" class="info" @submit.native.prevent>
              <el-form-item label="标 题">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.title"></InputTip>
                </div>
              </el-form-item>
              <el-form-item label="供 稿 部 门" prop="contName">
                <div class="info">
                  <InputTip :width="inputTipWidth" :text="form.deptName"></InputTip>
                </div>
              </el-form-item>

              <el-form-item label="专 题 类 型" prop="paymentType">
                <div class="info">
                  <dict-tag :options="dict.type.safety_production_type" :value="form.type" />
                </div>
              </el-form-item>

              <el-form-item label="发 布 时 间" prop="paymentDate">
                <div class="info">
                  <!-- <span>{{ commonFun.coverTime(form.contStartDate) }}</span> -->
                  <span>{{ form.releaseTime }}</span>
                </div>
              </el-form-item>

              <el-form-item label="点击数">
                <div class="info">{{ form.clickNum }}</div>
              </el-form-item>

              <el-form-item class="pline" :label="'最后更新\n时间'">
                <div class="info">{{ form.updateTime }}</div>
              </el-form-item>

              <el-form-item label="内 容" class="remark">
                <div class="info">
                  <el-input
                    type="textarea"
                    autosize
                    resize="none"
                    readonly
                    v-model="form.content"
                  ></el-input>
                </div>
              </el-form-item>
              <!-- -->
              <el-form-item label="附 件" class="file">
                <FilePreview :data="form.files" />
              </el-form-item>
            </el-form>
          </div>
        </div>

        <div class="obody">
          <div class="ibody">
            <div id="printSection">
              <div class="title">
                <span>{{ form.title }}</span>
              </div>
              <div class="info">
                <span>{{ form.deptName }}</span>
                <span>{{ form.releaseTime }}</span>
              </div>
              <div class="content">
                {{ form.content }}
              </div>
            </div>
            <div>
              <div class="file">附件</div>
              <FilePreview :data="form.files" :type="0" :extra="form.id" />
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <!-- <el-button type="warning" @click="print">打印</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { safeInfo } from '@/api/data/safe';
export default {
  name: 'SafeInfo', //管理员安全专题详情
  dicts: ['safety_production_type'],
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
        safeInfo(this.$route.query.id).then((response) => {
          if (response.data) {
            this.form = response.data;
          }
        });
      }
    },

    //返回
    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    print() {
      // window.print(); // 调用浏览器的打印功能会打印全页面内容
      let newstr = document.getElementById('printSection').innerHTML;
      let oldstr = document.body.innerHTML;
      document.body.innerHTML = newstr;
      window.print();
      document.body.innerHTML = oldstr;
      location.reload(); //改变dom需要刷新否则页面无法操作
      return false;
    },
  },

  // 使用 watch 监听路由变化，手动更新数据
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        // this.getInfo();
        this.$tab.refreshPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/commonAE.scss';

.obody {
  background: #fff;
  border-radius: 4px;
  .ibody {
    width: 880px;
    margin: 0px auto;
    .title {
      text-align: center;
      font-size: 38px;
      font-weight: 400;
      max-width: 850px;
      padding: 25px 0;
    }
    .info {
      font-size: 14px;
      font-weight: 400;
      line-height: 19.6px;
      text-align: left;
      color: #999999;
      span:last-child {
        float: right;
      }
      padding-bottom: 10px;
      margin-bottom: 20px;
      border-bottom: 1px solid #e4e7ed;
    }
    .content {
      margin: 35px 0;
      width: 100%;
      max-height: 360px;
      overflow-y: auto;
      color: #666666;
      font-size: 16px;
    }
    .file {
      margin-bottom: 10px;
      color: #666666;
    }
  }
}

@media print {
  .title {
    text-align: center;
    font-size: 38px;
    font-weight: 400;
    max-width: 850px;
    padding: 25px 0;
  }
  .info {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.6px;
    text-align: left;
    color: #999999;
    span:last-child {
      float: right;
    }
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e4e7ed;
  }
  .content {
    margin: 35px 0;
    width: 100%;
    color: #666666;
    font-size: 16px;
  }
}
</style>
