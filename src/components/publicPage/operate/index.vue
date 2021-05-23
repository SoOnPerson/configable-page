<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-20 19:37:59
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-20 20:47:48
 * @Descripttion: 
-->
<template>
  <div class="page-operation">
    <div class="operation" v-for="item in operationList" :key="item.id">
      <el-button size="mini">
        {{ item.name }}
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicPageOperation",
  props: {
    operationList: {
      type: Array,
      require: true,
      default: () => [
        {
          id: 1,
          name: "新增",
        },
        {
          id: 2,
          name: "查看",
        },
      ],
    },
  },
};
</script>

<style>
.page-operation {
  background-color: white;
  padding: 4px 20px;
}
.page-operation .operation {
  display: inline-block;
  margin-right: 20px;
}
</style>