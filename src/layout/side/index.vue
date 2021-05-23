<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-18 18:39:09
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-21 14:51:40
 * @Descripttion: 
-->
<template>
  <el-aside
    class="aside-menu-blue"
    :style="{ width: collapse ? '64px' : '200px', overflow: 'hidden' }"
  >
    <el-image class="side-menu-img" :src="openedUrl" fit="fill" />
    <s-menu
      customClass="s-menu aside-menu-blue"
      :style-object="{
        width: 'calc(100% + 18px)',
        height: 'calc(100vh - 60px)',
        overflowX: 'hidden',
        overflowY: 'scroll',
      }"
      :menu="menu"
      :collapse="collapse"
    ></s-menu>
  </el-aside>
</template>

<script>
import SMenu from "./menu";
import "./style/blue.css";
export default {
  name: "Side",
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
.side-menu-img {
  width: 100%;
  height: 50px;
  display: block;
}
.el-menu-item-group__title {
  padding: 0;
}
.s-menu > .el-menu--popup {
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  margin-left: 0;
  margin-right: 0;
}
.s-menu > .el-menu--popup::-webkit-scrollbar-thumb {
  background: #d3dce6;
  border-radius: 20px;
}
.s-menu > .el-menu--popup::-webkit-scrollbar {
  width: 6px;
}
.s-menu > .el-menu--popup::-webkit-scrollbar-track-piece {
  background: #ffffff;
}
</style>