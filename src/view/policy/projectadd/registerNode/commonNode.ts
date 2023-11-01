import base from './baseNode'

class CommonNodeView extends base.view {}

class CommonNodeModel extends base.model {
  declare properties: any
  getNodeName () {
    if (this.properties && this.properties.event && this.properties.event.keyDefine) {
      return this.properties.name + this.properties.event.keyDefine
    } 
    return this.properties.name
  }
  getNodeAbstract () {
    const title = '数据请求'
    const content = []
    if (this.properties && this.properties.ds) {
      content.push ({
        desc: this.properties.ds.name,
        type: 'common'
      })
    } 
    return {
      title,
      content,
      showButton: true
    }
  }
  getNodeLogo () {
    return this.properties && this.properties.logo
  }
  getNodeClassName () {
    return 'common'
  }
}

export default {
  type: 'commonNode',
  model: CommonNodeModel,
  view: CommonNodeView
}
