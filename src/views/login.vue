<template>
  <div class="login">
    <div class="login_box" v-if="loginCheckShow == 0">
      <div class="corporate_name">生产经营管理数据库平台</div>
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
        <div class="title">珠荣公司</div>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="请输入您的用户名"
          >
            <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="请输入您的密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-checkbox v-model="loginForm.rememberMe" style="margin: 0px 0px 25px 0px"
              >记住密码</el-checkbox
            >
          </el-col>
          <el-col :span="12">
            <!-- <div class="forget_pwd" @click="forgetPwd">忘记密码</div> -->
          </el-col>
        </el-row>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div class="message_login">
            <!-- <svg-icon icon-class="phoneLogin" /><span @click="messageLoginShow">短信登录</span> -->
          </div>
        </el-form-item>
      </el-form>
      <!--  底部  -->
      <div class="el-login-footer">
        <!-- <span>Copyright © 2018-2023 guangwei.vip All Rights Reserved.</span> -->
      </div>
    </div>
    <div class="login_box" v-if="loginCheckShow == 1">
      <div class="corporate_name">生产经营管理数据库平台</div>
      <el-form ref="loginForm" class="login-form">
        <div class="title">珠荣工程公司</div>
        <el-form-item>
          <el-input type="text" auto-complete="off" placeholder="请输入您的手机号">
            <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input auto-complete="off" placeholder="验证码" style="width: 73%">
            <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />
          </el-input>
          <div class="phone-code">
            <div class="forget_pwd" @click="getPhoneCode" v-if="phoneCodeTimeFlag == 0">
              获取验证码
            </div>
            <div class="forget_pwd_time" v-if="phoneCodeTimeFlag == 1">{{ codeTime }}</div>
          </div>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width: 100%"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
          <div class="message_login">
            <svg-icon :icon-class="loginCheckShow == 0 ? 'phoneLogin' : 'numberLogin'" />
            <span @click="messageLoginShow">
              {{ loginCheckShow == 0 ? '短信登录' : '账号登录' }}
            </span>
          </div>
        </el-form-item>
      </el-form>
      <!--  底部  -->
      <div class="el-login-footer">
        <!-- <span>Copyright © 2018-2023 guangwei.vip All Rights Reserved.</span> -->
      </div>
    </div>
  </div>
</template>
<script>
import { getCodeImg } from '@/api/login';
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';

export default {
  name: 'Login',
  data() {
    return {
      timer: null,
      codeTime: 60,
      phoneCodeTimeFlag: 0,
      loginCheckShow: 0, //0账号登录1短信登录
      codeUrl: '',
      loginForm: {
        username: '', //admin
        password: '', //123456
        rememberMe: false,
        code: '',
        uuid: '',
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入您的用户名' }],
        password: [{ required: true, trigger: 'blur', message: '请输入您的密码' }],
        code: [{ required: true, trigger: 'change', message: '请输入验证码' }],
      },
      loading: false,
      // 验证码开关
      captchaEnabled: false,
      // 注册开关
      register: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    //this.getCode();
    this.getCookie();
  },
  methods: {
    startTime() {
      this.codeTime = 60;
      this.timer = setInterval(() => {
        if (this.codeTime > 0) {
          this.codeTime--;
        } else {
          clearInterval(this.timer);
          this.phoneCodeTimeFlag = 0;
        }
      }, 1000);
    },
    //获取验证码
    getPhoneCode() {
      this.phoneCodeTimeFlag = 1;

      this.startTime();
    },
    //切换短信/账号登录
    messageLoginShow() {
      this.loginCheckShow == 1 ? (this.loginCheckShow = 0) : (this.loginCheckShow = 1);
    },
    forgetPwd() {
      this.$router.push({ path: '/forgetPwd' });
    },
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = 'data:image/gif;base64,' + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get('username');
      const password = Cookies.get('password');
      const rememberMe = Cookies.get('rememberMe');
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set('username', this.loginForm.username, { expires: 30 });
            Cookies.set('password', encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set('rememberMe', this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove('username');
            Cookies.remove('password');
            Cookies.remove('rememberMe');
          }
          this.$store
            .dispatch('Login', this.loginForm)
            .then(() => {
              // 1、跳到登录后指定跳转的页面或者登录后跳到首页
              // this.$router.push({ path: this.redirect || '/' }).catch(() => {});
              // 2、登录后跳到路由默认的第一个路由页面
              //修改默认首页
              this.$store.dispatch('GetInfo').then((res) => {
                // 拉取完user_info信息
                const roles = res.roles;
                this.$store.dispatch('GenerateRoutes', { roles }).then((accessRoutes) => {
                  // 根据roles权限生成可访问的路由表
                  console.log(accessRoutes, roles);
                  this.$router.addRoutes(accessRoutes); // 动态添加可访问路由表
                  let pathIndex = '';

                  if (roles && roles.length == 0) {
                    pathIndex = '/noRouter';
                  } else {
                    if (accessRoutes[0].path == '/') {
                      pathIndex = accessRoutes[0].path + accessRoutes[0].children[0].path;
                    } else {
                      pathIndex = accessRoutes[0].path + '/' + accessRoutes[0].children[0].path;
                    }
                  }

                  //  pathIndex = accessRoutes[0].path + '/' + accessRoutes[0].children[0].path; // 设置默认首页地址indexPage
                  if (pathIndex != '') {
                    this.$router
                      // .push({
                      //   path:
                      //     this.redirect == '/' || this.redirect == undefined
                      //       ? pathIndex
                      //       : this.redirect,
                      // })
                      .push({
                        path: pathIndex,
                      })
                      .catch(() => {}); // 因为切换用户可能不具备重定向所有的路由权限，默认登录重新跳转首页
                  }
                });
              });
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.login {
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/long_bg.png');
  background-size: cover;
}

.login_box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.corporate_name {
  color: #333;
  font-family: PuHuiTiBold;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-bottom: 24px;
  height: 45px;
}

.title {
  margin-top: 44px;
  margin-bottom: 34px;
  text-align: center;
  color: #409eff;
  font-family: PuHuiTiBold;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  height: 45px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 0px 25px 5px 25px;

  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }

  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}

.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}

.login-code {
  width: 33%;
  height: 38px;
  float: right;

  img {
    cursor: pointer;
    vertical-align: middle;
  }
}

.phone-code {
  width: 23%;
  height: 38px;
  float: right;
  padding-top: 8px;
}

.forget_pwd {
  color: #409eff;
  font-family: PuHuiTiRegular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
  text-align: right;
}

.forget_pwd_time {
  color: #666;
  font-family: PuHuiTiRegular;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}

.login-code-img {
  height: 38px;
}

.forget_pwd {
  color: #409eff;
  font-family: PuHuiTiRegular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
  text-align: right;
}

.message_login {
  margin-top: 34px;
  text-align: center;
  color: #666;
  font-family: PuHuiTiRegular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.message_login span {
  cursor: pointer;
}
</style>
