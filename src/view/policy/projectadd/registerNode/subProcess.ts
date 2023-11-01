import { GroupNode } from "@logicflow/extension";

class MyGroupView extends GroupNode.view { }

class MyGroupModel extends GroupNode.model {
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = '#AEAFAE';
    style.strokeDasharray = '3 3';
    style.strokeWidth = 1;
    return style;
  }
  getEdgeStyle() {
    const edgeStyle = super.getEdgeStyle();
    //可以自己设置线的显示样式，甚至隐藏掉原本的线，自己用react绘制
    edgeStyle.strokeDasharray = "4 4";
    edgeStyle.stroke = "#000";
    return edgeStyle;
  }
  initNodeData(data: any) {
    super.initNodeData(data);
    this.isRestrict = true;
    this.resizable = true;
    this.foldable = true;
    this.width = 500;
    this.height = 300;
    this.foldedWidth = 50;
    this.foldedHeight = 50;
    this.setProperties({
      nodeType: 'WHEN'
    });
  }
}

export default {
  type: "subProcess",
  model: MyGroupModel,
  view: MyGroupView
};
