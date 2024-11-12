<template class="app-container">
  <div class="main">
    <div class="p1">
      <div class="container">
        <div class="item">姓名</div>
        <div class="item">{{ dossier.userInfo.userName }}</div>
        <div class="item">性别</div>
        <div class="item">{{ dossier.userInfo.sex }}</div>
        <div class="item">民族</div>
        <div class="item">{{ dossier.userInfo.nation }}</div>
        <div class="item">籍贯</div>
        <div class="item">{{ dossier.userInfo.nativePlace }}</div>
        <div class="item">政治面貌</div>
        <div class="item">{{ dossier.userInfo.political }}</div>
        <div class="item">身份证号码</div>
        <div class="item">{{ dossier.userInfo.idNum }}</div>
        <div class="item">出生日期</div>
        <div class="item">{{ dossier.userInfo.dateOfBirth }}</div>
        <div class="item">毕业时间</div>
        <div class="item">{{ dossier.userInfo.graduationDate }}</div>
        <div class="item">学历</div>
        <div class="item">{{ dossier.userInfo.education }}</div>
        <div class="item">毕业院校</div>
        <div class="item">{{ dossier.userInfo.graduationSch }}</div>
        <div class="item">联系号码</div>
        <div class="item">{{ dossier.userInfo.phone }}</div>
        <div class="item">邮箱</div>
        <div class="item">{{ dossier.userInfo.email }}</div>
        <div class="item">详细地址</div>
        <div class="item itemlast">{{ dossier.userInfo.fullAddr }}</div>
      </div>
    </div>
    <div class="p2" v-show="canShow(dossier.eduInfo)">
      <div class="pt">教 育 信 息</div>
      <div class="pc">
        <span v-html="coverInfo(dossier.eduInfo)"></span>
      </div>
    </div>
    <div class="p2" v-show="canShow(dossier.workInfo)">
      <div class="pt">履 历 信 息</div>
      <div class="pc">
        <span v-html="coverInfo(dossier.workInfo)"></span>
      </div>
    </div>
    <div class="p2" v-show="canShow(dossier.certInfo)">
      <div class="pt">个 人 证 书</div>
      <div class="pc">
        <span v-html="coverInfo2(dossier.certInfo)"></span>
      </div>
    </div>
    <div class="p2" v-show="canShow(dossier.contInfo)">
      <div class="pt">劳动合同</div>
      <div class="pc">
        <span v-html="coverInfo(dossier.contInfo)"></span>
      </div>
    </div>
    <div class="p2" v-show="canShow(dossier.performanceInfo)">
      <div class="pt">人 员 业 绩</div>
      <div class="pc">
        <span v-html="coverInfo(dossier.performanceInfo)"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Record', //个人档案表格
  dicts: ['sys_user_sex'],
  props: ['dossier'],
  data() {
    return {};
  },
  created() {},
  methods: {
    coverInfo(val) {
      try {
        if (val != null && val != undefined && val.length != 0) {
          let newval = '';
          let arr = val.toString().split(',');
          arr.forEach((item) => {
            newval += item + '<br>';
          });
          return newval;
        } else {
          return null;
        }
      } catch (error) {
        return val;
      }
    },

    //个人证书特殊处理
    coverInfo2(val) {
      try {
        if (val) {
          let newval = '';
          val.forEach((item) => {
            newval += item.str + '<br>';
          });
          return newval;
        } else {
          return val;
        }
      } catch (error) {
        return val;
      }
    },

    canShow(val) {
      if (val != null && val != undefined && val != [] && val.length != 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  .p1 {
    flex: 1;
    .container {
      display: grid;
      grid-template-rows: repeat(6, auto);
      grid-template-columns: repeat(2, 180px 2fr);

      .item {
        padding: 14px;
        border-width: 1px;
        border-color: #e4e6ed;
        border-style: solid;
        margin-top: -1px;
        margin-right: -1px;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }
      .itemlast {
        max-height: 500px;
        grid-column: 2 / span 3;
        overflow: auto;
      }
    }
  }
  .p2 {
    border: 1px solid #e4e6ed;
    margin-top: -1px;
    margin-right: -1px;
    .pt {
      height: 48px;
      text-align: center;
      line-height: 48px;
      font-size: 18;
      font-family: Alibaba PuHuiTi 2;
      font-weight: 500;
      background-color: #f3f4f8;
    }
    .pc {
      border-top: 1px solid #e4e6ed;
    }
  }
}
</style>
