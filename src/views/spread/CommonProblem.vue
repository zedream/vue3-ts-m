<script setup lang="ts">
import { qaList } from '@/views/spread/constant'
</script>

<template>
  <div class="common-problem-container">
    <div v-for="(Q, index) in qaList" :key="index" class="q">
      Q：{{ Q.question }}
      <div v-for="(A, idx) in Q.answer" :key="idx" class="a">
        A：{{ A }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.common-problem-container {
  background: #FFFFFF;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  text-align: justify;
  font-size: 24px;
  overflow-y: auto;
  .q {
    color: #323233;
    font-weight: 600;
    line-height: 60px;
    .a {
      color: #969799;
      line-height: 30px;
      font-weight: 400;
    }
  }
}
</style>
