<template class="app-container">
  <div>
    <div v-if="type == 0">
      <el-tooltip
        effect="dark"
        :content="this.chooseVal"
        placement="top-start"
        :disabled="!this.chooseVal || this.chooseVal == 0"
      >
        <el-input v-model="this.chooseVal" placeholder="点击选择" readonly>
          <svg-icon
            slot="suffix"
            icon-class="choose"
            style="cursor: pointer; margin-right: 10px"
            @click.native="SelectVal"
          />
          <i
            slot="suffix"
            style="cursor: pointer; width: 24px; height: 14px; color: red"
            class="el-icon-circle-close"
            @click="handleEmpty"
          ></i>
        </el-input>
      </el-tooltip>
    </div>

    <div v-if="type == 2">
      <el-input
        type="text"
        v-model="inputdata"
        @input="updateValue()"
        placeholder="请选择或输入"
        :maxlength="commonFun.inputMax"
        clearable
      >
        <svg-icon
          slot="suffix"
          icon-class="choose"
          style="cursor: pointer; margin-right: 5px"
          @click.native="SelectVal"
      /></el-input>
    </div>

    <el-dialog :visible.sync="dialogTableVisible">
      <ClieList v-show="this.ChooseOne == 'cList'" :Multiple="Multiple" :type="type" ref="cList" />
    </el-dialog>
  </div>
</template>

<script>
import { custList } from '@/api/data/customer';
import ClieList from '@/views/components/dialog/clieList';
export default {
  name: 'ClieChoose',
  components: { ClieList },
  props: {
    //类型
    type: { type: Number, default: 0 },
    //参数
    data: [String, Object, Array, Number],
    // data: { type: any, default: () => {} },
    //绑定输入参数 应用于类型2，3
    value: [String, Object, Array, Number],
    //是否多选 默认true
    Multiple: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    backVal: [String, Object, Array, Number],
  },

  data() {
    return {
      modalKey: 0,
      chooseVal: null, //实际绑定的值
      inputdata: this.value, //输入框绑定的值
      formdata: this.data, //实际输出的值
      ChooseOne: '', //当前弹窗目标
      flag: false, //编辑时仅回显一次标记
      dialogTableVisible: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    updateValue() {
      //console.log(this.inputdata);
      this.$emit('update:value', this.inputdata);
    },

    //选择部门id
    SelectVal() {
      this.dialogTableVisible = true;
      this.ChooseOne = 'cList';
      this.$nextTick(() => {
        this.$refs.cList.$off('getChoose', this.getChoose);
        this.$refs.cList.$on('getChoose', this.getChoose);
        this.$refs.cList.$on('closeChoose', this.closeChoose);
        this.$refs.cList.getList();
      }, 500);
    },

    getChoose(data) {
      //console.log(data);
      this.dialogTableVisible = false;
      this.formdata = [];
      if (data && data.length > 0) {
        if (Array.isArray(data)) {
          let str = '';
          for (var i = 0; i < data.length; i++) {
            str += data[i].name + (i + 1 == data.length ? '' : '/');
            this.formdata.push(data[i].id);
          }
          this.chooseVal = str;
          console.log(this.chooseVal, this.Multiple);

          this.$emit('update:data', this.Multiple ? this.formdata : this.formdata[0]);
        }
      } else {
        this.handleEmpty();
      }
      this.$emit('getClie', data);
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    handleEmpty() {
      this.chooseVal = '';
      this.formdata = null;
      this.$emit('update:data', this.formdata);
      this.$emit('getClie', null);
      this.$refs.cList?.clearSel();
    },

    //数据回显处理
    getVal(val) {
      if (val) {
        custList({ pageNum: 1, pageSize: 999 }).then((response) => {
          if (response.rows) {
            let str = '';
            response.rows.forEach((item, index) => {
              for (var i = 0; i < val.length; i++) {
                if (item.id == val[i]) {
                  str += item.name + (i + 1 == val.length ? '' : '/');
                }
              }
              if (str != this.chooseVal) {
                this.chooseVal = str;
              }
            });
          }
        });
      }
    },
  },
  watch: {
    //回传
    data: {
      handler(val) {
        if (val) {
          //console.log('回传数据1:', this.data);
          if (!this.flag) {
            //console.log('初次回传数据1:', this.data);
            this.flag = true;
            //数据回显处理
            // if (!Array.isArray(val)) {
            //   this.getVal([val]);
            // } else {
            //   this.getVal(val);
            // }
          }
        }
      },
      deep: true,
      immediate: true,
    },

    //回显参数 只应用于类型  输入或选择
    value: {
      handler(val) {
        if (val) {
          //console.log('回传数据2:', val);
          this.inputdata = val;
        }
      },
      deep: true,
      immediate: true,
    },

    backVal: {
      handler(val) {
        if (val) {
          this.chooseVal = val;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 240px;
  height: 37px;
  ::v-deep.el-input__inner {
    height: 37px !important;
    padding-right: 60px;
    //border: red; //边框颜色
  }
  ::v-deep.el-input__inner::placeholder {
    font-size: 14px !important;
  }

  /* 修改清空按钮的背景颜色 */
  ::v-deep .el-input__suffix .el-input__clear {
    color: #f56c6c;
  }
}
.node {
  ::v-deep .el-input__inner {
    padding-right: 60px;
  }
}
</style>
