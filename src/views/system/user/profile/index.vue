<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <!-- <div class="text-center">
              <userAvatar :user="user" />
            </div> -->
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" /> 用户名称
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" /> 手机号码
                <div class="pull-right">{{ user.phonenumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" /> 用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="tree" /> 所属部门
                <div class="pull-right">
                  <!-- {{ user.dept.deptName }} / {{ postGroup }} -->
                  {{ deptName }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" /> 所属职位
                <div class="pull-right">{{ postGroup ? postGroup : '暂无' }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 创建日期
                <div class="pull-right">{{ user.createTime }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { personInfo } from '@/api/data/person';
import userAvatar from './userAvatar';
import userInfo from './userInfo';
import resetPwd from './resetPwd';
import { getUserProfile } from '@/api/system/user';

export default {
  name: 'Profile',
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: 'userinfo',
      deptName: '',
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserProfile().then((response) => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
      this.deptName = this.$store.state.user.deptName;
    },

    //获取基本信息
    // getInfo(id) {
    //   if (id) {
    //     personInfo(id).then((response) => {
    //       this.form = response.data;
    //       // if (response.data.avatar == null || response.data.avatar == '') {
    //       //   this.form.avatar = require('@/assets/images/default_header.png');
    //       // }
    //     });
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  ::v-deep .list-group-item {
    padding: 15px 0;
  }
}
</style>
