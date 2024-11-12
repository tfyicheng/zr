import { userDeptInfo } from '@/api/data/person';
import { getInfo } from '@/api/login';
import { Notification, MessageBox, Message, Loading } from 'element-ui';
import router from '@/router';
import store from '@/store';
//上传文件路径
const uploadUrl = process.env.VUE_APP_BASE_API + '/file/upload';

//#region  方法

//金钱额度格式化带符号
function amountConversion(val) {
  try {
    if (val != null) {
      const options = {
        style: 'currency',
        currency: 'CNY',
      };
      //val.toLocaleString('zh-CN', options);
      return val.toLocaleString('zh-CN', options);
    } else {
      0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//金钱额度格式化不带符号
function amountConversion2(val) {
  try {
    if (val != null) {
      let formatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
      let formattedAmount = formatter.format(val); // 将金额保留两位小数
      return formattedAmount;
    } else {
      0;
    }
  } catch (error) {
    console.log(error);
    return 0;
  }
}

//时间戳转时间格式
function coverTime(val) {
  if (val) {
    let date = new Date(val);
    let Y = date.getFullYear();
    let M = date.getMonth() + 1;
    let D = date.getDate();

    if (M < 10) {
      M = '0' + M;
    }
    if (D < 10) {
      D = '0' + D;
    }

    return Y + '-' + M + '-' + D;
  } else {
    return '';
  }
}

//时间指定格式化
function formate(data, format) {
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
}
//获取当前日期的上个月日期
function getLastMonth(style = 'yyyy-MM') {
  let date = formate(new Date(), 'yyyy/MM/dd');
  var arr = date.split('/');
  var year = arr[0]; //当前年
  var month = arr[1]; //当前月
  var day = arr[2]; //当前日
  var days = new Date(year, month, 0);
  days = days.getDate(); //获取当前月的天数
  var year2 = year;
  var month2 = parseInt(month) - 1;
  if (month2 == 0) {
    year2 = parseInt(year2) - 1;
    month2 = 12;
  }
  var day2 = day;
  var days2 = new Date(year2, month2, 0);
  days2 = days2.getDate();
  if (day2 > days2) {
    day2 = days2;
  }
  if (month2 < 10) {
    month2 = '0' + month2;
  }
  var t2 = year2 + '/' + month2 + '/' + day2;
  let t3 = formate(t2, style);
  return t3;
}

//获取当前日期的上个年日期
function getLastYear(style = 'yyyy-MM') {
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
  let date = formate(new Date(lastYearDate), style);
  return date;
}

//获取当前日期的前半年日期
function getLastHalfYear(style = 'yyyy-MM') {
  let currentDate = new Date();
  // 获取当前时间前半年的日期
  var halfYearAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 6,
    currentDate.getDate(),
  );
  let date = formate(new Date(halfYearAgo), 'yyyy-MM');
  return date;
}

//获取当前日期的前3个月日期
function getLastThreeM(style = 'yyyy-MM') {
  let currentDate = new Date();
  // 获取当前时间前半年的日期
  var halfYearAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 3,
    currentDate.getDate(),
  );
  let date = formate(new Date(halfYearAgo), 'yyyy-MM');
  return date;
}

//获取当前日期
function getThisMonth(style = 'yyyy-MM') {
  let date = formate(new Date(), 'yyyy/MM/dd');
  var arr = date.split('/');
  var year = arr[0]; //当前年
  var month = arr[1]; //当前月
  var day = arr[2]; //当前日
  var days = new Date(year, month, 0);
  // days = days.getDate(); //获取当前月的天数
  // var year2 = year;
  // var month2 = parseInt(month) - 1;
  // if (month2 == 0) {
  //   year2 = parseInt(year2) - 1;
  //   month2 = 12;
  // }
  // var day2 = day;
  // var days2 = new Date(year2, month2, 0);
  // days2 = days2.getDate();
  // if (day2 > days2) {
  //   day2 = days2;
  // }
  // if (month2 < 10) {
  //   month2 = '0' + month2;
  // }
  // var t2 = year2 + '/' + month2 + '/' + day2;
  var t2 = year + '/' + month + '/' + day;
  let t3 = formate(t2, style);
  return t3;
}

//数组根据元素去重
function unique(arr, key) {
  const m = new Map();
  for (const item of arr) {
    if (!m.has(item[key])) {
      m.set(item[key], item);
    }
  }
  return [...m.values()];
}

//获取自身部门信息
function getUserDept(id) {
  // getInfo().then((res) => {
  // });
  if (id) {
    userDeptInfo(id).then((response) => {
      return response.data;
    });
  }
}

//处理详情页是否显示审批意见
function approveReasonShow(approve) {
  // if (approve) {
  //   if (approve.find((c) => c.status == 1) && approve.find((c) => c.status == 1).show) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // } else {
  //   return false;
  // }
  if (approve && approve.length > 0) {
    if (approve.find((c) => c.status == 1)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//表单校验
function saveFormCheck(data, formVal = null) {
  if (JSON.stringify(data) == '{}') {
    Message({ message: '数据不能为空', type: 'error' });
    return false;
  } else {
    if (formVal) {
      let arr1 = [];
      for (var item in data) {
        arr1.push(item);
      }
      for (var i = 0; i < formVal.length; i++) {
        // console.log(formVal[i]);
        if (arr1.includes(formVal[i])) {
          for (var item in data) {
            // console.log('字段判断', item, data[item]);
            if (checkVal(item, data[item])) {
              continue;
            } else {
              return false;
            }
          }
        } else {
          return checkVal(formVal[i]);
        }
      }
      return true;
    } else {
      return true;
    }
  }
}

function checkVal(item, val) {
  console.log('检查值', item, val);
  switch (item) {
    case 'certType':
      return isNull(val, '证书类型');
    case 'certName':
      return isNull(val, '证书名称');
    case 'prjNumber':
      return isNull(val, '项目编号');
    case 'prjName':
      return isNull(val, '项目名称');
    case 'prjPhase':
      return isNull(val, '项目阶段');
    case 'prjType':
      return isNull(val, '资料类型');
    case 'areaProvince':
      return isNull(val, '区域');
    case 'prjYear':
      return isNull(val, '年份');
    case 'dataName':
      return isNull(val, '资料名称');
    default:
      return true;
  }
}

function isNull(val, str) {
  if (val === null || val === undefined || val == '') {
    if (val == 0) {
      return true;
    } else {
      Message({ message: str + '不能为空', type: 'error' });
      return false;
    }
  } else {
    return true;
  }
}

//确认删除弹窗
async function sureDialog(message = '是否确定删除？', title = '系统提示') {
  try {
    await new Promise((resolve, reject) => {
      MessageBox.confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        showClose: false,
        callback: (action, instance) => {
          if (action === 'confirm') {
            resolve();
          } else {
            reject();
          }
        },
      });
    });
    return true;
  } catch (error) {
    return false;
  }
}

//this.$modal.
// async function sureDialog() {
//   MessageBox.confirm('是否确定删除？', '系统提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning',
//   })
//     .then(function () {
//       return true;
//     })
//     .catch(() => {
//       return false;
//     });
// }

//返回
function goBack() {
  store.dispatch('tagsView/delView', router.history.current); //关闭当前标签页
  router.go(-1);
}

//跳转指定路径
//flag 是否跳转同时关闭
function goTo(val, flag = true) {
  //console.log(router.history.current);
  if (routeDict[val]) {
    if (routeDict[val] == router.history.current.fullPath) {
    } else {
      if (flag) {
        store.dispatch('tagsView/delView', router.history.current); //关闭当前标签页
      }
      router.push(routeDict[val]);
    }
  }
}

//跳转指定路径
//flag 是否跳转同时关闭
function goToOnly(val, flag = true) {
  //console.log(router.history.current);
  if (routeDictOnly[val]) {
    if (routeDictOnly[val] == router.history.current.fullPath) {
    } else {
      if (flag) {
        store.dispatch('tagsView/delView', router.history.current); //关闭当前标签页
      }
      router.push(routeDictOnly[val]);
    }
  }
}

//根据路由放回字典key(
function getRouteKey(val) {
  for (const key in routeDict) {
    if (routeDict[key] === val) {
      return key;
    }
  }
  return null; // 没有找到匹配的键
}

//省市区拼接
function coverRegin(val1, val2, val3, mark = '/') {
  try {
    if (val1 && val2 && val3) {
      return val1 + mark + val2 + mark + val3;
    }
    if (val1 && val2) {
      return val1 + mark + val2;
    }
    if (val1) {
      return val1;
    }
    return '';
  } catch (error) {
    return val1 + mark + val2 + mark + val3;
  }
}

//字符数组拼接
function splitStr(data) {
  try {
    if (data && data.length > 0) {
      if (Array.isArray(data)) {
        let str = '';
        for (var i = 0; i < data.length; i++) {
          str += data[i] + (i + 1 == data.length ? '' : '/');
        }
        return str;
      }
    }
  } catch (error) {
    return '';
  }
}

function validateForm(refs) {
  let valiForm = this.$refs?.[refs].validate ? this.$refs?.[refs] : this.$refs?.[refs][0];
  return new Promise((resolve, reject) => {
    valiForm.validate((res) => {
      if (res) resolve();
      else reject();
    });
  });
}

//获取数组值
function getArrVal(data, index) {
  try {
    if (data) {
      if (index == 0 && data[0] != null) {
        return data[0];
      }
      if (index == 1 && data[1] != null) {
        return data[1];
      }
      if (index == 2 && data[2] != null) {
        return data[2];
      }
    }
  } catch (error) {
    return null;
  }
}

//数组值回显
function backArrVal(data0 = null, data1 = null, data2 = null) {
  try {
    if (data0 != null && data1 != null && data2 != null) {
      return [data0, data1, data2];
    }
    if (data0 != null && data1 != null) {
      return [data0, data1];
    }

    if (data0 != null) {
      return [data0];
    }
  } catch (error) {
    return null;
  }
}

//区域数据提交处理
function ConverAreaVal(data) {
  //addrArea: [],//注册
  // mailArea: [],//邮寄
  // prjArea: [],//项目
  // clientAddrArea: [],//投标-客户注册
  // clientMailArea: [],//投标-客户邮寄
  // agentAddrArea: [],//投标-代理单位注册
  // agentMailArea: [],//投标-代理单位邮寄
  // bidArea: [],//投标-投标区域
  // bidOpenArea: [],//投标-开标区域
  // pArea: [],//投标-项目区域
  // area: [],//查询-区域

  try {
    if (data.area != null) {
      if (data.area[0] == 'backVal') {
        data.areaProvince = getArrVal(data.area, 1);
        data.areaCity = getArrVal(data.area, 2);
        data.areaRegion = getArrVal(data.area, 3);
      } else {
        data.areaProvince = getArrVal(data.area, 0);
        data.areaCity = getArrVal(data.area, 1);
        data.areaRegion = getArrVal(data.area, 2);
      }
    }

    if (data.prjArea != null) {
      if (data.prjArea[0] == 'backVal') {
        data.areaProvince = getArrVal(data.prjArea, 1);
        data.areaCity = getArrVal(data.prjArea, 2);
        data.areaRegion = getArrVal(data.prjArea, 3);
      } else {
        data.areaProvince = getArrVal(data.prjArea, 0);
        data.areaCity = getArrVal(data.prjArea, 1);
        data.areaRegion = getArrVal(data.prjArea, 2);
      }
    }

    if (data.prjArea2 != null) {
      if (data.prjArea2[0] == 'backVal') {
        data.prjAreaProvince = getArrVal(data.prjArea2, 1);
        data.prjAreaCity = getArrVal(data.prjArea2, 2);
        data.prjAreaRegion = getArrVal(data.prjArea2, 3);
      } else {
        data.prjAreaProvince = getArrVal(data.prjArea2, 0);
        data.prjAreaCity = getArrVal(data.prjArea2, 1);
        data.prjAreaRegion = getArrVal(data.prjArea2, 2);
      }
    }

    if (data.addrArea != null) {
      if (data.addrArea[0] == 'backVal') {
        data.addrAreaProvince = getArrVal(data.addrArea, 1);
        data.addrAreaCity = getArrVal(data.addrArea, 2);
        data.addrAreaRegion = getArrVal(data.addrArea, 3);
      } else {
        data.addrAreaProvince = getArrVal(data.addrArea, 0);
        data.addrAreaCity = getArrVal(data.addrArea, 1);
        data.addrAreaRegion = getArrVal(data.addrArea, 2);
      }
    }

    if (data.mailArea != null) {
      if (data.mailArea[0] == 'backVal') {
        data.mailAreaProvince = getArrVal(data.mailArea, 1);
        data.mailAreaCity = getArrVal(data.mailArea, 2);
        data.mailAreaRegion = getArrVal(data.mailArea, 3);
      } else {
        data.mailAreaProvince = getArrVal(data.mailArea, 0);
        data.mailAreaCity = getArrVal(data.mailArea, 1);
        data.mailAreaRegion = getArrVal(data.mailArea, 2);
      }
    }

    if (data.clientAddrArea != null) {
      if (data.clientAddrArea[0] == 'backVal') {
        data.clientRegisterProvince = getArrVal(data.clientAddrArea, 1);
        data.clientRegisterCity = getArrVal(data.clientAddrArea, 2);
        data.clientRegisterRegion = getArrVal(data.clientAddrArea, 3);
      } else {
        data.clientRegisterProvince = getArrVal(data.clientAddrArea, 0);
        data.clientRegisterCity = getArrVal(data.clientAddrArea, 1);
        data.clientRegisterRegion = getArrVal(data.clientAddrArea, 2);
      }
    }

    if (data.clientMailArea != null) {
      if (data.clientMailArea[0] == 'backVal') {
        data.clientMailProvince = getArrVal(data.clientMailArea, 1);
        data.clientMailCity = getArrVal(data.clientMailArea, 2);
        data.clientMailRegion = getArrVal(data.clientMailArea, 3);
      } else {
        data.clientMailProvince = getArrVal(data.clientMailArea, 0);
        data.clientMailCity = getArrVal(data.clientMailArea, 1);
        data.clientMailRegion = getArrVal(data.clientMailArea, 2);
      }
    }

    if (data.agentAddrArea != null) {
      if (data.agentAddrArea[0] == 'backVal') {
        data.agentRegisterProvince = getArrVal(data.agentAddrArea, 1);
        data.agentRegisterCity = getArrVal(data.agentAddrArea, 2);
        data.agentRegisterRegion = getArrVal(data.agentAddrArea, 3);
      } else {
        data.agentRegisterProvince = getArrVal(data.agentAddrArea, 0);
        data.agentRegisterCity = getArrVal(data.agentAddrArea, 1);
        data.agentRegisterRegion = getArrVal(data.agentAddrArea, 2);
      }
    }

    if (data.agentMailArea != null) {
      if (data.agentMailArea[0] == 'backVal') {
        data.agentMailProvince = getArrVal(data.agentMailArea, 1);
        data.agentMailCity = getArrVal(data.agentMailArea, 2);
        data.agentMailRegion = getArrVal(data.agentMailArea, 3);
      } else {
        data.agentMailProvince = getArrVal(data.agentMailArea, 0);
        data.agentMailCity = getArrVal(data.agentMailArea, 1);
        data.agentMailRegion = getArrVal(data.agentMailArea, 2);
      }
    }

    if (data.bidArea != null) {
      if (data.bidArea[0] == 'backVal') {
        data.bidProvince = getArrVal(data.bidArea, 1);
        data.bidCity = getArrVal(data.bidArea, 2);
        data.bidRegion = getArrVal(data.bidArea, 3);
      } else {
        data.bidProvince = getArrVal(data.bidArea, 0);
        data.bidCity = getArrVal(data.bidArea, 1);
        data.bidRegion = getArrVal(data.bidArea, 2);
      }
    }

    if (data.bidOpenArea != null) {
      if (data.bidOpenArea[0] == 'backVal') {
        data.bidOpenProvince = getArrVal(data.bidOpenArea, 1);
        data.bidOpenCity = getArrVal(data.bidOpenArea, 2);
        data.bidOpenRegion = getArrVal(data.bidOpenArea, 3);
      } else {
        data.bidOpenProvince = getArrVal(data.bidOpenArea, 0);
        data.bidOpenCity = getArrVal(data.bidOpenArea, 1);
        data.bidOpenRegion = getArrVal(data.bidOpenArea, 2);
      }
    }

    if (data.pArea != null) {
      if (data.pArea[0] == 'backVal') {
        data.prjProvince = getArrVal(data.pArea, 1);
        data.prjCity = getArrVal(data.pArea, 2);
        data.prjRegion = getArrVal(data.pArea, 3);
      } else {
        data.prjProvince = getArrVal(data.pArea, 0);
        data.prjCity = getArrVal(data.pArea, 1);
        data.prjRegion = getArrVal(data.pArea, 2);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

//区域数据回显处理
function backAreaVal(form, data) {
  if (data.addrAreaProvince != null) {
    form.addrArea = ['backVal', data.addrAreaProvince, data.addrAreaCity, data.addrAreaRegion];
  }

  if (data.mailAreaProvince != null) {
    form.mailArea = ['backVal', data.mailAreaProvince, data.mailAreaCity, data.mailAreaRegion];
  }

  if (data.prjAreaProvince != null) {
    form.prjArea = ['backVal', data.prjAreaProvince, data.prjAreaCity, data.prjAreaRegion];
  }

  if (data.areaProvince != null) {
    form.prjArea = ['backVal', data.areaProvince, data.areaCity, data.areaRegion];
  }

  if (data.clientRegisterProvince != null) {
    form.clientAddrArea = [
      'backVal',
      data.clientRegisterProvince,
      data.clientRegisterCity,
      data.clientRegisterRegion,
    ];
  }

  if (data.clientMailProvince != null) {
    form.clientMailArea = [
      'backVal',
      data.clientMailProvince,
      data.clientMailCity,
      data.clientMailRegion,
    ];
  }

  if (data.agentRegisterProvince != null) {
    form.agentAddrArea = [
      'backVal',
      data.agentRegisterProvince,
      data.agentRegisterCity,
      data.agentRegisterRegion,
    ];
  }

  if (data.agentMailProvince != null) {
    form.agentMailArea = [
      'backVal',
      data.agentMailProvince,
      data.agentMailCity,
      data.agentMailRegion,
    ];
  }

  if (data.bidProvince != null) {
    form.bidArea = ['backVal', data.bidProvince, data.bidCity, data.bidRegion];
  }

  if (data.bidOpenProvince != null) {
    form.bidOpenArea = ['backVal', data.bidOpenProvince, data.bidOpenCity, data.bidOpenRegion];
  }

  if (data.prjProvince != null) {
    form.pArea = ['backVal', data.prjProvince, data.prjCity, data.prjRegion];
  }
}

//区域数据回显展示
function ShowAreaVal(form, data) {
  if (data.addrAreaProvince != null) {
    form.addrArea =
      coverRegin(data.addrAreaProvince, data.addrAreaCity, data.addrAreaRegion, '') +
      (data.addr != null ? data.addr : '');
  }

  if (data.mailAreaProvince != null) {
    form.mailArea =
      coverRegin(data.mailAreaProvince, data.mailAreaCity, data.mailAreaRegion, '') +
      (data.mailAddr != null ? data.mailAddr : '');
  }

  if (data.prjAreaProvince != null) {
    form.prjArea = coverRegin(data.prjAreaProvince, data.prjAreaCity, data.prjAreaRegion, '');
  }

  if (data.areaProvince != null) {
    form.area = coverRegin(data.areaProvince, data.areaCity, data.areaRegion, '');
  }

  if (data.clientRegisterProvince != null) {
    form.clientAddrArea =
      coverRegin(
        data.clientRegisterProvince,
        data.clientRegisterCity,
        data.clientRegisterRegion,
        '',
      ) + (data.clientRegisterAddr != null ? data.clientRegisterAddr : '');
  }

  if (data.clientMailProvince != null) {
    form.clientMailArea =
      coverRegin(data.clientMailProvince, data.clientMailCity, data.clientMailRegion, '') +
      (data.clientMailAddr != null ? data.clientMailAddr : '');
  }

  if (data.agentRegisterProvince != null) {
    form.agentAddrArea =
      coverRegin(data.agentRegisterProvince, data.agentRegisterCity, data.agentRegisterRegion, '') +
      (data.agentRegisterAddr != null ? data.agentRegisterAddr : '');
  }

  if (data.agentMailProvince != null) {
    form.agentMailArea =
      coverRegin(data.agentMailProvince, data.agentMailCity, data.agentMailRegion, '') +
      (data.agentMailAddr != null ? data.agentMailAddr : '');
  }

  if (data.bidProvince != null) {
    form.bidArea = coverRegin(data.bidProvince, data.bidCity, data.bidRegion, '');
  }

  if (data.bidOpenProvince != null) {
    form.bidOpenArea =
      coverRegin(data.bidOpenProvince, data.bidOpenCity, data.bidOpenRegion, '') +
      (data.bidOpenAddr != null ? data.bidOpenAddr : '');
  }

  if (data.prjProvince != null) {
    form.pArea = coverRegin(data.prjProvince, data.prjCity, data.prjRegion, '');
  }
}

//#endregion

//#region  常量

//红色字体标记
const markRed = ['已终止项目', '请假次数'];

//月份
const months = [
  {
    value: '1',
    label: '1月',
  },
  {
    value: '2',
    label: '2月',
  },
  {
    value: '3',
    label: '3月',
  },
  {
    value: '4',
    label: '4月',
  },
  {
    value: '5',
    label: '5月',
  },
  {
    value: '6',
    label: '6月',
  },
  {
    value: '7',
    label: '7月',
  },
  {
    value: '8',
    label: '8月',
  },
  {
    value: '9',
    label: '9月',
  },
  {
    value: '10',
    label: '10月',
  },
  {
    value: '11',
    label: '11月',
  },
  {
    value: '12',
    label: '12月',
  },
];

//分析组件快捷年份选项
const compoYears = [
  {
    key: 1,
    value: [getLastYear(), getThisMonth()],
    label: '最近一年',
  },
  {
    key: 2,
    value: [getLastHalfYear(), getThisMonth()],
    label: '最近半年',
  },
  {
    key: 3,
    value: [getLastThreeM(), getThisMonth()],
    label: '最近3个月',
  },
  {
    key: 4,
    value: [getLastMonth(), getThisMonth()],
    label: '最近1个月',
  },
];

//自定义审批字典，用于资产和人员
const approve_cp = [
  {
    key: 1,
    value: 0,
    label: '待审批',
  },
  {
    key: 2,
    value: 1,
    label: '同意',
  },
  {
    key: 3,
    value: 2,
    label: '驳回',
  },
  {
    key: 4,
    value: 6,
    label: '已撤销',
  },
];

//自定义到期字典
const dueStatus = [
  {
    key: 1,
    value: 0,
    label: '正常',
  },
  {
    key: 2,
    value: 1,
    label: '已到期',
  },
  {
    key: 3,
    value: 2,
    label: '即将到期',
  },
];

//自定义是否中标字典
const bidStatus = [
  {
    key: 1,
    value: 0,
    label: '否',
  },
  {
    key: 2,
    value: 1,
    label: '是',
  },
];

//自定义长文本提示框宽度
const inputTipWidth = 250;

//统一限制输入框字符长度
const inputMax = 50;

//统一限制备注输入框字符长度
const reMarkMax = 250;

//允许浏览的文件类型
const limitFt = ['jpg', 'jpeg', 'png', 'doc', 'docx', 'pdf', 'xls', 'xlsx'];

//路由字典
const routeDict = {
  //#region  资料管理
  资料管理: '/data/index',
  证书管理: '/data/certificates',
  我的申请统计: '/data/datadown/myRequestIndex',
  查看我的申请: '/data-d/myRequestCheck',
  审批处理统计: '/data/datadown/downApprovalIndex',
  查看审批处理: '/data-d/downApprovalCheck',
  合同管理: '/data/contractmanagement/index',
  项目合同: '/data/contractmanagement/projectContractIndex',
  项目资料: '/data-d/projectdataCheck',
  添加项目资料: '/data-d/projectDataAdd',
  查找项目资料: '/data-d/projectdataCheck',
  项目资料统计: '/data/projectdataIndex',
  项目业绩: '/data/projectperformance',
  外委合同: '/data/contractmanagement/outsourcingContractIndex',
  劳动合同: '/data/contractmanagement/laborContractIndex',
  采购合同: '/data/contractmanagement/purchaseContractIndex',
  人员信息: '/data-d/personnelInfoCheck',
  添加证书: '/data-d/certificatesAdd',
  查找证书: '/data-d/certificatesCheck',
  添加项目合同: '/data-d/projectContractAdd',
  添加外委合同: '/data-d/outsourcingContractAdd',
  添加劳动合同: '/data-d/laborContractAdd',
  添加采购合同: '/data-d/fixedAssetsPCAdd',
  项目合同列表: '/data/contractmanagement/projectContractIndex',
  查找项目合同: '/data/contractmanagement/projectContractIndex',
  查找劳动合同: '/data/contractmanagement/laborContractIndex',
  查找外委合同: '/data/contractmanagement/outsourcingContractIndex',
  查找采购合同: '/data/contractmanagement/purchaseContractIndex',
  人员信息统计: '/data/personnelInformationIndex',
  添加人员证书: '/data-d/pcertificatesAdd',
  查找我的申请: '/data-d/myRequestCheck',
  查找审批列表: '/data-d/downApprovalCheck',
  //#endregion

  //#region   生产管理
  生产管理: '/production/index',
  项目合同统计: '/production/contractmanagement/projectContractIndex',
  外委合同统计: '/production/contractmanagement/outsourcingContractIndex',
  收款节点统计: '/production/collectionManagement/incomeNodeIndex',
  收款记录统计: '/production/collectionManagement/incomeRecordIndex',
  开票记录统计: '/production/collectionManagement/billingRequestIndex',
  付款节点统计: '/production/paymentManagement/paymentNodeIndex',
  付款记录统计: '/production/paymentManagement/paymentRequestIndex',
  收票记录统计: '/production/paymentManagement/receiptRecordIndex',
  客户管理统计: '/production/customerManagementIndex',
  投标管理: '/production-d/bidManagementCheck',
  投标管理统计: '/production/bidManagementIndex',
  添加投标: '/production-d/bidManagementAdd',
  查找投标: '/production-d/bidManagementCheck',
  查找项目合同: '/production-d/projectContractIndex',
  查找外委合同: '/production-d/outsourcingContractIndex',
  添加项目合同: '/production-d/projectContractAdd',
  添加外委合同: '/production-d/outsourcingContractAdd',
  编辑收款节点: '/production-d/incomeNodeCheck',
  查找收款节点: '/production-d/incomeNodeCheck',
  收款记录: '/production-d/incomeRecordCheck',
  添加收款记录: '/production-d/incomeRecordAdd',
  查找开票记录: '/production-d/billingRequestCheck',
  添加开票记录: '/production-d/billingRequestAdd',
  添加付款节点: '/production-d/paymentNodeAdd',
  查找付款节点: '/production-d/paymentNodeCheck',
  查找付款记录: '/production-d/paymentRequestCheck',
  添加付款记录: '/production-d/paymentRequestAdd',
  查找收票记录: '/production-d/receiptRecordAdd',
  添加收票记录: '/production-d/receiptRecordCheck',
  查找客户: '/production-d/customerManagementCheck',
  添加客户: '/production-d/customerManagementAdd',
  //#endregion

  //#region   项目管理
  项目管理: '/project/index',
  项目列表: '/project-d/projectCheck',
  项目管理统计: '/project/projectManagementIndex',
  项目人员统计: '/project/projectPersonnelIndex',
  项目计划统计: '/project/projectPlanIndex',
  项目进度统计: '/project/projectProcessIndex',
  项目资料归档统计: '/project/projectDataIndex',
  添加项目: '/project-d/projectAdd',
  查找项目: '/project-d/projectCheck',
  查找项目人员: '/project-d/projectPersonnelCheck',
  查找项目计划: '/project-d/projectPlanCheck',
  查找项目进度: '/project-d/projectProcessCheck',
  添加项目资料: '/project-d/projectDataAdd',
  查找项目资料: '/project-d/projectdataCheck',
  //#endregion

  //#region   资产采购管理
  资产采购管理: '/purchase/index',
  采购合同统计: '/purchase/purchaseManagement/purchaseContractIndex',
  供应商统计: '/purchase/purchaseManagement/supplierIndex',
  资产入库统计: '/purchase/assetManagement/assetInIndex',
  资产领用统计: '/purchase/assetManagement/assetAcquisitionIndex',
  资产报废统计: '/purchase/assetManagement/assetOutIndex',
  资产审批统计: '/purchase/assetManagement/approvalHandleIndex',
  库存查询: '/purchase/assetManagement/assetQueryIndex',
  资产编码: '/purchase/assetManagement/assetCodeIndex',
  仓库管理: '/purchase/assetManagement/warehouseMgIndex',
  添加固定资产采购合同: '/purchase-d/fixedAssetsPCAdd',
  添加服务采购合同: '/purchase-d/servicePCAdd',
  查找采购合同: '/purchase-d/purchaseContractIndex',
  添加供应商: '/purchase-d/supplierAdd',
  查找供应商: '/purchase-d/supplierCheck',
  添加资产入库: '/purchase-d/assetInAdd',
  查找资产入库: '/purchase-d/AssetInCheck',
  添加资产领用: '/purchase-d/assetAcquisitionAdd',
  查找资产领用: '/purchase-d/AssetAcquisitionCheck',
  添加资产报废: '/purchase-d/assetOutAdd',
  查找资产报废: '/purchase-d/assetOutCheck',
  添加仓库: '/purchase-d/warehouseMgAdd',
  资产编码: '/purchase-d/assetCodeAdd',
  //#endregion

  //#region   车辆管理
  车辆管理: '/car/index',
  用车申请: '/car-d/carRequestCheck',
  用车申请统计: '/car/carRequestIndex',
  出库申请统计: '/car/carOutRequestIndex',
  车辆列表统计: '/car/carManagementIndex',
  车辆审批统计: '/car/carApprovalIndex',
  添加用车申请: '/car-d/carRequestAdd',
  查找用车申请: '/car-d/carRequestCheck',
  添加出库申请: '/car-d/carOutRequestAdd',
  查找出库申请: '/car-d/carOutRequestCheck',
  添加车辆: '/car-d/carManagementAdd',
  查找车辆: '/car-d/carManagementCheck',
  审批处理: '/car-d/carApprovalCheck',
  //#endregion

  //#region   人员管理
  人员管理: '/person/index',
  外出申请: '/person-d/personOutCheck',
  人员外出: '/person-d/personOutCheck',
  人员请假: '/person-d/personLeaveCheck',
  人员信息管理: '/person/personInfoIndex',
  劳动合同统计: '/person/personContractIndex',
  履职经历统计: '/person/personResumeIndex',
  人员业绩统计: '/person/personAchievementIndex',
  人员外出统计: '/person/personOutIndex',
  人员请假统计: '/person/personLeaveIndex',
  人员审批统计: '/person/personApprovalIndex',
  添加人员: '/person-d/personnelInfoAdd',
  查找人员: '/person-d/personnelInfoCheck',
  添加劳动合同: '/person-d/laborContractAdd',
  查找劳动合同: '/person-d/laborContractIndex',
  添加人员证书: '/person-d/certificatesAdd',
  查找人员证书: '/person-d/certificatesCheck',
  添加履职经历: '/person-d/personResumeAdd',
  查找履职经历: '/person-d/personResumeCheck',
  添加人员业绩: '/person-d/personAchievementAdd',
  查找人员业绩: '/person-d/personAchievementCheck',
  添加外出申请: '/person-d/personOutAdd',
  查找外出申请: '/person-d/personOutCheck',
  添加请假申请: '/person-d/personLeaveAdd',
  查找请假申请: '/person-d/personLeaveCheck',
  审批处理: '/person-d/personApprovalCheck',
  //#endregion

  权限管理: '/system/user',
};

//导航路由字典(一对一)
const routeDictOnly = {
  //#region  资料管理
  资料管理: '/data/index',
  证书管理: '/data/certificates',
  人员管理: '/data/personnelInformationIndex',
  证书列表: '/data-d/certificatesCheck',
  人员列表: '/data-d/personnelInfoCheck',
  合同管理: '/data/contractmanagement/index',
  项目合同列表: '/data/contractmanagement/projectContractIndex',
  外委合同列表: '/data/contractmanagement/outsourcingContractIndex',
  人员证书管理: '/data/personnelInformationIndex',
  人员证书列表: '/data-d/pcertificatesCheck',
  项目资料管理: '/data/projectdataIndex',
  项目资料列表: '/data-d/projectdataCheck',
  下载审批: '/data/datadown/downApprovalIndex',
  下载审批列表: '/data-d/downApprovalCheck',
  我的申请: '/data/datadown/myRequestIndex',
  我的申请列表: '/data-d/myRequestCheck',
  安全生产资料管理: '/data/safetyCheck',
  //#endregion

  //#region   生产管理
  生产管理: '/production/index',
  项目合同管理: '/production/contractmanagement/projectContractIndex',
  外委合同管理: '/production/contractmanagement/outsourcingContractIndex',
  '项目合同列表 ': '/production-d/projectContractIndex',
  '外委合同列表 ': '/production-d/outsourcingContractIndex',
  合同范本列表: '/production/contractmanagement/contractTemplateIndex',
  收款节点管理: '/production/collectionManagement/incomeNodeIndex',
  收款记录管理: '/production/collectionManagement/incomeRecordIndex',
  开票记录管理: '/production/collectionManagement/billingRequestIndex',
  收票记录管理: '/production/paymentManagement/receiptRecordIndex',
  付款节点管理: '/production/paymentManagement/paymentNodeIndex',
  付款记录管理: '/production/paymentManagement/paymentRequestIndex',
  收款节点列表: '/production-d/incomeNodeCheck',
  收款记录列表: '/production-d/incomeRecordCheck',
  开票记录列表: '/production-d/billingRequestCheck',
  收票记录列表: '/production-d/receiptRecordCheck',
  付款节点列表: '/production-d/paymentNodeCheck',
  付款记录列表: '/production-d/paymentRequestCheck',
  客户管理: '/production/customerManagementIndex',
  客户列表: '/production-d/customerManagementCheck',
  投标管理: '/production/bidManagementIndex',
  投标列表: '/production-d/bidManagementCheck',
  //#endregion

  //#region   项目管理
  项目管理: '/project/index',
  项目列表: '/project-d/projectCheck',
  项目管理统计: '/project/projectManagementIndex',
  项目人员管理: '/project/projectPersonnelIndex',
  项目人员列表: '/project-d/projectPersonnelCheck',
  项目计划管理: '/project/projectPlanIndex',
  项目计划列表: '/project-d/projectPlanCheck',
  项目进度管理: '/project/projectProcessIndex',
  项目进度列表: '/project-d/projectProcessCheck',
  项目资料归档管理: '/project/projectDataIndex',
  项目资料归档列表: '/project-d/projectdataCheck',
  //#endregion

  //#region   资产采购管理
  资产采购管理: '/purchase/index',
  采购合同管理: '/purchase/purchaseManagement/purchaseContractIndex',
  采购合同列表: '/purchase-d/purchaseContractIndex',
  供应商管理: '/purchase/purchaseManagement/supplierIndex',
  供应商列表: '/purchase-d/supplierCheck',
  固定资产入库管理: '/purchase/assetManagement/assetInIndex',
  消耗品入库管理: '/purchase/assetManagement2/assetInIndex',
  固定资产入库列表: '/purchase-d/AssetInCheck',
  消耗品入库列表: '/purchase-d/AssetInCheck2',
  资产报废列表: '/purchase-d/assetOutCheck',
  固定资产领用列表: '/purchase-d/AssetAcquisitionCheck',
  消耗品领用列表: '/purchase-d/AssetAcquisitionCheck2',
  固定资产领用管理: '/purchase/assetManagement/assetAcquisitionIndex',
  消耗品领用管理: '/purchase/assetManagement2/assetAcquisitionIndex',
  资产报废管理: '/purchase/assetManagement/assetOutIndex',
  固定资产查询: '/purchase/assetManagement/assetQueryIndex',
  资产编码列表: '/purchase/assetCodeIndex',
  //#endregion

  //#region   车辆管理
  车辆管理: '/car/index',
  车辆统计: '/car/carManagementIndex',
  车辆列表: '/car-d/carManagementCheck',
  用车申请管理: '/car/carRequestIndex',
  用车申请列表: '/car-d/carRequestCheck',
  用车出库管理: '/car/carOutRequestIndex',
  用车出库列表: '/car-d/carOutRequestCheck',
  //#endregion

  //#region   人员管理
  人员管理: '/person/index',
  人员业绩管理: '/person/personAchievementIndex',
  人员业绩列表: '/person-d/personAchievementCheck',
  '人员证书管理 ': '/person/personCertificateIndex',
  '人员证书列表 ': '/person-d/certificatesCheck',
  人员合同管理: '/person/personContractIndex',
  人员合同列表: '/person-d/laborContractIndex',
  履职经历管理: '/person/personResumeIndex',
  履职经历列表: '/person-d/personResumeCheck',
  人员信息管理: '/person/personInfoIndex',
  人员信息列表: '/person-d/personnelInfoCheck',
  珠荣公司组织架构图: '/person/dept',
  //#endregion

  权限管理: '/system/user',
};

//首页最近使用功能路由字典，用于反向查找key区别路由字典一对多
const routeDict2 = {};

//#endregion

export default {
  amountConversion,
  amountConversion2,
  unique,
  coverTime,
  getUserDept,
  approveReasonShow,
  getLastMonth,
  getThisMonth,
  saveFormCheck,
  sureDialog,
  goTo,
  goBack,
  getRouteKey,
  coverRegin,
  splitStr,
  validateForm,
  getArrVal,
  backArrVal,
  goToOnly,
  ConverAreaVal,
  backAreaVal,
  ShowAreaVal,
  months,
  markRed,
  uploadUrl,
  inputMax,
  limitFt,
  reMarkMax,
  inputTipWidth,
  compoYears,
  approve_cp,
  routeDict,
  routeDict2,
  dueStatus,
  routeDictOnly,
  bidStatus,
};
