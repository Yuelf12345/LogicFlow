import { HtmlNode, HtmlNodeModel } from '@logicflow/core'
import { createApp, h } from 'vue';
import ElementPlus from 'element-plus';
import baseNode from './baseNode.vue'
import { NODE_WIDTH, NODE_HEIGHT } from '../../../../util/constant'

class BaseNodeView extends HtmlNode {
    root: HTMLDivElement;
    baseNodeCon: any;
    app: any;
    constructor(props: any) {
        super(props)
        this.root = document.createElement('div')
        this.baseNodeCon = baseNode
        this.app = null
    }
    setHtml(rootEl: HTMLElement) {
        rootEl.appendChild(this.root)
        if (this.app) {
            this.app.unmount(this.root)
        }
        this.app = createApp({
            render: () => {
                return h(this.baseNodeCon, {
                    model: this.props.model,
                    graphModel: this.props.graphModel,
                    disabled: this.props.graphModel.editConfigModel.isSilentMode,
                    isSelected: this.props.model.isSelected,
                    isHovered: this.props.model.isHovered,
                    properties: this.props.model.getProperties(),
                })
            }
        })
        this.app.use(ElementPlus)
        this.app.mount(this.root)
    }
}


class BaseNodeModel extends HtmlNodeModel {
    setAttributes() {
        this.width = NODE_WIDTH
        this.height = NODE_HEIGHT * 2
    }
    initNodeData(data: any) {
        super.initNodeData(data);
        this.text.draggable = false; // 不允许文本被拖动
        this.text.editable = false; // 不允许文本被编辑
    }
    getEdgeStyle() {
        const edgeStyle = super.getEdgeStyle();
        edgeStyle.strokeDasharray = "4 4";
        edgeStyle.stroke = "#000";
        return edgeStyle;
      }
    getTextStyle() {
        const style = super.getTextStyle();
        style.fontSize = 14;
        style.color = "#000";
        return style;
    }
    getOutlineStyle() {
        const style: any = super.getOutlineStyle()
        style.stroke = 'none'
        style.hover.stroke = 'none'
        return style
    }
    // 指定锚点
    // getDefaultAnchor() {
    //     const { x, y, id, width } = this;
    //     const anchors = [
    //         {
    //             x: x + width / 2,
    //             y: y,
    //             id: `${id}_right`,
    //             type: "right"
    //         },
    //         {
    //             x: x - width / 2,
    //             y: y,
    //             id: `${id}_left`,
    //             type: "left"
    //         }
    //     ];
    //     return anchors;
    // }
}

export default {
    type: 'baseNode',
    model: BaseNodeModel,
    view: BaseNodeView
}