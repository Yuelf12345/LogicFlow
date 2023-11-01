import BaseNode from "./baseNode.ts"
class CustomRectNodeView extends BaseNode.view {

}

class CustomRectModel extends BaseNode.model {
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
  type: "rectNode",
  view: CustomRectNodeView,
  model: CustomRectModel
};