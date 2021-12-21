<template>
 <el-dialog
 :title="$t('msg.role.assignPermissions')"
 :model-value="modelValue"
 @close="close"
 width="45%">
  <el-tree
  :data="permissionsTotal"
  show-checkbox
  node-key="id"
  :props="defaultProps"
  ref="treeRef"
  check-strictly
  >
  </el-tree>
  <template #footer>
    <span class="dialog-footer">
      <el-button size="small" @click="close">{{ $t('msg.universal.cancel') }}</el-button>
      <el-button size="small" type="primary" @click="comfirm">{{ $t('msg.universal.confirm') }}</el-button>
    </span>
  </template>
 </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

const i18n = useI18n()

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})

const treeRef = ref(null)

/**
 * 监听roleId的变化
*/
watch(
  () => props.roleId,
  val => {
    if (val) getPermission()
  }
)

const permissionsTotal = ref([])
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

/**
 * 获取所有permission权限列表
 */
const getAllPermissions = async () => {
  permissionsTotal.value = await permissionList()
}
/**
 * 获取当前角色对应权限
 */
const getPermission = async () => {
  const checkedKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkedKeys)
}
getAllPermissions()

const emits = defineEmits(['update:modelValue'])

/**
 * 关闭
 */
const close = () => {
  emits('update:modelValue', false)
}

/**
 * 确定
 */
const comfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  close()
}
</script>

<style lang="scss" scoped>

</style>
