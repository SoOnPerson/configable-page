<template>
  <div class="mcontainer">
    <public-page></public-page>
  </div>
</template>

<script>
import PublicPage from "@/components/publicPage";
export default {
  components: { PublicPage },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style>
.mcontainer {
  height: calc(100vh - 140px);
  overflow: auto;
}
.mcontainer::-webkit-scrollbar-thumb {
  background: #d3dce6;
  border-radius: 20px;
}
.mcontainer::-webkit-scrollbar {
  width: 6px;
}
.mcontainer::-webkit-scrollbar-track-piece {
  background: #ffffff;
}
</style>