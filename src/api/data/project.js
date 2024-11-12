import request from '@/utils/request';
import { tansParams, blobValidate } from '@/utils/guangwei';
import { exportFile } from '@/api/data/file';

//#region  项目资料
//--------------------------------------------------------------项目资料
// 查询项目资料列表
export function projDataList(query) {
  return request({
    //url: 'project/projectData/list',
    url: '/project/projectData/change0/list',
    method: 'get',
    params: query,
  });
}

// 查询项目资料信息
export function projDataInfo(query) {
  return request({
    url: '/project/projectData/' + query,
    method: 'get',
  });
}

// 全部-查询项目资料详情
export function projDataInfoAll(query) {
  return request({
    url: '/project/projectData/change0/info/0/' + query,
    method: 'get',
  });
}

// 单个-查询项目资料详情
export function projDataInfoOne(query) {
  return request({
    url: '/project/projectData/change0/info/1/' + query,
    method: 'get',
  });
}

//添加项目资料
export function projDataAdd(data) {
  return request({
    // url: '/project/projectData',
    url: '/project/projectData/change0',
    method: 'post',
    data: data,
  });
}

// 更新项目资料  编辑项目资料
export function projDataUpdate(data) {
  return request({
    // url: '/project/projectData',
    url: '/project/projectData/change0',
    method: 'put',
    data: data,
  });
}

// 删除项目资料
export function projDataDelete(ids) {
  return request({
    //url: '/project/projectData?ids=' + ids,
    url: '/project/projectData/change0/' + ids,
    method: 'delete',
  });
}

// 调整项目计划查询任务单计划
export function projPlan(query) {
  return request({
    url: '/project/plan/change0/plan/' + query,
    method: 'get',
  });
}
//#endregion

//#region  项目
// 查找项目列表
export function projectList(query) {
  return request({
    //url: 'project/project',
    url: 'project/project/change0',
    method: 'get',
    params: query,
  });
}

//添加项目
export function projAdd(data) {
  return request({
    //url: '/project/project',
    url: '/project/project/change0',
    method: 'post',
    data: data,
  });
}

// 编辑项目
export function projEdit(data) {
  return request({
    // url: '/project/project',
    url: '/project/project/change0',
    method: 'put',
    data: data,
  });
}

// 查询项目详情
export function projInfo(query) {
  return request({
    url: '/project/project/change0/' + query,
    method: 'get',
  });
}

//查找我的项目列表
export function projectSelfList(query) {
  return request({
    url: '/project/project/change0/self',
    method: 'get',
    params: query,
  });
}

//删除项目
export function projectDelete(data) {
  return request({
    url: '/project/project?ids=' + data,
    method: 'DELETE',
  });
}

//中止项目
export function projectTermination(data) {
  return request({
    url: '/project/project/termination?ids=' + data,
    method: 'PUT',
  });
}
//#endregion

//#region  项目人员
// 查询项目成员列表
export function projPersonList(query) {
  return request({
    url: '/project/person/change0',
    method: 'get',
    params: query,
  });
}

// 查询指定项目人员列表 查询指定项目下成员信息
export function projPersonOneList(query) {
  return request({
    // url: '/project/person/' + query,
    url: '/project/person/change0/' + query,
    method: 'get',
  });
}

//添加 项目人员
// export function projPersonAdd(data) {
//   return request({
//     url: '/project/person',
//     method: 'post',
//     data: data,
//   });
// }

// 编辑项目人员  编辑项目成员
export function projPersonEdit(data) {
  return request({
    url: '/project/person/change0',
    method: 'put',
    data: data,
  });
}

//项目交接
export function projPersonHandover(data) {
  return request({
    url: '/project/person/handover',
    method: 'put',
    data: data,
  });
}

//撤销项目交接
export function projPersonHandoverCancel(id) {
  return request({
    url: '/project/person/revokeHandover/' + id,
    method: 'put',
  });
}

//项目交接完成
export function projPersonHandoverDown(id) {
  return request({
    url: '/project/person/completeHandover/' + id,
    method: 'put',
  });
}

// //删除项目人员
// export function projPersonDelete(data) {
//   return request({
//     url: '/project/person?ids=',
//     method: 'DELETE',
//     data: data,
//   });
// }

// // 查询项目人员信息
// export function projPersonInfo(query) {
//   return request({
//     url: '/project/person/' + query,
//     method: 'get',
//   });
// }

//#endregion

//#region  项目计划
//查询项目计划列表
export function projPlanList(query) {
  return request({
    //url: '/project/plan',
    url: '/project/plan/change0',
    method: 'get',
    params: query,
  });
}

// 编辑项目计划
export function projPlanEdit(data) {
  return request({
    //url: '/project/plan',
    url: '/project/plan/change0',
    method: 'put',
    data: data,
  });
}

// 查询项目计划信息  查询项目下计划详情
export function projPlanInfo(query) {
  return request({
    //url: '/project/plan/' + query,
    url: '/project/plan/change0/' + query,
    method: 'get',
  });
}

//查询项目关联的合同的计划列表
export function projContPlanList(query) {
  return request({
    url: '/project/plan/prjCont/' + query,
    method: 'get',
  });
}
//#endregion

//#region   项目进度
// 查询项目进度列表
export function projProgressList(query) {
  return request({
    //url: '/project/progress',
    url: '/project/progress/change0',
    method: 'get',
    params: query,
  });
}

// 编辑项目进度  填报项目进度
export function projProgressEdit(data) {
  return request({
    //url: '/project/progress',
    url: '/project/progress/change0',
    method: 'put',
    data: data,
  });
}

// 查询项目进度信息
export function projProgressInfo(query) {
  return request({
    url: '/project/progress/' + query,
    method: 'get',
  });
}
//#endregion

//#region    项目业绩
//生成项目业绩
export function projPerformanceMake(data) {
  return request({
    url: '/project/performance/gen',
    method: 'post',
    data: data,
  });
}

// 查询项目业绩列表
export function projPerformanceList(query) {
  return request({
    url: '/project/performance/list',
    method: 'get',
    params: query,
  });
}

//导出项目业绩;
export function projPerformanceExport(query) {
  exportFile('/project/performance/export', query);
  // try {
  //   let querys = '';
  //   console.log(query);
  //   if (query) {
  //     querys = '?' + tansParams(query);
  //     console.log(tansParams(query));
  //   }
  //   window.location.href = process.env.VUE_APP_BASE_API + +querys;
  // } catch (error) {
  //   console.log(error);
  //   this.$message.error('导出失败');
  // }
}

//导出项目
export function projExport(query) {
  exportFile('/project/project/export', query);
}

//#endregion

//#region     项目资料归档

//添加项目归档资料
export function prjDataAdd(data) {
  return request({
    url: '/project/projectData/place',
    method: 'post',
    data: data,
  });
}

// 编辑项目归档资料
export function prjDataUpdate(data) {
  return request({
    url: '/project/projectData/place',
    method: 'put',
    data: data,
  });
}

// 查询项目归档资料列表
export function prjDataList(query) {
  return request({
    url: '/project/projectData/place',
    method: 'get',
    params: query,
  });
}

// 查询项目归档资料详情
export function prjDataInfo(id) {
  return request({
    url: '/project/projectData/place/' + id,
    method: 'get',
  });
}

// 删除项目归档资料  flag:0删除整个项目的归档资料1只删除某个归档资料  id:父级ID或某个归档资料的ID
export function prjDataDelete(flag, id) {
  return request({
    url: '/project/projectData/place/' + flag + '/' + id,
    method: 'delete',
  });
}

// 完成项目资料归档
export function prjDataComplete(id) {
  return request({
    url: '/project/projectData/place/complete/' + id,
    method: 'put',
  });
}

// 编辑-查询项目归档资料详情
export function prjDataEditInfo(id) {
  return request({
    url: '/project/projectData/place/edit/' + id,
    method: 'get',
  });
}

// 查询完成项目已有的资料列表
export function prjDataListCheck(query) {
  return request({
    url: '/project/projectData/place/list/check',
    method: 'get',
    params: query,
  });
}

//#endregion

//#region  查询指定下项目接口

// 查询指定项目下归档资料列表
export function prjDataListOne(id) {
  return request({
    url: '/project/projectData/place/list/' + id,
    method: 'get',
  });
}

// 查询指定项目下合同列表  0项目，1外委  查看项目-合同-项目合同/查看项目-合同-外委合同
export function proContList(prjNumber, type) {
  return request({
    //url: '/project/project/cont/' + prjNumber + '/' + type,
    url: '/project/project/change0/cont/' + type + '/' + prjNumber,
    method: 'get',
  });
}

// 查询指定项目下计划列表  查看项目-基本信息-项目阶段计划
export function proPlanList(prjNumber) {
  return request({
    //url: '/project/project/plan/' + prjNumber,
    url: '/project/project/change0/plan/' + prjNumber,
    method: 'get',
  });
}

// 查询指定项目下成员列表  查看项目-项目成员-成员列表
export function proPersonList(prjNumber) {
  return request({
    // url: '/project/person/' + prjNumber,
    url: '/project/person/change0/prjPerson/' + prjNumber,
    method: 'get',
  });
}

// 查询指定项目下成员交接历史  查看项目-项目成员-交接历史
export function proPersonhandoverList(prjNumber) {
  return request({
    //url: '/project/person/handover/' + prjNumber,
    url: '/project/person/change0/prjPersonHistory/' + prjNumber,
    method: 'get',
  });
}

// 查询指定项目下收付款计划(节点)0、1为项目合同,查收款;2为外委合同,查付款
export function proPayNodeList(type, prjNumber) {
  return request({
    //url: '/project/project/node/' + type + '/' + prjNumber,
    url:
      type == 1
        ? '/project/project/change0/node/1/' + prjNumber //查看项目-收款-收款节点
        : '/project/project/change0/node/0/' + prjNumber, //查看项目-付款-付款节点
    method: 'get',
  });
}

// 查询项目合同下收付款节点列表
export function contPayNodeList(id) {
  return request({
    url: '/plan/change0/node/' + id,
    method: 'get',
  });
}

//查询项目下收付款节点 0收款1付款
export function proPayMentNodeList(type, prjNumber) {
  return request({
    //url: '/project/paymentNode/' + type + '/' + prjNumber,
    url:
      type == 0
        ? '/project/project/change0/payment/1/' + prjNumber //查看项目-收款-收款记录
        : '/project/project/change0/payment/0/' + prjNumber, //查看项目-付款-付款记录
    method: 'get',
  });
}

// 查询指定项目下收开票  1收款 2付款
export function proTickList(type, prjNumber) {
  return request({
    // url: '/project/project/invoice/' + type + '/' + prjNumber,
    url:
      type == 1
        ? '/project/project/change0/invoice/0/' + prjNumber //查看项目-收款-开票
        : '/project/project/change0/invoice/1/' + prjNumber, //查看项目-付款-收票
    method: 'get',
  });
}

// 查询指定项目下收付款记录   1收款 2付款
export function proPayRectList(type, prjNumber) {
  return request({
    // url: '/project/project/payment/' + type + '/' + prjNumber,
    url:
      type == 1
        ? '/project/project/change0/payment/1/' + prjNumber //查看项目-收款-收款记录
        : '/project/project/change0/payment/0/' + prjNumber, //查看项目-付款-付款记录
    method: 'get',
  });
}

// 查询指定项目下进度  查看项目-进度
export function proPersonProgressList(prjNumber) {
  return request({
    // url: '/project/project/progress/' + prjNumber,
    url: '/project/project/change0/progress/' + prjNumber,
    method: 'get',
  });
}

// 查看项目-计划
export function proTaskPlanList(prjNumber) {
  return request({
    url: '/project/project/change0/taskPlan/' + prjNumber,
    method: 'get',
  });
}

// 查询指定项目下资料
export function proDataList(prjNumber) {
  return request({
    url: '/project/projectData/list/' + prjNumber,
    method: 'get',
  });
}

//查询节点累计收付款金额
export function payNodeAmount(nid) {
  return request({
    url: '/project/paymentNode/amount/' + nid,
    method: 'get',
  });
}

//#endregion

//#region

//#endregion
