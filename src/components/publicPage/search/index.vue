<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-20 16:35:19
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-20 19:22:24
 * @Descripttion: 
-->
<template>
  <el-form
    ref="form"
    :model="searchForm"
    size="mini"
    label-position="right"
    :label-width="searchLayout.labelWidth"
    style="margin-right: 28px"
  >
    <el-row :gutter="searchLayout.gutter">
      <el-col
        v-for="item in searchList"
        :key="item.code"
        :xs="searchLayout.xs"
        :sm="searchLayout.sm"
        :md="searchLayout.md"
        :lg="searchLayout.lg"
        :xl="searchLayout.xl"
      >
        <template v-if="item.type == 'input'">
          <el-form-item :label="item.label" :prop="item.code">
            <el-input
              :placeholder="`请输入${item.label}`"
              clearable
              v-model="searchForm[item.code]"
            ></el-input>
          </el-form-item>
        </template>
        <template
          v-else-if="
            'year/month/date/week/datetime/datetimerange/daterange'
              .split('/')
              .includes(item.type)
          "
        >
          <el-form-item :label="item.label" :prop="item.code">
            <el-date-picker
              v-model="searchForm[item.code]"
              :type="item.type"
              clearable
              style="width: 100%"
              :placeholder="`请选择${item.label}`"
            >
            </el-date-picker>
          </el-form-item>
        </template>
        <!-- 其他的暂时不想继续写了 大概都是一样的 -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
const searchLayout = {
  xs: 24,
  sm: 12,
  md: 8,
  lg: 6,
  xl: 6,
  gutter: 0,
  labelWidth: "120px",
};
export default {
  name: "PublicPageSearch",
  props: {
    searchList: {
      // 筛选的list
      type: Array,
      require: true,
      default: () => [],
    },
  },
  data() {
    return {
      searchLayout, // 表单项的布局
      searchForm: {}, // 筛选表单
    };
  },
};
</script>

<style>
</style>