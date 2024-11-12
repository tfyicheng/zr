<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }//用来传入小红点个数

  },
  render(h, context) {
    const { icon, title, num } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    // if (title) {
    //   if (title.length > 5) {
    //     vnodes.push(<span slot='title' title={(title)}>{(title)}</span>)
    //   } else {
    //     vnodes.push(<span slot='title'>{(title)}</span>)
    //   }
    // }
    if (title) {
      if (title == '工作台') {//判断自己需要展示标题的小红点
        if (title.length > 5) {
          vnodes.push(<span slot="title" title={(title)}>{(title)}</span>)
        } else {
          if (num == 0) {//没有数据不显示小红点
            vnodes.push(<span slot="title">{(title)}</span>)
          } else {
            vnodes.push(<span class="sp" slot="title">{(title)}
              <el-badge value={(num)} class="item" id="elBadge"/></span>)
          }
        }
      } else {
        if (title.length > 5) {
          vnodes.push(<span slot="title" title={(title)}>{(title)}</span>)
        } else {
          vnodes.push(<span slot="title">{(title)}</span>)
        }
      }
    }


    return vnodes
  }
}
</script>

<style lang="scss">
.item {
  margin-top: -20px;
  margin-right: 40px;
 .el-badge__content{
   //background: #409EFF;
   border-radius: 10px;
   height: 20px;
   line-height: 20px;
 }
}
</style>
