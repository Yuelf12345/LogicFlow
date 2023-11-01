<template>
  <div>
    <div class="ling" :class="[properties.status]" />
    <div class="node-wrap">
      <div
        class="node-option"
        v-show="properties.status === 'selected' || properties.status === 'hovered'"
      >
        <span class="option-icon" @click="copyNode" @mousedown.stop>
          <img
            src="https://s3-gzpu.didistatic.com/tiyan-base-store/suda/organizer/icons/node_copy.png"
          />
        </span>
        <span class="option-icon" slot="reference" @click="deleteNode" @mousedown.stop>
          <img
            src="https://s3-gzpu.didistatic.com/tiyan-base-store/suda/organizer/icons/node_delete.png"
          />
        </span>
      </div>
      <div class="node-next">
        <span
          v-show="properties.status === 'selected' || properties.status === 'hovered'"
        >
          <el-icon color="#409EFF" @mousedown.stop="handleNext"><CirclePlus /></el-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, watch } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
const props = defineProps({
  msg: String,
  model: Object,
  graphModel: Object,
  isSelected: Boolean,
  isHovered: Boolean,
  disabled: Boolean,
  properties: Object,
});
console.log("props", props);

watch(
  () => props.isHovered,
  () => {
    if (props.isHovered) {
      enterNode();
    } else {
      leaveNode();
    }
  }
);

const enterNode = () => {
  if (props.model.properties && props.model.properties.status === "selected") return;
  props.model.setProperties({
    status: "hovered",
  });
};
const leaveNode = () => {
  if (props.model.properties && props.model.properties.status === "selected") return;
  props.model.setProperties({
    status: "normal",
  });
};

const handleNext = () => {
  const nodeX = props.model.x;
  const nodeY = props.model.y;
  const x = nodeX + props.model.width / 2;
  const y = nodeY;
  props.graphModel.popover.show({
    type: "tip1",
    key: props.model.id,
    delay: 100,
    placement: "right",
    trigger: "click",
    width: 16,
    height: 16,
    x,
    y,
    props: {
      showConnectBlock: true,
    },
  });
  selectNode();
};
const selectNode = () => {
  props.graphModel.eventCenter.emit(`node:update-model`, props.model);
};

const copyNode = () => {
  props.graphModel.cloneNode(props.model.id);
};
const deleteNode = () => {
  props.graphModel.deleteNode(props.model.id);
};
</script>

<style scoped lang="scss">
.node-wrap {
  box-sizing: border-box;
  cursor: move;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ecf5ff;
  position: relative;
  top: -30px;
  .node-next {
    display: flex;
    position: absolute;
    left: 100px;
    top: px;
    width: 24px;
    height: 28px;
    align-items: center;
    span {
      width: 16px;
      height: 16px;
      background: #fff;
      margin-left: 13px;
      margin-right: 2px;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .next-icon {
      width: 16px;
      height: 16px;
    }
  }
  .node-option {
    display: flex;
    position: absolute;
    right: 0;
    top: calc(50% - 20px);
    transform: translateY(-100%);
    cursor: pointer;
    .option-icon {
      display: inline-block;
      margin-left: 4px;
      width: 18px;
      height: 18px;
      overflow: hidden;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.hovered {
  background-color: #ecf5ff;
}
.selected {
  background-color: #fff;
}
.ling {
  height: 50px;
    width: 50px;
    transform: rotateZ(45deg) skew(-27deg, -27deg);
    margin-left: 25px;
    margin-top: -7px;
    background: #fff;
    border: 2px solid #eee;
    box-shadow: 0 0 6px 0 rgba(204, 204, 204, 0.5);
}
</style>
