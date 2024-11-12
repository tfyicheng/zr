<template>
  <div class="app-container">
    <vue2-org-tree
      :data="orgData"
      :horizontal="!horizontal"
      :collapsable="collapsable"
      :label-class-name="labelClassName"
      :render-content="renderContent"
      name="organ"
    />
  </div>
</template>
<script>
export default {
  name: 'deptEchart',
  props: {
    deptEchartData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      horizontal: true, //横版 竖版
      collapsable: false,
      expandAll: true, //是否全部展开
      labelClassName: '白色', // 默认颜色
      scrollTreeStyle: 'width:100%;',
    };
  },
  created() {},
  computed: {
    orgData: function () {
      let data = {};
      if (this.deptEchartData) {
        console.log(this.deptEchartData);
        data.label = this.deptEchartData.deptName;
        data.type = 0;
        if (
          this.deptEchartData.children &&
          this.deptEchartData.posts &&
          this.deptEchartData.children.length > 0
        ) {
          data.children = this.loopChildren(
            this.deptEchartData.children,
            this.deptEchartData.posts,
          );
        } else {
          if (this.deptEchartData.posts) {
            data.children = this.loopChildren2(this.deptEchartData.posts);
          }
        }
      }
      return data;
    },
  },
  mounted() {},

  methods: {
    renderContent(h, data) {
      if (data.type === 0) {
        return (
          <div>
            <div style="padding:10px;background:#409EFF;color: #FFF;border-radius:5px;">
              <svg-icon slot="prefix" icon-class="company" />
              <span>{data.label}</span>
            </div>
          </div>
        );
      } else if (data.type === 1) {
        return (
          <div>
            <div style="padding:10px;background:#FAC061;color: #FFF;border-radius:5px">
              <svg-icon slot="prefix" icon-class="bumen" />
              <span>{data.label}</span>
            </div>
          </div>
        );
      } else if (data.type === 2) {
        return (
          <div>
            <div style="padding:10px;background:#BBB6FE;color: #FFF;border-radius:5px">
              <svg-icon slot="prefix" icon-class="zhiwei" />
              <span>{data.label}</span>
            </div>
          </div>
        );
      }
    },
    loopChildren(children, posts) {
      let data = [];
      children.forEach((element) => {
        let pushData = {
          label: element.deptName,
          type: 1,
        };
        if (element.children && element.posts && element.children.length > 0) {
          pushData.children = this.loopChildren(element.children, element.posts);
        } else {
          if (element.posts) {
            pushData.children = this.loopChildren2(element.posts);
          }
        }
        data.push(pushData);
      });
      posts.forEach((element) => {
        let pushData = {
          label: element.postName,
          type: 2,
        };
        data.push(pushData);
      });
      return data;
    },
    loopChildren2(posts) {
      let data = [];
      posts.forEach((element) => {
        let pushData = {
          label: element.postName,
          type: 2,
        };
        data.push(pushData);
      });
      return data;
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  overflow: auto;
}
::v-deep .org-tree-node-label .org-tree-node-label-inner {
  padding: 0px;
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}

.org-tree-0 {
  background-color: #409eff;
  color: #fff;
}

.org-tree-1 {
  background-color: #fac061;
  color: #fff;
}

.org-tree-2 {
  background-color: #bbb6fe;
  color: #fff;
}

.el-org-tree {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .org-tree-node-label {
    white-space: nowrap;
  }
  .el-tree-node__content {
    background: white;
  }
  .org-tree-node-label .org-tree-node-label-inner {
    padding-top: 0px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
    cursor: pointer;
  }
  .horizontal .org-tree-node.is-leaf {
    padding-top: 5px;
    padding-bottom: 5px;
  }
}
</style>
