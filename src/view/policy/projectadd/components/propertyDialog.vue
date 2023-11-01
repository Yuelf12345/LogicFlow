<template>
  <div class="property">
    <div class="property-header">
      <span>{{ nodeData.type == "polyline" ? "线段名" : "节点名称" }}</span>
      <el-input
        v-model="formData.text.value"
        class="property-input ml-10"
        @change="handleSave"
      />
    </div>
    <div class="property-body">
      <div class="var-setting">
        <div class="var-setting-header">
          <span>变量设置</span>
          <div>
            <el-button
              type="primary"
              link
              :icon="Plus"
              size="small"
              @click="basicVariable = true"
              >基础变量</el-button
            >
            <el-button type="primary" link :icon="Plus" size="small">复合变量</el-button>
            <el-button
              type="primary"
              link
              :icon="Paperclip"
              size="small"
              @click="introduceVariable = true"
              >引入变量</el-button
            >
          </div>
        </div>
        <div class="var-list-empty" v-if="varList.length == 0">
          <el-empty description="请引入变量" :image-size="60" />
        </div>
        <div class="var-list" v-else>
          <div vlass="var-list" v-for="(item, index) in varList" :key="index">
            <el-input v-model="item.varName" disabled />
          </div>
        </div>
      </div>
      <div class="expression-setting">
        <el-empty
          v-if="varList.length == 0"
          :image-size="400"
          description=" "
          image="data:image/png;base64,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"
        />
        <div v-else>
          <div v-if="props.nodeData.type == 'conditionNode'" class="expression-header">
            <span>如不满足以下条件，则拒绝</span>
          </div>
          <div v-else class="expression-header">
            <span>当关系式成立时,该节点结果为</span>
            <el-select v-model="expressionForm.result" style="width: 100px">
              <el-option label="通过" :value="true" />
              <el-option label="拒绝" :value="false" />
            </el-select>
          </div>
          <div class="expression-content">
            <el-form v-model="expressionForm">
              <el-form-item>
                <div class="expression-form-item">
                  <el-select
                    v-model="expressionForm.variable"
                    placeholder="选择变量"
                    style="width: 160px"
                  >
                    <el-option
                      v-for="item in varList"
                      :key="item.varName"
                      :label="item.varName"
                      :value="item.varName"
                    />
                  </el-select>
                  <el-select
                    v-model="expressionForm.decider"
                    placeholder="判断符"
                    style="width: 100px"
                  >
                    <el-option
                      v-for="item in deciderArr"
                      :key="item.label"
                      :value="item.value"
                    >
                      <span style="float: left">{{ item.label }}</span>
                      <span
                        style="
                          float: right;
                          color: var(--el-text-color-secondary);
                          font-size: 13px;
                        "
                        >{{ item.value }}</span
                      ></el-option
                    >
                  </el-select>
                  <el-select
                    v-model="expressionForm.matchType"
                    placeholder=""
                    style="width: 100px"
                  >
                    <el-option label="固定值" value="fixedValue" />
                    <el-option label="变量" value="variable" />
                    <el-option label="节点" value="node" />
                  </el-select>
                  <div v-if="expressionForm.matchType == 'fixedValue'">
                    <el-input
                      v-model="expressionForm.matchValue"
                      placeholder="请输入值"
                      style="width: 200px"
                    />
                  </div>
                  <div v-else-if="expressionForm.matchType == 'variable'">
                    <el-select
                      v-model="expressionForm.matchValue"
                      placeholder="请选择变量"
                      style="width: 160px"
                    >
                      <el-option
                        v-for="item in varList"
                        :key="item.varName"
                        :label="item.varName"
                        :value="item.varName"
                      />
                    </el-select>
                  </div>
                  <div v-else>
                    <el-select
                      v-model="expressionForm.matchValue"
                      placeholder="请选择节点"
                      style="width: 160px"
                    >
                      <el-option />
                    </el-select>
                  </div>
                  <el-input
                    v-model="expressionForm.remarks"
                    placeholder="备注"
                    style="width: 200px"
                  />
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <el-dialog v-model="basicVariable" title="变量设置" width="1025px">
      <div class="formula-panel-box">
        <div class="formula-panel-top">
          <el-form :model="varForm" :inline="true" class="ml-10 mt-10">
            <el-form-item label="变量名称" :required="true">
              <el-input v-model="varForm.varName" />
            </el-form-item>
            <el-form-item label="变量说明">
              <el-input v-model="varForm.varDescribe" />
            </el-form-item>
          </el-form>
          <div class="formula-panel-content">
            <el-input
              type="textarea"
              maxlength="1000"
              minlength="500"
              :autosize="{ minRows: 7 }"
            />
          </div>
        </div>
        <div class="formula-panel-bottom">
          <div class="formula-panel">
            <div class="formula-panel-title" style="width: 375px">
              <span class="ml-10">参数列表</span>
              <el-tabs>
                <el-tab-pane label="接口出参">
                  <div class="formula-panel-content">
                    <el-scrollbar height="220px">
                      <el-tree :data="interfaceData" />
                    </el-scrollbar>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="其他变量">
                  <div class="formula-panel-content">
                    <el-scrollbar height="210px">
                      <ul class="function-panel-filed-list">
                        <li
                          class="function-panel-filed-li flex between"
                          v-for="(i, j) in 100"
                          :key="j"
                        >
                          <span>{{ i }}</span>
                          <el-tag :type="j % 3 == 0 ? 'warning' : ''">{{
                            j % 3 == 0 ? "复合" : "基础"
                          }}</el-tag>
                        </li>
                      </ul>
                    </el-scrollbar>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="自定义入参">
                  <div class="formula-panel-content"></div>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="formula-panel ml-15">
            <div class="formula-panel-title">
              <span class="ml-10">函数列表</span>
              <el-collapse>
                <el-collapse-item title="基础函数-数学函数"> </el-collapse-item>
                <el-collapse-item title="基础函数-文字函数"> </el-collapse-item>
                <el-collapse-item title="基础函数-逻辑函数"> </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="formula-panel ml-15">
            <div class="formula-panel-title">
              <span class="ml-10">说明</span>
            </div>
          </div>
        </div>
        <div class="footer-button">
          <el-button type="primary" size="small" @click="handleSaveVar">确定</el-button>
          <el-button size="small" @click="basicVariable = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { ref, reactive, onMounted, watch } from "vue";
import { Plus, Paperclip } from "@element-plus/icons-vue";
import LogicFlow from "@logicflow/core";
const props = defineProps({
  lf: LogicFlow,
  nodeData: Object,
});

let basicVariable = ref<any>(false);
let introduceVariable = ref<any>(false);
// console.log("propertyDialog", props);

let formData = reactive({
  id: "",
  type: "",
  x: "",
  y: "",
  properties: {},
  text: {
    x: "",
    y: "",
    value: "",
  },
});

interface ExpressionForm {
  [key: string]: string | boolean;
}
interface VarForm {
  varName: string | number;
  varDescribe: any;
}
const expressionForm =
  props.nodeData.properties.expressionForm ||
  reactive<ExpressionForm>({
    result: true,
    variable: "",
    decider: "",
    matchType: "fixedValue",
    matchValue: "",
    remarks: "",
  });
const varForm = reactive<VarForm>({
  varName: "",
  varDescribe: "",
});
const varList = props.nodeData.properties.varList || reactive<VarForm[]>([]);
console.log("props", props);

const paramObjList = reactive<any>({});
const paramObj = reactive<any>({
  list: [],
  operator: "",
});

const deciderArr = [
  {
    label: "等于",
    value: "=",
  },
  {
    label: "不等于",
    value: "!=",
  },
  {
    label: "大于",
    value: ">",
  },
  {
    label: "大于等于",
    value: "≥",
  },
  {
    label: "小于",
    value: "<",
  },
  {
    label: "小于等于",
    value: "≤",
  },
  {
    label: "包含",
    value: "like %...%",
  },
  {
    label: "不包含",
    value: "not like",
  },
];
const interfaceData = [
  {
    label: "mysql数据库",
    children: [
      {
        label: "测试库1",
        children: [
          {
            label: "测试接口1",
          },
          {
            label: "测试接口2",
          },
        ],
      },
      {
        label: "测试库2",
        children: [
          {
            label: "测试接口1",
          },
          {
            label: "测试接口2",
          },
        ],
      },
    ],
  },
  {
    label: "api数据源",
    children: [
      {
        label: "测试数据源1",
        children: [
          {
            label: "数据源1",
          },
        ],
      },
      {
        label: "测试数据源2",
        children: [
          {
            label: "数据源1",
          },
        ],
      },
    ],
  },
];
onMounted(() => {
  const { properties, text } = props.nodeData;
  // console.log("props.nodeData", props.nodeData, props.nodeData.properties);
  if (properties) {
    props.nodeData.formData = Object.assign({}, props.nodeData.formData, properties);
  }
  if (text && text.value) {
    formData.text = text;
  }
  if (text && text.value) {
    formData.text.value = text.value;
  }
});
const handleSaveVar = () => {
  basicVariable.value = false;
  varList.push(JSON.parse(JSON.stringify(varForm)));
  console.log("varList", varList);
  varForm.varName = "";
  varForm.varDescribe = "";
};
const handleSave = () => {
  let { id } = props.nodeData;
  props.lf.setProperties(id, { ...formData });
  props.lf.updateText(id, formData.text.value);
};

watch([varList, expressionForm], () => {
  let { id } = props.nodeData;
  props.lf.setProperties(id, {
    expressionForm,
    varList,
  });

  const nodeModel = props.lf.getNodeModelById(id);
  const properties = nodeModel.getProperties();
  console.log(nodeModel);
  console.log("properties-------", properties);
});
</script>

<style lang="scss" scoped>
.property {
  height: 100%;
  display: flex;
  flex-direction: column;
  .property-header {
    height: 36px;
    border-bottom: 1px solid #dce3e8;
    color: #000;
    line-height: 36px;
    padding: 12px 8px;
    font-size: 14px;
    .property-input {
      width: 200px;
    }
  }
  .property-body {
    flex: 1;
    display: flex;
    .var-setting {
      height: 100%;
      width: 360px;
      padding: 10px;
      .var-setting-header {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
      .var-list-empty {
        height: calc(100% - 52px);
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
      }
      .var-list {
        margin: 10px 0;
        height: calc(100% - 52px);
        overflow-y: auto;
      }
      .var-item {
        position: relative;
        margin-bottom: 10px;
        margin-right: 8px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
      }
    }
    .expression-setting {
      flex: 1;
      border-left: 1px solid #dce3e8;
      .expression-header {
        padding: 5px 10px;
        font-size: 14px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        gap: 8px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        height: 30px;
        margin-bottom: 10px;
      }
      .expression-content {
        padding: 5px;
        .expression-form-item {
          display: flex;
          gap: 10px;
        }
      }
    }
  }
  .formula-panel-box {
    width: 100%;
    height: 560px;
    .formula-panel-top {
      height: 232px;
      border: 1px solid #dce3e8;
      border-radius: 10px;
    }
    .formula-panel-bottom {
      width: 100%;
      height: 280px;
      display: flex;
      margin: 20px 0;
      .formula-panel {
        // width: 375px;
        width: 100%;
        border: 1px solid #dce3e8;
        border-radius: 5px;
        ::v-deep .el-tabs__header {
          margin: 0 !important;
          padding: 0 10px !important;
        }

        .formula-panel-content {
          margin: 0;
          padding: 10px 0;
          overflow-y: auto;
          -webkit-box-flex: 1;
          .function-panel-filed-list {
            list-style-type: none;
            margin: 0;
            padding: 0;
            color: #333;
            .function-panel-filed-li {
              cursor: pointer;
              padding: 0 5px 0 22px;
              line-height: 32px;
              height: 32px;
              color: #171a1d;
              position: relative;
            }
          }
        }
      }
    }
    .footer-button {
      width: 100%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-top: 10px;
    }
  }
}
</style>
