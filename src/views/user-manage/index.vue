<template>
  <div class="">
    <el-card style="margin-bottom: 20px">
      <el-button @click="onImportExcelClick">{{ $t('msg.excel.importExcel') }}</el-button>
      <el-button>{{ $t('msg.excel.exportExcel') }}</el-button>
    </el-card>
    <el-card>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column :label="$t('msg.excel.name')" prop="username"></el-table-column>
        <el-table-column :label="$t('msg.excel.mobile')" prop="mobile"></el-table-column>
        <el-table-column :label="$t('msg.excel.avatar')" prop="avatar" width="160">
          <template v-slot="{ row }">
            <el-avatar :size="80" :src="row.avatar"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.role')" prop="phone" width="200">
          <template v-slot="{ row }">
            <el-tag
            style="margin-right: 10px; margin-bottom: 5px"
            type="success"
            v-for="item in row.role"
            :key="item.id">
            {{ item.title }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.openTime')" prop="openTime">
          <template #default="{ row }">
           {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('msg.excel.action')" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="mini">{{ $t('msg.excel.show') }}</el-button>
            <el-button type="primary" size="mini" @click="handleRoleClick(row)">{{ $t('msg.excel.showRole') }}</el-button>
            <el-button type="danger" size="mini">{{ $t('msg.excel.remove') }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <setting-role v-model="visible" :userId="userId" @updateRole="getList" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getUserManageList } from '@/api/user-manage'
import { useRouter } from 'vue-router'
import SettingRole from './components/SettingRole.vue'

const router = useRouter()

const listQuery = ref({
  page: 1,
  size: 10
})
const tableData = ref([])

const visible = ref(false)

watch(visible, val => {
  if (!val) userId.value = ''
})

const userId = ref(null)

const getList = async () => {
  const { list } = await getUserManageList(listQuery.value)
  console.log(list)
  tableData.value = list
}
getList()

/**
 * excel 导入点击事件
 */
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * 为用户分配角色
 */
const handleRoleClick = rowData => {
  console.log(rowData)
  userId.value = rowData._id
  visible.value = true
}
</script>

<style lang="scss" scoped>
::v-deep .el-card__body {
  text-align: right;
}
</style>
