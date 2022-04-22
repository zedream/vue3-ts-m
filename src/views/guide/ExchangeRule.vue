<script setup lang="ts">
import { app } from '../../../config/config'
</script>
<template>
  <div class="rule-wrapper">
    <div class="block">
      <div class="title">
        优惠券、满赠券等使用规则
      </div>
      <div class="content">
        <li class="li">
          优惠券、满赠券暂不可叠加使用
        </li>
        <li class="li">
          每个订单限用一张优惠券、满赠券，在下单支付环节进入卡券页面可选择使用
        </li>
        <li class="li">
          成功下单后优惠券、满赠券即视为已使用
        </li>
        <li class="li">
          可用时间、适用产品、订单金额门槛等其他使用规则详见卡券券面说明
        </li>
      </div>
    </div>
    <div class="block">
      <div class="title">
        京东兑换码规则
      </div>
      <div class="content">
        <li class="li">
          兑换成功后，金额将自动充值到可用余额账户中，可用于加油消费
        </li>
        <li class="li">
          一经兑换成功，则不支持退款
        </li>
      </div>
    </div>
  </div>
  <div class="footer">
    <div>最终解释权归云油加油所有，如有任何疑问</div>
    <div>
      <span>请拨打客服热线:</span>
      <a class="tel-link" :href="`tel:${app.tel}`">
        {{ app.tel }}
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.rule-wrapper {
  padding: 60px 30px 200px;
  .block {
    margin-bottom: 30px;
    .title {
      color: #323233;
      font-weight: 600;
      font-size: 30px;
      margin-bottom: 10px;
    }
    .content {
      color: #646566;
      font-size: 26px;
      .li {
        padding: 6px 0;
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 0 80px;
  background: #F7F8FA;
  text-align: center;
  color: #969799;
  font-size: 24px;
  line-height: 36px;
  .tel-link {
    color: #969799;
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
