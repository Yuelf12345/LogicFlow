<template>
  <div class="node-menu-wrapper">
    <!-- 通用节点 -->
    <div class="node-add-title">通用节点:</div>
    <div style="text-align: right; margin: 0">
      <el-menu mode="vertical" class="node-menu" :open="true" @select="addCommonNode">
        <el-menu-item
          v-for="(item, index) in commonNodeMap"
          :index="item.type"
          :key="index"
        >
          <span class="menu-item-inner">
            {{ item.text }}
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="split-line"></div>
    <!-- 连接至已有节点 -->
    <div class="node-add-title">连接至已有节点:</div>
    <div style="text-align: right; margin: 0">
      <el-menu mode="vertical" class="node-menu" :open="true"  @select="connectToNode" >
        <el-menu-item v-for="(item, index) in nodeOptions" :index="item.id" :key="index">
          <span @mouseenter.stop="handleNodeEnter(item.id)" class="menu-item-inner">
            {{ item.text }}
          </span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import LogicFlow from "@logicflow/core";
import commonNodeMap from "../../util/typeMap";
import { createUuid } from "../../util/calculate";
interface Props {
  lf?: any;
  model?: any;
}
const props = withDefaults(defineProps<Props>(), {
  lf: () => {},
  model: () => {},
});
console.group("insertMenu");
console.log("lf---------props", props.lf);
console.log("model---------props", props.model);
console.groupEnd();
const nodeOptions = ref<any>([]);
onMounted(()=> {
  const data = props.lf.getGraphRawData();
  const { nodes } = data;
  nodes.forEach((node) => {
    nodeOptions.value.push({
      id: node.id,
      text: node.text.value
    });
  });
})

const addCommonNode = (type:string) => {
  const {text} = commonNodeMap.filter(node => node.type === type)[0]
  const nodeData: any = {
    id: createUuid(),
    type,
    properties: {},
    formData: {},
    model: props.model,
    text,
  };
  props.lf.graphModel.eventCenter.emit("node:add-node", nodeData);
  hide();
};

const connectToNode = (id:number) =>{
  hide();
  props.lf.addEdge({ // 在此边的尾端插入一个新节点
      sourceNodeId: props.model.id,
      targetNodeId: id,
    })
}
const handleNodeEnter = (e:number) =>{
  const nodeModel = props.lf.getNodeModelById(e);
  props.lf.graphModel.eventCenter.emit("node:hover-node", nodeModel);
}
const hide = () => {
  const key = props.model.id;
  setTimeout(() => {
    props.lf.graphModel.popover.hide(key);
  }, 50);
};
</script>

<style lang="scss" scoped>
.node-menu-wrapper {
  width: 194px;
}
.node-menu {
  border: none;
  padding: 4px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 120px;
  background: #f3f6fa;
  border-radius: 4px;
  .el-menu-item {
    text-align: left;
    height: 25px;
    line-height: 25px;
    padding: 0 !important;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #1f3252;
    font-weight: 400;
    &.is-active {
      background: rgba(41, 97, 239, 0.08);
      border-radius: 2px;
    }
  }
  .menu-item-inner {
    display: flex;
    align-items: center;
    margin-left: 2px;
  }
  .icon {
    width: 14px;
    height: 14px;
    margin-right: 4px;
    filter: drop-shadow(#2961ef 100px 0);
    transform: translateX(-100px);
  }
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    background: transparent;
    border-radius: 5px;
    width: 4px;
    z-index: -1;
  }

  &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 4px;
    background: #dcdfe6;
    z-index: -1;
  }

  &::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    border-radius: 4px;
    background: transparent;
  }

  &::-webkit-scrollbar-corner {
    /*滚动条交汇处*/
    border-radius: 4px;
    background: transparent;
  }
}

.node-add-title {
  height: 24px;
  line-height: 24px;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #303a51;
  font-weight: 500;
}
.menu-item-inner {
  display: block;
  height: 100%;
  width: 100%;
}
.split-line {
  width: 100%;
  border-bottom: 1px solid #dcdfe6;
  margin: 8px 0;
}
</style>
