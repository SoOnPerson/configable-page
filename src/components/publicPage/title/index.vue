<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-20 15:06:51
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-20 19:32:33
 * @Descripttion: 
-->
<template>
  <div>
    <el-collapse
      v-if="expandAble"
      :value="collapseValue"
      accordion
      v-loading="loading"
    >
      <el-collapse-item name="1">
        <template slot="title">
          <span class="page-title">{{ $route.meta.title }}</span>
          <div class="title-extension">
            <slot name="title-extension"></slot>
          </div>
        </template>
        <slot></slot>
      </el-collapse-item>
    </el-collapse>
    <div v-else class="el-collapse el-collapse-item__header s-collapse">
      <span class="page-title">{{ $route.meta.title }}</span>
      <div class="title-extension">
        <slot name="title-extension"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicPageTitle",
  props: {
    expandAble: {
      type: Boolean,
      require: false,
      default: true,
    },
    loading: {
      type: Boolean,
      require: false,
      default: false,
    },
  },
  data() {
    return {
      collapseValue: null,
    };
  },
  methods: {},
};
</script>

<style>
.page-title {
  margin-left: 24px;
  font-size: 18px;
  font-weight: 500;
}
.el-collapse-item__arrow {
  margin: 0 8px 0 18px;
}
</style>