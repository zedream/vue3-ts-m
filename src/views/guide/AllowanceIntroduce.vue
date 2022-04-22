<script setup lang="ts">
import { app } from '../../../config/config'
</script>

<template>
  <div class="allowance-intro-container">
    <div class="allowance-intro-header">
      <div class="title" />
      <div class="piece-1" />
      <div class="piece-2" />
    </div>
    <div class="allowance-intro-body">
      <div class="step-wrapper">
        <div class="step-header">
          <div class="text">
            步骤①：获取加油补贴
          </div>
        </div>
        <div class="step-body">
          <div class="step-1-pic" />
          <div class="step-1-content content">
            参加各种福利活动可获取加油补贴。
          </div>
        </div>
      </div>
      <div class="step-wrapper">
        <div class="step-header">
          <div class="text">
            步骤②：解锁加油补贴
          </div>
        </div>
        <div class="step-body">
          <div class="step-2-pic-1" />
          <div class="content">
            <div>
              参加各种福利活动可获取加油补贴。
            </div>
            <div class="step-2-pic-2" />
          </div>
        </div>
      </div>
      <div class="step-wrapper">
        <div class="step-header">
          <div class="text">
            步骤③：领取加油补贴
          </div>
        </div>
        <div class="step-body-column">
          <div class="content">
            加油补贴成为可领取状态，点击领取，加油补贴奖励将自动转入省钱卡余额中，同时成为已领取状态。余额可提现可消费。
          </div>
          <div class="pic-box">
            <div class="step-3-pic-1" />
            <div class="step-3-pic-2" />
          </div>
        </div>
      </div>
      <div class="extra-desc">
        <div class="extra-desc-title">
          补充说明
        </div>
        <div class="extra-desc-content">
          1.如果超出加油补贴的有效期，仍未完成领取，则加油补贴自动失效不可使用，成为已过期状态。
        </div>
        <div class="extra-desc-content">
          2.加油时如未使用省钱加油卡支付，则无法解锁加油补贴。
        </div>
        <div class="extra-desc-content">
          3.如领取补贴后未获得奖励，可能因为银行侧返回交易记录有延迟或者银行内部活动，导致我们无法及时得到银联交易信息，可联系在线客服
          <a class="tel-link" :href="`tel:${app.tel}`">
            {{ app.tel }}
          </a>
          提供帮助。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.allowance-intro-container {
  padding-bottom: 60px;
  background: #FDC17A;
  .allowance-intro-header {
    height: 210px;
    background: #FE821A;
    overflow: hidden;
    position: relative;
    .title {
      width: 597px;
      height: 58px;
      background-image: url("~img/allowance/title.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin: 48px auto 0;
    }
    .piece-1 {
      position: absolute;
      left: 0;
      top: 10px;
      width: 75px;
      height: 88px;
      background-image: url("~img/allowance/piece-1.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .piece-2 {
      position: absolute;
      width: 109px;
      height: 88px;
      bottom: 18px;
      right: 0;
      background-image: url("~img/allowance/piece-2.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      z-index: 2;
    }
  }
  .allowance-intro-body {
    padding: 0 30px;
    z-index: 1;
    position: relative;
  }
}
.step-wrapper {
  background: #FFFFFF;
  box-shadow: 0 2px 29px 0 rgba(244, 163, 104, 1);
  border-radius: 40px;
  padding: 0 15px;
  margin-top: 30px;
  &:first-child {
    margin-top: -65px;
  }
  .step-header {
    font-size: 32px;
    color: #000000;
    font-weight: 800;
    line-height: 120px;
    text-align: center;
    position: relative;
    &:after {
      position: absolute;
      display: inline-block;
      content: "";
      width: 330px;
      height: 20px;
      background: #FF6600;
      left: 50%;
      margin-left: -165px;
      bottom: 36px;
    }
    .text {
      z-index: 1;
      position: relative;
    }
  }
  .step-body {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .step-body-column {
    margin-top: 22.5px;
    padding-bottom: 45px;
    .pic-box {
      display: flex;
      align-items: center;
    }
  }
  .content {
    font-size: 28px;
    color: #333333;
    font-weight: 600;
    text-align: justify;
  }
  .step-1-pic {
    width: 354px;
    height: 747px;
    background-image: url("~img/allowance/pic-1.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .step-2-pic-1 {
    width: 314px;
    height: 631px;
    background-image: url("~img/allowance/pic-2.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .step-2-pic-2 {
    width: 372px;
    height: 116px;
    background-image: url("~img/allowance/pic-3.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-top: 36px;
  }
  .step-3-pic-1 {
    width: 370px;
    height: 116px;
    background-image: url("~img/allowance/pic-3.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-top: 36px;
  }
  .step-3-pic-2 {
    width: 290px;
    height: 116px;
    background-image: url("~img/allowance/pic-4.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    margin-top: 36px;
  }
}
.extra-desc {
  .extra-desc-title {
    font-size: 32px;
    color: #A34200;
    font-weight: 600;
    text-align: center;
    margin: 40px 0 12px;
  }
  .extra-desc-content {
    font-size: 26px;
    color: #A34200;
    margin-bottom: 40px;
    padding: 0 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .tel-link {
      color: #4A90E2;
    }
  }
}
</style>
