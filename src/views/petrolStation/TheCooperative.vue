<script setup lang="ts">
import { GetQuickAmount, GetAmountDiscountInfo, GenerateRefuelOrder } from '@/api/refuel'
import { useMemberInfo } from '@/hooks'
import { AmountValid } from '@/utils/validate'
import { store } from '@/store'
import router from '@/router'

interface Props {
  data: PetrolStationDetailData
  oils: PetrolStationOilsData[]
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as PetrolStationDetailData
  },
  oils: () => {
    return []
  }
})

const { proxy } = getCurrentInstance()

const oilGunMap = {}

const oilId = ref(props.oils[0]?.oilId)
const priceA = ref('0.00')
const priceB = ref('0.00')
const priceC = ref('0.00')
const oilGun = ref('')
const quickAmount = ref('')
const availableAmount = ref('')
const refuelAmount = ref('')
const payAmount = ref('0.00')
const discountAmount = ref('')
const oilLiter = ref('')
const quickList = ref<QuickAmountData[]>([])

const oilName = computed(() => {
  return props.oils?.find(_ => _.oilId === oilId.value)?.oilName
})
/**
 * @description computed用出了watch的感觉....
 * 不知道有没有啥问题- -
 * 因为oilGuns和油价最上面的油价都是根据油号变化的，所以就写在一起吧
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022-3-2 下午 11:39
 */
const oilGuns = computed(() => {
  if (oilGunMap[oilId.value]) {
    priceA.value = props.data.hzType === 'yhj' ? oilGunMap[oilId.value].bwoilPrice : oilGunMap[oilId.value].discountPrice
    priceB.value = oilGunMap[oilId.value].oilPrice
    priceC.value = oilGunMap[oilId.value].standradPrice
    return oilGunMap[oilId.value].gunList
  }
  const oilData = props.oils?.find(_ => _.oilId === oilId.value) || {} as PetrolStationOilsData
  priceA.value = props.data.hzType === 'yhj' ? oilData.bwoilPrice || '0.00' : oilData.discountPrice || '0.00'
  priceB.value = oilData.oilPrice || '0.00'
  priceC.value = oilData.standradPrice || '0.00'
  if (oilData.oilId) {
    oilGunMap[oilId.value] = oilData
  }
  return oilData.gunList || []
})

getQuickAmount()

useMemberInfo().then(result => {
  availableAmount.value = result.availableAmount
})

const handleChangeOilName = debounce(function (id) {
  if (oilId.value !== id) {
    oilId.value = id
    oilGun.value = ''
    refuelAmount.value = ''
    payAmount.value = '0.00'
    quickAmount.value = ''
    oilLiter.value = ''
    discountAmount.value = ''
    getQuickAmount()
  }
}, 300, { leading: true })

const onRefuelAmountInput = debounce(function (e) {
  // if (!/\.0\d{1}/.test(e.target.value) && !/\d0\d{1}/.test(e.target.value) && /0\d{1}/.test(e.target.value)) {
  //   e.target.value = e.target.value.replace(/0/, '')
  // }
  if (!e.target.value) {
    e.target.value = ''
    refuelAmount.value = ''
    getAmountDiscountInfo()
  } else {
    if (AmountValid(e.target.value)) {
      refuelAmount.value = e.target.value
      getAmountDiscountInfo()
    } else {
      e.target.value = refuelAmount.value
    }
  }
}, 80, { leading: true })

function getQuickAmount () {
  GetQuickAmount({
    stationId: props.data.stationId,
    oilId: oilId.value
  }).then(data => {
    quickList.value = data
  })
}

function getAmountDiscountInfo () {
  if (props.data.hzType === 'yhj') {
    GetAmountDiscountInfo({
      stationId: props.data.stationId,
      oilId: oilId.value,
      orderAmount: refuelAmount.value || 0
    }).then(data => {
      oilLiter.value = data.literNumber
      discountAmount.value = data.discountAmount
      payAmount.value = data.payAmount
    })
  } else {
    payAmount.value = refuelAmount.value
  }
}

function handleChangeOilGun (gun) {
  oilGun.value = gun
}

function handleChangeQuickAmount (quickAmountItem: QuickAmountData) {
  quickAmount.value = quickAmountItem.orderAmount
  oilLiter.value = quickAmountItem.literNumber
  discountAmount.value = quickAmountItem.discountAmount
  payAmount.value = quickAmountItem.payAmount
  refuelAmount.value = quickAmountItem.orderAmount
}

function handleToCashier () {
  generateRefuelOrder().then(orderNo => {
    router.push({
      path: '/refuelCashier',
      query: {
        orderNo
      }
    })
  })
}

function generateRefuelOrder () {
  return new Promise(resolve => {
    proxy.$toast.loading({
      forbidClick: true,
      duration: 0
    })
    GenerateRefuelOrder({
      lng: store.state.common.longitude,
      lat: store.state.common.latitude,
      stationId: props.data.stationId,
      literNum: oilLiter.value, // 升数
      oilId: oilId.value,
      oilName: oilName.value,
      orderAmount: refuelAmount.value,
      orderNo: '',
      orderStatus: 'dealing', // dealing-处理中 undone-未完成 done-已完成 canceled-已取消
      payAmount: payAmount.value, // 实际支付金额
      payStatus: 'un_pay', // 支付状态 un_pay-未支付 payed-已支付 canceled-已取消
      payWay: '', // 支付方式 wechat-微信 ali-支付宝 union-银联
      remark: '',
      stationName: props.data.stationName,
      stationType: props.data.type,
      hzType: props.data.hzType
    }).then(data => {
      resolve(data.orderNo)
    }).catch(error => {
      proxy.$notify({ type: 'danger', message: '创建订单失败' })
      console.error('创建订单失败： ', error)
    })
  })
}
</script>

<template>
  <div class="petrol-station-body">
    <div class="block">
      <div class="petrol-station-info-wrapper">
        <div class="petrol-station-info">
          <div class="left">
            <div class="name">
              <div class="ellipsis">
                {{ data.stationName }}
              </div>
              <div v-if="data.hzType === 'yhj'" class="discount-icon" />
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
        <div class="oil-price-info">
          <div class="oil-name">
            {{ oilName }}
          </div>
          <div class="oil-price-box">
            <div class="oil-price-label special">
              云油价
            </div>
            <div class="oil-price special">
              <span class="unit">
                ￥
              </span>
              <span class="value">
                {{ priceA }}
              </span>
            </div>
          </div>
          <div class="oil-price-box">
            <div class="oil-price-label">
              油站价
            </div>
            <div class="oil-price">
              ￥{{ priceB }}
            </div>
          </div>
          <div class="oil-price-box">
            <div class="oil-price-label">
              国标价
            </div>
            <div class="oil-price">
              ￥{{ priceC }}
            </div>
          </div>
        </div>
      </div>
      <div class="discount-info-wrapper">
        <div v-if="data.rebateRate" class="discount-info">
          <div class="discount-icon" />
          <div class="discount-tip">
            在云油特惠油站加油享
            <span class="rate">
              {{ data.rebateRate }}
            </span>
            的特惠立减
          </div>
        </div>
        <div v-if="data.maxRebateRate" class="discount-info">
          <div class="rebate-icon" />
          <div class="discount-tip">
            视您的会员等级，可享受每笔实际支付金额
            <span class="rate">
              {{ data.maxRebateRate }}
            </span>
            的立返加油金，实现加油折上折
          </div>
        </div>
      </div>
    </div>
    <div class="block mid">
      <div class="sub-block">
        <div class="sub-block-title">
          选择油号
        </div>
        <div class="tags">
          <div
            v-for="item in oils"
            :key="item.oilName"
            class="common-tag"
            :class="{ activate: oilId === item.oilId }"
            @click="handleChangeOilName(item.oilId)">
            {{ item.oilName }}
          </div>
        </div>
      </div>
      <div v-if="oilGuns.length && props.data.hzType === 'yhj'" class="sub-block">
        <div class="sub-block-title">
          选择油枪
        </div>
        <div class="tags">
          <div
            v-for="item in oilGuns"
            :key="item"
            class="common-tag"
            :class="{ activate: oilGun === item }"
            @click="handleChangeOilGun(item)">
            {{ item }}
          </div>
        </div>
      </div>
      <div class="sub-block">
        <div class="sub-block-title">
          <span>加油金额</span>
          <span class="balance">
            省钱卡：{{ availableAmount || '0.00' }}元
          </span>
        </div>
        <div class="amount-input-box">
          <div class="unit">
            ￥
          </div>
          <div class="input-box">
            <input
              :value="refuelAmount"
              class="input"
              :placeholder="`加油最低金额${data.minMoneyLimit}元`"
              type="number"
              pattern="[0-9]*"
              @input="onRefuelAmountInput">
          </div>
          <div v-if="data.hzType === 'yhj'" class="refuel-tip">
            <div v-if="oilLiter">
              约{{ oilLiter }}升
            </div>
            <div v-if="discountAmount">
              直降约{{ discountAmount }}元
            </div>
          </div>
        </div>
        <div v-if="data.hzType === 'yhj'" class="quick-amount-box">
          <div
            v-for="item in quickList"
            :key="item.orderAmount"
            class="quick-amount common-tag"
            :class="{ activate: quickAmount === item.orderAmount }"
            @click="handleChangeQuickAmount(item)">
            <div class="quick-amount-value">
              {{ item.orderAmount }}
            </div>
            <div class="quick-amount-discount">
              直降约{{ item.discountAmount }}元
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="petrol-station-bottom block">
    <div class="amount-box">
      <div class="amount-label">
        加油实付：
      </div>
      <div class="ellipsis">
        <span class="unit">
          ￥
        </span>
        <span class="amount">
          {{ payAmount }}
        </span>
      </div>
    </div>
    <div class="pay common-button" @click="handleToCashier">
      立即支付
    </div>
  </div>
</template>

<style scoped lang="scss">
$top: -70px;
.block {
  background: #FFFFFF;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
.mid {
  margin-top: 20px;
  padding-bottom: 20px;
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
          line-height: 40px;
          display: flex;
          align-items: flex-start;
          .discount-icon {
            width: 56px;
            height: 34px;
            background-image: url("~img/refuel/discounts.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            margin-left: 20px;
            flex-shrink: 0;
          }
        }
        .address {
          font-size: 24px;
          color: #4A4A4A;
          line-height: 36px;
          margin-top: 10px;
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
    .oil-price-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .oil-name {
        font-size: 38px;
        color: #292929;
        font-weight: 600;
        width: 150px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .oil-price-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .oil-price-label {
          font-size: 24px;
          color: #999999;
          line-height: 33px;
        }
        .oil-price {
          font-size: 30px;
          color: #4A4A4A;
          font-weight: 600;
          line-height: 48px;
          margin-top: 10px;
        }
        .special {
          color: #F68300;
          .unit {
            font-size: 28px;
          }
          .value {
            font-size: 42px;
          }
        }
      }
    }
  }
  .discount-info-wrapper {
    margin-top: $top;
    padding: 40px 0 20px;
    .discount-info {
      display: flex;
      align-items: flex-start;
      line-height: 30px;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
      .discount-icon {
        flex-shrink: 0;
        width: 30px;
        height: 30px;
        background-image: url("~img/refuel/discount.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        margin-right: 15px;
      }
      .rebate-icon {
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
  .sub-block {
    padding-top: 20px;
    .sub-block-title {
      font-size: 28px;
      color: #333333;
      line-height: 42px;
      font-weight: 600;
      margin-bottom: 20px;
      .balance {
        font-size: 24px;
        color: #666666;
        font-weight: 400;
        margin-left: 16px;
      }
    }
    .tags {
      display: grid;
      grid-template-columns: repeat(4, 160px);
      grid-row-gap: 20px;
      justify-content: space-between;
    }
    .common-tag {
      width: 100%;
      height: 60px;
      line-height: 60px;
      background: #FBFDFF;
      border: 1px solid #ECECEC;
      border-radius: 10px;
      text-align: center;
      font-size: 30px;
      color: #666666;
    }
    .amount-input-box {
      display: flex;
      align-items: center;
      height: 120px;
      background: #FBFDFF;
      border: 1px solid #BCDDFF;
      border-radius: 10px;
      padding: 0 20px;
      margin-bottom: 20px;
      .unit {
        font-size: 40px;
        color: #292929;
        line-height: 120px;
        font-weight: 600;
        text-align: center;
        flex-shrink: 0;
        margin-right: 20px;
      }
      .input-box {
        height: 100%;
        flex: 1;
        .input {
          width: 100%;
          background: #FBFDFF;
          height: 100%;
          font-size: 40px;
          color: #292929;
          font-weight: 600;
          &::placeholder {
            font-size: 40px;
            color: #B0B0B0;
            font-weight: 400;
          }
        }
      }
      .refuel-tip {
        text-align: right;
        font-size: 22px;
        color: #999999;
        white-space: nowrap;
        flex-shrink: 0;
        margin-left: 20px;
      }
    }
    .quick-amount-box {
      display: grid;
      grid-template-columns: repeat(3, 220px);
      justify-content: space-between;
      .quick-amount {
        width: 100%;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .quick-amount-value {
          line-height: 44px;
          font-size: 40px;
          color: #292929;
          font-weight: 600;
        }
        .quick-amount-discount {
          font-size: 22px;
          color: #F68300;
          line-height: 44px;
        }
      }
    }
    .activate {
      background: #F2F8FF;
      border: 1px solid #4A90E2;
      color: #4A90E2;
      .quick-amount-value {
        color: #4A90E2!important;
      }
    }
  }
}
.petrol-station-bottom {
  width: 100%;
  height: 150px;
  background: #FFFFFF;
  box-shadow: 0 -4px 7px 0 rgba(0, 0, 0, 0.04);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .amount-box {
    font-weight: 600;
    display: flex;
    align-items: center;
    .amount-label {
      font-size: 30px;
      color: #292929;
      flex-shrink: 0;
    }
    .unit {
      font-size: 24px;
      color: #D21F1C;
    }
    .amount {
      font-size: 48px;
      color: #D21F1C;
    }
  }
  .pay {
    width: 270px;
  }
}
</style>
