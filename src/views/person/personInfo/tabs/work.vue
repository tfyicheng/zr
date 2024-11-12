<template class="app-container">
  <div class="tmain">
    <div class="top">
      <el-button v-hasPermi="['person:work:add']" type="primary" @click="addC" icon="el-icon-plus">
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
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="userName" label="用户名称"> </el-table-column>
        <el-table-column prop="startDate" label="开始时间"> </el-table-column>
        <el-table-column prop="endDate" label="结束时间"> </el-table-column>
        <el-table-column prop="unitName" label="单位名称"> </el-table-column>
        <el-table-column prop="deptName" label="部门"> </el-table-column>
        <el-table-column prop="postName" label="职位"> </el-table-column>
        <el-table-column prop="certifier" label="证明人"> </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-hasPermi="['person:work:query']"
              @click="handleCheck(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
            <el-button
              v-hasPermi="['person:work:edit']"
              type="text"
              size="small"
              @click="handleEdit(scope.row)"
              style="font-size: 14px"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { workListByUserId } from '@/api/data/person';
export default {
  name: 'Work', //个人工作经历

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
      workListByUserId(id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });
    },

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/person-d/personResumeInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/person-d/personResumeEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/person-d/personResumeAdd' });
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
