<script setup lang="ts">
import { GetAgreement } from '@/api/common'

const route = useRoute()
const { proxy } = getCurrentInstance()

const content = ref('')

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetAgreement(route.params.type).then(data => {
  content.value = data.content
  proxy.$toast.clear()
})
</script>

<template>
  <div v-html="content" />
</template>
