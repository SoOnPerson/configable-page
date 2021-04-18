<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-17 13:23:42
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-18 20:05:53
 * @Descripttion: 主界面layout
-->
<template>
  <el-container>
    <side />
    <el-container>
      <el-header>Header</el-header>
      <el-main> <router-view /> </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Side from "./side/index.vue";
export default {
  name: "MainLayout",
  components: { Side },
  created() {
    console.log("mainLayout created");
  },
};
</script>

<style>
</style>