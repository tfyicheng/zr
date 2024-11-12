<template>
  <div style="height: 37px">
    <el-tooltip v-if="textLen > width" effect="dark" :content="text" placement="top">
      <!-- <el-button type="text" class="content"  :style="{width:width+'px'}">{{text}}</el-button> -->
      <span class="content" :style="{ width: width + 'px' }">{{ text }}</span>
    </el-tooltip>
    <div v-else class="content" :style="{ width: width + 'px' }">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'InputTip',
  props: {
    text: {
      type: String,
      default: '',
    },

    width: {
      type: Number,
      default: 250,
    },
  },
  computed: {
    textLen() {
      let len = 0;
      if (this.text) {
        for (var i = 0; i < this.text.length; i++) {
          if (this.text.charCodeAt(i) > 127 || this.text.charCodeAt(i) == 94) {
            len += 2;
          } else {
            len++;
          }
        }
      }
      return len * 8;
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
<style scoped>
.content {
  display: inline-block;
  text-align: left;
  color: #2f2f2f;
  background-color: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
