<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <!-- <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!topNav" /> -->
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />
    <div class="right-menu">
      <div class="right-menu-title">
        <!-- <el-avatar :size="24" :src="avatar"></el-avatar> -->

        <div id="unmessge" class="unmess" v-hasPermi="['system:index:notice']">
          <el-tooltip content="待处理通知" effect="dark" placement="bottom">
            <!-- is-dot -->
            <el-badge
              :hidden="this.$store.state.user.notifyNum == 0"
              :value="this.$store.state.user.notifyNum"
              :max="99"
            >
              <svg-icon icon-class="notify" style="cursor: hand" @click="checkNotify" />
            </el-badge>
          </el-tooltip>
        </div>

        <el-tooltip content="个人中心" effect="dark" placement="bottom">
          <span class="username" @click="toUserProfile">
            {{ name }}
          </span>
        </el-tooltip>

        <svg-icon
          icon-class="logout"
          class="el-input__icon input-icon logout"
          @click.native="logout"
        />
      </div>

      <NotifyDialog ref="NotifyDialog" />

      <!-- <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template> -->

      <!-- <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import TopNav from '@/components/TopNav';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import Search from '@/components/HeaderSearch';
import guangweiGit from '@/components/GuangWei/Git';
import guangweiDoc from '@/components/GuangWei/Doc';
import NotifyDialog from '@/views/components/dialog/notifyDialog';
export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    guangweiGit,
    guangweiDoc,
    NotifyDialog,
  },
  data() {
    return {
      flag: true,
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'device', 'name']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },

  // created() {

  // },

  mounted() {
    this.startTimer();
  },

  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    toUserProfile() {
      //跳转到用户信息页面  用户头像菜单
      this.$router.push({ path: '/user/profile' });
    },
    toggleSideBar() {
      //侧边栏切换按钮，触发路由菜单点击事件
      this.$store.dispatch('app/setNav', this.$route.fullPath);
      this.$store.dispatch('app/toggleSideBar');
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false,
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(() => {
            // location.href = '/index';
            //修改默认首页
            let indexurl = this.$store.state.permission.indexPage;
            location.href = indexurl;
          });
        })
        .catch(() => {});
    },

    //打开通知弹窗
    checkNotify() {
      this.$refs.NotifyDialog.show();
    },

    // 设置定时器
    startTimer() {
      // console.log(
      //   '权限',
      //   this.$store.getters.permissions.findIndex((c) => c == 'system:index:notice'),
      // );
      if (document.getElementById('unmessge')) {
        if (this.flag) {
          this.flag = false;
          this.$refs.NotifyDialog.getList();
        }
        this.timer = setInterval(() => {
          this.$refs.NotifyDialog.getList();
        }, 300000);
      } else {
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    // margin-top: 16px;面包屑修改
    // z-index: 999;
    // position: relative;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    .right-menu-title {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .unmess {
        margin-right: 10px;
        ::v-deep .el-badge__content.is-fixed {
          top: 12px !important; //使用value时
          //top: 18px !important; //使用is-dot时
        }
      }

      .username {
        color: #303133;
        font-family: PuHuiTiSemiBold;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-left: 14px;
        margin-right: 14px;
        cursor: pointer; //用户头像菜单
      }

      .logout {
        margin-right: 24px;
        width: 13px;
        height: 14px;
        cursor: pointer;
      }
    }

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
