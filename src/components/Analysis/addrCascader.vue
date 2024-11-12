<template class="app-container">
  <div>
    <el-cascader
      :class="{ flag: backVal != '请选择区域' }"
      :key="modalKey"
      v-model="area"
      :props="props"
      ref="cascaderAddr"
      :placeholder="backVal"
      @change="areaChange"
      clearable
    ></el-cascader>
  </div>
</template>

<script>
import { getCity, getProvince } from '@/api/system/user';
import store from '../../store';
export default {
  name: 'AddrCascader',
  props: {
    // 值
    value: [String, Object, Array],
    //参数
    data: { type: Array, default: () => {} },
  },

  data() {
    return {
      modalKey: 0,
      area: [], //实际绑定的值
      formdata: this.data, //实际输出的值
      //级联选择配置
      props: {
        checkStrictly: true,
        lazy: true,
        lazyLoad(node, resolve) {
          if (node.level == 0) {
            //组件初始化必先访问一次省接口，将接口数据放置store减少访问量
            if (store.state.user.provinceData && store.state.user.provinceData.length > 0) {
              const nodes = store.state.user.provinceData.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            } else {
              getCity().then((response) => {
                const nodes = response.data.map((item) => ({
                  value: item.id,
                  label: item.name,
                }));
                resolve(nodes);
              });
            }
          } else if (node.level == 1) {
            getProvince(node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
              }));
              resolve(nodes);
            });
          } else if (node.level == 2) {
            getCity(node.parent.value, node.value).then((response) => {
              const nodes = response.data.map((item) => ({
                value: item.id,
                label: item.name,
                leaf: node.level == 2,
              }));
              resolve(nodes);
            });
          } else if (node.level == 3) {
            resolve(null);
          }
        },
      },
      flag: false, //编辑时仅回显一次标记
      backVal: '请选择区域',
    };
  },
  created() {},
  mounted() {},
  methods: {
    //清空数据
    clearSel() {
      this.area = [];
      this.formdata = [];
      this.backVal = '请选择区域';
      this.$emit('update:data', []);
    },

    //选择区域的值
    areaChange(value) {
      if (this.$refs.cascaderAddr && this.$refs.cascaderAddr.checkedValue.length === 0) {
        this.area = [];
        this.formdata = [];
        this.backVal = '请选择区域';
        this.$emit('update:data', []);
      } else {
        const checkedNodes = this.$refs['cascaderAddr'].getCheckedNodes();
        this.area = value;
        this.formdata = [
          checkedNodes[0].pathLabels[0] ? checkedNodes[0].pathLabels[0] : '',
          checkedNodes[0].pathLabels[1] ? checkedNodes[0].pathLabels[1] : '',
          checkedNodes[0].pathLabels[2] ? checkedNodes[0].pathLabels[2] : '',
        ];
        this.$emit('update:data', this.formdata);
      }
    },

    //区域数据回显  回显导致接口访问量加大弃用改为修改placeholder
    getArea(resdata) {
      if (resdata.areaProvince) {
        getCity().then((response) => {
          response.data.forEach((item) => {
            if (item.name === resdata.areaProvince) {
              this.area[0] = item.id;
              this.formdata = this.area;
              this.modalKey++; //更新应该放在最后一次回填
              this.$forceUpdate(); // 级联组件-回显需要强制更新
              if (resdata.areaCity) {
                getCity(this.area[0]).then((response) => {
                  console.log('回传2', this.area[0]);
                  response.data.forEach((item) => {
                    if (item.name == resdata.areaCity) {
                      this.area[1] = item.id;
                      this.formdata = this.area;
                      this.modalKey++;
                      this.$forceUpdate(); // 级联组件-回显需要强制更新
                      if (resdata.areaRegion && this.area[0] && this.area[1]) {
                        getCity(this.area[0], this.area[1]).then((response) => {
                          console.log('回传3', this.area[0], this.area[1]);
                          response.data.forEach((item) => {
                            if (item.name == resdata.areaRegion) {
                              this.area[2] = item.id;
                              this.formdata = this.area;
                              this.modalKey++; //改变key值，组件重新渲染，实现回填功能
                              this.$forceUpdate(); // 级联组件-回显需要强制更新
                            }
                          });
                        });
                      }
                    }
                  });
                });
              }
            }
            // console.log(this.area);
          });
        });
      }
    },

    //区域数据回显 方案2
    backArea(resdata) {
      this.backVal = this.commonFun.coverRegin(
        resdata.areaProvince,
        resdata.areaCity,
        resdata.areaRegion,
        '/',
      );
    },
  },
  watch: {
    //回传
    data: {
      handler(val) {
        if (val) {
          //  console.log('回传数据:', val, this.data);

          // if (!this.flag) { 方案一，仅标记第一次
          //   this.flag = true;
          //   //console.log('初次回传数据:', this.data);添加给默认值，编辑不用
          //   //区域数据回显处理
          //   let vall = {
          //     areaProvince: val[0] != null ? val[0] : null,
          //     areaCity: val[1] != null ? val[1] : null,
          //     areaRegion: val[2] != null ? val[2] : null,
          //   };
          //   this.getArea(vall);
          // }

          //方案二，特殊标记处理，仅接受外部回显处理
          if (val[0] == 'backVal') {
            //区域数据回显处理
            let vall = {
              areaProvince: val[1] != null ? val[1] : null,
              areaCity: val[2] != null ? val[2] : null,
              areaRegion: val[3] != null ? val[3] : null,
            };
            //this.getArea(vall);
            //方案三，优化接口访问量，改为placeholder回显
            this.backArea(vall);
          }
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

.el-cascader.flag {
  ::v-deep.el-input__inner::placeholder {
    color: #606266;
  }
}
</style>
