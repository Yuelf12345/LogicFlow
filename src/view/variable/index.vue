<template>
  <div>
    # 名称 网点 操作
    <el-divider />
    <div></div>

    <table class="branch-table">
      <tr>
        <th>#</th>
        <th>名称</th>
        <th>网点</th>
        <th>操作</th>
      </tr>
      <tr>
        <td>1</td>
        <td>吴伟明</td>
        <td>营业部</td>
        <td>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            "
          >
            <el-icon color="#409EFF"><Search /></el-icon>
            <el-text type="primary">查看</el-text>
          </div>
        </td>
      </tr>
      <tr>
        <td>1</td>
        <td>吴伟明</td>
        <td>营业部</td>
        <td>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
            "
          >
            <el-icon color="#409EFF"><Search /></el-icon>
            <el-text type="primary">查看</el-text>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.branch-table {
  width: 100%;
  border-collapse: collapse;
  border: none;
}
.branch-table th {
  padding:20px 0;
  border-bottom: 1px solid #9e9e9e;
}
/* .branch-table tr {
  height: 50px;
  padding: 10px;
} */
.branch-table td {
  padding:10px;
  text-align: center;
}
</style>
