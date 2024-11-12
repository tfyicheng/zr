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
      <ProjList :Multiple="false" ref="jList" />
    </el-dialog>
  </div>
</template>

<script>
import { projectList } from '@/api/data/project';

import ProjList from '@/views/components/dialog/projList';

export default {
  name: 'ProjChoose',
  components: { ProjList },
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
        this.$refs.jList.$off('getChoose', this.getChoose);
        this.$refs.jList.$on('getChoose', this.getChoose);
        this.$refs.jList.$on('closeChoose', this.closeChoose);
        this.$refs.jList.getList();
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
            str += data[i].prjName + (i + 1 == data.length ? '' : '/');
            this.formdata.push(data[i].id);
          }
          this.chooseVal = str;
          console.log(this.chooseVal, this.Multiple);
          this.$emit('update:data', this.Multiple ? this.formdata : this.formdata[0]);
        }
      } else {
        this.handleEmpty();
      }
      this.$emit('getDept', data);
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    handleEmpty() {
      this.chooseVal = '';
      this.formdata = null;
      this.$emit('update:data', this.formdata);
      this.$emit('getDept', null);
      this.$refs.jList.clearSel();
    },

    //数据回显处理
    getVal(val) {
      if (val) {
        projectList({ pageNum: 1, pageSize: 999 }).then((response) => {
          if (response.rows) {
            //注意是data还是row或其他字段
            let str = '';
            response.rows.forEach((item, index) => {
              for (var i = 0; i < val.length; i++) {
                if (item.id == val[i]) {
                  str += item.prjName + (i + 1 == val.length ? '' : '/');
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
            // console.log('初次回传数据1:', this.data);
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
