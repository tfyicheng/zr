<template>
  <div class="login">
    <el-form ref="loginForm" :model="forgetPwdForm" class="login-form">
      <div class="title">重置密码</div>
      <el-form-item>
        <el-input type="text" auto-complete="off" placeholder="请输入您的手机号">
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" auto-complete="off" placeholder="输入密码">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" auto-complete="off" placeholder="确认密码">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
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
          @click.native.prevent="resettingPwd"
        >
          <span>重置密码</span>
        </el-button>
        <div class="message_login" @click="backLogin">返回</div>
      </el-form-item>
    </el-form>
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
      forgetPwdForm: {},
      timer: null,
      codeTime: 60,
      phoneCodeTimeFlag: 0,
      codeUrl: '',
      loginForm: {
        username: 'admin',
        password: 'admin123',
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
      captchaEnabled: true,
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
    resettingPwd() {},
    backLogin() {
      this.$router.push({ path: '/login' });
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
              this.$router.push({ path: this.redirect || '/' }).catch(() => {});
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../assets/images/long_bg.png');
  background-size: cover;
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

.forget_pwd_time {
  color: #666;
  font-family: PuHuiTiRegular;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
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
  cursor: pointer;
}
</style>
