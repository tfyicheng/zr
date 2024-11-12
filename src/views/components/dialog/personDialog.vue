<template>
  <el-dialog :visible.sync="visible" top="25vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
        <div class="main">
          <div class="p1">
            <div class="p1item" v-hasPermi="['person:user:add']">
              <div>
                <el-button type="primary" @click="addItem">添加</el-button>
              </div>
            </div>

            <!-- <div class="p1item">
              <el-input v-model="queryParams.userName" placeholder="人员名称" clearable></el-input>
            </div>
            <div class="p1item">
              <el-select
                v-model="queryParams.jobState"
                placeholder="状态" clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
              >
                <el-option
                  v-for="item in dict.type.user_job_status"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div> -->

            <div class="p1item">
              <el-select
                v-model="queryParams.deptId"
                placeholder="部门名称"
                clearable
                :popper-append-to-body="true"
                popper-class="popperClass"
                @change="itemChange"
              >
                <el-option
                  v-for="item in deptIds"
                  :popper-append-to-body="false"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="p1item">
              <el-select v-model="queryParams.postId" placeholder="职位名称" clearable>
                <el-option
                  v-for="item in postIds"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>

            <div class="p1item">
              <el-input
                v-model="queryParams.phonenumber"
                :maxlength="commonFun.inputMax"
                placeholder="电话号码"
                clearable
              ></el-input>
            </div>

            <div class="p1item">
              <el-button type="primary" @click="handleQuery">搜索</el-button>
              <el-button class="graybtn" @click="resetQuery">重置</el-button>
            </div>
          </div>

          <div class="p2">
            <div class="p2choose">
              <span>已选择</span>
              <span class="p2chooses">
                <span v-for="c in chooseItemss" :key="c.index">{{ c.userName }}</span>
              </span>
              <span class="p2choosed" @click="clearSel">清空</span>
            </div>
          </div>

          <div class="p3">
            <el-table
              :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
              :cell-style="{ textAlign: 'left' }"
              :data="tableData"
              style="width: 100%"
              max-height="420"
              ref="multipleTable"
              row-key="userId"
              @selection-change="handleSelectionChange"
              v-loading="loading"
            >
              <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
              </el-table-column> :checked="chooseItems.includes(userName)":checked="iscludes(row)" -->
              <el-table-column type="selection" width="55" reserve-selection />
              <el-table-column prop="userName" label="名称"> </el-table-column>
              <el-table-column prop="deptName" label="部门"> </el-table-column>
              <el-table-column prop="postName" label="职位"> </el-table-column>
              <!-- 工作状态 -->
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <dict-tag
                    :flag="false"
                    :options="dict.type.user_job_status"
                    :value="scope.row.jobState"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="phoneNumber" label="联系电话"> </el-table-column>
              <el-table-column prop="email" label="邮箱"> </el-table-column>
            </el-table>

            <pagination
              v-show="total > 0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
            <div style="height: 10px"></div>
          </div>

          <div class="p4">
            <el-button @click="goback">返回</el-button>
            <el-button type="primary" @click="save">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { personList } from '@/api/data/person';
import { listDept } from '@/api/system/dept';
import { listPost } from '@/api/system/post';
export default {
  name: 'PersonList', //选择人员列表
  dicts: ['user_job_status'],
  props: {
    type: 0, //选择类型，0默认不限制，1车辆选择时指定在岗
    value: [String, Object, Array],
    Multiple: {
      type: Boolean,
      default: true,
    }, //是否支持多选
  },
  data() {
    return {
      title: '选择人员',
      // 遮罩层
      visible: false,
      loading: true, // 遮罩层
      chooseItemss: [], // 选中项
      tableData: [
        // {
        //   userId: 5, //用户ID
        //   userName: '赵六', //用户名称
        //   email: '125@qq.com', //邮箱
        //   phoneNumber: '15912345679', //联系电话
        //   fullAddr: null, //详细地址
        //   jobState: 1, //工作状态,参考字典值
        //   deptName: '珠荣工程设计有限公司', //部门
        //   postName: '软件测试', //职位
        // },
      ], //表格数据
      // 总条数
      total: 0,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        phonenumber: '',
        deptId: null,
        postId: null,
        //placeholder: '', //关键字
      },
      deptIds: [], //部门项
      postIds: [], //职位项
    };
  },

  created() {
    this.getList();
    this.getDeptlist();
  },

  methods: {
    // 显示弹框
    show() {
      this.visible = true;
      this.getList();
    },

    //保存
    save() {
      if (this.type == 1 && this.chooseItemss.find((c) => c.jobState != 1)) {
        this.$modal.msgError('请选择在岗的人员');
        this.clearSel();
        return;
      }
      if (!this.Multiple) {
        if (this.chooseItemss.length > 1) {
          this.$modal.msgError('请勿选择多项数据');
          this.clearSel();
        } else {
          this.visible = false;
          this.$emit('getChoose', this.chooseItemss);
          this.queryParams = { pageNum: 1, pageSize: 10 };
        }
      } else {
        this.visible = false;
        this.$emit('getChoose', this.chooseItemss);
        this.queryParams = { pageNum: 1, pageSize: 10 };
      }
      // if (!this.Multiple) {
      //   this.clearSel();
      // }
    },

    //加载列表
    getList() {
      personList(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        //异步回显处理 watch中处理的时候table暂无数据
        // let resdata = JSON.parse(JSON.stringify(response.data));
        let resdata2 = this.value ? JSON.parse(JSON.stringify(this.value)) : [];
        this.tableData = [];
        response.rows.forEach((item, index) => {
          this.tableData.push(item);
          for (let i = 0; i < resdata2.length; i++) {
            if (resdata2[i].userId == item.userId) {
              // this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(item);
              if (!this.chooseItemss.includes(item)) {
                this.chooseItemss.push(item);
              }
              //});
            }
          }
        });
        this.loading = false;
      });
    },

    //加载部门列表生成级联下拉项
    getDeptlist() {
      listDept({ pageNum: 1, pageSize: 999 }).then((response) => {
        response.data.forEach((item, index) => {
          this.deptIds.push({ label: item.deptName, value: item.deptId });
        });
      });
    },

    // 查询岗位列表
    getPostList(did) {
      listPost({ pageNum: 1, pageSize: 999, deptId: did }).then((response) => {
        this.postIds = [];
        this.queryParams.postId = null;
        response.rows.forEach((item, index) => {
          this.postIds.push({ label: item.postName, value: item.postId });
        });
      });
    },

    //级联选择触发
    itemChange() {
      this.getPostList(this.queryParams.deptId);
    },

    //添加项
    addItem() {
      this.$router.push({ path: '/data-d/personnelInfoAdd' });
      this.goback();
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.queryParams = { pageNum: 1, pageSize: 10 };
      this.getList();
    },

    //选择
    handleSelectionChange(rows) {
      this.chooseItemss = [];
      rows.forEach((element) => {
        this.chooseItemss.push(element);
      });
    },

    //清空选中
    clearSel() {
      this.chooseItemss = [];
      this.$refs.multipleTable.clearSelection();
    },

    //返回
    goback() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.mbody {
  .appc {
    .top {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      letter-spacing: 0em;
      text-align: left;
      margin: 10px;
    }
    .top::before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    i {
      float: right;
      cursor: pointer;
      font-weight: 700;
      font-size: 30px;
    }
    .main {
      background: #fff;
      border-radius: 4px;
      .p1 {
        position: relative;
        display: inline-block;
        .p1item {
          margin: 4px 0px 0 4px;
          float: left;
          width: 270px;
          height: 50px;
          .el-input,
          .el-date-editor,
          .el-select {
            margin: 10px 10px 0 10px;
            width: 240px;
            height: 40px;
          }
          .el-button {
            margin: 11px;
            width: 100px;
            border: 0px;
          }
          .el-button ~ .graybtn {
            background: #f3f4f8;
          }
        }
      }

      .p2 {
        margin: 15px;
        width: 98%;
        .el-button {
          margin: 20px 20px 20px 0px;
          width: 100px;
          border: 0px;
        }
        .p2choose {
          width: 100%;
          border-radius: 4px;
          line-height: 40px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 16px;
          font-weight: 400;
          letter-spacing: 0em;
          background: #409eff1a;
          span {
            vertical-align: top;
            color: #409eff;
            margin: 0px 15px;
          }
          span:first-child {
            vertical-align: top;
            float: left;
          }
          .p2choosed {
            cursor: pointer;
            float: right;
          }
          .p2chooses {
            display: inline-block;
            width: 80%;
            max-height: 80px;
            overflow-y: auto;

            span {
              vertical-align: top;
              margin-left: 0;
              margin-bottom: 0;
              padding: 0;
            }
          }
        }
      }

      .p3 {
        margin: 15px;
        margin-bottom: 0px;
        .pagination-container {
          margin-bottom: 0px;
          .el-pagination {
            margin: 15px;
            margin-top: 20px;
            text-align: right;
            padding-bottom: 0px;
          }
        }
      }

      .p4 {
        margin: 0px 15px;
        width: 98%;

        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          border-radius: 4px;
        }
        .el-button:first-child {
          background: #f3f4f8;
        }
      }
    }
  }
}
</style>
