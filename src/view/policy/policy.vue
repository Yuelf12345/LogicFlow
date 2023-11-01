<template>
  <div class="policy">
    <Decision-design class="decision-design" />
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import DecisionDesign from "./projectadd/decisionDesign.vue";
const activeName = ref("decision");

</script>
<style lang="scss" scoped>
.policy {
  width: 100%;
  height:  100%;
  overflow: hidden;
  .decision-design {
    
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
