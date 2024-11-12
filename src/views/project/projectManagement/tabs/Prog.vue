<template class="app-container">
  <div class="main">
    <!-- <div class="mt">
      <el-button round :type="flag == 0 ? 'primary' : null" @click="tolish">成员列表</el-button>
      <el-button round :type="flag == 1 ? 'primary' : null" @click="tohis">交接历史</el-button>
    </div> -->
    <div class="mb">
      <div v-show="flag == 0">
        <div class="tmain">
          <!-- <div class="top">
            <el-button type="primary" @click="addC" icon="el-icon-plus"> 添加</el-button>
          </div> -->
          <div class="body">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="560"
              ref="multipleTable"
              row-key="id"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <!-- <el-table-column prop="prjNumber" label="项目编号"></el-table-column>
              <el-table-column prop="prjName" label="项目名称"></el-table-column> -->
              <el-table-column prop="planName" label="计划名称"> </el-table-column>
              <el-table-column label="进度">
                <template slot-scope="scope">
                  {{ scope.row.progress + '%' }}
                </template>
              </el-table-column>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.project_plan_status"
                    :value="scope.row.status"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="fillingUser" label="填报人"> </el-table-column>
              <el-table-column prop="fillingDate" label="填报日期"> </el-table-column>
              <el-table-column prop="progressDesc" label="进度说明"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <!-- <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  > -->
                  <el-button
                    v-show="scope.row.children == null"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >填报</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { proPersonProgressList } from '@/api/data/project';

export default {
  name: 'Prog', //项目进度
  props: { uid: null },
  dicts: ['project_plan_status'],

  data() {
    return {
      flag: 0,
      loading: true, // 遮罩层
      loading2: true, // 遮罩层
      form: {
        reason: null, //交接原因
        personId: null, //人员记录ID
        handoverUserId: null, //交接人员ID
        handoverReason: '', //交接备注
      },
      tableData: [], //信息表格数据
      tableData2: [], //信息表格数据
      dialogTableVisible: false,
      dialogTableVisible2: false,
      fileview: '', //文件预览地址
      ChooseOne: '', //当前弹窗目标
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      proPersonProgressList(id).then((response) => {
        this.tableData = response.data;
        this.loading = false;
      });
    },

    tolish() {
      this.flag = 0;
    },
    tohis() {
      this.flag = 1;
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/project-d/projectProcessEdit', query: { id: row.id } });
    },
  },
  // watch: {
  //   uid: {
  //     handler(val) {
  //       if (val) {
  //         console.log('参数:' + val);
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
.main {
  .mb {
    margin-top: 20px;
  }
}
</style>
