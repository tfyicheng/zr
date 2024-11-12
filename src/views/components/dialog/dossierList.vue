<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <el-checkbox
              style="margin-left: 20px"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <el-checkbox-group v-model="chooseItemss">
              <el-checkbox
                v-for="(c, index) in dict.type.gen_dossier_menu"
                :label="c.label"
                :value="c.value"
                :key="index + 1"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="p4">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DossierList', //选择生成的档案项
  dicts: ['gen_dossier_menu'],
  props: {
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '生成个人档案',
      chooseItemss: [], // 选中项
      checkAll: false,
      isIndeterminate: false,
    };
  },

  created() {},

  mounted() {},
  methods: {
    handleCheckAllChange(val) {
      let all = this.dict.type.gen_dossier_menu.map((c) => {
        return c.label;
      });
      //console.log(val, all, this.chooseItemss);
      this.chooseItemss = val ? all : [];
      this.isIndeterminate = false;
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItemss = [];
      rows.forEach((element) => {
        this.chooseItemss.push(element);
      });
    },

    //清空选中
    clearSel() {
      this.chooseItemss = [];
      this.isIndeterminate = false;
      this.checkAll = false;
    },

    //保存
    save() {
      console.log(this.chooseItemss);
      this.chooseItemss = this.chooseItemss.map((item) => {
        return this.dict.type.gen_dossier_menu.find((i) => i.label === item).value;
      });
      console.log(this.chooseItemss);
      if (!this.Multiple) {
        if (this.chooseItemss.length > 1) {
          this.$modal.msgError('请勿选择多项数据');
          this.clearSel();
        } else {
          this.$emit('getChoose', this.chooseItemss);
        }
      } else {
        this.$emit('getChoose', this.chooseItemss);
      }
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
    },

    //返回
    goback() {
      this.$emit('closeChoose');
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
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
    ::v-deep .el-input__inner {
      border-color: #c0c4cc;
    }
    .p1 {
      .el-checkbox-group {
        margin-left: 20px;
        .el-checkbox {
          display: block;
          margin-top: 10px;
        }
      }
    }

    .p4 {
      margin: 0px 15px;

      .el-button {
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

  ::v-deep .popperClass {
    position: absolute !important;
  }
}
</style>
