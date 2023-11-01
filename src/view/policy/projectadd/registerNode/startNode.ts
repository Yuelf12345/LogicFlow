// import { h, CircleNode, CircleNodeModel } from "@logicflow/core";

// class StartNode extends CircleNode {
//   getIcon() {
//     const { x, y, width, height } = this.props.model;
//     const style = this.props.model.getNodeStyle();
//     return h(
//       "svg",
//       {
//         // model中x,y表示中心坐标，而svg x,y表示左上角
//         x: x - width / 2,
//         y: y - height / 2,
//         viewBox: "0 0 1024 1024",
//         width,
//         height
//       },
//       [
//         h("path", {
//           d:
//             "M384 704.064a32 32 0 0 1-32-32v-320a32 32 0 0 1 48.96-27.2l256 160a32 32 0 0 1 0 54.4l-256 160a32 32 0 0 1-16.96 4.8z m32-294.4v204.48l163.52-102.4-163.52-102.08z",
//           fill: style.stroke
//         })
//       ]
//     );
//   }
//   getShape() {
//     const { x, y, r } = this.props.model;
//     const style = this.props.model.getNodeStyle();
//     return h("g", {}, [
//       h("circle", {
//         ...style,
//         cx: x,
//         cy: y,
//         r
//       }),
//       this.getIcon()
//     ]);
//   }
// }

// class StartNodeModel extends CircleNodeModel {
//   initNodeData(data: any) {
//     if (data.text && typeof data.text === "string") {
//       data.text = {
//         value: data.text,
//         x: data.x,
//         y: data.y + 40
//       };
//     }
//     super.initNodeData(data);
//     this.r = 20;
//   }
//   setAttributes() {
//     this.r = 20;
//     const lockMenu = [
//       {
//         className: "lf-menu-lock custom-menu",
//         text: "",
//         icon: true,
//         callback: () => {
//           this.draggable = false;
//           this.setProperties({
//             isLocked: true
//           });
//         }
//       },
//       {
//         className: "lf-menu-delete custom-menu",
//         text: "",
//         icon: true,
//         callback: (node:any) => {
//           this.graphModel.deleteNode(node.id);
//         }
//       }
//     ];
//     const unlockMenu = [
//       {
//         className: "lf-menu-unlock custom-menu",
//         text: "",
//         icon: true,
//         callback: () => {
//           this.draggable = true;
//           this.setProperties({
//             isLocked: false
//           });
//         }
//       }
//     ];
//     const { isLocked } = this.properties;
//     if (isLocked) {
//       this.menu = unlockMenu;
//     } else {
//       this.menu = lockMenu;
//     }
//   }
//   getNodeStyle() {
//     const style = super.getNodeStyle();
//     style.stroke = "#000";
//     style.strokeWidth = 2;
//     const { isLocked } = this.properties;
//     if (isLocked) {
//       style.fill = "#efefef";
//       style.stroke = "#939495";
//     }
//     return style;
//   }
// }

import BaseNode from "./baseNode.ts"
class StartNodeView extends BaseNode.view {

}

class StartNodeModel extends BaseNode.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 40;
  }
  // getDefaultAnchor() {
  //   const { x, y, id, width } = this;
  //   const anchors = [
  //     {
  //       x: x + width / 2,
  //       y: y,
  //       id: `${id}_right`,
  //       type: "right"
  //     },
  //     {
  //       x: x - width / 2,
  //       y: y,
  //       id: `${id}_left`,
  //       type: "left"
  //     }
  //   ];
  //   return anchors;
  // }
}

export default {
  type: "startNode",
  model: StartNodeModel,
  view: StartNodeView
};
