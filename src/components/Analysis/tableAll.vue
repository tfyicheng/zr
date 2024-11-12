<template class="app-container">
  <div class="cbody">
    <div class="top" v-if="type != 70">
      <span class="toptitle"> {{ title }}</span>
      <!-- <svg-icon icon-class="more" /> -->

      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>

      <div class="topmenu" v-if="type == 0">
        <div class="p1item">
          <CertCascader :data.sync="queryParams.cert" />
        </div>

        <!-- <div class="p1item">
          <el-select
            v-model="queryParams.certParentType"
            placeholder="证书大类"
            clearable
            :popper-append-to-body="true"
            popper-class="popperClass"
            @change="certPChange"
          >
            <el-option
              v-for="item in dict.type.certificate_category"
              :popper-append-to-body="false"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="p1item">
          <el-select
            v-model="queryParams.certChildType"
            placeholder="请先选择证书大类"
            clearable
            @change="certCChange"
          >
            <el-option
              v-for="item in certChildTypes"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </div>
        <div class="p1item">
          <el-select
            v-model="queryParams.certGrandsonType"
            placeholder="请先选择证书中类"
            clearable
          >
            <el-option
              v-for="item in certGrandsonTypes"
              :key="item.dictValue"
              :label="item.dictLabel"
              :value="item.dictValue"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="p1item">
          <el-date-picker
            v-model="queryParams.year"
            type="year"
            placeholder="选择年份"
            clearable
            value-format="yyyy"
          >
          </el-date-picker>
        </div>
        <div class="p1item">
          <el-button type="primary" @click="handleQuery1">汇总</el-button>
          <el-button v-hasPermi="['certificate:cert0:export']" type="warning" @click="exportT1"
            >导出</el-button
          >
        </div>
      </div>
    </div>
    <div class="main" v-if="type == 0">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="560"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <!-- <el-table-column type="selection" width="55" label-class-name="DisabledSelection">
              </el-table-column> -->
        <!-- <el-table-column type="selection" width="55" reserve-selection /> -->
        <el-table-column prop="certNumber" label="证书编号"> </el-table-column>
        <el-table-column prop="certName" label="证书名称">
          <template slot-scope="scope">
            <!-- 到期标志 -->
            <svg-icon
              icon-class="xm_jjcq"
              v-show="scope.row.dueStatus === 2"
              style="width: 30px; height: 30px; margin: auto 0"
            />
            {{ scope.row.certName }}
          </template>
        </el-table-column>
        <el-table-column label="证书大类">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.certificate_category"
              :value="scope.row.certParentType"
            />
          </template>
        </el-table-column>
        <el-table-column label="证书中类">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.certificate_category"
              :value="[scope.row.certParentType, scope.row.certChildType]"
            />
          </template>
        </el-table-column>
        <el-table-column label="证书小类">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.certificate_category"
              :value="[
                scope.row.certParentType,
                scope.row.certChildType,
                scope.row.certGrandsonType,
              ]"
            />
          </template>
        </el-table-column>
        <!--<el-table-column label="证书种类">
           <template slot-scope="scope">
            {{
              dict.type.cert_type[scope.row.certType]
                ? dict.type.cert_type[scope.row.certType].label
                : ''
            }}
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="最近三个月浏览/使用数">
          <template slot-scope="scope">
            {{
              (scope.row.browseNum ? scope.row.browseNum : '0') +
              '/' +
              (scope.row.useNum ? scope.row.useNum : '0')
            }}
          </template>
        </el-table-column> -->

        <el-table-column label="最近三个月浏览数">
          <template slot-scope="scope">
            {{ scope.row.browseNum != null ? scope.row.browseNum : '0' }}
          </template>
        </el-table-column>

        <el-table-column prop="authority" label="颁发机构"> </el-table-column>
        <el-table-column prop="issueDate" label="颁发时间"> </el-table-column>
        <el-table-column prop="userName" label="用户"> </el-table-column>
        <el-table-column prop="deptName" label="组织"> </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click="handleCheck(scope.row)"
                    type="text"
                    size="small"
                    style="font-size: 14px"
                    >查看</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  >
                </template>
              </el-table-column> -->
      </el-table>

      <pagination
        v-show="total > 0"
        :total="total"
        :limit.sync="queryParams.pageSize"
        :page.sync="queryParams.pageNum"
        @pagination="getCertList"
      />
      <div style="height: 10px"></div>
    </div>
    <div class="main" v-if="type == 1">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="applyName" label="名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toApprove(scope.row, 0)">{{
              scope.row.applyName
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批中">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已同意">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.agreeNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="驳回">
          <template slot-scope="scope">
            <el-tag type="danger" effect="dark">
              {{ scope.row.refuseNum }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 2">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="applyName" label="名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toApprove(scope.row, 1)">{{
              scope.row.applyName
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批中">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已同意">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.agreeNum }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 3">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="prjNumber"
        v-loading="loading"
        show-summary
      >
        <el-table-column prop="prjName" label="项目名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toPrj(scope.row)">{{ scope.row.prjName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度(%)"> </el-table-column>
        <el-table-column prop="totalPlanNum" label="计划总数"> </el-table-column>
        <el-table-column prop="completePlanNum" label="已完成计划"> </el-table-column>
        <el-table-column label="进行中计划">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressPlanNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="即将超期计划">
          <template slot-scope="scope">
            <el-tag type="warning" effect="dark">
              {{ scope.row.beOverduePlanNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canReport"
              @click="handleToWrite(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >填报</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 4">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="id" label="申请编号">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleToApprove(scope.row, 1)">{{
              scope.row.id
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
            <!-- <span v-if="scope.row.status === 0" style="color: #fac06a">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 1" style="color: #07c15f">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 2" style="color: red">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 3" style="color: #07c15f">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 4" style="color: #409eff">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 5" style="color: #666666">{{
              dict.type.approval_status[scope.row.status].label
            }}</span>
            <span v-else-if="scope.row.status === 6" style="color: red">{{
              dict.type.approval_status[scope.row.status].label
            }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间"> </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 5">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="id" label="申请编号">
          <template slot-scope="scope">
            <el-link type="primary" @click="handleToApprove(scope.row, 2)">{{
              scope.row.id
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>
        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleToApprove(scope.row, 2)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 6">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="contName" label="合同名称"> </el-table-column>
        <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag :flag="false" :options="dict.type.in_node_status" :value="scope.row.status" />
          </template>
        </el-table-column>
        <div style="height: 10px"></div>
      </el-table>
    </div>
    <div class="main" v-if="type == 7">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="contName" label="合同名称"> </el-table-column>
        <el-table-column prop="nodeName" label="节点名称"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.out_node_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 8">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="prjName" label="项目名称"> </el-table-column>
        <el-table-column prop="planName" label="计划名称"> </el-table-column>
        <el-table-column prop="endDate" label="计划结束时间"> </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 9">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="id" label="用车编号"> </el-table-column>
        <el-table-column prop="useTime" label="出车时间"> </el-table-column>
        <!-- 审批状态 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 10">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="id" label="出库编号"> </el-table-column>
        <el-table-column prop="outboundTime" label="出库时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="(type >= 11 && type < 60) || type == 71 || type == 72">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="operId"
        v-loading="loading"
      >
        <el-table-column prop="operTime" label="操作时间" width="250"> </el-table-column>
        <el-table-column prop="operName" label="操作人" width="100"> </el-table-column>
        <el-table-column prop="operIp" label="IP地址" width="150"> </el-table-column>
        <el-table-column prop="operDesc" label="操作描述"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.businessType == 1 || scope.row.businessType == 2"
              @click="handleCheckLog(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 10px"></div>
    </div>
    <div class="main" v-if="type == 60">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="name" label="领用名称"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"></el-table-column>

        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 61">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="name" label="出库名称"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>

        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 62">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="id" label="申请编号"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"></el-table-column>
        <el-table-column prop="createTime" label="申请时间"> </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 63">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="id" label="申请编号"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>
        <el-table-column prop="createTime" label="申请时间"> </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 64">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="id" label="外出编号"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>

        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 65">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
      >
        <el-table-column prop="id" label="请假编号"> </el-table-column>
        <el-table-column prop="applyUser" label="申请人"> </el-table-column>

        <el-table-column label="审批状态">
          <template slot-scope="scope">
            <dict-tag
              :flag="false"
              :options="dict.type.approval_status"
              :value="scope.row.status"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" :show-overflow-tooltip="false">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canHandle"
              @click="handleWork(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 66">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="applyName" label="名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toApprove(scope.row, 0)">{{
              scope.row.applyName
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批中">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已同意">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.agreeNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="驳回">
          <template slot-scope="scope">
            <el-tag type="danger" effect="dark">
              {{ scope.row.refuseNum }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 67">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="applyName" label="名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toApprove(scope.row, 1)">{{
              scope.row.applyName
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批中">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已同意">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.agreeNum }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 68">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="360"
        ref="multipleTable"
        row-key="prjNumber"
        v-loading="loading"
        show-summary
      >
        <el-table-column prop="prjName" label="项目名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toPrj(scope.row)">{{ scope.row.prjName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="progress" label="进度(%)"> </el-table-column>
        <el-table-column prop="totalPlanNum" label="计划总数"> </el-table-column>
        <el-table-column prop="completePlanNum" label="已完成计划"> </el-table-column>
        <el-table-column label="进行中计划">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressPlanNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="即将超期计划">
          <template slot-scope="scope">
            <el-tag type="warning" effect="dark">
              {{ scope.row.beOverduePlanNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-show="scope.row.canReport"
              @click="handleToWrite(scope.row)"
              type="text"
              size="small"
              style="font-size: 14px"
              >填报</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="main" v-if="type == 69">
      <el-table
        :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
        :cell-style="{ textAlign: 'left' }"
        :data="tableData"
        style="width: 100%"
        :max-height="tabMaxHeight"
        ref="multipleTable"
        row-key="id"
        v-loading="loading"
      >
        <el-table-column prop="applyName" label="名称">
          <template slot-scope="scope">
            <el-link type="primary" @click="toApprove(scope.row, 1)">{{
              scope.row.applyName
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审批中">
          <template slot-scope="scope">
            <el-tag effect="dark">
              {{ scope.row.progressNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="已同意">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark">
              {{ scope.row.agreeNum }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="驳回">
          <template slot-scope="scope">
            <el-tag type="danger" effect="dark">
              {{ scope.row.refuseNum }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="已处理">
          <template slot-scope="scope">
            <el-tag type="info" effect="dark">
              {{ scope.row.handleNum }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="tabCard" v-if="type == 70">
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane
          v-for="(c, index) in dict.type.safety_production_type"
          :key="index"
          :label="c.label"
          :name="c.value"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabMain">
        <div class="p1">
          <div class="p1item">
            <el-input
              style="width: 190px"
              v-model="queryParams2.title"
              :maxlength="commonFun.inputMax"
              placeholder="标题"
              clearable
            ></el-input>
          </div>
          <div class="p1item">
            <el-select
              style="width: 190px"
              v-model="queryParams2.deptId"
              placeholder="部门"
              clearable
            >
              <el-option
                v-for="item in depts"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="p1item">
            <el-date-picker
              style="width: 190px"
              unlink-panels
              v-model="options"
              @change="getDate()"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="~"
              clearable
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </div>
          <div class="p1item">
            <el-button type="primary" @click="handleQuery">搜索</el-button>
            <el-button style="background-color: #f3f4f8" @click="resetQuery">重置</el-button>
          </div>
        </div>
        <div class="p2">
          <el-table
            :header-cell-style="{ fontSize: '16px', textAlign: 'left' }"
            :cell-style="{ textAlign: 'left' }"
            :data="tableData"
            style="width: 100%"
            :max-height="280"
            ref="multipleTable"
            row-key="id"
            v-loading="loading"
          >
            <el-table-column prop="title" label="标题" width="360">
              <template slot-scope="scope">
                <el-link type="primary" @click="handleCheck(scope.row)">
                  {{ scope.row.title }}
                </el-link>
              </template>
            </el-table-column>
            <!-- <el-table-column label="专题类型">
              <template slot-scope="scope">
                <dict-tag
                  :flag="false"
                  :options="dict.type.safety_production_type"
                  :value="scope.row.type"
                />
              </template>
            </el-table-column> -->
            <el-table-column label="点击数">
              <template slot-scope="scope">
                {{ scope.row.clickNum != null ? scope.row.clickNum : '0' }}
              </template>
            </el-table-column>

            <el-table-column prop="deptName" label="供稿部门"> </el-table-column>
            <el-table-column prop="releaseTime" label="发布时间"> </el-table-column>
            <!-- <el-table-column prop="updateTime" label="最近更新时间"> </el-table-column> -->
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleCheck(scope.row)"
                  type="text"
                  size="small"
                  style="font-size: 14px"
                  >查看</el-button
                >
                <!-- <el-button
                    type="text"
                    size="small"
                    @click="handleEdit(scope.row)"
                    style="font-size: 14px"
                    >编辑</el-button
                  > -->
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :limit.sync="queryParams2.pageSize"
            :page.sync="queryParams2.pageNum"
            @pagination="getSafeList"
          />
          <div style="height: 10px"></div>
        </div>
      </div>
    </div>

    <!-- 操作日志详细 -->
    <el-dialog :visible.sync="open" width="700px" append-to-body>
      <span class="dialogt">操作日志详细</span>
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="12">
            <el-form-item label="操作模块："
              >{{ form.title }} / {{ typeFormat(form) }}</el-form-item
            >
            <el-form-item label="登录信息：">{{ form.operName }} / {{ form.operIp }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
            <el-form-item label="请求方式：">{{ form.requestMethod }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="操作方法：">{{ form.method }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作状态：">
              <div v-if="form.status === 0">正常</div>
              <div v-else-if="form.status === 1">失败</div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="消耗时间：">{{ form.costTime }}毫秒</el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="操作时间：">{{ parseTime(form.operTime) }}</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="异常信息：" v-if="form.status === 1">{{
              form.errorMsg
            }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="open = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDept } from '@/api/system/dept';
import { safeQuery } from '@/api/data/safe';
import { certList0 } from '@/api/data/certificate';
import { getLogs, getLogInfo } from '@/api/system/operlog';
import {
  certExport,
  myApplyEChart,
  approveEChart,
  myProjectEChart,
  dmy,
  dapproveList,
  canPayment,
  canPaymentt,
  prjoverdue,
  myUseCar,
  myOutCar,
  useOrOuto,
  useOrOutt,
  CarApproveo,
  CarApprovet,
  infoApplyo,
  infoApplyt,
  projectStatistic,
  applyStatistic,
} from '@/api/data/statistic';
export default {
  name: 'TableAll', //表格组件
  props: ['type'], //0证书  1我的申请 2工作台审批  3我的项目 4我的下载申请 5未处理审批 6可收款节点
  //7可收款节点
  dicts: [
    'certificate_category',
    'cert_type',
    'approval_status',
    'in_node_status',
    'out_node_status',
    'sys_oper_type',
    'safety_production_type',
  ],
  data() {
    return {
      // 是否显示弹出层
      open: false, // 表单参数
      form: {},
      tabMaxHeight: 270,
      title: '', //标题
      tolink: '', //更多链接
      loading: true, // 遮罩层
      tableData: [], //数据
      // 总条数
      total: 0,
      //联动类
      certChildTypes: [],
      certGrandsonTypes: [],
      // 查询参数
      queryParams: {
        cert: [],
        pageNum: 1,
        pageSize: 10,
        certNumber: '', //证书编号
        certName: '', //证书名称
        certParentType: undefined, //证书大类
        certChildType: undefined, //证书中类
        certGrandsonType: undefined, //证书小类
        certType: undefined, //证书类型
        year: '', //年份
        //placeholder: '', //关键字
      },
      depts: [], //部门
      options: [], //日期
      // 安全专题查询参数
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
        title: null,
        deptId: null,
        type: null,
        startTime: null,
        endTime: null,
      },
      activeType: 0,
    };
  },
  created() {
    this.init();
    if (this.type == 70) {
      this.getDeptList();
    }
  },
  methods: {
    //刷新
    refresh() {
      this.init();
    },

    //初始化
    init() {
      switch (this.type) {
        case 0:
          this.title = '证书汇总';
          this.tolink = '';
          break;
        case 1:
          this.title = '我的申请';
          this.tolink = '';
          break;
        case 2:
          this.title = '审批处理';
          this.tolink = '';
          break;
        case 3:
          this.title = '我的项目';
          this.tolink = '/project-d/projectCheck';
          break;
        case 4:
          this.title = '我的申请';
          //this.tolink = '/data-d/myRequestCheck';
          break;
        case 5:
          this.title = '处理审批';
          //this.tolink = '/data-d/downApprovalCheck';
          break;
        case 6:
          this.title = '可收款节点';
          //this.tolink = '/production-d/incomeNodeCheck';
          break;
        case 7:
          this.title = '可付款节点';
          //this.tolink = '/production-d/paymentNodeCheck';
          break;
        case 8:
          this.title = '即将超期计划';
          this.tolink = '/project-d/projectPlanCheck';
          break;
        case 9:
          this.title = '用车申请';
          this.tolink = '/car-d/carRequestCheck';
          break;
        case 10:
          this.title = '出库申请';
          this.tolink = '/car-d/carOutRequestCheck';
          break;
        case 11: //0资料管理
        case 12: //1资料管理-证书管理
        case 13: //2资料管理-合同管理
        case 14: //3资料管理-人员管理
        case 15: //4资料管理-项目资料
        case 16: //6资料管理-资料下载我的申请
        case 17: //7资料管理-资料下载审批处理
        case 18: //8生产管理
        case 19: //9生产管理-投标管理
        case 20: //10生产管理-合同管理-项目合同管理
        case 21: //11生产管理-合同管理-外委合同管理
        case 22: //12生产管理-收款管理-收款节点管理
        case 23: //13生产管理-收款管理-收款记录管理
        case 24: //14生产管理-收款管理-开票记录管理
        case 25: //15生产管理-付款管理-付款节点管理
        case 26: //16生产管理-付款管理-付款记录管理
        case 27: //17生产管理-付款管理-收票记录管理
        case 28: //18生产管理-客户管理
        case 29: //19项目管理
        case 30: //20项目管理-项目列表管理
        case 31: //21项目管理-项目人员管理
        case 32: //22项目管理-项目计划管理
        case 33: //23项目管理-项目进度管理
        case 34: //24项目管理-项目资料管理
        case 35: //25资产采购管理
        case 36: //26资产采购管理-采购合同
        case 37: //27资产采购管理-供应商
        case 38: //28资产采购管理-资产入库管理
        case 39: //30资产采购管理-资产领用管理
        case 40: //29资产采购管理-资产报废管理
        case 41: //31资产采购管理-资产审批处理
        case 42: //32车辆管理
        case 43: //33车辆管理-用车申请
        case 44: //34车辆管理-出库申请
        case 45: //35车辆管理-车辆管理
        case 46: //36车辆管理-审批处理
        case 47: //37人员管理
        case 48: //38人员管理-人员信息
        case 49: //39人员管理-劳动合同
        case 50: //40人员管理-人员证书
        case 51: //41人员管理-履职经历
        case 52: //42人员管理-人员业绩
        case 53: //43人员管理-人员外出
        case 54: //44人员管理-人员请假
        case 55: //45人员管理-审批处理
        case 56: //46项目资料-归档管理
          this.title = '操作记录';
          break;
        case 60:
          this.title = '领用审批';
          break;
        case 61:
          this.title = '出库审批';
          break;
        case 62:
          this.title = '用车审批';
          break;
        case 63:
          this.title = '出库审批';
          break;
        case 64:
          this.title = '外出审批';
          break;
        case 65:
          this.title = '请假审批';
          break;
        case 66:
          this.title = '我的申请';
          break;
        case 67:
          this.title = '审批处理';
          break;
        case 68:
          this.title = '项目进展';
          break;
        case 69:
          this.title = '审批处理';
          break;
        case 70:
          this.title = '生产安全专题';
          break;
        case 71: //47消耗品-资产入库
        case 72: //48消耗品-资产领用
          this.title = '操作记录';
          break;
        default:
          break;
      }
      this.getData();
    },

    //获取部门列表
    getDeptList() {
      listDept().then((response) => {
        console.log(response);
        this.depts = response.data;
      });
    },

    getData() {
      //#region
      if (this.type == 0) {
        // xxx().then((res) => {
        //   if (res && res.code == 200) {
        //     this.data1 = res.data;
        //   }
        // });
        this.getCertList();
      }
      if (this.type == 1) {
        myApplyEChart().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 2) {
        approveEChart().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 3) {
        myProjectEChart().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 4) {
        dmy().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 5) {
        dapproveList().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 6) {
        canPayment().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 7) {
        canPaymentt().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 8) {
        prjoverdue().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 9) {
        myUseCar().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 10) {
        myOutCar().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      //#endregion

      //#region 日志
      if (this.type == 11) {
        getLogs(0).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 12) {
        getLogs(1).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 13) {
        getLogs(2).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 14) {
        getLogs(3).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 15) {
        getLogs(4).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 16) {
        getLogs(6).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 17) {
        getLogs(7).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 18) {
        getLogs(8).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 19) {
        getLogs(9).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 20) {
        getLogs(10).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 21) {
        getLogs(11).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 22) {
        getLogs(12).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 23) {
        getLogs(13).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 24) {
        getLogs(14).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 25) {
        getLogs(15).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 26) {
        getLogs(16).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 27) {
        getLogs(17).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 28) {
        getLogs(18).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 29) {
        getLogs(19).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 30) {
        getLogs(20).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 31) {
        getLogs(21).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 32) {
        getLogs(22).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 33) {
        getLogs(23).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 34) {
        getLogs(24).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 35) {
        getLogs(25).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 36) {
        getLogs(26).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 37) {
        getLogs(27).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 38) {
        getLogs(28).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 39) {
        getLogs(30).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 40) {
        getLogs(29).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 41) {
        getLogs(31).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 42) {
        getLogs(32).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 43) {
        getLogs(33).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 44) {
        getLogs(34).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 45) {
        getLogs(35).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 46) {
        getLogs(36).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 47) {
        getLogs(37).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 48) {
        getLogs(38).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 49) {
        getLogs(39).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 50) {
        getLogs(40).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 51) {
        getLogs(41).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 52) {
        getLogs(42).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 53) {
        getLogs(43).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 54) {
        getLogs(44).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 55) {
        getLogs(45).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 56) {
        getLogs(46).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 71) {
        getLogs(47).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 72) {
        getLogs(48).then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      //#endregion

      //-------------------------------

      if (this.type == 60) {
        useOrOuto().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 61) {
        useOrOutt().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 62) {
        CarApproveo().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 63) {
        CarApprovet().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 64) {
        infoApplyo().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 65) {
        infoApplyt().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 66) {
        myApplyEChart().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data.filter((item) => {
              return item.applyName == '外出申请' || item.applyName == '请假申请';
            });
            this.loading = false;
          }
        });
      }
      if (this.type == 67) {
        approveEChart().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data.filter((item) => {
              return item.applyName == '外出申请' || item.applyName == '请假申请';
            });
            this.loading = false;
          }
        });
      }
      if (this.type == 68) {
        projectStatistic().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }
      if (this.type == 69) {
        applyStatistic().then((res) => {
          if (res && res.code == 200) {
            this.tableData = res.data;
            this.loading = false;
          }
        });
      }

      if (this.type == 70) {
        this.getSafeList();
      }
    },

    handleWork(row) {
      switch (this.type) {
        case 60:
          this.$router.push({
            path: '/purchase-d/approvalHandleCheck',
            query: { tab: 0, id: row.id },
          });
          break;
        case 61:
          this.$router.push({
            path: '/purchase-d/approvalHandleCheck',
            query: { tab: 1, id: row.id },
          });
          break;
        case 62:
          this.$router.push({
            path: '/purchase-d/approvalHandleCheck',
            query: { tab: 0, id: row.id },
          });
          break;
        case 63:
          this.$router.push({
            path: '/purchase-d/approvalHandleCheck',
            query: { tab: 1, id: row.id },
          });
          break;
        case 64:
          this.$router.push({
            path: '/person-d/personApprovalCheck',
            query: { tab: 0, id: row.id },
          });
          break;
        case 65:
          this.$router.push({
            path: '/person-d/personApprovalCheck',
            query: { tab: 1, id: row.id },
          });
          break;
        default:
          break;
      }
    },

    //查看日志详情
    getLogInfo(id) {
      getLogInfo(id).then((res) => {
        if (res && res.code == 200) {
          this.form = res.data;
        }
      });
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    //切换大类联动中类
    certPChange() {
      this.certChildTypes =
        this.dict.type.certificate_category[this.queryParams.certParentType].raw.children;
    },

    //切换中类联动小类
    certCChange() {
      this.certGrandsonTypes = this.certChildTypes[this.queryParams.certChildType].children;
    },

    //证书搜索
    handleQuery1() {
      this.queryParams.pageNum = 1;
      (this.queryParams.certParentType = this.commonFun.getArrVal(this.queryParams.cert, 0)), //证书大类
        (this.queryParams.certChildType = this.commonFun.getArrVal(this.queryParams.cert, 1)), //证书中类
        (this.queryParams.certGrandsonType = this.commonFun.getArrVal(this.queryParams.cert, 2)), //证书小类
        this.getCertList();
    },

    //公司证书查询
    getCertList() {
      certList0(this.queryParams).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },

    //证书导出
    exportT1() {
      this.queryParams.certType = 1;
      certExport(this.queryParams);
    },

    //项目进度填报
    handleToWrite(row) {
      if (row.showPrjNumber !== null) {
        this.$router.push({
          path: '/project-d/projectProcessCheck',
          query: { showPrjNumber: row.showPrjNumber },
        });
      } else {
        this.$router.push({
          path: '/project-d/projectProcessCheck',
          query: { id: row.id },
        });
      }
    },

    //查看项目详情
    toPrj(row) {
      this.$router.push({
        path: '/project-d/projectInfo',
        query: { id: row.id, name: row.prjName, prjNumber: row.prjNumber },
      });
    },

    //查看审批
    toApprove(row, type = 0) {
      switch (row.applyName) {
        case '资料下载申请':
          if (type == 0) {
            this.$router.push({ path: '/data-d/myRequestCheck' });
          } else {
            this.$router.push({ path: '/data-d/downApprovalCheck' });
          }
          break;
        case '用车申请':
          if (type == 0) {
            this.$router.push({ path: '/car-d/carRequestCheck' });
          } else {
            this.$router.push({ path: 'car-d/carApprovalCheck' });
          }
          break;
        case '领用申请':
          if (type == 0) {
            this.$router.push({ path: '/car-d/carOutRequestCheck' });
          } else {
            this.$router.push({ path: 'car-d/carApprovalCheck' });
          }
          break;
        case '外出申请':
          if (type == 0) {
            this.$router.push({ path: '/person-d/personOutCheck' });
          } else {
            this.$router.push({ path: '/person-d/personApprovalCheck' });
          }
          break;
        case '请假申请':
          if (type == 0) {
            this.$router.push({ path: '/person-d/personLeaveCheck' });
          } else {
            this.$router.push({ path: '/person-d/personApprovalCheck' });
          }
          break;
        default:
          break;
      }
    },

    //下载审批处理
    handleToApprove(row, type) {
      if (type == 1) {
        this.$router.push({ path: '/data-d/myRequestCheck', query: { id: row.id } });
      }
      if (type == 2) {
        this.$router.push({ path: '/data-d/downApprovalCheck', query: { id: row.id } });
      }
    },

    // 操作日志类型字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.dict.type.sys_oper_type, row.businessType);
    },

    //查看日志
    handleCheckLog(row) {
      this.getLogInfo(row.operId);
      this.open = true;
    },

    //查询安全专题列表
    getSafeList() {
      this.queryParams2.type = this.activeType;
      safeQuery(this.queryParams2).then((res) => {
        if (res && res.code == 200) {
          this.total = res.total;
          this.tableData = res.rows;
          this.loading = false;
        }
      });
    },

    //tab切换
    handleClick(tab, event) {
      console.log(this.activeType, tab, event);
      this.queryParams2.type = this.activeType;
      this.getSafeList();
    },

    //日期更新
    getDate() {
      console.log(this.options);
      if (this.options) {
        this.queryParams2.startTime = this.options[0];
        this.queryParams2.endTime = this.options[1];
      } else {
        this.queryParams2.startTime = null;
        this.queryParams2.endTime = null;
      }
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.getSafeList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.options = [];
      this.queryParams2 = { pageNum: 1, pageSize: 10, type: this.activeType };
      this.handleQuery();
    },

    //查看安全专题详情
    handleCheck(row) {
      this.$router.push({ path: '/safety/safetyInfo2', query: { id: row.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.cbody {
  background: #fff;
  height: 100%;
  .top {
    background: #fff;
    padding: 0 20px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e4e6ed;
    .toptitle {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 60px;
      letter-spacing: 0em;
      text-align: left;
      margin-right: 20px;
    }
    .toptitle:first-child:before {
      content: '\00a0 ';
      border-left: 3px solid #4da0ff;
      margin-right: 5px;
    }
    .toplink {
      float: right;
      background: #409eff;
      width: 100px;
      height: 32px;
      border-radius: 4px;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: center;
      color: #fff;
      margin: auto 0;
    }
    span {
      margin: 0px;
      color: #333;
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-style: normal;
      font-weight: 500;
      line-height: 60px;
    }
    a {
      margin-top: 3px;
      color: #409eff;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 60px;
      text-transform: capitalize;
      cursor: pointer;
    }

    .topmenu {
      margin: auto 0;
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        width: 150px;
        height: 60px;
        .el-input,
        .el-cascader,
        .el-date-editor,
        .el-select {
          margin: 10px 5px 0 10px;
          width: 150px;
          line-height: 37px;
          ::v-deep .el-input__inner {
            height: 37px;
          }
        }
        .el-button {
          margin-left: 1px;
          margin: 11px;
          width: 100px;
          border: 0px;
        }
        ::v-deep .el-cascader {
          margin: 10px 10px 0 10px;
          width: 150px;
          height: 37px;
        }
        // .el-button:last-child {
        //   background: #f3f4f8;
        // }
      }
      .p1item:last-child {
        width: auto;
      }
    }
  }
  .main {
    padding: 20px;
    /* 合计行样式整体样式修改 */
    ::v-deep .el-table__footer-wrapper tbody td {
      text-align: center;
      font-weight: bolder;
    }
    /* 合计行整体样式修改结束*/
  }
  .tabCard {
    ::v-deep {
      .el-tabs {
        border: 0;
        .el-tabs__header {
          margin: 0px;
        }
        .el-tabs__nav-wrap {
          padding-left: 17px;

          .el-tabs__item.is-active {
            margin-top: 10px;
            font-size: 20px;
          }
        }
      }
    }
    .p1 {
      // .el-tabs {
      //   border: 0;
      //   ::v-deep .el-tabs__header {
      //     margin: 0 !important;
      //   }
      //   ::v-deep .el-tabs__item.is-active {
      //     font-size: 20px;
      //   }
      // }
      .p1item {
        margin: 4px 0px 0 4px;
        float: left;
        //width: 150px;
        height: 60px;
        .el-input,
        .el-cascader,
        .el-date-editor,
        .el-select {
          margin: 10px 5px 0 10px;
          //width: 150px;
          line-height: 37px;
          ::v-deep .el-input__inner {
            height: 37px;
          }
        }
        .el-button {
          margin-left: 1px;
          margin: 11px;
          width: 100px;
          border: 0px;
        }
        ::v-deep .el-cascader {
          margin: 10px 10px 0 10px;
          //width: 150px;
          height: 37px;
        }
      }
      .p1item:last-child {
        width: auto;
      }
    }
    .p2 {
      margin: 0 15px;
    }
  }
}
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
  .el-form {
    margin-top: 20px;
  }
}
</style>
