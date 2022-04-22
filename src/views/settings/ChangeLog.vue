<script setup lang="ts">
import { version } from '../../../config/config'
const feature = process.env.changeLog as unknown as string[]
const historyChangeLog = process.env.historyChangeLog as unknown as []

const versions = Object.keys(historyChangeLog)
const changelogs = Object.values(historyChangeLog)

const activeName = ref(version)
</script>

<template>
  <van-collapse v-model="activeName" accordion>
    <van-collapse-item :title="version" :name="version">
      <div v-for="(item, index) in feature" :key="index">
        {{ item }}
      </div>
    </van-collapse-item>
    <template v-for="(ver, index) in versions" :key="ver">
      <van-collapse-item :title="ver" :name="ver">
        <div v-for="(item, idx) in changelogs[index]" :key="idx">
          {{ item }}
        </div>
      </van-collapse-item>
    </template>
  </van-collapse>
</template>

<style scoped lang="scss">

</style>
