<template>
  <el-dialog
  :title="$t('msg.excel.roleDialogTitle')"
  :model-value="modelValue"
  @close="close"
  width="50%">
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close" size="mini">{{ $t('msg.excel.close') }}</el-button>
        <el-button
        type="primary"
        size="mini"
        @click="handleClick"
        >
        {{ $t('msg.role.buttonTxt') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { userRoles, updateRole } from '@/api/user-manage'
import { roleList } from '@/api/role'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

watch(
  () => props.userId,
  val => {
    if (val) getUserRoles()
  }
)
/**
 * 所有的角色数组
 */
const allRoleList = ref([])

/**
 * 用户选中的角色数组
 */
const userRoleTitleList = ref([])

/**
 * 获取用户对应角色信息
 */
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map(v => v.title)
}

const getListData = async () => {
  allRoleList.value = await roleList()
}

getListData()

const emits = defineEmits(['update:modelValue'])

const close = () => {
  emits('update:modelValue', false)
}
const handleClick = async () => {
  const roles = userRoleTitleList.value.map(v => {
    return allRoleList.value.find(item => item.title === v)
  })

  await updateRole(props.userId, roles)
  ElMessage.success({
    type: 'success',
    message: `${i18n.t('msg.role.updateRoleSuccess')}`
  })

  close()

  emits('updateRole')
}
</script>

<style lang="scss" scoped>

</style>
