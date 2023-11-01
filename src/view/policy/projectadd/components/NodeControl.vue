<template>
  <div>
    <el-button-group>
      <el-tooltip content="放大" placement="top" effect="light">
        <el-button :icon="ZoomIn" @click="zoomIn" />
      </el-tooltip>
      <el-tooltip content="缩小" placement="top" effect="light">
        <el-button :icon="ZoomOut" @click="zoomOut" />
      </el-tooltip>
      <el-tooltip content="选框" placement="top" effect="light">
        <el-button :icon="Crop" @click="openSelectionSelect" />
      </el-tooltip>
      <el-tooltip content="适应" placement="top" effect="light">
        <el-button :icon="Rank" @click="zoomReset" />
      </el-tooltip>
      <el-tooltip content="上一步" placement="top" effect="light">
        <el-button :icon="ArrowLeftBold" @click="undo" :disabled="undoDisable" />
      </el-tooltip>
      <el-tooltip content="下一步" placement="top" effect="light">
        <el-button :icon="ArrowRightBold" @click="redo" :disabled="redoDisable" />
      </el-tooltip>
      <el-tooltip content="下载图片" placement="top" effect="light">
        <el-button :icon="Download" @click="download" />
      </el-tooltip>
      <el-tooltip content="查看数据" placement="top" effect="light">
        <el-button :icon="Coin" @click="catData" />
      </el-tooltip>
      <el-tooltip content="查看缩略图" placement="top" effect="light">
        <el-button :icon="FullScreen" @click="showMiniMap" />
      </el-tooltip>
      <el-tooltip content="设置主题" placement="top" effect="light">
        <el-button :icon="Setting" @click="themeDrawer = true" />
      </el-tooltip>
    </el-button-group>
    <el-drawer v-model="themeDrawer" title="设置主题" direction="rtl" :modal="false">
      <el-form :model="themeConfig" label-width="120px">
        <el-form-item label="连线类型">
          <el-select v-model="themeConfig.lineType" @change="handleChangeLineType">
            <el-option label="折线" value="polyline" />
            <el-option label="直线" value="line" />
            <el-option label="曲线" value="bezier" />
          </el-select>
        </el-form-item>
        <el-form-item label="连线颜色">
          <el-color-picker v-model="themeConfig.lineColor" />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import {
  ZoomIn,
  ZoomOut,
  Crop,
  Rank,
  ArrowLeftBold,
  ArrowRightBold,
  Download,
  Coin,
  FullScreen,
  Setting,
} from "@element-plus/icons-vue";
import LogicFlow from "@logicflow/core";
const props = defineProps({
  lf: LogicFlow,
});
console.log(props.lf);
const bgColor = ref("#000");
const themeConfig = reactive({
  lineColor: "#000",
  lineType: "polyline",
});
watch(
  () => themeConfig,
  () => {
    props.lf.setTheme({
      polyline: {
        stroke: themeConfig.lineColor,
        strokeWidth: 2,
      },
    });
  },
  { deep: true }
);
const undoDisable = ref();
const redoDisable = ref();
const themeDrawer = ref<boolean>(false);
if (props.lf) {
  props.lf.on("history:change", ({ data: { undoAble, redoAble } }) => {
    undoDisable.value = !undoAble;
    redoDisable.value = !redoAble;
  });
}
const zoomIn = () => {
  props.lf.zoom(true);
};
const zoomOut = () => {
  props.lf.zoom(false);
};
const openSelectionSelect = () => {
  props.lf.extension.selectionSelect.openSelectionSelect();
};
const zoomReset = () => {
  props.lf.resetZoom();
};
const undo = () => {
  props.lf.undo();
};
const redo = () => {
  props.lf.redo();
};
const download = () => {
  props.lf.getSnapshot();
};
const catData = () => {
  console.log(props.lf.getGraphRawData());
};
const showMiniMap = () => {
  props.lf.extension.miniMap.show(props.lf.graphModel.width - 250, 80);
};
const handleChangeLineType = (value: string) => {
  const { graphModel, edges } = props.lf;
  props.lf.setDefaultEdgeType(value);
  if (edges && edges.length > 0) {
    edges.forEach((edge) => {
      graphModel.changeEdgeType(edge.id, value);
    });
  }
  console.log(1);
};
</script>

<style lang="scss" scope></style>
