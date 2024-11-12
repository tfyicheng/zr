<template>
  <!-- -->
  <div v-if="!item.hidden" @click.stop="tol(item)">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path, onlyOneChild.query)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :num="message_num(onlyOneChild.meta)"
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
import { isExternal } from '@/utils/validate';
import Item from './Item';
import AppLink from './Link';
import FixiOSBug from './FixiOSBug';
import { pendingMatterNum } from '@/api/data/statistic';
export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    //路由菜单点击事件 跳转到模块的分析页
    tol(item) {
      //console.log(item);
      //even.stopPropagation();
      if (item.meta) {
        switch (item.meta.title) {
          case '资料管理':
            this.$router.push('/data/index');
            break;
          case '生产管理':
            this.$router.push('/production/index');
            break;
          case '项目管理':
            this.$router.push('/project/index');
            break;
          case '资产采购管理':
            this.$router.push('/purchase/index');
            break;
          case '车辆管理':
            this.$router.push('/car/index');
            break;
          case '人员管理':
            this.$router.push('/person/index');
            break;
          case '合同管理':
            // if (item.children.length != 3) {
            //   this.$router.push('/data/contractmanagement/index');
            // }

            if (item.children[2].name != 'ContractTemplateIndex') {
              this.$router.push('/data/contractmanagement/index');
            }

            break;
          default:
            break;
        }
      }
    },

    hasOneShowingChild(children = [], parent) {
      if (!children) {
        children = [];
      }
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath, routeQuery) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      if (routeQuery) {
        let query = JSON.parse(routeQuery);
        return { path: path.resolve(this.basePath, routePath), query: query };
      }
      return path.resolve(this.basePath, routePath);
    },

    //导航栏红标
    message_num(data) {
      if (data.title == '工作台') {
        //判断自己需要传入的标题，不然标题多的时候会请求很多次
        let num = 0; //到时候这边可以换成接口赋值
        // pendingMatterNum().then((res) => {
        //   if (res && res.code == 200) {
        //     num = res.data;
        //     console.log('1', num);
        //   }
        // });
        //console.log(num);
        return num;
      }
    },

    //获取处理消息  导航栏红标
    getNum(data) {
      let num = 0;
      setInterval(() => {
        if (data.title == '工作台') {
          //判断自己需要传入的标题，不然标题多的时候会请求很多次
          //let num = 0; //到时候这边可以换成接口赋值
          return;
          pendingMatterNum().then((res) => {
            if (res && res.code == 200) {
              num = res.data;
            }
          });
          return num;
        }
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
