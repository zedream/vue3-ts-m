<template>
  <div class="payment-prompt">
    <div class="content">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.payment-prompt {
  padding: 20px 0 20px 30px;
  width: max-content;
  .content {
    background: #FF8700;
    font-size: 22px;
    color: #FFFFFF;
    line-height: 30px;
    padding: 10px 20px;
    border-radius: 25px;
    position: relative;
    width: max-content;
    &:before {
      content: "";
      display: inline-block;
      position: absolute;
      width: 0;
      height: 0;
      border-color: #FF8700 transparent transparent transparent;
      border-style: solid;
      border-width: 16px;
      bottom: -30px;
      left: 32px;
    }
  }
}
</style>
