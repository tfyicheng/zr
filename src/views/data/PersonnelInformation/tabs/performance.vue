<template class="app-container">
  <div class="tmain">
    <div class="top">
      <el-button
        v-hasPermi="['person:performance:add']"
        type="primary"
        @click="addC"
        icon="el-icon-plus"
      >
        添加</el-button
      >
    </div>
    <div class="body">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        max-height="560"
        ref="multipleTable"
        row-key="id"
      >
        <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
        <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
        <el-table-column prop="prjName" label="项目名称"> </el-table-column>

        <el-table-column label="项目类型">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.project_type" :value="scope.row.prjType" />
          </template>
        </el-table-column>

        <el-table-column label="项目角色">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.project_role" :value="scope.row.prjRole" />
          </template>
        </el-table-column>

        <el-table-column prop="userName" label="人员名称"> </el-table-column>
        <el-table-column prop="totalAmount" label="合同金额"> </el-table-column>
        <!-- <el-table-column prop="scale" label="规模"> </el-table-column> -->
        <el-table-column label="规模">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.project_scale"
              :value="scope.row.scaleUnit"
            />
          </template>
        </el-table-column>

        <el-table-column prop="startTime" label="开工时间"> </el-table-column>
        <el-table-column prop="endTime" label="竣工时间"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['person:performance:list']"
              @click="handleCheck(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
            <el-button
              v-hasPermi="['person:performance:edit']"
              v-show="scope.row.canDelOrEdit"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              style="font-size: 14px"
              >编辑</el-button
            >

            <el-button
              v-show="scope.row.canDelOrEdit"
              type="text"
              size="small"
              @click="deleteT(scope.row)"
              style="font-size: 14px; color: red"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { performanceByUserId } from '@/api/data/person';
export default {
  name: 'Performance', //个人业绩
  dicts: ['project_type', 'project_role', 'project_scale'],
  props: { uid: null },
  data() {
    return {
      loading: true, // 遮罩层
      chooseItems: [], // 选中项
      tableData: [], //证书信息表格数据
      dialogTableVisible: false,
      multipleSelection: [],
      fileview: '', //文件预览地址
    };
  },
  created() {},
  methods: {
    getList(id) {
      performanceByUserId(id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });
    },

    //附件判断预览
    filePreview(row) {
      if (Array.isArray(row)) {
        if (row.length > 0) {
          for (let i = 0; i < row.length; i++) {
            if (
              this.commonFun.limitFt.includes(
                row[i].originalName.substr(row[i].originalName.lastIndexOf('.') + 1),
              )
            ) {
              return row[i].originalName;
            }
          }
          return '';
        } else {
          return '';
        }
      }
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({
        path: '/person-d/personAchievementInfo',
        query: { id: row.id, data: row },
      });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({
        path: '/person-d/personAchievementEdit',
        query: { id: row.id, data: row },
      });
    },

    //添加
    addC() {
      this.$router.push({ path: '/person-d/personAchievementAdd' });
    },
  },
  // watch: {
  //   uid: {
  //     handler(val) {
  //       if (val) {
  //         console.log('额外参数:' + val);
  //         this.getList(val);
  //       }
  //     },
  //     deep: true,
  //     immediate: true,
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.tmain {
  .top {
    margin-bottom: 20px;
  }
}
</style>
