<template class="app-container">
  <div>
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

    <el-dialog :visible.sync="dialogTableVisible">
      <PaymentNodeList ref="dList" :id="id" :type="type" :Multiple="Multiple" />
    </el-dialog>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import PaymentNodeList from '@/views/components/dialog/paymentNodelist';
export default {
  name: 'DeptChoose',
  components: { PaymentNodeList },
  props: {
    //类型
    type: [Number],
    //参数
    data: [String, Object, Array, Number],
    // data: { type: any, default: () => {} },
    //是否多选 默认true
    Multiple: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    //额外参数
    id: [String, Object, Array, Number],
    //回显的数据
    backVal: [String, Object, Array, Number],
  },

  data() {
    return {
      modalKey: 0,
      chooseVal: null, //实际绑定的值
      formdata: this.data, //实际输出的值
      flag: false, //编辑时仅回显一次标记
      dialogTableVisible: false,
    };
  },
  created() {},
  mounted() {},
  methods: {
    //选择部门id
    SelectVal() {
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs.dList.$off('getChoose', this.getChoose);
        this.$refs.dList.$on('getChoose', this.getChoose);
        this.$refs.dList.$on('closeChoose', this.closeChoose);
        this.$refs.dList.getList();
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
            str += data[i].nodeName + (i + 1 == data.length ? '' : '/');
            this.formdata.push(data[i].id);
          }
          this.chooseVal = str;
          console.log(this.chooseVal, this.Multiple);
          this.$emit('update:data', this.Multiple ? this.formdata : this.formdata[0]);
        }
      } else {
        this.handleEmpty();
      }
      this.$emit('getNode', data);
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    handleEmpty() {
      this.chooseVal = '';
      this.formdata = null;
      this.$emit('update:data', this.formdata);
      this.$emit('getNode', null);
      this.$refs.dList.clearSel();
    },
  },
  watch: {
    //回传
    data: {
      handler(val) {
        if (val) {
          //console.log('回传数据:', val);
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
  ::v-deep.el-input__inner::placeholder {
    font-size: 14px !important;
  }
}
.node {
  ::v-deep .el-input__inner {
    padding-right: 60px;
  }
}
</style>
