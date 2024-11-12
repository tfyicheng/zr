<template class="app-container">
  <div>
    <el-cascader
      :key="modalKey"
      v-model="certdata"
      :options="propdict"
      :props="{ checkStrictly: true }"
      ref="cascaderCert"
      placeholder="请选择部门"
      @change="selectChange"
      clearable
    ></el-cascader>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
export default {
  name: 'DeptCascader',
  //dicts: ['certificate_category', 'person_cert'],
  props: {
    type: { type: Number, default: 0 }, //
    // 值
    value: [String, Object, Array],
    //参数
    data: { type: Array, default: () => {} },
  },

  data() {
    return {
      modalKey: 0,
      certdata: this.data,
      propdict: [],
    };
  },
  created() {},
  mounted() {
    this.getdict();
  },
  methods: {
    //获取字典值
    getdict() {
      listDept(this.queryParams).then((response) => {
        this.deptList = this.handleTree(response.data, 'deptId');
        if (this.deptList != null && this.deptList.length > 0) {
          //console.log(this.deptList);
          this.propdict = this.deptList.map((c) => {
            return {
              value: c.deptId,
              label: c.deptName,
              children: c.children?.map((c) => {
                return {
                  value: c.deptId,
                  label: c.deptName,
                  children: c.children?.map((c) => {
                    return {
                      value: c.deptId,
                      label: c.deptName,
                      children: c.children?.map((c) => {
                        return {
                          value: c.deptId,
                          label: c.deptName,
                          children: c.children?.map((c) => {
                            return {
                              value: c.deptId,
                              label: c.deptName,
                            };
                          }),
                        };
                      }),
                    };
                  }),
                };
              }),
            };
          });
        }
      });
    },

    //选择值
    selectChange(value) {
      this.$emit('update:data', value);
      this.$emit('getSelect', value);
      if (this.$refs.cascaderCert && this.$refs.cascaderCert.checkedValue.length === 0) {
        // this.form.areaProvince = '';
        // this.form.areaCity = '';
        // this.form.areaRegion = '';
        this.certdata = [];
      } else {
        const checkedNodes = this.$refs['cascaderCert'].getCheckedNodes();
        //this.certdata = value;
        // this.form.areaProvince = checkedNodes[0].pathLabels[0] ? checkedNodes[0].pathLabels[0] : '';
        // this.form.areaCity = checkedNodes[0].pathLabels[1] ? checkedNodes[0].pathLabels[1] : '';
        // this.form.areaRegion = checkedNodes[0].pathLabels[2] ? checkedNodes[0].pathLabels[2] : '';
      }
    },
  },
  watch: {
    //回传
    data: {
      handler(val) {
        if (val) {
          this.certdata = val.map((c) => {
            return c + '';
          });
          //this.modalKey++;
          console.log('回传部门联动的数据:', this.data);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.el-cascader {
  width: 240px;
  height: 37px;
  ::v-deep.el-input__inner {
    height: 37px !important;
  }
  ::v-deep.el-input__inner::placeholder {
    font-size: 14px !important;
  }
}
</style>
