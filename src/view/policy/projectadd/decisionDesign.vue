<template>
  <div class="decision">
    <node-panel :lf="lf" class="panel" />
    <node-control :lf="lf" class="control" />
    <div ref="container" class="container" />
    <!-- 属性面板 -->
    <div v-if="dialogVisible" class="property-dialog">
      <property-dialog :nodeData="clickNode" :lf="lf" />
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
import { ref, reactive, onMounted, createApp, h } from "vue";
import nodePanel from "./components/NodePanel.vue";
import nodeControl from "./components/NodeControl.vue";
import propertyDialog from "./components/propertyDialog.vue";
//logicflow 核心
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
//拖拽面板
import {
  DndPanel,
  SelectionSelect,
  MiniMap,
  Menu,
  Group,
  InsertNodeInPolyline,
} from "@logicflow/extension";
import "@logicflow/extension/lib/style/index.css";

//自定义节点
import {
  startNode,
  endNode,
  conditionNode,
  subProcess,
  rectNode,
  baseNode,
} from "./registerNode";

import useStore from "../../../store/index";

// 插件
// import { ContextPad } from "../../../plugins/contextPad/contextPad";
// import setContextPad from "../../../plugins/contextPad/setContextPad";
import Popover from "../../../plugins/popover/popover";
import insertMenu from "../../../plugins/popover/insertMenu.vue";
import ElementPlus from "element-plus";
import { genNewNodePos, createUuid } from "../../../util/calculate";
// @ts-ignore
import { storeToRefs } from "pinia";
const store = useStore();
const { themeStore } = store;

const { bgColor } = storeToRefs(themeStore);

const loadedData = ref("");
const dialogVisible = ref<boolean>(false);
const clickNode = ref<any>({});

// 声明容器的对应ref对象和LF对象
const container = ref();
const lf = ref<LogicFlow>();

//流程图数据
const data = ref<any>({
  nodes: [],
  edges: [],
});
let hoveredNodes = reactive<any>([])
const currentModel = ref<any>();
onMounted(() => {
  _init();
  initPopover();
});

const _init = () => {
  lf.value = new LogicFlow({
    autoExpand: false,
    hoverOutline: false,
    nodeSelectedOutline:false,
    edgeSelectedOutline: false,
    container: container.value,
    // grid: {
    //   type: "mesh" //'dot' | 'mesh'
    // },
    background: {
      backgroundColor: "#f4f7f9",
    },
    plugins: [
      DndPanel,
      SelectionSelect,
      MiniMap,
      Menu,
      Group,
      InsertNodeInPolyline,
      Popover,
    ],
    keyboard: {
      enabled: true,
      shortcuts: [
        {
          keys: ["backspace", "delete"],
          callback: () => {
            const elements = lf.value.getSelectElements(true);
            lf.value.clearSelectElements();
            elements.edges.forEach((edge) => lf.value.deleteEdge(edge.id));
            elements.nodes.forEach((node) => lf.value.deleteNode(node.id));
          },
        },
      ],
    },
  });

  // 右键菜单
  lf.value.extension.menu.setMenuConfig({
    // nodeMenu: [
    //   {
    //     text: "",
    //     className: "lf-menu-delete",
    //     icon: true,
    //     callback(node) {
    //       lf.value.deleteNode(node.id);
    //     },
    //   },
    //   {
    //     text: "",
    //     className: "lf-menu-edit",
    //     icon: true,
    //     callback(node) {
    //       clickNode.value = node;
    //       dialogVisible.value = true;
    //     },
    //   },
    //   {
    //     text: "",
    //     className: "lf-menu-copy",
    //     icon: true,
    //     callback(node) {
    //       // const nodeModel  = lf.value.graphModel.cloneNode(node.id)
    //       // console.log(nodeModel);
    //       const newNodeData = {
    //         ...node,
    //         id: createUuid(),
    //         x: node.x + 40,
    //         y: node.y + 40,
    //         text: {
    //           value: node.text.value,
    //           x: node.text.x + 40,
    //           y: node.text.y + 40,
    //         },
    //       };
    //       const nodeModel = lf.value.addNode(newNodeData);
    //       const model = lf.value.getNodeModelById(node.id);
    //       model.isSelected = false;
    //       nodeModel.isSelected = true;
    //       console.log(nodeModel);
    //     },
    //   },
    // ],
    nodeMenu:false,
    edgeMenu: false,
    graphMenu: [],
  });

  //注册自定义节点
  lf.value.register(startNode);
  lf.value.register(endNode);
  lf.value.register(conditionNode);
  lf.value.register(subProcess);
  lf.value.register(rectNode);
  lf.value.register(baseNode);
  // 插件
  // setContextPad(lf.value);
  // Popover(lf.value);
  lf.value.render(data.value);

  lf.value.on("selection:selected,node:click,blank:click,edge:click", ({ data }) => {
    console.log("点击", data);
    lf.value.extension.selectionSelect.closeSelectionSelect();
    if (data && data.type != "startNode") {
      clickNode.value = data;
      dialogVisible.value = true;
    } else {
      dialogVisible.value = false;
    }
  });
  lf.value.on("node:dnd-add", ({ data }) => {
    const { nodes } = lf.value.graphModel;
    const hasStartNode = nodes.filter((node) => node.type === "startNode");
    if (hasStartNode.length > 1) {
      alert(`${data.text.value}已存在`);
      lf.value.graphModel.deleteNode(data.id);
    }
  });

  lf.value.on("node:update-model", (model) => {
    currentModel.value = model;
  });

  // 插入节点
  lf.value.on("node:add-node", ({ model, type, properties, text }) => {
    console.log("model, type, properties", model, type, properties);
    const pos = genNewNodePos(lf.value, model);
    const id = createUuid();
    // 插入一个新节点
    lf.value.addNode({
      // 在此边的尾端插入一个新节点
      id,
      type,
      x: pos.x, // 75为节点宽度
      y: pos.y,
      properties,
      text: {
        x: pos.x,
        y: pos.y,
        value: text,
      },
    });
    // 连接边
    lf.value.addEdge({
      sourceNodeId: model.id,
      targetNodeId: id,
      text: "",
    });
  });

  lf.value.on("node:hover-node", (model) => {
    const nodeId = model.id
    const nodeModel = lf.value.getNodeModelById(nodeId)
    hoveredNodes.forEach(nodeModel => {
      nodeModel.setProperties({
        status: 'normal'
      })
    })
    model.setProperties({
      status: "hovered",
    });
    hoveredNodes = reactive([])
    hoveredNodes.push(nodeModel)
    console.log('hoveredNodes',hoveredNodes);
  });
};

const initPopover = () => {
  const { popover } = lf.value.extension;
  popover.registerPopover("tip1", {
    render: (rootEl, data) => {
      const app = createApp({
        render: () => {
          return h(insertMenu, {
            lf: lf.value,
            model: currentModel.value,
          });
        },
      });
      app.use(ElementPlus);
      app.mount(rootEl);
    },
  });
};
</script>
<style lang="scss">
.decision {
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  .container {
    width: 100%;
    height: 100%;
    outline: none;
  }
  .panel {
    height: 100%;
    z-index: 11;
    background-color: white;
    width: 200px;
  }
  .control {
    position: absolute;
    top: 40px;
    right: 60px;
    z-index: 2;
  }
  .property-dialog {
    width: calc(100% - 222px);
    position: absolute;
    right: 0;
    bottom: 0;
    height: 400px;
    background: #fff;
    border: 1px solid #eee;
  }
}
</style>
