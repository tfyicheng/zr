import hasRole from './permission/hasRole';
import hasPermi from './permission/hasPermi';
import dialogDrag from './dialog/drag';
import dialogDragWidth from './dialog/dragWidth';
import dialogDragHeight from './dialog/dragHeight';
import clipboard from './module/clipboard';

const install = function (Vue) {
  Vue.directive('hasRole', hasRole);
  Vue.directive('hasPermi', hasPermi);
  Vue.directive('clipboard', clipboard);
  Vue.directive('dialogDrag', dialogDrag);
  Vue.directive('dialogDragWidth', dialogDragWidth);
  Vue.directive('dialogDragHeight', dialogDragHeight);
  Vue.directive('disable-right-click', {
    bind(el) {
      el.oncontextmenu = function (event) {
        event.preventDefault();
      };
    },
    unbind(el) {
      el.oncontextmenu = null;
    },
  });
};

if (window.Vue) {
  window['hasRole'] = hasRole;
  window['hasPermi'] = hasPermi;
  Vue.use(install); // eslint-disable-line
}

export default install;
