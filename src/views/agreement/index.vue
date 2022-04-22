<script setup lang="ts">
import TheService from './TheService.vue'
import ThePrivacy from './ThePrivacy.vue'
import XIBAgreement from './XIBAgreement.vue'
import XIBNotice from './XIBNotice.vue'
import UnionPayAgreement from './UnionPayAgreement'

const route = useRoute()

const component = computed(() => {
  if (route.params.type === 'license') {
    return TheService
  } else if (route.params.type === 'private') {
    return ThePrivacy
  } else if (route.params.type === 'xibAgreement') {
    return XIBAgreement
  } else if (route.params.type === 'xibNotice') {
    return XIBNotice
  } else if (route.params.type === 'unionPay') {
    return UnionPayAgreement
  }
})
</script>

<template>
  <router-view>
    <component :is="component" class="agreement" />
  </router-view>
</template>

<style scoped lang="scss">
.agreement {
  padding: 20px;
  font-size: 28px;
}
</style>
