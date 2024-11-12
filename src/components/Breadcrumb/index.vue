<template>
  <el-breadcrumb class="app-breadcrumb" separator=" > ">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <!-- <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a> -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  //面包屑修改
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route(route) {
      // if you go to the redirect page, do not update the breadcrumbs
      if (route.path.startsWith('/redirect/')) {
        return;
      }
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: '/index', meta: { title: '工作台' } }].concat(matched);
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
      );
      //console.log(this.levelList);
    },

    getBreadcrumb2() {
      let breadcrumbPath = [];
      console.log(this.$route.path);
      this.$route.path.split('/').forEach((element) => {
        if (element) {
          // path键作为v-for的key存在的 参考vue代码
          breadcrumbPath.push({ path: element, name: element });
        }
      });
      // 面包屑数组值
      this.levelList = breadcrumbPath;
      // 提取当前路由的信息，把name作为key存储起来，为点击面包屑跳转做准备
      // 这里不用name方式直接跳转的原因在于有些路径中可能带有query参数，
      // 通过name跳转参数是拿不到的，所有这里要记录跳转过的路径信息
      let key = this.$route.name;
      let value = JSON.stringify({ path: this.$route.path, query: this.$route.query });
      sessionStorage.setItem(key, value);
      console.log(this.levelList);
      return;
    },

    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return name.trim() === 'Index';
    },
    handleLink(item) {
      //console.log(item);
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },

    handleLink2(item) {
      console.log(item);
      let key = item.name;
      let value = sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key));
      if (value) {
        this.$router.push(value);
      }

      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
