import Vue from 'vue';
//charAt() 是一种字符串方法，用于检索字符串中特定位置的字符。
//因为 charAt() 方法是 String 对象的方法，所以必须通过 String 类的特定实例调用它。
//charAt() 方法不会更改原始string的值。

//string类的 字符串名.toLowerCase()  将字符串中的字母全部转换为小写，非字母不受影响
//字符串名.toUpperCase()    // 将字符串中的字母全部转换为大写，非字母不受影响

//slice(start,end)：方法可从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包end）的数组元素。

function changeStr(str) {
  //将字符串首字母转换为大写
  //button1.charAt(0)  b
  //b.toUpperCase() B
  //button1.slice(1) utton1

  return str.charAt(0).toUpperCase() + str.slice(1);
}
let a = changeStr('buttonl');
//console.log(a); //Button1

//require.context = > webpack API(动态引入文件)
//1.当前路径 2.是否匹配子级 3.文件格式

const requireComponent = require.context('./', false, /\.vue$/); //获取当前路径下的文件
//console.log(requireComponent.keys()); //["./button1.vue", "./button2.vue", "./button3.vue"]

requireComponent.keys().forEach((fileName) => {
  //当前组件
  const config = requireComponent(fileName);
  //console.log(config);
  // console.log(fileName); // ./button1.vue  ./button2.vue  ./button3.vue
  const name = fileName.replace(/^\.\//, '');
  // console.log(name); //button1.vue   button2.vue   button3.vue
  const names = name.replace(/\.w+$/, '');
  // console.log(names); //button1.vue   button2.vue   button3.vue
  const componentName = changeStr(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''));

  // console.log(componentName); // Button1.vue  Button2.vue  Button3.vue
  Vue.component(componentName, config.default || config);
});
