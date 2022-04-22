<script setup lang="ts">
import TheXIB from './TheXIB.vue'
import TheBCM from './TheBCM.vue'
import TheCITICIB from './TheCITICIB.vue'
import router from '@/router'

const route = useRoute()

const currentComponent = computed(() => {
  if (route.params.bank && typeof route.params.bank === 'string') {
    if (route.params.bank.toLocaleLowerCase() === 'xib') {
      return TheXIB
    } else if (route.params.bank === 'bcm') {
      return TheBCM
    } else if (route.params.bank === 'citic') {
      return TheCITICIB
    } else {
      router.back()
    }
  } else {
    router.back()
  }
})
</script>

<template>
  <component :is="currentComponent" />
</template>

<style scoped>

</style>
