<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-17 13:23:42
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 18:29:39
 * @Descripttion: 主界面layout
-->
<template>
  <el-container style="height: 100vh">
    <side />
    <el-container class="container">
      <s-header></s-header>
      <el-main>
        <keep-alive>
          <router-view :key="key" />
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Side from "./side/index.vue";
import SHeader from "./header";
export default {
  name: "MainLayout",
  components: { Side, SHeader },
  computed: {
    key() {
      return this.$route.fullPath;
    },
  },
  created() {},
};
</script>

<style>
.page-header {
  margin: 0;
  padding: 0;
  width: 100%;
}
.container {
  display: block;
  height: 100vh;
}
</style>