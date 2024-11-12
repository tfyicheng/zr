import Vue from 'vue';

import Cookies from 'js-cookie';

import Element from 'element-ui';
//全局修改element默认配置
Element.TableColumn.props.showOverflowTooltip = { type: Boolean, default: true };
import './assets/styles/element-variables.scss';

import '@/assets/styles/index.scss'; // global css
import '@/assets/styles/guangwei.scss'; // guangwei css
// 引入字体样式
import '@/assets/font/font.scss';
import App from './App';
import store from './store';
import router from './router';
import directive from './directive'; // directive
import plugins from './plugins'; // plugins
import { download } from '@/utils/request';

import './assets/icons'; // icon
import './permission'; // permission control
import { getDicts } from '@/api/system/dict/data';
import { getConfigKey } from '@/api/system/config';
import {
  parseTime,
  resetForm,
  addDateRange,
  selectDictLabel,
  selectDictLabels,
  handleTree,
} from '@/utils/guangwei';

//Vue.use(Vue2OrgTree)
//全局公用方法
import commonFun from '@/utils/common';
import formRules from '@/utils/formRules';

// 分页组件
import Pagination from '@/components/Pagination';
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar';
// 富文本组件
import Editor from '@/components/Editor';
// 文件上传组件
import FileUpload from '@/components/FileUpload';
import FileUpload2 from '@/components/FileUpload2';
// 图片上传组件
import ImageUpload from '@/components/ImageUpload';
// 图片预览组件
import ImagePreview from '@/components/ImagePreview';
// 字典标签组件
import DictTag from '@/components/DictTag';
// 头部标签组件
import VueMeta from 'vue-meta';
// 字典数据组件
import DictData from '@/components/DictData';

//导入Analysis目录下自定义组件
import '@/components/Analysis/custom.js';
//导入views目录下自定义组件
import '@/views/components/dialog/custom.js';

import elDragDialog from '@/utils/diaLog.js';
Vue.directive('el-drag-dialog', elDragDialog); //添加标签事件绑定 可以放大移动弹窗
//组织架构图
import Vue2OrgTree from 'vue-tree-color';
Element.Dialog.props.lockScroll.default = false;
Element.Dialog.props.closeOnClickModal.default = false; //点击遮罩层空白地方关闭
import * as echarts from 'echarts';
// 全局方法挂载
Vue.prototype.getDicts = getDicts;
Vue.prototype.getConfigKey = getConfigKey;
Vue.prototype.parseTime = parseTime;
Vue.prototype.resetForm = resetForm;
Vue.prototype.addDateRange = addDateRange;
Vue.prototype.selectDictLabel = selectDictLabel;
Vue.prototype.selectDictLabels = selectDictLabels;
Vue.prototype.download = download;
Vue.prototype.handleTree = handleTree;
Vue.prototype.commonFun = commonFun;
Vue.prototype.formRules = formRules;
Vue.prototype.$echarts = echarts;
Vue.prototype.$EventBus = new Vue();

// 全局组件挂载
Vue.component('DictTag', DictTag);
Vue.component('Pagination', Pagination);
Vue.component('RightToolbar', RightToolbar);
Vue.component('Editor', Editor);
Vue.component('FileUpload', FileUpload);
Vue.component('FileUpload2', FileUpload2);
Vue.component('ImageUpload', ImageUpload);
Vue.component('ImagePreview', ImagePreview);
Vue.component('Vue2OrgTree', Vue2OrgTree);
Vue.use(directive);
Vue.use(plugins);
Vue.use(VueMeta);
Vue.use(Vue2OrgTree);

DictData.install();

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
});

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
