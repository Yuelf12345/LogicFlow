<template>
  <div class="policy">
    <el-tabs v-model="activeName" class="policy-tabs" @tab-click="handleClick">
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Setting /></el-icon>
            <span>基础信息</span>
          </span>
        </template>
       <Basic-info />
      </el-tab-pane>
      <el-tab-pane  name="decision">
        <template #label>
          <span>
            <el-icon><Rank /></el-icon>
            <span>决策设计</span>
          </span>
        </template>
        <Decision-design class="decision-design" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Document /></el-icon>
            <span>执行日志</span>
          </span>
        </template>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span>
            <el-icon><Reading /></el-icon>
            <span>服务开放</span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
// @ts-nocheck
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import DecisionDesign from "./projectadd/decisionDesign.vue";
import BasicInfo from "./projectadd/basicInfo.vue";
const activeName = ref("decision");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>
<style lang="scss" scoped>
.policy {
  width: 100vw;
  height: 100vh;
  .decision-design {
    height: calc(100vh - 60px);
  }
}
.policy-tabs > .el-tabs__header {
  height: 60px;
}
.policy-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
