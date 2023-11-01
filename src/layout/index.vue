<template>
  <div class="common-layout">
    <el-container>
      <el-header class="common-header">
        <div class="header-left">
          <span v-for="(btn, index) in topBtn" :key="index">
            <el-button @click="handleChangePath(btn.path)">{{ btn.title }}</el-button>
            <el-divider direction="vertical" v-if="index < topBtn.length - 1" />
          </span>
        </div>
        <div class="header-right">

        </div>
      </el-header>
      <el-main class="common-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
const topBtn = [
  {
    title: "决策",
    path: "/index",
  },
  {
    title: "变量",
    path: "/variable",
  },
  {
    title: "日志",
    path: "/index",
  },
  {
    title: "数据源",
    path: "/index",
  },
];
const handleChangePath = (path: string) => {
  router.push({ path });
};
</script>

<style scoped lang="scss">
.common-layout {
  width: 100vw;
  height: 100vh;
  .common-header{
    display: flex;
    justify-content: space-between;
    height:60px;
    align-items:center;
    border-bottom: 1px solid #eee;
  }
  .common-main {
    // height: 100%;
    overflow: hidden;
  }
}
</style>
