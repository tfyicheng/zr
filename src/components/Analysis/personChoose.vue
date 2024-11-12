<template class="app-container">
  <div>
    <div v-if="type == 0 || type == 4">
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
    <!-- :disabled="!extra" -->
    <div v-if="type == 2 || type == 3">
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
      <PersonList :Multiple="Multiple" :type="type" :extra="extra" ref="pList" />
    </el-dialog>
  </div>
</template>

<script>
import { personList } from '@/api/data/person';

import PersonList from '@/views/components/dialog/personlist';

export default {
  name: 'PersonChoose',
  components: { PersonList },
  props: {
    //类型 //参考personList
    type: {
      type: Number,
      default: 4,
    },
    //额外参数
    extra: [String, Object, Array, Number],
    //参数
    data: [String, Object, Array, Number],
    //绑定输入参数 应用于类型2，3
    value: [String, Object, Array, Number],
    //是否多选 默认true
    Multiple: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //回显的数据
    backVal: [String, Object, Array, Number],
  },

  data() {
    return {
      modalKey: 0,
      chooseVal: null, //实际绑定的值
      inputdata: this.value, //输入框绑定的值
      formdata: this.data, //实际输出的值
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

    //选择
    SelectVal() {
      console.log(this.type);
      if (this.type == 2 || this.type == 3) {
        if (this.extra == null) {
          this.$message.error('请先选择客户');
          return;
        }
      }
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs.pList.$off('getChoose', this.getChoose);
        this.$refs.pList.$on('getChoose', this.getChoose);
        this.$refs.pList.$on('closeChoose', this.closeChoose);
        this.$refs.pList.getList();
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
            str += data[i].userName + (i + 1 == data.length ? '' : '/');
            this.formdata.push(data[i].userId);
          }
          this.chooseVal = str;
          console.log(this.chooseVal, this.Multiple);
          this.$emit('update:data', this.Multiple ? this.formdata : this.formdata[0]);
        }
      } else {
        this.handleEmpty();
      }
      this.$emit('getPerson', data);
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    handleEmpty() {
      this.chooseVal = '';
      this.formdata = null;
      this.$emit('update:data', this.formdata);
      this.$emit('getPerson', null);
      this.$refs.pList.clearSel();
    },

    //数据回显处理
    getVal(val) {
      if (val) {
        personList({ pageNum: 1, pageSize: 999 }).then((response) => {
          if (response.rows) {
            let str = '';
            response.rows.forEach((item, index) => {
              for (var i = 0; i < val.length; i++) {
                if (item.userId == val[i]) {
                  str += item.userName + (i + 1 == val.length ? '' : '/');
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
  }
  ::v-deep .el-input__inner::placeholder {
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
