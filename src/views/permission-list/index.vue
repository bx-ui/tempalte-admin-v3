<template>
  <div class="">
    <el-card>
      <el-table
      default-expand-all
      :data="allPermissions"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column label="权限名称" prop="permissionName"></el-table-column>
        <el-table-column label="权限标识" prop="permissionMark"></el-table-column>
        <el-table-column label="权限描述" prop="permissionDesc"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'

const allPermissions = ref([])

const getList = async () => {
  allPermissions.value = await permissionList()
}

getList()

watchSwitchLang(getList)
</script>

<style lang="scss" scoped></style>
