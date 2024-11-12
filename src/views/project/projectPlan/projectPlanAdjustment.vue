<template class="app-container">
  <div class="appo">
    <div class="appi">
      <div class="appc">
        <NavTop :val="['项目管理', '项目计划管理', '项目计划列表', '调整项目计划信息']" />
        <div class="main">
          <div class="p1">
            <div class="p1item">
              <span>合 同 编 号</span>
              <span>
                <el-input v-model="form.contNumber" :disabled="true"></el-input>
              </span>
            </div>

            <div class="p1item">
              <span>项 目 名 称</span>
              <span>
                <el-input v-model="form.prjName" :disabled="true"></el-input>
              </span>
            </div>

            <div class="p1item">
              <span>开 始 日 期</span>
              <el-date-picker
                v-model="form.startDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="true"
              >
              </el-date-picker>
            </div>

            <div class="p1item">
              <span>交 付 日 期</span>
              <el-date-picker
                v-model="form.deliveryDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :disabled="true"
              >
              </el-date-picker>
            </div>
          </div>
        </div>

        <div class="main2">
          <div class="m2top">
            项目阶段设置
            <div class="m2topm">
              <span
                v-show="paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >收起 <i class="el-icon-caret-top"></i>
              </span>
              <span
                v-show="!paymentShow"
                @click="paymentShow ? (paymentShow = false) : (paymentShow = true)"
                >展开 <i class="el-icon-caret-bottom"></i>
              </span>
            </div>
          </div>
          <div class="m2main" v-show="paymentShow">
            <div class="m2mt" v-show="form.taskPlanList.length">
              <!-- <div class="m2mb"><i style="color: red">*</i>阶段计划名称</div> -->
              <div class="m2mb"><i style="color: red">*</i>阶段</div>
              <div class="m2mb"><i style="color: red; visibility: hidden">*</i>计划说明</div>
              <!-- <div class="m2mb"><i style="color: red">*</i>权重</div> -->
              <div class="m2mb"><i style="color: red">*</i>阶段比例</div>
              <div class="m2mb"><i style="color: red">*</i>计划开始时间</div>
              <div class="m2mb"><i style="color: red">*</i>计划结束时间</div>
              <div class="m2mb">关联收款节点</div>
              <div class="m2mb">关联付款节点</div>
              <div class="m2mb" style="max-width: 60px">操作</div>
            </div>

            <el-form
              v-for="(c, index) in form.taskPlanList"
              :key="index"
              :model="c"
              :ref="`refForm${index}`"
              :rules="ruleData"
            >
              <div class="m2mt">
                <div class="m2mb" v-show="false">
                  <el-form-item label="">
                    <el-input v-model="c.planName" placeholder="点击选择" clearable
                      ><svg-icon
                        @click.native="choosePlan(c.uid)"
                        slot="suffix"
                        icon-class="choose"
                        style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                      />
                    </el-input>
                  </el-form-item>
                </div>

                <!-- <div class="m2mb">
                  <el-form-item label="" prop="weight">
                    <el-input
                      v-model="c.weight"
                      @input="$forceUpdate()"
                      @blur="(e) => (c.weight = e.target.value)"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div> -->
                <div class="m2mb">
                  <el-form-item label="" prop="phase">
                    <el-select v-model="c.phase" placeholder="点击选择" clearable>
                      <el-option
                        v-for="item in dict.type.project_plan"
                        :key="item.value"
                        :label="item.label"
                        :value="Number(item.value)"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="">
                    <el-input
                      @input="$forceUpdate()"
                      v-model="c.planDesc"
                      placeholder="请输入内容"
                      :maxlength="commonFun.inputMax"
                      clearable
                    ></el-input>
                  </el-form-item>
                </div>
                <!-- style="max-width: 110px" -->
                <div class="m2mb">
                  <el-form-item label="" prop="distribution">
                    <el-input-number
                      v-model="c.distribution"
                      :precision="2"
                      style="width: 100%"
                      :controls="false"
                      :min="0"
                      :max="100"
                      placeholder="请输入（%）"
                    >
                    </el-input-number>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="startDate">
                    <el-date-picker
                      @input="$forceUpdate()"
                      v-model="c.startDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <div class="m2mb">
                  <el-form-item label="" prop="endDate">
                    <el-date-picker
                      @input="$forceUpdate()"
                      v-model="c.endDate"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      clearable
                    >
                    </el-date-picker>
                  </el-form-item>
                </div>

                <div class="m2mb node">
                  <el-form-item label="">
                    <el-tooltip
                      effect="dark"
                      :content="c.nodeList1name"
                      placement="top-start"
                      :disabled="!c.nodeList1name || c.nodeList1name.length == 0"
                    >
                      <el-input
                        v-model="c.nodeList1name"
                        @input="$forceUpdate()"
                        placeholder="点击选择"
                        readonly
                        ><svg-icon
                          slot="suffix"
                          icon-class="choose"
                          @click.native="chooseXmNode(c.uid)"
                          style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                        />
                        <i
                          slot="suffix"
                          style="cursor: pointer; width: 24px; height: 14px; color: red"
                          class="el-icon-circle-close"
                          @click="handleEmpty(c.uid)"
                        ></i>
                      </el-input>
                    </el-tooltip>
                  </el-form-item>
                </div>

                <div class="m2mb node">
                  <el-form-item label="">
                    <el-tooltip
                      effect="dark"
                      :content="c.nodeList2name"
                      placement="top-start"
                      :disabled="!c.nodeList2name || c.nodeList2name.length == 0"
                    >
                      <el-input
                        v-model="c.nodeList2name"
                        placeholder="点击选择"
                        @input="$forceUpdate()"
                        readonly
                        ><svg-icon
                          slot="suffix"
                          icon-class="choose"
                          @click.native="chooseWwNode(c.uid)"
                          style="cursor: pointer; margin-right: 10px; width: 14px; height: 14px"
                        />
                        <i
                          slot="suffix"
                          style="cursor: pointer; width: 24px; height: 14px; color: red"
                          class="el-icon-circle-close"
                          @click="handleEmpty2(c.uid)"
                        ></i> </el-input
                    ></el-tooltip>
                  </el-form-item>
                </div>

                <div class="m2mb" style="max-width: 60px">
                  <svg-icon icon-class="delete" style="cursor: hand" @click="delpm(c.uid)" />
                </div>
              </div>
            </el-form>

            <div>
              <el-button type="primary" @click="addPayments">添加节点</el-button>
              <span style="color: #666666">(阶段比例合计100.00%)</span>
            </div>
          </div>
        </div>

        <div class="p3">
          <el-button @click="goback">返回</el-button>
          <el-button type="primary" @click="save">保存</el-button>
        </div>

        <el-dialog :visible.sync="dialogTableVisible">
          <!-- <PaymentNodeList ref="nList" :prjNumber="form.prjNumber" :type="type" /> -->
          <XmNodeList
            v-show="this.ChooseOne == 'xmnList'"
            ref="xmnList"
            :Multiple="false"
            :prjNumber="form.id"
          />
          <WwNodeList
            v-show="this.ChooseOne == 'wwnList'"
            ref="wwnList"
            :Multiple="false"
            :prjNumber="form.id"
          />
          <PlanList
            v-show="this.ChooseOne == 'planList'"
            ref="planList"
            :Multiple="false"
            :id="form.id"
          />
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { projPlanInfo, projPlanEdit } from '@/api/data/project';
import PaymentNodeList from '@/views/components/dialog/paymentNodelist';
import XmNodeList from '@/views/components/dialog/xmNodeList';
import WwNodeList from '@/views/components/dialog/wwNodeList';
import PlanList from '@/views/components/dialog/planlist';
export default {
  name: 'ProjectPlanAdjustment', //调整项目计划
  components: { PaymentNodeList, XmNodeList, WwNodeList, PlanList },
  dicts: ['project_type', 'project_scale', 'project_role', 'project_plan'],
  data() {
    return {
      inputTipWidth: 230,
      form: {
        taskPlanList: [],
        // contractName: '项目阶段计划名称项目阶段计划名称项目阶段计划名称项目阶段计划名称',
      },
      paymentShow: true,
      dialogTableVisible: false,
      id: '', //临时记录节点id
      type: 0, //临时记录节点类型
      ChooseOne: '', //当前弹窗目标
      flagId: null,
      choosePlanFlag: false, //目标标记防止重复注册
      ruleData: {
        prjName: [{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        prjType: [{ required: true, message: '项目类型不能为空', trigger: 'change' }],
        scaleUnit: [{ required: true, message: '项目规模不能为空', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择开始日期', trigger: 'change' }],
        deliveryDate: [{ required: true, message: '请选择交付日期', trigger: 'change' }],
        bidNumber: [{ required: true, message: '请选择投标编号', trigger: 'change' }],
        clientName: [{ required: true, message: '请选择客户', trigger: 'change' }],
        contacts: [{ required: true, message: '联系人不能为空', trigger: 'blur' }],
        area: [{ required: true, message: '请选择区域', trigger: ['blur', 'change'] }],
        phone: [
          { required: true, message: '请输入号码', trigger: 'blur' },
          // {
          //   pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          //   message: '请输入正确的手机号码',
          //   trigger: 'blur',
          // },
        ],
        distribution: [
          { required: true, message: '阶段比例不能为空', trigger: ['blur', 'change'] },
        ],
        prjRole: [{ required: true, message: '请选择项目角色', trigger: 'blur' }],
        planName: [{ required: true, message: '计划名称不能为空', trigger: ['blur', 'change'] }],
        planDesc: [{ required: true, message: '计划描述不能为空', trigger: ['blur', 'change'] }],
        weight: [{ required: true, message: '权重不能为空', trigger: ['blur', 'change'] }],
        phase: [{ required: true, message: '请选择阶段', trigger: 'change' }],
        startDate: [{ required: true, message: '请选择计划开始时间', trigger: 'change' }],
        endDate: [{ required: true, message: '请选择计划结束时间', trigger: 'change' }],
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    //查询信息
    getInfo() {
      if (this.$route.query.id) {
        this.flagId = this.$route.query.id;
        projPlanInfo(this.$route.query.id).then((response) => {
          //console.log(response);
          this.form = response.data;
          this.form.startDate = response.data.startDate + '';
          this.form.deliveryDate = response.data.deliveryDate + '';
          //获取的收款节点分类回显
          // this.form.taskPlanList.forEach((item) => {
          //   if (item.nodeList.length > 0) {
          //     item.nodeList1 = [];
          //     item.nodeList2 = [];
          //     item.nodeList.forEach((item2) => {
          //       if (item2.type == 0) {
          //         item.nodeList1.push(item2);
          //       }
          //       if (item2.type == 1) {
          //         item.nodeList2.push(item2);
          //       }
          //     });
          //     item.nodeList1name = this.coverArray(item.nodeList1);
          //     item.nodeList2name = this.coverArray(item.nodeList2);
          //   }
          // });

          //20240429 只关联一个节点要么收款要么付款
          this.form.taskPlanList.forEach((item) => {
            // item.nodeList1 = [];
            // item.nodeList2 = [];
            item.uid = Math.floor(Math.random() * 100) + 1;
            if (item.nodeType == 0) {
              //0付款1收款
              //item.nodeList1.push(item);
              item.nodeList2name = item.nodeName;
            }
            if (item.nodeType == 1) {
              //item.nodeList2.push(item);
              item.nodeList1name = item.nodeName;
            }
            // item.nodeList1name = this.coverArray(item.nodeList1);
            // item.nodeList2name = this.coverArray(item.nodeList2);
          });
          console.log(this.form.taskPlanList);
        });
      }
    },

    goback() {
      this.$store.dispatch('tagsView/delView', this.$route);
      this.$router.go(-1);
    },

    //选择关联节点
    chooseXmNode(uid) {
      this.dialogTableVisible = true;
      this.ChooseOne = 'xmnList';
      this.$nextTick(() => {
        this.$refs.xmnList.$off('getChoose', this.getXmNode);
        this.$refs.xmnList.$on('getChoose', this.getXmNode);
        this.$refs.xmnList.$on('closeChoose', this.closeChoose);
        this.$refs.xmnList.clearSel();
        this.uid = uid;
      }, 500);
    },

    //获取选择
    getXmNode(data) {
      this.dialogTableVisible = false;
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          // let nodes = [];
          // for (var i = 0; i < data.length; i++) {
          //   nodes.push({
          //     id: data[i].id,
          //     nodeName: data[i].nodeName,
          //     type: 0,
          //   });
          // }
          // this.form.taskPlanList.find((item) => item.id === this.id).nodeList1 = nodes;
          // this.form.taskPlanList.find((item) => item.id === this.id).nodeList1name =
          //   this.coverArray(nodes);

          //追加限制 收付款节点只能存在一个
          if (this.form.taskPlanList.find((item) => item.uid === this.uid).nodeId != null) {
            this.$message.error('收付款节点只能同时存在一个');
            return;
          }

          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeList1name =
            data[0].nodeName;
          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeId = data[0].id;
        }
      }
    },

    //选择关联节点
    chooseWwNode(uid) {
      this.dialogTableVisible = true;
      this.ChooseOne = 'wwnList';
      this.$nextTick(() => {
        this.$refs.wwnList.$off('getChoose', this.getWwNode);
        this.$refs.wwnList.$on('getChoose', this.getWwNode);
        this.$refs.wwnList.$on('closeChoose', this.closeChoose);
        this.$refs.wwnList.clearSel();
        this.uid = uid;
      }, 500);
    },

    //获取选择
    getWwNode(data) {
      this.dialogTableVisible = false;
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          // let nodes = [];
          // for (var i = 0; i < data.length; i++) {
          //   nodes.push({
          //     id: data[i].id,
          //     nodeName: data[i].nodeName,
          //     type: 1,
          //   });
          // }
          // this.form.taskPlanList.find((item) => item.id === this.id).nodeList2 = nodes;
          // this.form.taskPlanList.find((item) => item.id === this.id).nodeList2name =
          //   this.coverArray(nodes);
          if (this.form.taskPlanList.find((item) => item.uid === this.uid).nodeId != null) {
            this.$message.error('收付款节点只能同时存在一个');
            return;
          }
          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeList2name =
            data[0].nodeName;
          this.form.taskPlanList.find((item) => item.uid === this.uid).nodeId = data[0].id;
        }
      }
    },

    //选择关联节点
    choosePlan(uid) {
      this.dialogTableVisible = true;
      this.ChooseOne = 'planList';
      this.$nextTick(() => {
        this.$refs.planList.$off('getChoose', this.getPlan);
        this.$refs.planList.$on('getChoose', this.getPlan);
        this.$refs.planList.$on('closeChoose', this.closeChoose);
        this.$refs.planList.clearSel();
        this.uid = uid;
      }, 500);
    },

    //获取选择
    getPlan(data) {
      this.dialogTableVisible = false;
      if (data) {
        console.log('getPlan', data);
        if (Array.isArray(data) && data.length > 0) {
          // let nodes = [];
          // for (var i = 0; i < data.length; i++) {
          //   nodes.push({
          //     id: data[i].id,
          //     nodeName: data[i].nodeName,
          //     type: 1,
          //   });
          // }
          // this.form.taskPlanList.find((item) => item.id === this.id).nodeList2 = nodes;
          // this.form.taskPlanList.find((item) => item.id === this.id) = data;

          //选择的id跟已有的id对比不能重复选择
          // if (this.form.taskPlanList.findIndex((item) => item.id === data[0].id) != -1) {
          //   this.$message.error('已选择该节点');
          //   return;
          // }
          this.form.taskPlanList.forEach((item) => {
            if (item.uid === this.uid) {
              // item.isNew = true;
              // item.id = data[0].id;
              // item.nodeList = data[0].nodeList;
              // item.planName = data[0].planName;
              // item.planDesc = data[0].planDesc;
              // item.startDate = data[0].startDate;
              // item.endDate = data[0].endDate;
              // item.weight = data[0].weight;

              // item.id = data[0].id;
              item.planName = data[0].planName;
              item.planDesc = data[0].planDesc;
              item.distribution = data[0].distribution;
              item.nodeId = data[0].nodeId;

              // item.nodeList1 = [];
              // item.nodeList2 = [];
              if (data[0].nodeType == 0) {
                //0项目合同 收款 1外委合同  付款
                //  item.nodeList1.push(item);
                item.nodeList2name = data[0].nodeName;
                item.nodeList1name = null;
              }
              if (data[0].nodeType == 1) {
                // item.nodeList2.push(item);
                item.nodeList1name = data[0].nodeName;
                item.nodeList2name = null;
              }
              // item.nodeList1name = this.coverArray(item.nodeList1);
              // item.nodeList2name = this.coverArray(item.nodeList2);
            }
          });
        }
      }
      console.log(this.form);
    },

    //关闭选择弹窗
    closeChoose() {
      this.dialogTableVisible = false;
    },

    handleEmpty(uid) {
      this.form.taskPlanList.find((item) => item.uid === uid).nodeList1 = [];
      this.form.taskPlanList.find((item) => item.uid === uid).nodeList1name = null;
      this.form.taskPlanList.find((item) => item.uid === uid).nodeId = null;
      this.$forceUpdate();
    },

    handleEmpty2(uid) {
      this.form.taskPlanList.find((item) => item.uid === uid).nodeList2 = [];
      this.form.taskPlanList.find((item) => item.uid === uid).nodeList2name = null;
      this.form.taskPlanList.find((item) => item.uid === uid).nodeId = null;
      this.$forceUpdate();
    },

    //处理展示
    coverArray(data) {
      if (data) {
        if (Array.isArray(data) && data.length > 0) {
          let str = '';
          for (var i = 0; i < data.length; i++) {
            str += data[i].nodeName + (i + 1 == data.length ? '' : '/');
          }
          return str;
        }
      } else {
        return '请点击选择';
      }
    },

    //添加节点
    addPayments() {
      var nv = {
        uid: Math.floor(Math.random() * 100) + 1, //临时随机id
        isNew: true, //新增节点标记
        planName: null,
        planDesc: null,
        // weight: null,
        phase: null,
        startDate: null,
        endDate: null,
      };
      this.form.taskPlanList.push(nv);
    },

    //删除节点
    delpm(uid) {
      this.form.taskPlanList.splice(
        this.form.taskPlanList.findIndex((item) => item.uid === uid),
        1,
      );
    },

    //两个节点下收付款节点需要合并成一个
    getArr(arr1, arr2) {
      // arr1 = arr1 ? arr1 : [];
      // arr2 = arr2 ? arr2 : [];
      // return arr1
      //   .concat(arr2)
      //   .map((c) => {
      //     if (c && c != undefined) {
      //       return c.id;
      //     }
      //   })
      //   .filter((item2) => item2 !== undefined);

      if (arr1 && arr1.length > 0) {
        return arr1[0].id;
      } else if (arr2 && arr2.length > 0) {
        return arr2[0].id;
      }
    },

    validateForm(refs) {
      let valiForm = this.$refs?.[refs].validate ? this.$refs?.[refs] : this.$refs?.[refs][0];
      return new Promise((resolve, reject) => {
        valiForm.validate((res) => {
          if (res) resolve();
          else reject();
        });
      });
    },

    //保存编辑
    save() {
      console.log(this.form);

      if (this.form.taskPlanList.length == 0) {
        this.$message.error('项目阶段不能为空');
        return;
      }

      Promise.all([
        ...this.form.taskPlanList.map((item, index) => this.validateForm(`refForm${index}`)),
      ]).then((res) => {
        if (res) {
          let data = { prjId: this.form.id, taskPlanList: [] };
          for (var i = 0; i < this.form.taskPlanList.length; i++) {
            data.taskPlanList.push({
              //id: this.form.taskPlanList[i].id.length > 3 ? this.form.taskPlanList[i].id : null, //ID  //新建节点id跟原有节点id冲突,新增提交需要移除，更新不用
              id: this.form.taskPlanList[i].isNew ? null : this.form.taskPlanList[i].id, //ID  //新增isNew字段区分是否为新数据
              planName: this.form.taskPlanList[i].planName, //计划名称
              planDesc: this.form.taskPlanList[i].planDesc, //计划描述
              // weight: this.form.taskPlanList[i].weight, //权重
              phase: this.form.taskPlanList[i].phase, //阶段
              distribution: this.form.taskPlanList[i].distribution, //阶段比例
              startDate: this.form.taskPlanList[i].startDate, //开始日期
              endDate: this.form.taskPlanList[i].endDate, //结束日期
              nodeId: this.form.taskPlanList[i].nodeId, //结束日期
              //两个节点下收付款节点需要合并成一个
              // nodeId: this.getArr(
              //   this.form.taskPlanList[i].nodeList1,
              //   this.form.taskPlanList[i].nodeList2,
              // ),
            });
          }
          console.log(data);
          this.$modal.loading('正在提交，请稍候...');
          projPlanEdit(data)
            .then((res) => {
              this.$modal.closeLoading();
              if (res.code == 200) {
                this.$message.success('修改成功');
                this.goback();
              }
            })
            .catch((error) => {
              this.$modal.closeLoading();
            });
        }
      });
    },
  },
  computed: {
    //计算比例金额
    calVal() {
      return function (val) {
        if (this.form.totalAmount && val) {
          return this.form.totalAmount * (val / 100);
        } else {
          return '请先输入总金额';
        }
      };
    },
  },
  watch: {
    $route: function (to, from) {
      if (to.name == this.$options.name && this.flagId != this.$route.query.id) {
        this.getInfo();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.appo {
  overflow: auto;
  .appi {
    margin: 20px;
    min-width: 1220px;
    .appc {
      .top {
        font-family: Alibaba PuHuiTi 2;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 20px;
      }

      .main {
        background: #fff;
        border-radius: 4px;
        .p1 {
          position: relative;
          display: inline-block;
          .p1item {
            margin: 4px 10px 0 4px;
            float: left;
            width: 350px;
            height: 60px;

            span {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
            ::v-deep .el-date-editor {
              margin-left: 20px;
              float: left;
              text-align: center;
              line-height: 60px;
              font-size: 16px;
            }
            ::v-deep .el-input__inner {
              width: 225px;
            }
          }
        }

        .p2 {
          margin-top: 10px;
          .p2item {
            span {
              line-height: 100px;
              text-align: center;
              margin: 0 37px 0 25px;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .el-textarea {
              height: 240px !important;
              width: 1050px;
              border-radius: 4px;
              border: 1px;
              ::v-deep textarea {
                height: 240px !important;
              }
            }
            .el-button {
              width: 240px;
              height: 48px;
              border-radius: 4px;
              color: #409eff;
              font-family: Alibaba PuHuiTi 2;
              font-size: 16px;
              font-weight: 500;
            }
            .upload-file {
              margin-top: 30px;
              width: 400px;
              display: inline-block;
            }
          }
          .p2item:first-child {
            span {
              position: relative;
              top: -170px;
            }
          }
          .p2item:last-child {
            span {
              float: left;
            }
          }
        }
      }

      .main2 {
        margin-top: 20px;
        background: #fff;
        border-radius: 4px;
        .m2top {
          padding-top: 20px;
          padding-bottom: 20px;
          margin: 0 20px;
          font-family: Alibaba PuHuiTi 2;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: 0em;
          text-align: left;
          .m2topm {
            display: inline;
            float: right;
            font-size: 14px;
            cursor: pointer;
            color: #409eff;
          }
        }
        .m2top::before {
          content: '\00a0    ';
          border-left: 3px solid #4da0ff;
        }
        .m2main {
          border-top: 1px solid #e4e6ed;
          .m2mt {
            height: 60px;
            display: flex;
            line-height: 60px;
            .m2mb {
              flex: 1;
              margin: 0px 10px 10px 20px;
              .el-button {
                border: 0;
                margin: 0;
                width: 40px;
                height: 40px;
                border-radius: 4px;
              }
              .el-date-editor {
                width: 100%;
              }
              .el-select,
              .el-input-inner {
                display: flex;
                flex: 1;
              }
              svg {
                width: 36px;
                height: 36px;
              }
            }
            .m2mb + .node {
              ::v-deep .el-input__inner {
                padding-right: 60px;
              }
            }
          }
          .el-button {
            border: 0;
            margin: 20px 20px 20px 20px;
            width: 100px;
            height: 40px;
            border-radius: 4px;
          }
        }
      }

      .p3 {
        margin: 0px 0px;
        width: 98%;
        .el-button {
          border: 0;
          margin: 20px 20px 20px 0px;
          width: 100px;
          height: 40px;
          border-radius: 4px;
        }
      }

      // ::v-deep .el-dialog__header {
      //   display: none;
      // }
      // ::v-deep .el-dialog__body {
      //   padding: 10px;
      // }

      // ::v-deep .dialog {
      //   min-width: 900px;
      // }
    }
  }
}
</style>
