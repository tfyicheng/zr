<template>
  <div>
    <template v-for="(item, index) in options2">
      <template v-if="values.includes(item.value)">
        <!-- 字典显示组件 -->
        <!-- <el-link>
        </el-link> -->

        <span v-if="flag" :key="item.value" :index="index" :class="item.raw.cssClass">
          {{ item.label + ' ' }}
        </span>
        <span v-else>
          <span
            v-if="item.raw.listClass == 'default' || item.raw.listClass == ''"
            :key="item.value"
            :index="index"
            :class="item.raw.cssClass"
            >{{ item.label + ' ' }}</span
          >
          <el-tag
            v-else
            :disable-transitions="true"
            :key="item.value"
            :index="index"
            :type="item.raw.listClass == 'primary' ? '' : item.raw.listClass"
            :class="item.raw.cssClass"
          >
            {{ item.label + ' ' }}
          </el-tag>
        </span>
      </template>
    </template>
    <template v-if="unmatch && showValue">
      <!-- {{ unmatchArray | handleArray }} -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'DictTag',
  props: {
    options: {
      type: Array,
      default: null,
    },
    value: [Number, String, Array],
    // 当未找到匹配的数据时，显示value
    showValue: {
      type: Boolean,
      default: true,
    },
    //显示无样式
    flag: {
      type: Boolean,
      default: true,
    },
    //显示样式 默认tag
    type: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      options2: [], //
      unmatchArray: [], // 记录未匹配的项
    };
  },

  computed: {
    values() {
      if (this.value !== null && typeof this.value !== 'undefined') {
        //多级字典取值
        if (Array.isArray(this.value)) {
          if (this.value.length > 0) {
            return [String(this.value[this.value.length - 1])];
          } else {
            return [];
          }
        } else {
          return [String(this.value)];
        }
        // return Array.isArray(this.value) ? this.value : [String(this.value)];
      } else {
        return [];
      }
    },
    unmatch() {
      this.unmatchArray = [];
      if (this.value !== null && typeof this.value !== 'undefined') {
        // 传入值为非数组
        if (!Array.isArray(this.value)) {
          if (this.options2.some((v) => v.value == this.value)) return false;
          this.unmatchArray.push(this.value);
          return true;
        }
        // 传入值为Array
        this.value.forEach((item) => {
          if (!this.options2.some((v) => v.value == item)) this.unmatchArray.push(item);
        });
        return true;
      }
      // 没有value不显示
      return false;
    },
  },
  filters: {
    handleArray(array) {
      if (array.length === 0) return '';
      return array.reduce((pre, cur) => {
        return pre + ' ' + cur;
      });
    },
  },
  watch: {
    //多级字典取值
    value: {
      handler(newval, oldval) {
        // console.log('回传字典值：', newval, this.options);
        if (newval != null) {
          if (Array.isArray(newval)) {
            if (newval.length == 2) {
              if (newval[0] != null && newval[1] != null) {
                let newop = this.options.find((v) => v.value == newval[0]).raw.children;

                this.options2 = newop.map((c) => {
                  return {
                    ...c,
                    value: c.dictValue,
                    label: c.dictLabel,
                    raw: { cssClass: c.cssClass, listClass: c.listClass },
                  };
                });
                //console.log('新值01', this.options2);
              } else {
                this.options2 = this.options;
              }
            } else if (newval.length == 3) {
              if (newval[0] != null && newval[1] != null && newval[2] != null) {
                let newop = this.options.find((v) => v.value == newval[0]).raw.children;
                let newop2 = newop.find((v) => v.dictValue == newval[1]).children;
                this.options2 = newop2.map((c) => {
                  return {
                    ...c,
                    value: c.dictValue,
                    label: c.dictLabel,
                    raw: { cssClass: c.cssClass, listClass: c.listClass },
                  };
                });
                //console.log('新值02', this.options2);
              } else {
                this.options2 = this.options;
              }
            } else {
              this.options2 = this.options;
            }
          } else {
            this.options2 = this.options;
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>
