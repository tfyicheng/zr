<template>
    <div>
    <div class="parent">
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
      <div class="child"></div>
    </div>
    <div style=" clear:both" > </div>
    <div class="p2"></div>
  </div>

</template>

<script>  
export default {
  name: 'ContractManagement',//合同管理
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.parent {
  background: rgb(161, 224, 161);
  //position: relative; /* 父元素必须有定位 */
  position: relative;
 // float: left;
 // display: inline-block;
  .child {
    margin: 10px;
    float: left;
    width: 400px;
    height: 400px;
    background: pink;
    //position: absolute; /* 子元素绝对定位 */
  }
}
.p2{
  width: 100%;
  height: 300px;
  background: #000;
  margin: 20px;
}
</style>
