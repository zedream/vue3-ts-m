<script setup lang="ts">
import { GetUnionPayAgreement } from '@/api/pay'

const content = ref('')

GetUnionPayAgreement().then(data => {
  content.value = data.content
})
</script>

<template>
  <div class="content" v-html="content" />
</template>

<style scoped lang="scss">
.content {
  padding: 20px;
}
</style>
