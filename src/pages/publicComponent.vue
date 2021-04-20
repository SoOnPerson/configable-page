<template>
  <div class="mcontainer">
    <div style="height: 1000px; width: 100%">{{ name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "loading",
    };
  },
  mounted() {
    this.name = "loading";
    setTimeout(() => {
      this.name = "done";
    }, 1000);
  },
};
</script>

<style>
.mcontainer {
  height: calc(100vh - 140px);
  overflow: auto;
  background-color: rgb(128, 128, 230);
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