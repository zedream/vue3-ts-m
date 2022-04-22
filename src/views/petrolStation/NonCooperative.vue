<script setup lang="ts">
import { zeroFill, platform } from '@/utils/utils'
import { useAppPay } from '@/hooks'

interface Props {
  data: PetrolStationDetailData
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as PetrolStationDetailData
  }
})

const {
  showTip,
  canDo,
  payment,
  mpPath,
  memberInfo,
  handleToPay,
  handlePaymentChange
} = useAppPay(props.data.stationName)

const cardNo = computed(() => {
  return memberInfo?.bankInfo?.thirdCardNo.slice(memberInfo?.bankInfo?.thirdCardNo.length - 4)
})

onMounted(() => {
  document.addEventListener('WeixinOpenTagsError', function (e) {
    console.log('WeixinOpenTagsError: ', e) // 无法使用开放标签的错误原因，需回退兼容。仅无法使用开放标签，JS-SDK其他功能不受影响
  })
})

function handleErrorFn (e) {
  console.log('wx-open-tag fail', e.detail)
}

function handleLaunchFn () {
  console.log('wx-open-tag success')
}
</script>

<template>
  <div class="petrol-station-body">
    <div class="block">
      <div class="petrol-station-info-wrapper">
        <div class="petrol-station-info">
          <div class="left">
            <div class="name ellipsis">
              {{ data.stationName }}
            </div>
            <div class="address ellipsis">
              {{ data.addr }}
            </div>
          </div>
          <div class="right">
            <div class="distance-icon" />
            <div class="distance">
              {{ data.distance }}
            </div>
          </div>
        </div>
        <div class="line" />
        <div class="discount-info">
          <div class="discount-icon" />
          <div class="discount-tip">
            加油使用指定银行卡在油站支付，根据会员等级享
            <span class="rate">
              {{ data.maxRebateRate }}
            </span>
            立返，未获立返可拨打客服电话400-666-8666
          </div>
        </div>
      </div>
      <div class="exempt-tip-wrapper">
        <div class="title">
          说明：
        </div>
        <div class="content">
          油站位置信息取自第三方地图信息平台，平台与该油站并无业务合作关系，加油款项直接支付至油站账户，平台根据用户银行消费记录进行返现。
        </div>
      </div>
    </div>
    <div class="payment-wrapper">
      <PaymentSelect @on-change="handlePaymentChange" />
    </div>
  </div>
  <div class="bottom-button block">
    <div
      v-if="!platform.WeChat() || payment !== 'wechat'"
      class="common-button"
      :class="{ 'button-disabled': !payment || !canDo }"
      @click="handleToPay(event, data.stationId, data.stationName, data.type)">
      下一步
    </div>
    <div v-show="platform.WeChat() && payment === 'wechat'" class="wx-footer-btn-box" @click="handleToPay">
      <wx-open-launch-weapp
        id="launch-btn"
        username="gh_9aa0f574d809"
        :path="mpPath"
        @click.stop="handleToPay(event, data.stationId, data.stationName, data.type)"
        @error="handleErrorFn"
        @launch="handleLaunchFn">
        下一步
        <component :is="'script'" type="text/wxtag-template">
          <button class="test-btn">
            下一步
          </button>
          <component :is="'style'">
            .test-btn{
            width: 345px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            font-size: 18px;
            box-shadow: 0 2px 8px 0 rgba(31,34,58,0.19);
            text-align: center;
            border-radius: 5px;
            border: none;
            }
          </component>
        </component>
      </wx-open-launch-weapp>
    </div>
  </div>
  <van-popup
    v-model:show="showTip"
    round
    position="bottom"
    :close-on-popstate="true">
    <div class="tip-wrapper">
      <div class="font-1">
        如若不支持自动跳转，请手动打开
      </div>
      <div class="font-2">
        选择
        <span class="font-3">
          加油省钱卡({{ memberInfo.bankInfo?.bankName + cardNo }})
        </span>
        支付
      </div>
      <div class="font-4">
        即可享受加油立返
      </div>
      <div class="tip-image-box">
        <div class="tip-image" :class="payment" />
        <div class="font-5">
          省钱卡：
          <span class="font-6">
            ￥{{ zeroFill(memberInfo.bankAmount) }}
          </span>
        </div>
        <div class="to-recharge-btn" @click="$router.push('/')">
          去充值
        </div>
      </div>
      <div class="i-know" @click="showTip = false">
        我知道了
      </div>
    </div>
  </van-popup>
</template>

<style scoped lang="scss">
$top: -70px;
.block {
  background: #FFFFFF;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
.bottom-button {
  background: #F7F8FA;
}
.petrol-station-body {
  padding-bottom: 150px;
  .petrol-station-info-wrapper {
    background: #FFFFFF;
    box-shadow: 0 6px 14px 0 rgba(136, 139, 141, 0.1);
    border-radius: 10px;
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    position: relative;
    top: $top;
    .petrol-station-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        overflow: hidden;
        .name {
          font-weight: 600;
          font-size: 34px;
          color: #292929;
          line-height: 45px;
        }
        .address {
          font-size: 24px;
          color: #4A4A4A;
          line-height: 36px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 20px;
        .distance-icon {
          width: 34px;
          height: 34px;
          background-image: url("~img/refuel/distance.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        }
        .distance {
          font-size: 22px;
          color: #9B9B9B;
          margin-top: 10px;
        }
      }
    }
    .line {
      width: 100%;
      height: 0;
      border-bottom: 1px dashed #EBEDF0;
      margin: 20px 0;
    }
    .discount-info {
      display: flex;
      align-items: flex-start;
      line-height: 30px;
      .discount-icon {
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        background-image: url("~img/refuel/rebate.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        margin-right: 15px;
      }
      .discount-tip {
        font-size: 22px;
        color: #999999;
        text-align: justify;
        .rate {
          color: #F68300;
        }
      }
    }
  }
  .exempt-tip-wrapper {
    margin-top: $top;
    font-size: 22px;
    color: #C0C0C0;
    display: flex;
    align-items: baseline;
    text-align: justify;
    padding: 20px 30px;
    .title {
      flex-shrink: 0;
    }
  }
  .payment-wrapper {
    margin-top: 20px;
  }
}
.petrol-station-bottom {
  width: 100%;
  height: 150px;
  background: #F7F8FA;
  position: fixed;
  bottom: 0;
  left: 0;
}
.tip-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  .tip-image-box {
    position: relative;
    background: #F7F7F7;
    padding: 30px 40px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .tip-image {
      width: 360px;
      height: 290px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    .ali {
      background-image: url("~img/refuel/ali-pay-tip.png");
    }
    .wechat {
      background-image: url("~img/refuel/wechat-pay-tip.png");
    }
  }
  .i-know {
    height: 180px;
    color: #4A90E2;
    font-size: 30px;
    line-height: 180px;
    width: 100%;
    text-align: center;
  }
  .font-1 {
    font-size: 26px;
    color: #4a4a4a;
    padding: 30px;
  }
  .font-2 {
    font-weight: 500;
    font-size: 34px;
    color: #999999;
    line-height: 45px;
    margin-bottom: 10px;
  }
  .font-3 {
    font-weight: 500;
    font-size: 34px;
    color: #4A90E2;
    line-height: 45px;
  }
  .font-4 {
    font-size: 28px;
    color: #292929;
    line-height: 36px;
    margin-bottom: 30px;
  }
  .font-5 {
    font-size: 24px;
    color: #4A4A4A;
    line-height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
  }
  .font-6 {
    font-weight: 600;
    font-size: 34px;
    color: #292929;
    line-height: 36px;
  }
  .to-recharge-btn {
    font-size: 24px;
    color: #4A90E2;
    text-decoration: underline;
    position: absolute;
    right: 20px;
    bottom: 20px;
    padding: 10px 20px;
  }
}
.wx-footer-btn-box {
  width: 100%;
  height: 90px;
  position: relative;
  #launch-btn {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
    height: 90px;
    line-height: 90px;
    text-align: center;
    flex-shrink: 0;
    color: #FFFFFF;
    font-size: 32px;
    //background: linear-gradient(180deg, #148cfd 0%, #31b4e3 100%);
    background: linear-gradient(132deg, #148CFD 0%, #4FBBDA 100%);
    box-shadow: 0 2px 8px 0 rgba(31, 34, 58, 0.19);
    border-radius: 8px;
  }
}
</style>
