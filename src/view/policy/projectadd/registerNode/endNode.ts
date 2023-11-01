// import { h, CircleNode, CircleNodeModel } from "@logicflow/core";

// class EndNode extends CircleNode {
//   getIcon() {
//     const { x, y, width, height } = this.props.model;
//     const style = this.props.model.getNodeStyle();
//     return h(
//       "svg",
//       {
//         // model中x,y表示中心坐标，而svg x,y表示左上角
//         x: x - width / 2 + 10,
//         y: y - height / 2 +10,
//         viewBox: "0 0 1024 1024",
//         width:20,
//         height:20
//       },
//       [
//         h("path", {
//           d:
//             "M192.287933 862.398462c-15.953344 0-29.006637-13.053294-29.006637-29.007661l0-639.423111c0-15.954367 13.053294-29.007661 29.006637-29.007661l639.424134 0c15.954367 0 29.007661 13.053294 29.007661 29.007661l0 639.423111c0 15.954367-13.053294 29.007661-29.007661 29.007661L192.287933 862.398462z",
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

// class EndNodeModel extends CircleNodeModel {
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
//   getNodeStyle() {
//     const style = super.getNodeStyle();
//     style.stroke = "#000";
//     style.strokeWidth = 2;
//     return style;
//   }
// }

import BaseNode from "./baseNode"
class EndNodeView extends BaseNode.view {

}

class EndNodeModel extends BaseNode.model {
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
  type: "endNode",
  model: EndNodeModel,
  view: EndNodeView
};
