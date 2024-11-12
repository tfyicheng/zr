<template class="app-container">
  <div>
    <el-cascader
      :key="modalKey"
      v-model="certdata"
      :options="propdict"
      :props="{ checkStrictly: true }"
      ref="cascaderCert"
      placeholder="请选择证书类型"
      @change="selectChange"
      clearable
    ></el-cascader>
  </div>
</template>

<script>
import { number } from 'echarts';
export default {
  name: 'CertCascader',
  dicts: ['certificate_category', 'person_cert'],
  props: {
    type: { type: Number, default: 0 }, //0公司证书，1个人证书
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
      if (this.type == 0) {
        this.getDicts('certificate_category').then((response) => {
          // console.log(response.data);
          this.propdict = response.data.map((c) => {
            return {
              value: c.dictValue,
              label: c.dictLabel,
              children: c.children?.map((c) => {
                return {
                  value: c.dictValue,
                  label: c.dictLabel,
                  children: c.children?.map((c) => {
                    return {
                      value: c.dictValue,
                      label: c.dictLabel,
                    };
                  }),
                };
              }),
            };
          });
        });
      } else if (this.type == 1) {
        this.getDicts('person_cert').then((response) => {
          // console.log(response.data);
          this.propdict = response.data.map((c) => {
            return {
              value: c.dictValue,
              label: c.dictLabel,
              children: c.children?.map((c) => {
                return {
                  value: c.dictValue,
                  label: c.dictLabel,
                  children: c.children?.map((c) => {
                    return {
                      value: c.dictValue,
                      label: c.dictLabel,
                    };
                  }),
                };
              }),
            };
          });
        });
      }
    },

    //选择值
    selectChange(value) {
      this.$emit('update:data', value);

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
          console.log('回传证书联动的数据:', this.data);
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
