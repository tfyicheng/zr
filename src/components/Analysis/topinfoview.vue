<template class="app-container">
  <div class="body">
    <div class="top">
      <span class="toptitle"> {{ title }}</span>
      <span class="toptitle">{{ data.totalNum }}</span>
      <!-- <svg-icon icon-class="more" /> -->
      <a class="toplink" v-show="tolink" @click="check()"> 查看更多</a>
    </div>
    <div class="main" v-if="type == 0">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.certName"></InputTip></div>
        <div class="miu">{{ c.certNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.certNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.certNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('营业执照')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">营业执照</div>
        <div class="miu">{{ data.aptitudeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.aptitudeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.aptitudeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('资质证书')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">资质证书</div>
        <div class="miu">{{ data.awardsNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.awardsNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.awardsNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('单位水平评价证书')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">单位水平评价证书</div>
        <div class="miu">{{ data.patentNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.patentNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.patentNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('管理体系证书')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">管理体系证书</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('公司获奖证书')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">公司获奖证书</div>
        <div class="miu">{{ data.aptitudeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.aptitudeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.aptitudeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('银行基本户、银行资信证书及审计报告')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">
          <InputTip :width="inputTipWidth" text="银行基本户、银行资信证书及审计报告"></InputTip>
        </div>
        <div class="miu">{{ data.awardsNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.awardsNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.awardsNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('企业信用等级证书及其他信用等级证书')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">
          <InputTip :width="inputTipWidth" text="企业信用等级证书及其他信用等级证书"></InputTip>
        </div>
        <div class="miu">{{ data.patentNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.patentNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.patentNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('公司发明专利及软件专著')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">公司发明专利及软件专著</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 1">
      <div class="mainitem" @click="goRoute('项目合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">项目合同</div>
        <div class="miu">{{ data.prjContNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.prjContNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.prjContNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('外委合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">外委合同</div>
        <div class="miu">{{ data.outContNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outContNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outContNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('劳动合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">劳动合同</div>
        <div class="miu">{{ data.laborContNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.laborContNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.laborContNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('采购合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">采购合同</div>
        <div class="miu">{{ data.buyContNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.buyContNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.buyContNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 2">
      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">在岗人员</div>
        <div class="miu">{{ data.onDutyNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.onDutyNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.onDutyNum) }}</div>
      </div>
      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">外出人员</div>
        <div class="miu">{{ data.goOutNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.goOutNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.goOutNum) }}</div>
      </div>

      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">请假人员</div>
        <div class="miu">{{ data.askForLeaveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.askForLeaveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.askForLeaveNum) }}</div>
      </div>
      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">离职人员</div>
        <div class="miu">{{ data.departNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.departNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.departNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 3">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.fileName"></InputTip></div>
        <div class="miu">{{ c.fileNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.fileNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.fileNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('报告资料')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">报告资料</div>
        <div class="miu">{{ data.reportNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.reportNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.reportNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('图纸资料')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">图纸资料</div>
        <div class="miu">{{ data.drawingNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.drawingNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.drawingNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('计算书资料')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">计算书资料</div>
        <div class="miu">{{ data.calcNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.calcNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.calcNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('批复资料')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">批复资料</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('业主往来文件')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">业主往来文件</div>
        <div class="miu">{{ data.ownerNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.ownerNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.ownerNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('施工图')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">施工图</div>
        <div class="miu">{{ data.workDrawingNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.workDrawingNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.workDrawingNum) }}</div>
      </div>-->
    </div>
    <div class="main" v-if="type == 4">
      <div class="mainitem" @click="goRoute('已处理审批')">
        <div class="iconbg">
          <svg-icon icon-class="top-sqsp" />
        </div>
        <div class="min">已处理审批</div>
        <div class="miu">{{ data.okApprovalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.okApprovalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.okApprovalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('未处理审批', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-sqsp" />
        </div>
        <div class="min">未处理审批</div>
        <div class="miu">{{ data.noApprovalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.noApprovalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.noApprovalNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 5">
      <div class="mainitem" @click="goRoute('投标数')">
        <div class="iconbg">
          <svg-icon icon-class="menu-tbgl" />
        </div>
        <div class="min">投标数</div>
        <div class="miu">{{ data.bidNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.bidNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.bidNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增投标数')">
        <div class="iconbg">
          <svg-icon icon-class="menu-tbgl" />
        </div>
        <div class="min">最近一年新增投标数</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 6">
      <div class="mainitem" @click="goRoute('执行中合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">执行中合同</div>
        <div class="miu">{{ data.executeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.executeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.executeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已中止合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">已中止合同</div>
        <div class="miu">{{ data.terminationNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.terminationNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.terminationNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('已完成合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">已完成合同</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>
      <!-- <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">新增合同</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 7">
      <div class="mainitem" @click="goRoute('执行中合同', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">执行中合同</div>
        <div class="miu">{{ data.executeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.executeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.executeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已中止合同', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">已中止合同</div>
        <div class="miu">{{ data.terminationNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.terminationNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.terminationNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('已完成合同', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">已完成合同</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>
      <!-- <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-xmht" />
        </div>
        <div class="min">新增合同</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 8">
      <div class="mainitem" @click="goRoute('已收款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-skjd" />
        </div>
        <div class="min">已收款节点</div>
        <div class="miu">{{ data.okNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.okNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.okNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('部分收款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-skjd" />
        </div>
        <div class="min">部分收款节点</div>
        <div class="miu">{{ data.partNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.partNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.partNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('可收款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-skjd" />
        </div>
        <div class="min">可收款节点</div>
        <div class="miu">{{ data.canNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.canNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.canNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('等待收款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-skjd" />
        </div>
        <div class="min">等待收款节点</div>
        <div class="miu">{{ data.progressNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 9">
      <div class="mainitem" @click="goRoute('已付款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-fkjd" />
        </div>
        <div class="min">已付款节点</div>
        <div class="miu">{{ data.okNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.okNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.okNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('部分付款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-fkjd" />
        </div>
        <div class="min">部分付款节点</div>
        <div class="miu">{{ data.partNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.partNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.partNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('可付款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-fkjd" />
        </div>
        <div class="min">可付款节点</div>
        <div class="miu">{{ data.canNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.canNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.canNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('等待付款节点')">
        <div class="iconbg">
          <svg-icon icon-class="top-fkjd" />
        </div>
        <div class="min">等待付款节点</div>
        <div class="miu">{{ data.progressNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 10">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.clientName"></InputTip></div>
        <div class="miu">{{ c.clientNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.clientNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.clientNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('业主')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">业主</div>
        <div class="miu">{{ data.ownerNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.ownerNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.ownerNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('承包单位')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">承包单位</div>
        <div class="miu">{{ data.contractingUnitNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.contractingUnitNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.contractingUnitNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('外委单位')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">外委单位</div>
        <div class="miu">{{ data.outsourcedUnitNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outsourcedUnitNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outsourcedUnitNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增客户')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">最近一年新增客户</div>
        <div class="miu">{{ data.newlyAddedNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.newlyAddedNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.newlyAddedNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 11">
      <div class="mainitem" @click="goRoute('项目进行中')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmxx" />
        </div>
        <div class="min">项目进行中</div>
        <div class="miu">{{ data.progressNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('项目完成')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmxx" />
        </div>
        <div class="min">项目完成</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('项目中止')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmxx" />
        </div>
        <div class="min">项目中止</div>
        <div class="miu">{{ data.terminationNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.terminationNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.terminationNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已超期项目')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmxx" />
        </div>
        <div class="min">已超期项目</div>
        <div class="miu">{{ data.overdueNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.overdueNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.overdueNum) }}</div>
      </div>
      <!-- <div class="mainitem" @click="goRoute('未签订,项目进行中')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmxx" />
        </div>
        <div class="min">未签订,项目进行中</div>
        <div class="miu">{{ data.progressNoContNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressNoContNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressNoContNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 12">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.roleName"></InputTip></div>
        <div class="miu">{{ c.roleNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.roleNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.roleNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('项目负责人')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmry" />
        </div>
        <div class="min">项目负责人</div>
        <div class="miu">{{ data.prjLeaderNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.prjLeaderNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.prjLeaderNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('专业负责人')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmry" />
        </div>
        <div class="min">专业负责人</div>
        <div class="miu">{{ data.majorLeaderNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.majorLeaderNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.majorLeaderNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('主设人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmry" />
        </div>
        <div class="min">主设人员</div>
        <div class="miu">{{ data.mainNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.mainNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.mainNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 13">
      <div class="mainitem" @click="goRoute('进行中计划')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmjh" />
        </div>
        <div class="min">进行中计划</div>
        <div class="miu">{{ data.progressNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('正常完成计划')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmjh" />
        </div>
        <div class="min">正常完成计划</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('超期完成计划')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmjh" />
        </div>
        <div class="min">超期完成计划</div>
        <div class="miu">{{ data.overdueCompleteNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.overdueCompleteNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.overdueCompleteNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('超期未完成计划')">
        <div class="iconbg">
          <svg-icon icon-class="top-xmjh" />
        </div>
        <div class="min">超期未完成计划</div>
        <div class="miu">{{ data.overdueNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.overdueNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.overdueNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 14">
      <div class="mainitem" @click="goRoute('固定资产采购合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">固定资产采购合同</div>
        <div class="miu">{{ data.propertyBuyNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.propertyBuyNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.propertyBuyNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('服务采购合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">服务采购合同</div>
        <div class="miu">{{ data.serviceBuyNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.serviceBuyNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.serviceBuyNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('执行中合同', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">执行中合同</div>
        <div class="miu">{{ data.executeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.executeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.executeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已中止合同', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">已中止合同</div>
        <div class="miu">{{ data.discontinueNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.discontinueNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.discontinueNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已完成合同', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">已完成合同</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-cght" />
        </div>
        <div class="min">最近一年新增合同</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 15">
      <div class="mainitem" @click="goRoute('供应商总数')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">供应商总数</div>
        <div class="miu">{{ data.count }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.count)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.count) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增')">
        <div class="iconbg">
          <svg-icon icon-class="top-khxx" />
        </div>
        <div class="min">最近一年新增</div>
        <div class="miu">{{ data.newlyAddedNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.newlyAddedNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.newlyAddedNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 16">
      <div class="mainitem" @click="goRoute('入库总数')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">入库总数</div>
        <div class="miu">{{ data.count }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.count)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.count) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年入库')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">最近一年入库</div>
        <div class="miu">{{ data.newlyAddedNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.newlyAddedNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.newlyAddedNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 17">
      <div class="mainitem" @click="goRoute('领用审批中')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcly" />
        </div>
        <div class="min">领用审批中</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意领用')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcly" />
        </div>
        <div class="min">同意领用</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回领用')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcly" />
        </div>
        <div class="min">驳回领用</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已撤销领用')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcly" />
        </div>
        <div class="min">已撤销领用</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 18">
      <div class="mainitem" @click="goRoute('出库审批中', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-zcck" />
        </div>
        <div class="min">出库审批中</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意出库', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-zcck" />
        </div>
        <div class="min">同意出库</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回出库', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-zcck" />
        </div>
        <div class="min">驳回出库</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已撤销出库', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-zcck" />
        </div>
        <div class="min">已撤销出库</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 19">
      <div class="mainitem" @click="goRoute('领用审批')">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">领用审批</div>
        <div class="miu">{{ data.useNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.useNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.useNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('出库审批', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">出库审批</div>
        <div class="miu">{{ data.outNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('审批中申请', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">审批中申请</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意申请', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">同意申请</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回申请', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">驳回申请</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('撤销申请', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">撤销申请</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 20">
      <div class="mainitem" @click="goRoute('同意用车', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">同意用车</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回用车', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">驳回用车</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('用车结束', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">用车结束</div>
        <div class="miu">{{ data.completeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.completeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.completeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('用车审批', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">用车审批</div>
        <div class="miu">{{ data.approveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approveNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 21">
      <div class="mainitem" @click="goRoute('同意出库', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">同意出库</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回出库', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">驳回出库</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('出库审批中', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">出库审批中</div>
        <div class="miu">{{ data.approveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('已撤销出库', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">已撤销出库</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 22">
      <div class="mainitem" @click="goRoute('空闲车辆', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">空闲车辆</div>
        <div class="miu">{{ data.idleNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.idleNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.idleNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('用车中车辆', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">用车中车辆</div>
        <div class="miu">{{ data.busyNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.busyNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.busyNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('出库车辆', 0)">
        <div class="iconbg">
          <svg-icon icon-class="top-clck" />
        </div>
        <div class="min">出库车辆</div>
        <div class="miu">{{ data.outNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 23">
      <div class="mainitem" @click="goRoute('用车审批', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">用车审批</div>
        <div class="miu">{{ data.useApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.useApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.useApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('出库审批', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">出库审批</div>
        <div class="miu">{{ data.outApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('未处理审批', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">未处理审批</div>
        <div class="miu">{{ data.processApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.processApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.processApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增审批')">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">最近一年新增审批</div>
        <div class="miu">{{ data.newlyAddedNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.newlyAddedNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.newlyAddedNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 24">
      <div class="mainitem" @click="goRoute('在岗人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">在岗人员</div>
        <div class="miu">{{ data.onDutyNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.onDutyNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.onDutyNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('外出人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">外出人员</div>
        <div class="miu">{{ data.goOutNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.goOutNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.goOutNum) }}</div>
      </div>

      <div class="mainitem" @click="goRoute('请假人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">请假人员</div>
        <div class="miu">{{ data.askForLeaveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.askForLeaveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.askForLeaveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('离职人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">离职人员</div>
        <div class="miu">{{ data.departNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.departNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.departNum) }}</div>
      </div>
      <!-- <div class="mainitem" @click="goRoute('最近一年新增人员')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryxx" />
        </div>
        <div class="min">最近一年新增人员</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 25">
      <div class="mainitem" @click="goRoute('劳动合同', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-ldht" />
        </div>
        <div class="min">劳动合同</div>
        <div class="miu">{{ data.contNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.contNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.contNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('到期劳动合同')">
        <div class="iconbg">
          <svg-icon icon-class="top-ldht" />
        </div>
        <div class="min">到期劳动合同</div>
        <div class="miu">{{ data.expireNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.expireNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.expireNum) }}</div>
      </div>
      <!-- <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ldht" />
        </div>
        <div class="min">外出人员</div>
        <div class="miu">{{ data.outNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outNum) }}</div>
      </div>

      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ldht" />
        </div>
        <div class="min">请假人员</div>
        <div class="miu">{{ data.leaveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.leaveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.leaveNum) }}</div>
      </div>
      <div class="mainitem">
        <div class="iconbg">
          <svg-icon icon-class="top-ldht" />
        </div>
        <div class="min">离职人员</div>
        <div class="miu">{{ data.departNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.departNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.departNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 26">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.certName"></InputTip></div>
        <div class="miu">{{ c.certNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.certNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.certNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('获奖证书', 1)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">获奖证书</div>
        <div class="miu">{{ data.awardNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.awardNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.awardNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('专利证书', 1)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">专利证书</div>
        <div class="miu">{{ data.patentNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.patentNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.patentNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('个人其它证书', 1)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">个人其它证书</div>
        <div class="miu">{{ data.otherNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.otherNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.otherNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('新增证书', 1)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">新增证书</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 27">
      <div class="mainitem" @click="goRoute('履职经历总数')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">履职经历总数</div>
        <div class="miu">{{ data.totalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.totalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.totalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增履职')">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">最近一年新增履职</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 28">
      <div class="mainitem" @click="goRoute('业绩总数')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryyj" />
        </div>
        <div class="min">业绩总数</div>
        <div class="miu">{{ data.totalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.totalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.totalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('最近一年新增业绩')">
        <div class="iconbg">
          <svg-icon icon-class="top-ryyj" />
        </div>
        <div class="min">最近一年新增业绩</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 29">
      <div class="mainitem" @click="goRoute('审批中申请', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-rywc" />
        </div>
        <div class="min">审批中申请</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意申请', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-rywc" />
        </div>
        <div class="min">同意申请</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回申请', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-rywc" />
        </div>
        <div class="min">驳回申请</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('撤销申请', 2)">
        <div class="iconbg">
          <svg-icon icon-class="top-rywc" />
        </div>
        <div class="min">撤销申请</div>
        <div class="miu">{{ data.revoke }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revoke)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revoke) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 30">
      <div class="mainitem" @click="goRoute('审批中申请', 3)">
        <div class="iconbg">
          <svg-icon icon-class="top-ryqj" />
        </div>
        <div class="min">审批中申请</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意申请', 3)">
        <div class="iconbg">
          <svg-icon icon-class="top-ryqj" />
        </div>
        <div class="min">同意申请</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回申请', 3)">
        <div class="iconbg">
          <svg-icon icon-class="top-ryqj" />
        </div>
        <div class="min">驳回申请</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('撤销申请', 3)">
        <div class="iconbg">
          <svg-icon icon-class="top-ryqj" />
        </div>
        <div class="min">撤销申请</div>
        <div class="miu">{{ data.revoke }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revoke)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revoke) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 31">
      <div class="mainitem" @click="goRoute('外出审批')">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">外出审批</div>
        <div class="miu">{{ data.outApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.outApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.outApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('请假审批')">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">请假审批</div>
        <div class="miu">{{ data.leaveApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.leaveApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.leaveApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('审批中申请', 4)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">审批中申请</div>
        <div class="miu">{{ data.progressApproveNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.progressApproveNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.progressApproveNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意申请', 4)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">同意申请</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回申请', 4)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">驳回申请</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('撤销申请', 4)">
        <div class="iconbg">
          <svg-icon icon-class="top-spcl" />
        </div>
        <div class="min">撤销申请</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>
    <div class="main" v-if="type == 32">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.fileName"></InputTip></div>
        <div class="miu">{{ c.fileNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.fileNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.fileNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('报告资料', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">报告资料</div>
        <div class="miu">{{ data.reportNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.reportNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.reportNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('图纸资料', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">图纸资料</div>
        <div class="miu">{{ data.drawingNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.drawingNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.drawingNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('计算书资料', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">计算书资料</div>
        <div class="miu">{{ data.calcNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.calcNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.calcNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('批复资料', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">批复资料</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('业主往来文件', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">业主往来文件</div>
        <div class="miu">{{ data.ownerNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.ownerNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.ownerNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('施工图', 1)">
        <div class="iconbg">
          <svg-icon icon-class="top-xmzl" />
        </div>
        <div class="min">施工图</div>
        <div class="miu">{{ data.workDrawingNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.workDrawingNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.workDrawingNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 33">
      <div class="mainitem" v-for="c in data.data" :key="c.index" @click="goRouteDim(c, 2)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min"><InputTip :width="inputTipWidth" :text="c.certName"></InputTip></div>
        <div class="miu">{{ c.certNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(c.certNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(c.certNum) }}</div>
      </div>

      <!-- <div class="mainitem" @click="goRoute('获奖证书', 2)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">获奖证书</div>
        <div class="miu">{{ data.awardNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.awardNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.awardNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('专利证书', 2)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">专利证书</div>
        <div class="miu">{{ data.patentNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.patentNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.patentNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('个人其它证书', 2)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">个人其它证书</div>
        <div class="miu">{{ data.otherNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.otherNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.otherNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('新增证书', 2)">
        <div class="iconbg">
          <svg-icon icon-class="copy" />
        </div>
        <div class="min">新增证书</div>
        <div class="miu">{{ data.yearAddNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.yearAddNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.yearAddNum) }}</div>
      </div> -->
    </div>
    <div class="main" v-if="type == 34">
      <div class="mainitem" @click="goRoute('审批中申请')">
        <div class="iconbg">
          <svg-icon icon-class="top-zlxzsq" />
        </div>
        <div class="min">审批中申请</div>
        <div class="miu">{{ data.approvalNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.approvalNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.approvalNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('同意申请')">
        <div class="iconbg">
          <svg-icon icon-class="top-zlxzsq" />
        </div>
        <div class="min">同意申请</div>
        <div class="miu">{{ data.agreeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.agreeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.agreeNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('驳回申请')">
        <div class="iconbg">
          <svg-icon icon-class="top-zlxzsq" />
        </div>
        <div class="min">驳回申请</div>
        <div class="miu">{{ data.refuseNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.refuseNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.refuseNum) }}</div>
      </div>
      <div class="mainitem" @click="goRoute('撤销申请')">
        <div class="iconbg">
          <svg-icon icon-class="top-zlxzsq" />
        </div>
        <div class="min">撤销申请</div>
        <div class="miu">{{ data.revokeNum }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.revokeNum)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.revokeNum) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 35">
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetInCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">入库次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetInCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">入库总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 36">
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetAcquisitionCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">领用次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetAcquisitionCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">领用总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 37">
      <div class="mainitem" @click="goRouteTo('/purchase-d/assetOutCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">报废次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/assetOutCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">报废总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 38">
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetInCheck2')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">入库次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetInCheck2')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">入库总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 39">
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetAcquisitionCheck2')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">领用次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/AssetAcquisitionCheck2')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">领用总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div class="main" v-if="type == 40">
      <div class="mainitem" @click="goRouteTo('/purchase-d/assetOutCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">报废次数</div>
        <div class="miu">{{ data.num0 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num0)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num0) }}</div>
      </div>
      <div class="mainitem" @click="goRouteTo('/purchase-d/assetOutCheck')">
        <div class="iconbg">
          <svg-icon icon-class="top-zcrk" />
        </div>
        <div class="min">报废总数</div>
        <div class="miu">{{ data.num1 }}</div>
        <el-progress
          style="width: 220px"
          :percentage="formatShow(data.num1)"
          :show-text="false"
        ></el-progress>
        <div class="mim">{{ reverseMessage(data.num1) }}</div>
      </div>
    </div>

    <div style="clear: both"></div>
  </div>
</template>

<script>
import {
  certInfo,
  prjcertInfo,
  info,
  projectDataInfo,
  dinfo,
  bidInfo,
  prjInfo,
  outContInfo,
  paymentInfo,
  paymentInfot,
  clientInfo,
  projectstatisticInfo,
  personInfo,
  projectInfo,
  contractBuy,
  supplierInfo,
  inInfo,
  userInfo,
  outInfo,
  approveInfo,
  carUseInfo,
  myUseCarInfo,
  myOutCarInfo,
  carApprove,
  infomanager,
  contlaborInfo,
  certificateInfo,
  workInfo,
  performanceInfo,
  personoutInfo,
  personleaveinfo,
  personapproveinfo,
  dainfo,
  projectDataPlaceInfo,
  stockInfo,
} from '@/api/data/statistic';
export default {
  name: 'TopInfoView', //顶部信息概览
  props: ['type'],
  data() {
    return {
      title: '', //标题
      tolink: '', //更多链接
      data: { totalnum: 0 }, //类型1数据
      inputTipWidth: 130,
      infodata: [
        // {
        //   name: '资质证书',
        //   num: 216,
        // },
        // {
        //   name: 'xx证书',
        //   num: 21,
        // },
        // {
        //   name: '获奖证书',
        //   num: 2,
        // },
      ],
    };
  },
  created() {
    this.init();
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
          this.title = '证书信息';
          this.tolink = '/data-d/certificatesCheck';
          break;
        case 1:
          this.title = '合同信息';
          this.tolink = '/data/contractmanagement/projectContractIndex';
          break;
        case 2:
          this.title = '人员信息';
          this.tolink = '/data-d/personnelInfoCheck';
          break;
        case 3:
          this.title = '项目资料';
          this.tolink = '/data-d/projectdataCheck';
          break;
        case 4:
          this.title = '申请审批';
          this.tolink = '/data-d/downApprovalCheck';
          break;
        case 5:
          this.title = '投标信息';
          this.tolink = '/production-d/bidManagementCheck';
          break;
        case 6:
          this.title = '项目合同信息';
          this.tolink = '/production-d/projectContractIndex';
          break;
        case 7:
          this.title = '外委合同信息';
          this.tolink = '/production-d/outsourcingContractIndex';
          break;
        case 8:
          this.title = '收款节点';
          this.tolink = '/production-d/incomeNodeCheck';
          break;
        case 9:
          this.title = '付款节点';
          this.tolink = '/production-d/paymentNodeCheck';
          break;
        case 10:
          this.title = '客户信息';
          this.tolink = '/production-d/customerManagementCheck';
          break;
        case 11:
          this.title = '项目信息';
          this.tolink = '/project-d/projectCheck';
          break;
        case 12:
          this.title = '进行中项目人员';
          this.tolink = '/project-d/projectPersonnelCheck';
          break;
        case 13:
          this.title = '项目计划';
          this.tolink = '/project-d/projectPlanCheck';
          break;
        case 14:
          this.title = '合同信息';
          this.tolink = '/purchase-d/purchaseContractIndex';
          break;
        case 15:
          this.title = '供应商信息';
          this.tolink = '/purchase-d/supplierCheck';
          break;
        case 16:
          this.title = '资产入库信息';
          this.tolink = '/purchase-d/AssetInCheck';
          break;
        case 17:
          this.title = '资产领用信息';
          this.tolink = '/purchase-d/AssetAcquisitionCheck';
          break;
        case 18:
          this.title = '资产报废信息';
          this.tolink = '/purchase-d/AssetOutCheck';
          break;
        case 19:
          this.title = '审批处理';
          this.tolink = '/purchase-d/approvalHandleCheck';
          break;
        case 20:
          this.title = '用车信息';
          this.tolink = '/car-d/carRequestCheck';
          break;
        case 21:
          this.title = '车辆出库信息';
          this.tolink = '/car-d/carOutRequestCheck';
          break;
        case 22:
          this.title = '车辆信息';
          this.tolink = '/car-d/carManagementCheck';
          break;
        case 23:
          this.title = '审批处理';
          this.tolink = '/car-d/carApprovalCheck';
          break;
        case 24:
          this.title = '人员信息';
          this.tolink = '/person-d/personnelInfoCheck';
          break;
        case 25:
          this.title = '劳动合同';
          this.tolink = '/person-d/laborContractIndex';
          break;
        case 26:
        case 33:
          this.title = '人员证书信息';
          //this.tolink = '/person-d/certificatesCheck';
          break;
        case 27:
          this.title = '履职经历';
          this.tolink = '/person-d/personResumeCheck';
          break;
        case 28:
          this.title = '人员业绩';
          this.tolink = '/person-d/personAchievementCheck';
          break;
        case 29:
          this.title = '人员外出';
          this.tolink = '/person-d/personOutCheck';
          break;
        case 30:
          this.title = '人员请假';
          this.tolink = '/person-d/personLeaveCheck';
          break;
        case 31:
          this.title = '审批处理';
          this.tolink = '/person-d/personApprovalCheck';
          break;
        case 32:
          this.title = '项目资料';
          this.tolink = '/project-d/projectdataCheck';
          break;
        case 34:
          this.title = '资料下载申请';
          break;
        case 35:
          this.title = '固定资产入库信息';
          break;
        case 36:
          this.title = '固定资产领用信息';
          break;
        case 37:
          this.title = '固定资产报废信息';
          break;
        case 38:
          this.title = '消耗品入库信息';
          break;
        case 39:
          this.title = '消耗品领用信息';
          break;
        case 40:
          this.title = '消耗品报废信息';
          break;
        default:
          break;
      }
      this.getData();
    },

    getData() {
      if (this.type == 0) {
        certInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 1) {
        prjcertInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 2) {
        info().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 3) {
        projectDataInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }

      if (this.type == 4) {
        dinfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.okApprovalNum + res.data.noApprovalNum;
          }
        });
      }
      if (this.type == 5) {
        bidInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.bidNum;
          }
        });
      }
      if (this.type == 6) {
        prjInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 7) {
        outContInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 8) {
        paymentInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 9) {
        paymentInfot().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 10) {
        clientInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 11) {
        projectstatisticInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 12) {
        personInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 13) {
        projectInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 14) {
        contractBuy().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 15) {
        supplierInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.count;
          }
        });
      }

      if (this.type == 16) {
        inInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.count;
          }
        });
      }

      if (this.type == 17) {
        userInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }

      if (this.type == 18) {
        outInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 19) {
        approveInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 20) {
        carUseInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 21) {
        myUseCarInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 22) {
        myOutCarInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 23) {
        carApprove().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 24) {
        infomanager().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 25) {
        contlaborInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.contNum;
          }
        });
      }

      if (this.type == 26 || this.type == 33) {
        certificateInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 27) {
        workInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 28) {
        performanceInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 29) {
        personoutInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 30) {
        personleaveinfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.total;
          }
        });
      }
      if (this.type == 31) {
        personapproveinfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }

      if (this.type == 32) {
        projectDataPlaceInfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }
      if (this.type == 34) {
        dainfo().then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
          }
        });
      }

      //type	0入库1领用2报废
      //type2	 0固定资产1易耗品
      if (this.type == 35) {
        stockInfo({ type: 0, type2: 0 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }

      if (this.type == 36) {
        stockInfo({ type: 1, type2: 0 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }

      if (this.type == 37) {
        stockInfo({ type: 2, type2: 0 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }

      if (this.type == 38) {
        stockInfo({ type: 0, type2: 1 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }

      if (this.type == 39) {
        stockInfo({ type: 1, type2: 1 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }

      if (this.type == 40) {
        stockInfo({ type: 2, type2: 1 }).then((res) => {
          if (res && res.code == 200) {
            this.data = res.data;
            this.data.totalNum = res.data.num1;
          }
        });
      }
    },

    check() {
      this.$router.push({ path: this.tolink });
    },

    // 计算属性的getter
    reverseMessage(val) {
      if (val) {
        try {
          if (val > this.data.totalNum) {
            return '';
          }
          return ((val / this.data.totalNum) * 100).toFixed(1) + '%';
        } catch (error) {
          return '';
        }
      } else {
        return '';
      }
    },

    formatShow(varr) {
      try {
        let val = (varr / this.data.totalNum) * 100;
        if (val < 0) {
          return 0;
        }
        if (val > 100) {
          return 100;
        }
        return val;
      } catch (error) {
        return 0;
      }
    },

    //动态渲染跳转
    goRouteDim(value) {
      switch (this.type) {
        case 0:
          this.$router.push({
            path: '/data-d/certificatesCheck',
            query: { certParentType: value.certValue },
          });
          break;
        case 3:
          this.$router.push({
            path: '/data-d/projectdataCheck',
            query: { prjType: value.fileValue },
          });
          break;
        case 12:
          this.$router.push({
            path: '/project-d/projectPersonnelCheck',
            query: { type: value.roleValue },
          });
          break;

        case 10:
          this.$router.push({
            path: '/production-d/customerManagementCheck',
            query: { type: value.clientValue },
          });
          break;
        case 26:
          this.$router.push({
            path: '/data-d/pcertificatesCheck',
            query: { certParentType: value.certValue },
          });
          break;

        case 32:
          this.$router.push({
            path: '/project-d/projectdataCheck',
            query: { prjType: value.fileValue },
          });
          break;
        case 33:
          this.$router.push({
            path: '/person-d/certificatesCheck',
            query: { certParentType: value.certValue },
          });

          break;
        default:
          break;
      }
    },

    //跳转对应路由 flag标志同名称但不同路由
    goRoute(val, flag = 0) {
      let this_ = this;
      switch (val) {
        case '营业执照':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '单位水平评价证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '管理体系证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '公司获奖证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '银行基本户、银行资信证书及审计报告':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '企业信用等级证书及其他信用等级证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;
        case '公司发明专利及软件专著':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          break;

        case '资质证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 1 } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/data-d/pcertificatesCheck', query: { certParentType: 1 } });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/certificatesCheck',
              query: { certParentType: 1 },
            });
          }
          break;
        case '获奖证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 0 } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/data-d/pcertificatesCheck', query: { certParentType: 0 } });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/certificatesCheck',
              query: { certParentType: 0 },
            });
          }
          break;
        case '专利证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 2 } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/data-d/pcertificatesCheck', query: { certParentType: 2 } });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/certificatesCheck',
              query: { certParentType: 2 },
            });
          }
          break;
        case '个人其它证书':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/certificatesCheck', query: { certParentType: 3 } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/data-d/pcertificatesCheck', query: { certParentType: 3 } });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/certificatesCheck',
              query: { certParentType: 3 },
            });
          }
          break;
        case '新增证书':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/certificatesCheck',
              query: { year: new Date().getFullYear() },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/data-d/pcertificatesCheck',
              query: { year: new Date().getFullYear() },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/certificatesCheck',
              query: { year: new Date().getFullYear() },
            });
          }
          break;
        case '项目合同':
          this.$router.push({ path: '/data/contractmanagement/projectContractIndex' });
          break;
        case '外委合同':
          this.$router.push({ path: '/data/contractmanagement/outsourcingContractIndex' });
          break;
        case '劳动合同':
          if (flag == 0) {
            this.$router.push({ path: '/data/contractmanagement/laborContractIndex' });
          }
          if (flag == 1) {
            this.$router.push({ path: '/person-d/laborContractIndex' });
          }
          break;
        case '采购合同':
          this.$router.push({ path: '/data/contractmanagement/purchaseContractIndex' });
          break;
        case '报告资料':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/projectdataCheck', query: { prjType: [0] } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/project-d/projectdataCheck', query: { prjType: [0] } });
          }
          break;
        case '图纸资料':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/projectdataCheck', query: { prjType: [4] } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/project-d/projectdataCheck', query: { prjType: [4] } });
          }
          break;
        case '计算书资料':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/projectdataCheck', query: { prjType: [3] } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/project-d/projectdataCheck', query: { prjType: [3] } });
          }
          break;
        case '批复资料':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/projectdataCheck', query: { prjType: [1, 5, 6] } });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/project-d/projectdataCheck',
              query: { prjType: [1, 5, 6] },
            });
          }
          break;
        case '业主往来文件':
          if (flag == 0) {
            this.$router.push({ path: '/data-d/projectdataCheck', query: { prjType: [10] } });
          }
          if (flag == 1) {
            this.$router.push({ path: '/project-d/projectdataCheck', query: { prjType: [10] } });
          }
          break;
        case '施工图':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/projectdataCheck',
              query: { certParentType: [11] },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/project-d/projectdataCheck',
              query: { certParentType: [11] },
            });
          }
          break;
        case '审批中申请':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/myRequestCheck',
              query: { status: 0 },
            });
          }

          if (flag == 1) {
            this.$router.push({
              path: '/purchase-d/approvalHandleCheck',
              query: { status: 0 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/personOutCheck',
              query: { status: 0 },
            });
          }
          if (flag == 3) {
            this.$router.push({
              path: '/person-d/personLeaveCheck',
              query: { status: 0 },
            });
          }
          if (flag == 4) {
            this.$router.push({
              path: '/person-d/personApprovalCheck',
              query: { status: 0 },
            });
          }
          break;
        case '同意申请':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/myRequestCheck',
              query: { status: 1 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/purchase-d/approvalHandleCheck',
              query: { status: 1 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/personOutCheck',
              query: { status: 1 },
            });
          }
          if (flag == 3) {
            this.$router.push({
              path: '/person-d/personLeaveCheck',
              query: { status: 1 },
            });
          }
          if (flag == 4) {
            this.$router.push({
              path: '/person-d/personApprovalCheck',
              query: { status: 1 },
            });
          }
          break;
        case '驳回申请':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/myRequestCheck',
              query: { status: 2 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/purchase-d/approvalHandleCheck',
              query: { status: 2 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/personOutCheck',
              query: { status: 2 },
            });
          }
          if (flag == 3) {
            this.$router.push({
              path: '/person-d/personLeaveCheck',
              query: { status: 2 },
            });
          }
          if (flag == 4) {
            this.$router.push({
              path: '/person-d/personApprovalCheck',
              query: { status: 2 },
            });
          }
          break;
        case '撤销申请':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/myRequestCheck',
              query: { status: 6 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/purchase-d/approvalHandleCheck',
              query: { status: 6 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/person-d/personOutCheck',
              query: { status: 6 },
            });
          }
          if (flag == 3) {
            this.$router.push({
              path: '/person-d/personLeaveCheck',
              query: { status: 6 },
            });
          }
          if (flag == 4) {
            this.$router.push({
              path: '/person-d/personApprovalCheck',
              query: { status: 6 },
            });
          }
          break;
        case '已处理审批':
          this.$router.push({
            path: '/data-d/downApprovalCheck',
            query: { status: [1, 2, 6] },
          });
          break;
        case '未处理审批':
          if (flag == 0) {
            this.$router.push({
              path: '/data-d/downApprovalCheck',
              query: { status: [0] },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carApprovalCheck',
              query: { status: 0 },
            });
          }
          break;
        case '投标数':
          this.$router.push({
            path: '/production-d/bidManagementCheck',
          });
          break;
        case '最近一年新增投标数':
          this.$router.push({
            path: '/production-d/bidManagementCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '执行中合同':
          if (flag == 0) {
            this.$router.push({
              path: '/production-d/projectContractIndex',
              query: { status: 0 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/production-d/outsourcingContractIndex',
              query: { status: 0 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/purchase-d/purchaseContractIndex',
              query: { status: 0 },
            });
          }

          break;
        case '已中止合同':
          if (flag == 0) {
            this.$router.push({
              path: '/production-d/projectContractIndex',
              query: { status: 2 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/production-d/outsourcingContractIndex',
              query: { status: 2 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/purchase-d/purchaseContractIndex',
              query: { status: 2 },
            });
          }
          break;
        case '已完成合同':
          if (flag == 0) {
            this.$router.push({
              path: '/production-d/projectContractIndex',
              query: { status: 1 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/production-d/outsourcingContractIndex',
              query: { status: 1 },
            });
          }
          if (flag == 2) {
            this.$router.push({
              path: '/purchase-d/purchaseContractIndex',
              query: { status: 1 },
            });
          }
          break;
        case '已收款节点':
          this.$router.push({
            path: '/production-d/incomeNodeCheck',
            query: { status: 3 },
          });
          break;
        case '部分收款节点':
          this.$router.push({
            path: '/production-d/incomeNodeCheck',
            query: { status: 1 },
          });
          break;
        case '可收款节点':
          this.$router.push({
            path: '/production-d/incomeNodeCheck',
            query: { status: 2 },
          });
          break;
        case '等待收款节点':
          this.$router.push({
            path: '/production-d/incomeNodeCheck',
            query: { status: 0 },
          });
          break;
        case '已付款节点':
          this.$router.push({
            path: '/production-d/paymentNodeCheck',
            query: { status: 3 },
          });
          break;
        case '部分付款节点':
          this.$router.push({
            path: '/production-d/paymentNodeCheck',
            query: { status: 1 },
          });
          break;
        case '可付款节点':
          this.$router.push({
            path: '/production-d/paymentNodeCheck',
            query: { status: 2 },
          });
          break;
        case '等待付款节点':
          this.$router.push({
            path: '/production-d/paymentNodeCheck',
            query: { status: 0 },
          });
          break;
        case '业主':
          this.$router.push({
            path: '/production-d/customerManagementCheck',
            query: { type: 2 },
          });
          break;
        case '承包单位':
          this.$router.push({
            path: '/production-d/customerManagementCheck',
            query: { type: 1 },
          });
          break;
        case '外委单位':
          this.$router.push({
            path: '/production-d/customerManagementCheck',
            query: { type: 1 },
          });
          break;
        case '最近一年新增客户':
          this.$router.push({
            path: '/production-d/customerManagementCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '项目进行中':
          this.$router.push({
            path: '/project-d/projectCheck',
            query: { status: 0 },
          });
          break;
        case '项目完成':
          this.$router.push({
            path: '/project-d/projectCheck',
            query: { status: 1 },
          });
          break;
        case '项目中止':
          this.$router.push({
            path: '/project-d/projectCheck',
            query: { status: 2 },
          });
          break;
        case '已超期项目':
          this.$router.push({
            path: '/project-d/projectCheck',
            query: { status: 3 },
          });
          break;
        case '未签订,项目进行中':
          this.$router.push({
            path: '/project-d/projectCheck',
            query: { status: -1 },
          });
          break;
        case '项目负责人':
          this.$router.push({
            path: '/project-d/projectPersonnelCheck',
          });
          break;
        case '专业负责人':
          this.$router.push({
            path: '/project-d/projectPersonnelCheck',
          });
          break;
        case '主设人员':
          this.$router.push({
            path: '/project-d/projectPersonnelCheck',
          });
          break;
        case '进行中计划':
          this.$router.push({
            path: '/project-d/projectPlanCheck',
            query: { status: 1 },
          });
          break;
        case '正常完成计划':
          this.$router.push({
            path: '/project-d/projectPlanCheck',
            query: { status: 2 },
          });
          break;
        case '超期完成计划':
          this.$router.push({
            path: '/project-d/projectPlanCheck',
            query: { status: 3 },
          });
          break;
        case '超期未完成计划':
          this.$router.push({
            path: '/project-d/projectPlanCheck',
            query: { status: 4 },
          });
          break;
        case '固定资产采购合同':
          this.$router.push({
            path: '/purchase-d/purchaseContractIndex',
            query: { tab: 0 },
          });
          break;
        case '服务采购合同':
          this.$router.push({
            path: '/purchase-d/purchaseContractIndex',
            query: { tab: 1 },
          });
          break;
        case '最近一年新增合同':
          this.$router.push({
            path: '/purchase-d/purchaseContractIndex',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '供应商总数':
          this.$router.push({
            path: '/purchase-d/supplierCheck',
          });
          break;
        case '最近一年新增':
          this.$router.push({
            path: '/purchase-d/supplierCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '入库总数':
          this.$router.push({
            path: '/purchase-d/AssetInCheck',
          });
          break;
        case '最近一年入库':
          this.$router.push({
            path: '/purchase-d/AssetInCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '领用审批中':
          this.$router.push({
            path: '/purchase-d/AssetAcquisitionCheck',
            query: { status: 0 },
          });
          break;
        case '同意领用':
          this.$router.push({
            path: '/purchase-d/AssetAcquisitionCheck',
            query: { status: 1 },
          });
          break;
        case '驳回领用':
          this.$router.push({
            path: '/purchase-d/AssetAcquisitionCheck',
            query: { status: 2 },
          });
          break;
        case '已撤销领用':
          this.$router.push({
            path: '/purchase-d/AssetAcquisitionCheck',
            query: { status: 6 },
          });
          break;
        case '出库审批中':
          if (flag == 0) {
            this.$router.push({
              path: '/purchase-d/AssetOutCheck',
              query: { status: 0 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carOutRequestCheck',
              query: { status: 0 },
            });
          }

          break;
        case '同意出库':
          if (flag == 0) {
            this.$router.push({
              path: '/purchase-d/AssetOutCheck',
              query: { status: 1 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carOutRequestCheck',
              query: { status: 1 },
            });
          }

          break;
        case '驳回出库':
          if (flag == 0) {
            this.$router.push({
              path: '/purchase-d/AssetOutCheck',
              query: { status: 2 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carOutRequestCheck',
              query: { status: 2 },
            });
          }

          break;
        case '已撤销出库':
          if (flag == 0) {
            this.$router.push({
              path: '/purchase-d/AssetOutCheck',
              query: { status: 6 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carOutRequestCheck',
              query: { status: 6 },
            });
          }
          break;
        case '领用审批':
          this.$router.push({
            path: '/purchase-d/approvalHandleCheck',
            query: { tab: 0 },
          });
          break;
        case '出库审批':
          if (flag == 0) {
            this.$router.push({
              path: '/purchase-d/approvalHandleCheck',
              query: { tab: 1 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carApprovalCheck',
              query: { tab: 1 },
            });
          }
          break;
        case '同意用车':
          this.$router.push({
            path: '/car-d/carRequestCheck',
            query: { status: 1 },
          });
          break;
        case '驳回用车':
          this.$router.push({
            path: '/car-d/carRequestCheck',
            query: { status: 2 },
          });
          break;
        case '用车结束':
          this.$router.push({
            path: '/car-d/carRequestCheck',
            query: { status: 5 },
          });
          break;
        case '用车审批':
          if (flag == 0) {
            this.$router.push({
              path: '/car-d/carRequestCheck',
              query: { status: 0 },
            });
          }
          if (flag == 1) {
            this.$router.push({
              path: '/car-d/carApprovalCheck',
              query: { tab: 0 },
            });
          }
          break;
        case '空闲车辆':
          this.$router.push({
            path: '/car-d/carManagementCheck',
            query: { status: 0 },
          });
          break;
        case '用车中车辆':
          this.$router.push({
            path: '/car-d/carManagementCheck',
            query: { status: 1 },
          });
          break;
        case '出库车辆':
          this.$router.push({
            path: '/car-d/carManagementCheck',
            query: { status: 2 },
          });
          break;
        case '最近一年新增审批':
          this.$router.push({
            path: '/car-d/carApprovalCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '同意用车':
          this.$router.push({
            path: '/car-d/carRequestCheck',
            query: { status: 1 },
          });
          break;
        case '在岗人员':
          this.$router.push({
            path: '/person-d/personnelInfoCheck',
            query: { jobStatus: 1 },
          });
          break;
        case '外出人员':
          this.$router.push({
            path: '/person-d/personnelInfoCheck',
            query: { jobStatus: 4 },
          });
          break;
        case '请假人员':
          this.$router.push({
            path: '/person-d/personnelInfoCheck',
            query: { jobStatus: 5 },
          });
          break;
        case '离职人员':
          this.$router.push({
            path: '/person-d/personnelInfoCheck',
            query: { jobStatus: 2 },
          });
          break;
        case '到期劳动合同':
          this.$router.push({
            path: '/person-d/laborContractIndex',
            query: { dueStatus: 1 },
          });
          break;
        case '履职经历总数':
          this.$router.push({
            path: '/person-d/personResumeCheck',
          });
          break;
        case '最近一年新增履职':
          this.$router.push({
            path: '/person-d/personResumeCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '业绩总数':
          this.$router.push({
            path: '/person-d/personAchievementCheck',
          });
          break;
        case '最近一年新增业绩':
          this.$router.push({
            path: '/person-d/personAchievementCheck',
            query: {
              year: [this_.getLastYear('yyyy-MM-dd'), this_.formate(new Date(), 'yyyy-MM-dd')],
            },
          });
          break;
        case '外出审批':
          this.$router.push({
            path: '/person-d/personApprovalCheck',
            query: { tab: 0 },
          });
          break;
        case '请假审批':
          this.$router.push({
            path: '/person-d/personApprovalCheck',
            query: { tab: 1 },
          });
          break;
        default:
          break;
      }
    },

    //路由直达
    goRouteTo(val, query = null) {
      this.$router.push({ path: val, query: query });
    },

    getLastYear(style = 'yyyy-MM') {
      let currentDate = new Date();
      // 获取当前年份
      let currentYear = currentDate.getFullYear();
      // 获取当前月份（注意：返回结果是从0开始计算的，所以需要加1）
      let currentMonth = currentDate.getMonth() + 1;
      // 获取当前日期
      let currentDay = currentDate.getDate();
      //获取当前年月日
      let nowYearDate = new Date(currentYear, currentMonth - 1, currentDay);
      // 获取当前日期的前一年
      let lastYearDate = new Date(currentYear - 1, currentMonth, currentDay);
      let date = this.formate(new Date(lastYearDate), style);
      return date;
    },
    //时间指定格式化
    formate(data, format) {
      data = new Date(data);
      var o = {
        'M+': data.getMonth() + 1, //月
        'd+': data.getDate(), //日
        'h+': data.getHours(), //时
        'm+': data.getMinutes(), //分
        's+': data.getSeconds(), //秒
      };
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
          );
        }
      }
      return format;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.body {
  background: #fff;
  width: 100%;
  //height: 212px;
  border-radius: 4px;
  padding: 0px !important;
  .top {
    padding: 20px;
    //height: 40px;
    border-bottom: 1px solid #e4e6ed;
    .toptitle {
      font-family: Alibaba PuHuiTi 2;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
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
      margin: auto 0;
      border-radius: 4px;
      font-family: Alibaba PuHuiTi 2;
      font-size: 16px;
      font-weight: 500;
      line-height: 32px;
      letter-spacing: 0em;
      text-align: center;
      color: #fff;
    }
    .svg-icon {
      //background: pink;
    }
  }
  .main {
    display: flex;
    flex-wrap: nowrap; /* 设置flex-wrap属性 */
    //display: flex;
    // height: 105px;
    height: 131px;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    .mainitem {
      float: left;
      text-align: center;
      margin: 20px 0 0px 20px;
      width: 270px;
      height: 110px;
      //border-right: 1px solid #e4e6ed;
      position: relative;
      cursor: pointer;
      .iconbg {
        margin: 0px;
        display: inline-block;
        background: #409eff;
        box-shadow: 2px 2px 8px 0px #0000000d;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        position: relative;
        float: left;
        .svg-icon {
          margin: 0 auto;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 32px;
          height: 32px;
        }
      }

      .min {
        margin: 10px 0 0 80px;
        width: 150px;
        height: 22px;
        font-family: Alibaba PuHuiTi 2;
        font-size: 16px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
      }
      .miu {
        margin: 0px 0 10px 80px;
        font-family: Alibaba PuHuiTi 2;
        font-size: 24px;
        font-weight: 700;
        line-height: 34px;
        letter-spacing: 0em;
        text-align: left;
      }
      //   ::v-deep {
      //     el-progress {
      //         margin:20px 0 0 100px;
      //     }
      //   }
      .mim {
        margin: 0px 0 0 0px;
        font-family: Alibaba PuHuiTi 2;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        text-align: left;
      }
    }
    .mainitem:before {
      content: '';
      position: absolute;
      right: 121px;
      bottom: 60px;
      right: 1px;
      height: 40px;
      width: 1px;
      background-color: #e4e6ed;
    }

    .mainitem:last-child:before {
      content: '';
      position: absolute;
      right: 121px;
      bottom: 60px;
      right: 1px;
      height: 40px;
      width: 0px;
      background-color: #e4e6ed;
    }
  }
}
</style>
<style lang="scss"></style>
