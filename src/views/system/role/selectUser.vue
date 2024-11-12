<template>
  <!-- 授权用户 title="选择管理员"-->
  <el-dialog :visible.sync="visible" width="800px" top="5vh" append-to-body>
    <span class="dialogt">选择账号</span>
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
      <el-form-item label="名称" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
          v-model="queryParams.phonenumber"
          placeholder="请输入号码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="mini" @click="handleQuery">搜索</el-button>
        <el-button style="background: #f3f4f8" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        max-height="560"
        @row-click="clickRow"
        ref="table"
        :data="userList"
        @selection-change="handleSelectionChange"
        height="260px"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="登录账号" prop="nickName" :show-overflow-tooltip="true" />
        <el-table-column label="账号名称" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true" />
        <el-table-column label="手机" prop="phonenumber" :show-overflow-tooltip="true" />
        <el-table-column label="状态" align="center" prop="status">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.sys_normal_disable"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
      />
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="handleSelectUser">确 定</el-button>
      <el-button style="background: #f3f4f8" @click="visible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { unallocatedUserList, authUserSelectAll } from '@/api/system/role';
export default {
  dicts: ['sys_normal_disable'],
  props: {
    // 角色编号
    roleId: {
      type: [Number, String],
    },
  },
  data() {
    return {
      // 遮罩层
      visible: false,
      // 选中数组值
      userIds: [],
      // 总条数
      total: 0,
      // 未授权用户数据
      userList: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleId: undefined,
        userName: undefined,
        phonenumber: undefined,
        //userType: '00',
      },
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.queryParams.roleId = this.roleId;
      this.getList();
      this.visible = true;
    },
    clickRow(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.userIds = selection.map((item) => item.userId);
    },
    // 查询表数据
    getList() {
      unallocatedUserList(this.queryParams).then((res) => {
        this.userList = res.rows;
        this.total = res.total;
      });
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm');
      this.handleQuery();
    },
    /** 选择授权用户操作 */
    handleSelectUser() {
      const roleId = this.queryParams.roleId;
      const userIds = this.userIds.join(',');
      if (userIds == '') {
        this.$modal.msgError('请选择要分配的用户');
        return;
      }
      authUserSelectAll({ roleId: roleId, userIds: userIds }).then((res) => {
        this.$modal.msgSuccess(res.msg);
        if (res.code === 200) {
          this.visible = false;
          this.$emit('ok');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  //局部弹窗样式修改
  top: 20px;
  .el-dialog .dialogt {
    margin: 10px 10px;
    height: 20px;
    font-size: 20px;
    display: block;
  }
  .el-dialog .dialogt::before {
    content: '\00a0 ';
    border-left: 3px solid #4da0ff;
    margin-right: 5px;
  }

  .el-button {
    //margin-left: 12px;
    margin: 11px;
    width: 90px;
    border: 0px;
    height: 35px;
    font-size: 14px;
  }
  .el-form {
    margin-top: 20px;
    .el-form-item {
      width: 225px;
      height: auto;
      margin: 15px;
      margin-bottom: 0px;
      ::v-deep .el-form-item__label {
        display: none;
      }

      ::v-deep .el-input__inner {
        width: 220px;
        height: 37px;
      }
    }
    .el-form-item:last-child {
      margin-top: 4px;
    }
  }

  .el-row {
    margin: 0 0px !important;
    .top-right-btn {
      display: none; //管理员额外菜单隐藏
      margin-top: 20px !important;
    }
  }

  .el-table {
    margin: 15px;
    width: 98%;
    .el-button {
      //margin-left: 12px;
      margin: 11px;
      width: auto;
      border: 0px;
      height: auto;
      font-size: 14px;
    }
  }

  .pagination-container {
    margin: 15px;
    margin-top: 20px;
    text-align: right;
  }
}
</style>
