<template class="app-container">
  <div class="top2" style="margin-bottom: 15px">
    <svg-icon
      icon-class="back"
      style="cursor: hand; margin-right: 15px"
      @click="commonFun.goBack()"
    />
    <span v-for="(c, index) in data" :key="index" v-show="data.length > 0">
      <span style="cursor: pointer; color: #666666" @click="commonFun.goToOnly(c)">{{ c }}</span>
      <span> > </span>
    </span>

    <span style="cursor: pointer; color: #666666" v-show="ldata">{{ ldata }}</span>
  </div>
</template>

<script>
//import { xxx } from '@/api/data/statistic';
export default {
  name: 'NavTop', //xxx组件模版示例
  props: ['val'], //0
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      data: [], //数据
      ldata: '',
    };
  },
  created() {
    this.init();
  },
  methods: {
    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      if (this.val) {
        // console.log(this.val);
        //  console.log(this.val.split(',').splice(-1, 1));
        if (this.val.length > 1) {
          this.ldata = this.val[this.val.length - 1];
          for (let i = 0; i < this.val.length; i++) {
            if (i + 1 != this.val.length) {
              this.data.push(this.val[i]);
            }
          }
        } else if (this.val.length == 1) {
          this.ldata = this.val[0];
        }
        // console.log(this.ldata, this.data);
      }
    },

    // getData() {
    //   if (this.type == 0) {
    //     xxx().then((res) => {
    //       if (res && res.code == 200) {
    //         this.data1 = res.data;
    //       }
    //     });
    //   }
    // },

    // check() {
    //   this.$router.push({ path: this.tolink });
    // },
  },
};
</script>

<style lang="scss" scoped></style>
