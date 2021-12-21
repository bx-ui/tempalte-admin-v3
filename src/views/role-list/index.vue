<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" style="width: 100%">
        <el-table-column type="index" label="序号" width="120"></el-table-column>
        <el-table-column label="名称" prop="title"></el-table-column>
        <el-table-column label="描述" prop="describe"></el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" size="mini" @click="handlePermissionClick(row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <setting-permission v-model="visable" :roleId="roleId" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { roleList } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import SettingPermission from './components/SettingPermission.vue'

const allRoles = ref([])

const visable = ref(false)

const getList = async () => {
  allRoles.value = await roleList()
}

getList()

const roleId = ref(null)

/**
 * 分配权限
 */
const handlePermissionClick = rowData => {
  visable.value = true
  roleId.value = rowData.id
}

watchSwitchLang(getList)
</script>

<style lang="scss" scoped></style>
