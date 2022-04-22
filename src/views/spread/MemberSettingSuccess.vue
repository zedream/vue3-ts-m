<script setup lang="ts">
</script>

<template>
  <div class="detached-container">
    <div class="success-icon" />
    <div class="success-text">
      佣金设置已完成
    </div>
    <div class="success-text">
      车主已升级为您的队长
    </div>
    <div class="bottom-button">
      <div class="common-button" @click="$router.go(-3)">
        完成
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.detached-container {
  .success-icon {
    width: 128px;
    height: 128px;
    background-image: url("~img/spread/set-commissions-success.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin: 150px auto 20px;
  }
  .success-text {
    font-size: 32px;
    color: #2A86FF;
    text-align: center;
    font-weight: 600;
    line-height: 50px;
  }
}
</style>
