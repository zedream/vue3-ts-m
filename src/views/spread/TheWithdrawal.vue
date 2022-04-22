<script setup lang="ts">
</script>

<template>
  <div class="withdrawal-container">
    <template v-if="false">
      <div>
        1
      </div>
    </template>
    <template v-if="true">
      <div class="no-data-icon" />
      <div class="no-data-text">
        暂无可提现业绩
      </div>
    </template>
    <div class="withdrawal-account-box">
      <div class="label">
        提现到账卡号
      </div>
      <div class="btn" @click="$router.push('/openAccount/guide')">
        马上开户
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.withdrawal-container {
  height: 100%;
  overflow-y: auto;
  .withdrawal {
    font-size: 26px;
    padding: 30px 40px;
    background: #FFFFFF;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      .left {
        color: #FF7F41;
      }
      .right {
        color: #646566;
      }
    }
    .bottom {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        color: #646566;
      }
      .right {
        font-size: 24px;
        color: #969799;
      }
    }
  }
  .no-data-icon {
    width: 145px;
    height: 144px;
    background-image: url("~img/spread/no-withdrawal.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin: 160px auto 0;
  }
  .no-data-text {
    font-size: 26px;
    color: #969799;
    text-align: center;
    margin-top: 20px;
  }
  .withdrawal-account-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px;
    margin-top: 140px;
    .label {
      font-size: 26px;
      font-weight: 600;
      color: #323233;
    }
    .btn {
      background: linear-gradient(144deg, #FEF2DD 7%, #FFD7A8 97%);
      border-radius: 28px;
      font-size: 28px;
      color: #A35E1D;
      line-height: 40px;
      padding: 8px 16px;
      font-weight: 600;
    }
  }
  .bottom-line:after {
    z-index: 1;
  }
}
</style>
