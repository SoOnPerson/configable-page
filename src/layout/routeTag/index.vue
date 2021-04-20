<!--
 * @Author: SoOnPerson
 * @Date: 2021-04-19 14:33:02
 * @LastEditors: SoOnPerson
 * @LastEditTime: 2021-04-19 22:19:14
 * @Descripttion: 
-->
<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.meta.title }}
        <span class="el-icon-close ml-1" @click.prevent.stop="closeTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshTag(selectedTag)">刷新</li>
      <li @click="closeTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from "./ScrollPane";
import { mapGetters } from "vuex";
export default {
  name: "SRouteTag",
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
    };
  },
  computed: {
    ...mapGetters(["cachedViews", "visitedViews"]),
  },
  watch: {
    $route(value) {
      console.log("$route:", value.name);
      this.$store.commit("ADD_CACHED_VIEWS", value);
      this.moveToCurrentTag();
    },
    visible() {
      document.body.addEventListener("click", this.closeMenu);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$store.commit("ADD_CACHED_VIEWS", this.$route);
    },
    isActive(route) {
      return route.fullPath == this.$route.fullPath;
    },
    openMenu(tag, e) {
      this.left = e.clientX;
      this.top = e.clientY;
      this.visible = true;
      this.selectedTag = tag;
    },
    closeMenu() {
      this.visible = false;
    },
    refreshTag(tag) {
      const { fullPath } = tag;
      if (this.isActive(tag)) {
        this.$nextTick(() => {
          this.$router
            .replace({
              path: "/redirect" + fullPath,
            })
            .catch(() => {});
        });
        return;
      }
      this.$store.commit("DEL_CACHED_VIEWS", {
        route: tag,
        isDelVisited: false,
      }); // 只清除缓存，但是不清除页签
    },
    closeTag(tag) {
      if (
        this.cachedViews.length == 1 &&
        this.cachedViews[0].name == "homePage"
      ) {
        this.refreshTag(tag);
        return;
      }
      this.$store.commit("DEL_CACHED_VIEWS", {
        route: tag,
        isDelVisited: true,
      });

      if (this.isActive(tag)) {
        this.toLastView(tag);
      }
    },
    closeOthersTags(tag) {
      this.$router.push(tag.fullPath);
      this.$store.commit("DEL_OTHERS_VIEWS", tag);
      this.moveToCurrentTag();
    },
    closeAllTags(tag) {
      if (
        this.cachedViews.length == 1 &&
        this.cachedViews[0].name == "homePage"
      ) {
        this.refreshTag(tag);
        return;
      }
      this.$store.commit("DEL_ALL_VIEWS");
      this.toLastView(tag);
    },
    toLastView(tag) {
      console.log("toLastView", this.cachedViews);
      const latestView = this.cachedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      } else {
        if (tag.name === "homePage") {
          // to reload home page
          this.$router
            .replace({
              path: "/redirect" + tag.fullPath,
            })
            .catch(() => {});
        } else {
          this.$router.push("/home");
        }
      }
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        if (tags)
          for (const tag of tags) {
            if (tag.to.fullPath === this.$route.fullPath) {
              this.$refs.scrollPane.moveToTarget(tag);
              break;
            }
          }
      });
    },
  },
};
</script>

<style scoped>
.tags-view-container {
  height: 50px;
  width: 100%;
  overflow: hidden;
}
.tags-view-item {
  display: inline-block;
  position: relative;
  cursor: pointer;
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  color: #5f667a;
  background: transparent;
  padding: 0 20px;
  font-size: 14px;
  font-weight: 500;
  margin-left: 5px;
}
.tags-view-item.active {
  color: #376eff;
  font-weight: 500;
  background-color: #f7f8fa;
  border-radius: 6px 6px 0 0;
}
.tags-view-container .contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  -webkit-box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
.tags-view-container .contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}

.tags-view-container .contextmenu li:hover {
  background: #eee;
}
</style>