<template class="app-container">
  <div class="bo">
    <div class="body">
      <ul>
        <li v-for="(item, index) in ainfo.slice(0, forlimt)" :key="index">
          <div class="litop">
            <el-tooltip  effect="dark" :content="item.title" placement="top" :disabled ="istooltipshow(item.title )">
                <div class="limt">{{ item.title }}</div>
            </el-tooltip>

            <div>
              <el-tag class="eltag0" v-if="item.statue == 0" effect="Plain" size="mini"
                >待处理</el-tag
              >
              <el-tag
                class="eltag1"
                v-else-if="item.statue == 1"
                effect="Plain"
                type="success"
                size="mini"
                >已同意</el-tag
              >
              <el-tag
                class="eltag2"
                v-else-if="item.statue == 2"
                effect="Plain"
                type="danger"
                size="mini"
                >已拒绝</el-tag
              >
              <!-- {{ item.statue }} -->
            </div>
          </div>
          <div class="limd">{{ item.date }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ApprovalList',
  props: ["ainfo"],
  data() {
    return {
        forlimt:10 //限制展示数
    };
  },
  created() {},
  methods: {
    istooltipshow(val){
        if(val.length > 20){
            return false;
        }else {
            return true;
        }
    },
  },
};
</script>
<style lang="scss" scoped>
.body {
  padding: 0;
  height: 303px;
  overflow-y: hidden;
}
.body:hover {
  overflow-y: auto;
}
ul {
  height: 100%;
  list-style-type: none; /* 移除默认的列表符号 */
  margin: 15px 15px;
  padding: 0px;
  li {
    margin: 15px 0px;
  }
  .litop {
    display: flex;
    justify-content: space-between;
    .limt {
      color: #333;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      text-transform: capitalize;
      width: 300px;
      overflow: hidden;    
    text-overflow:ellipsis;    
    white-space: nowrap;
    }
  }
  .limd {
    margin-top: 8px;
    margin-bottom: 25px;
    color: #999;
    font-family: Alibaba PuHuiTi 2;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
  }
}
</style>
