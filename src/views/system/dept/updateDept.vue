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
          <el-form-item label="上级组织">
            <treeselect
              disabled
              v-model="deptForm.parentId"
              :options="deptList"
              :normalizer="normalizer"
              placeholder="选择上级组织"
            >
              <div slot="value-label" slot-scope="{ node }">{{ getDeptName(node.raw) }}</div>
            </treeselect>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织ID">
            <el-input disabled v-model="deptForm.deptId" />
          </el-form-item>
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
          <el-button type="primary" @click="submitDeptForm">更新</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { updateDept } from '@/api/system/dept';
import Treeselect from '@riophae/vue-treeselect';
export default {
  components: { Treeselect },
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
    // 表格树数据
    deptList: {
      type: Array,
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
          updateDept(this.deptForm)
            .then((response) => {
              this.$EventBus.$emit('getList');
              this.$modal.msgSuccess('更新成功');
              this.baseInfoLoading = false;
            })
            .catch((error) => {
              this.baseInfoLoading = false;
            });
        }
      });
    },
    //处理treeselect找不到会显示unknow
    getDeptName(_data) {
      //console.log(_data)
      if (_data.id == 0) {
        return '';
      }
      return _data.deptName;
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children,
      };
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
