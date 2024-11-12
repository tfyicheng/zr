<template>
  <!-- -->
  <el-dialog :visible.sync="visible" top="25vh" append-to-body>
    <div class="mbody">
      <div class="appc">
        <div class="top">{{ title }}</div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fileApply } from '@/api/data/file';
export default {
  dicts: ['reason_type'],
  props: {
    type: 0,
    // 下载资源id
    downSourceId: {
      type: [Number, String],
    },
    downSourceName: '',
  },
  data() {
    return {
      title: '',
      // 遮罩层
      visible: false,
    };
  },
  methods: {
    // 显示弹框
    show() {
      this.visible = true;
    },

    /** 确认操作 */
    save() {
      this.visible = false;
      this.$emit('ok', this.queryParams.downSourceId);
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
