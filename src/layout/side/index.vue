<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-18 18:39:09
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 22:44:22
 * @Descripttion: 
-->
<template>
  <el-aside :style="{ width: collapse ? '64px' : '200px' }">
    <el-image style="width: 100%; height: 50px" :src="openedUrl" fit="fill">
    </el-image>
    <s-menu
      :style-object="{
        width: '99%',
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
      }"
      :menu="menu"
      :collapse="collapse"
    ></s-menu>
  </el-aside>
</template>

<script>
import SMenu from "./menu";
export default {
  components: { SMenu },
  computed: {
    menu: function () {
      return this.$store.getters.menu;
    },
    collapse: function () {
      return this.$store.getters.collapse;
    },
  },
  mounted() {},
  data() {
    return {
      openedUrl:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      closedUrl:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
};
</script>

<style>
</style>