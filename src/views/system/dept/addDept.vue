<template>
  <div class="app-container">
    <el-form
      style="width: 90%; margin-left: 5%"
      ref="deptForm"
      :model="deptForm"
      :rules="deptRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <div class="deptInfoHeader"><span></span>添加组织</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="组织名称" prop="deptName">
            <el-input v-model="deptForm.deptName" placeholder="请输入组织名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number
              placeholder="请输入显示排序"
              style="width: 100%"
              v-model="deptForm.orderNum"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系号码">
            <el-input v-model="deptForm.phone" placeholder="请输入联系号码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织传真">
            <el-input v-model="deptForm.fax" placeholder="请输入组织传真" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="联系地址">
            <el-input v-model="deptForm.addr" placeholder="请输入联系地址" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注">
            <el-input type="textarea" v-model="deptForm.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: right">
          <el-button @click="resetDeptForm">重置</el-button>
          <el-button type="primary" @click="submitDeptForm">保存</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { addDept } from '@/api/system/dept';
export default {
  props: {
    baseInfoLoading: {
      type: Boolean,
      default: false,
    },
    deptForm: {
      type: Object,
      default: {},
    },
    deptRules: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    // 重置组织表单
    resetDeptForm() {
      this.deptForm.deptName = undefined;
      this.deptForm.orderNum = undefined;
      this.deptForm.phone = undefined;
      this.deptForm.fax = undefined;
      this.deptForm.addr = undefined;
      this.deptForm.remark = undefined;
    },
    submitDeptForm() {
      this.$refs['deptForm'].validate((valid) => {
        if (valid) {
          this.deptForm.parentId = 0;
          addDept(this.deptForm)
            .then((response) => {
              this.$EventBus.$emit('getList');
              this.$modal.msgSuccess('新增成功');
              this.baseInfoLoading = false;
            })
            .catch((error) => {
              this.baseInfoLoading = false;
            });
        }
      });
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .vue-treeselect--disabled .vue-treeselect__control {
  background-color: #f5f7fa;
  border-color: #dfe4ed;
  color: #c0c4cc;
  cursor: not-allowed;
}

.deptInfoHeader {
  color: #333;
  font-family: PuHuiTiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  margin-bottom: 20px;
}

.deptInfoHeader span {
  display: inline-block;
  margin-right: 10px;
  width: 2px;
  height: 16px;
  background-color: #409eff;
}
</style>
