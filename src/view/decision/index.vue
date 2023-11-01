<template>
  <div class="decision">
    <div class="decision-left">
      <div class="flex space-between">
        <div class="fs-17">决策列表</div>
        <el-icon @click="handlePolicyAdd" class="mr-10"><Plus /></el-icon>
      </div>
      <el-input v-model="filterText" placeholder="Filter keyword" class="source-search" />
      <el-scrollbar>
        <el-tree
          ref="treeRef"
          :data="dataSource"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
        >
          <template #default="{ node, data }">
            <span
              class="tree-title"
              @mouseenter="
                treeBtn = true;
                treeId = node.id;
              "
              @mouseleave="
                treeBtn = false;
                treeId = 0;
              "
            >
              <span>{{ node.label }}</span>
              <span v-show="treeBtn && treeId == node.id">
                <el-icon @click="append(data)"><Plus /></el-icon>
                <el-icon @click="remove(node, data)"><MoreFilled /></el-icon>
              </span>
            </span>
          </template>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="decision-right">
      <Policy />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { ElTree } from "element-plus";
import Policy from "../policy/policy.vue";
const router = useRouter();
const treeBtn = ref<boolean>(false);
const treeId = ref<number>(0);
const filterText = ref<string>("");
const dataSource = ref<any[]>([
  {
    id: 1,
    label: "目录1",
    children: [
      {
        id: 4,
        label: "文件1",
        children: [],
      },
      {
        id: 5,
        label: "文件2",
        children: [],
      },
    ],
  },
  {
    id: 2,
    label: "目录2",
    children: [],
  },
  {
    id: 3,
    label: "目录3",
    children: [],
  },
]);
const treeRef = ref<InstanceType<typeof ElTree>>();
watch(filterText, (val) => {
  treeRef.value!.filter(val);
});
const filterNode = (value: string, data: any) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handlePolicyAdd = () => {
  router.push({ path: "/policyprojectadd" });
};
</script>

<style lang="scss" scoped>
.decision {
  display: flex;
  .decision-left {
    width: 260px;
    padding: 16px 0;
    flex-shrink: 0;
    .source-search {
      padding: 14px 0 0;
      margin: 0 10px;
      width:240px;
    }
    .tree-title {
      display: flex;
      justify-content: space-between;
      width: 200px;
    }
  }
  .decision-right {
    flex: 1;
    height: 89vh;
    border-left: 1px solid #eee;
  }
}
</style>
