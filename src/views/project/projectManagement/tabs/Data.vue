<template class="app-container">
  <div class="main">
    <!-- <div class="mt">
      <el-button round :type="flag == 0 ? 'primary' : null" @click="tolish">成员列表</el-button>
      <el-button round :type="flag == 1 ? 'primary' : null" @click="tohis">交接历史</el-button>
    </div> -->
    <div class="mb">
      <div v-show="flag == 0">
        <div class="tmain">
          <div class="top">
            <el-button
              v-hasPermi="['project:data:add']"
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
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
              <!-- <el-table-column prop="id" label="ID"></el-table-column> -->
              <el-table-column prop="dataNumber" label="资料编号"></el-table-column>
              <!-- <el-table-column prop="prjName" label="项目名称"></el-table-column> -->
              <el-table-column prop="dataName" label="资料名称"> </el-table-column>
              <el-table-column label="资料类型">
                <template slot-scope="scope">
                  {{
                    dict.type.file_type[scope.row.prjType]
                      ? dict.type.file_type[scope.row.prjType].label
                      : ''
                  }}
                </template>
              </el-table-column>
              <el-table-column prop="areaProvince" label="区域"> </el-table-column>
              <el-table-column prop="prjYear" label="年份"> </el-table-column>
              <el-table-column prop="dataDesc" label="描述"> </el-table-column>

              <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
                <template slot-scope="scope">
                  <!-- <el-button
                    v-hasPermi="['project:data:query']"
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    v-hasPermi="['project:data:edit']"
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  > -->

                  <el-button
                    v-show="!scope.row.canDown"
                    type="text"
                    size="small"
                    @click="exportApply(scope.row)"
                    style="font-size: 14px"
                    >申请下载</el-button
                  >

                  <el-button
                    v-show="scope.row.canDown"
                    type="text"
                    size="small"
                    @click="Output(scope.row)"
                    style="font-size: 14px"
                    >下载</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>

          <ApplyDown ref="ApplyDown" :type="12" />

          <BeforeDown ref="BeforeDown" :type="12" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { proDataList, prjDataListOne } from '@/api/data/project';
import BeforeDown from '@/views/components/dialog/beforeDown';
import ApplyDown from '@/views/components/dialog/applyDown';
export default {
  name: 'Data', //项目资料
  props: { uid: null },
  dicts: ['file_type'],
  components: { ApplyDown, BeforeDown },
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
      prjId: null,
    };
  },
  created() {},
  methods: {
    //查询
    getList(id) {
      this.prjId = id;
      prjDataListOne(id).then((response) => {
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

    //查看
    handleCheck(row) {
      console.log(row);
      this.$router.push({ path: '/project-d/projectDataInfo', query: { id: row.id } });
    },

    //编辑
    handleEdit(row) {
      this.$router.push({ path: '/project-d/projectDataEdit', query: { id: row.id } });
    },

    //添加
    addC() {
      this.$router.push({ path: '/project-d/projectDataAdd' });
    },

    //申请导出
    exportApply(row) {
      this.$refs.ApplyDown.downSourceId = row.id;
      this.$refs.ApplyDown.downSourceName = row.dataName;
      this.$refs.ApplyDown.show();
    },

    //下载/导出
    Output(row) {
      this.$refs.BeforeDown.downSourceId = row.id;
      this.$refs.BeforeDown.show();
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
    .body {
      margin-top: 20px;
    }
  }
}
</style>
