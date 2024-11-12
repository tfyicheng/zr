<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground,
    }"
  >
    <transition name="sidebarLogoFade">
      <router-link
        style="cursor: default; pointer-events: none"
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo2" />
        <!-- <h1 v-else class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor }">{{ title }} </h1> -->
        <h1
          v-else
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
          }"
        >
          珠荣公司
        </h1>
      </router-link>
      <router-link
        style="cursor: default; pointer-events: none"
        v-else
        key="expand"
        class="sidebar-logo-link"
        to="/"
      >
        <img v-if="logo" :src="logo" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor }">{{ title }} </h1> -->
        <h1
          class="sidebar-title"
          :style="{
            color:
              sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor,
          }"
        >
          珠荣公司
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import logoImg from '@/assets/logo/logo.png';
import variables from '@/assets/styles/variables.scss';

export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    variables() {
      return variables;
    },
    sideTheme() {
      return this.$store.state.settings.sideTheme;
    },
  },
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
      logo: logoImg,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 100px; //这里修改高度后要去sidebar.scss那对应的calc(100% - 100px)减去同样高度
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 47px;
      height: 57px;
      vertical-align: middle;
      float: left;
      margin: 20px 10px;
    }
    & .sidebar-logo2 {
      width: 35px;
      height: 42px;
      vertical-align: middle;
      margin-top: 22px;
    }

    & .sidebar-title {
      margin-top: 24px;
      color: #fff;
      font-weight: 600;
      font-family: Alibaba PuHuiTi 2;
      font-size: 23px;
      font-weight: 700;
      line-height: 25px;
      letter-spacing: 0em;
      text-align: left;
      position: relative;
    }
  }

  .sidebar-title::after {
    content: '\A生产经营管理数据库平台';
    font-size: 14px;
    white-space: pre;
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
