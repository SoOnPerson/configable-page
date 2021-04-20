<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-19 21:38:12
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 21:45:08
 * @Descripttion: 
-->
<template>
  <public-component v-if="beforeRouteLeaveRefresh"></public-component>
</template>

<script>
import PublicComponent from "@pages/publicComponent";
export default {
  components: { PublicComponent },
};
</script>

<style>
</style>