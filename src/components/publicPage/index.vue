<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-20 16:25:55
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-23 15:34:17
 * @Descripttion: 
-->
<template>
  <div>
    <public-page-title :expand-able="true">
      <template slot="title-extension">
        <el-button
          :loading="searchLoading"
          @click.stop="reset"
          icon="el-icon-refresh"
          size="mini"
        >
          重置
        </el-button>
        <el-button
          :loading="searchLoading"
          @click.stop="search"
          icon="el-icon-search"
          type="primary"
          size="mini"
        >
          查询
        </el-button>
      </template>
      <public-page-search
        :searchList="searchList"
        ref="pageSearch"
      ></public-page-search>
    </public-page-title>
    <public-page-operation></public-page-operation>
    <public-page-table
      ref="pageTable"
      emptyText="无数据"
      :getDataList="getDataList"
      @select="selectRow"
    >
    </public-page-table>
  </div>
</template>

<script>
import PublicPageTitle from "@/components/publicPage/title";
import PublicPageSearch from "@/components/publicPage/search";
import PublicPageOperation from "@/components/publicPage/operate";
import PublicPageTable from "@/components/publicPage/table";
import searchList from "@/mock/searchForm";
export default {
  components: {
    PublicPageTitle,
    PublicPageSearch,
    PublicPageOperation,
    PublicPageTable,
  },
  data() {
    return {
      searchLoading: false,
      searchList,
    };
  },
  created() {
    // TODO 通过某种方式获取到配置信息 然后 分发到各个组件渲染
  },
  methods: {
    reset() {
      console.log(this.$refs.pageSearch.searchForm);
      this.$refs.pageTable.loadData();
    },
    search() {
      console.log(this.$refs.pageSearch.searchForm);
      this.$refs.pageTable.loadData();
    },
    getDataList(pageInfo) {
      this.searchLoading = true;
      const requestInfo = Object.assign(
        {},
        pageInfo,
        this.$refs.pageSearch.searchForm
      );
      console.log(requestInfo);
      return new Promise((resolve) => {
        setTimeout(() => {
          this.searchLoading = false;
          const data = [];
          for (let index = 0; index < 12; index++) {
            data.push({
              id: index,
              date: "2021-04-21",
              name: "Ant",
              address: "杭州市",
              phone: "14819389889",
              img:
                "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
            });
          }
          resolve({
            count: 12,
            data: data.slice(
              (requestInfo.pageNum - 1) * requestInfo.pageSize,
              requestInfo.pageNum * requestInfo.pageSize
            ),
          });
        }, 200);
      });
    },
    selectRow() {
      console.log("selectRow");
    },
  },
};
</script>

<style>
</style>