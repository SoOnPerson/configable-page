<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-19 13:07:55
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 16:00:27
 * @Descripttion: 
-->
<template>
  <div style="width: 100%">
    <div class="s-header">
      <div class="left"></div>
      <div class="right">
        <el-tooltip content="方梦" placement="bottom-start">
          <p class="header-name">方梦</p>
        </el-tooltip>
      </div>
    </div>
    <div class="s-tagview">
      <div @click.prevent="changeCollapse" class="collapse-icon">
        <el-icon
          :name="$store.state.app.collapse ? 's-unfold' : 's-fold'"
        ></el-icon>
      </div>
      <s-route-tag></s-route-tag>
    </div>
  </div>
</template>

<script>
import SRouteTag from "../routeTag";
export default {
  name: "SHeader",
  components: { SRouteTag },
  methods: {
    changeCollapse() {
      this.$store.commit("CHANGE_COLLAPSE");
    },
  },
};
</script>

<style scoped>
.s-header {
  display: flex;
  height: 50px;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 0 28px 0 rgb(0 107 217 / 13%);
}
.s-tagview {
  display: flex;
  height: 50px;
  background-color: #eaedf3;
}
.header-name {
  font-size: 18px;
  color: #383d4a;
  margin-left: 16px;
  margin-bottom: 0;
  margin-top: 0;
  margin-right: 24px;
  line-height: 50px;
}
.collapse-icon {
  width: 20px;
  text-align: center;
  font-size: 20px;
  margin-top: 13px;
  margin-left: 24px;
  margin-right: 18px;
  color: #5f667a;
}
</style>