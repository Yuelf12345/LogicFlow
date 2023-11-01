<template>
  <div class="node-panel">
    <div v-for="(item, index) in nodeList" :key="index">
      <b>{{ item.groupTitle }}</b>
      <div
        v-for="(node, index) in item.groupNodeList"
        :key="index"
        @mousedown="handleDragNode(node)"
        class="node-menu flex"
      >
        <el-icon>
          <component :is="node.icon" />
        </el-icon>
        <span class="node-label ml-7">{{ node.text }}</span>
      </div>
      <br />
    </div>
  </div>
</template>

<script setup lang="ts">
import LogicFlow from "@logicflow/core";
import commonNodeMap from '../../../../util/typeMap'
const props = defineProps({
  lf: LogicFlow,
});

const handleDragNode = (node: any) => {
  props.lf.dnd.startDrag({
    type: node.type,
    text: node.text,
  });
};
const nodeList = [
  {
    groupTitle: "开始结束",
    groupNodeList: [
      { text: "开始节点", type: "startNode", icon: "VideoPlay" },
      { text: "结束节点", type: "endNode", icon: "VideoPlay" },
    ],
  },
  {
    groupTitle: "数据处理",
    groupNodeList: commonNodeMap,
  },
];
</script>

<style lang="scss" scoped>
.node-panel {
  padding: 10px;
  .node-menu {
    width: 186px;
    border-radius: 5px;
    padding: 2px;
    margin: 3px 10px;
    border: 1px solid #eee;
    &:hover {
      cursor: move;
      border: 1px dashed #1879ff;
      border-left: 4px solid #1879ff;
      background: #f0f7ff;
      padding-left: 5px;
    }
  }
}
</style>
