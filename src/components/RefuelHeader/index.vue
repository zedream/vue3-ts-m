<script setup lang="ts">
/**
 * @description 在家打包不手动引入ref就会报错！！！（ref is not defined）[○･｀Д´･ ○]
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022-3-3 上午 12:12
 */
import { ref } from 'vue'
import { store } from '@/store'
import { RefuelType, UserType } from '@/store/mutation.types'
import { useRouter } from 'vue-router'
import { platform } from '@/utils/utils'
import { useMemberInfo } from '@/hooks'
import { GetAllowanceList } from '@/api/common'

interface Props {
  oilType: OilFilterGroupData
}
const props = withDefaults(defineProps<Props>(), {
  oilType: () => {
    return {} as OilFilterGroupData
  }
})
const emit = defineEmits<
  {(e: 'onRuleChange', rule: number): void
  (e: 'onOilChange', oilId: number): void }>()

const router = useRouter()
const { proxy } = getCurrentInstance()

const enum OilTrans {
  chai = '柴油',
  qi = '汽油'
}

const show = ref(false)
const overlayTop = ref('')
const allowanceList = ref<AllowanceData[]>([])
const headerBottomRef = ref<HTMLElement | null>(null)

getAllowanceList()

function handleOpenOilType () {
  show.value = !show.value
  if (headerBottomRef.value) {
    overlayTop.value = headerBottomRef.value.clientHeight + headerBottomRef.value.offsetTop + 1 + 'px'
  }
}

function handleTapStationTab (rule) {
  store.commit(`refuel/${RefuelType.SET_RULE}`, rule)
  emit('onRuleChange', rule)
}

function handleSelectOil (oilId, oilName) {
  store.commit(`refuel/${RefuelType.SET_OIL}`, { oilId, oilName })
  emit('onOilChange', oilId)
  show.value = false
}

function handleToSearch () {
  router.push('/search')
}

function handleToNotArchive () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  useMemberInfo().then(result => {
    proxy.$toast.clear()
    let message = ''
    if (result.certified && result.activateFlag) {
      if (platform.WeChat()) {
        message = `请打开银联云闪付或微信，选择加油省钱卡(${result.bankInfo.bankName}${result.bankInfo.thirdCardNo?.slice(result.bankInfo.thirdCardNo.length - 4)})去支付`
      } else {
        message = `请打开银联云闪付、支付宝或微信，选择加油省钱卡(${result.bankInfo.bankName}${result.bankInfo.thirdCardNo?.slice(result.bankInfo.thirdCardNo.length - 4)})去支付`
      }
    } else {
      if (platform.WeChat()) {
        message = '请打开微信去支付'
      } else {
        message = '请打开支付宝或微信去支付'
      }
    }
    proxy.$dialog.alert({
      title: '支付提示',
      message: message,
      confirmButtonText: '立即支付',
      confirmButtonColor: '#389BFF',
      closeOnClickOverlay: true
    }).then(() => {
      router.push('/petrolStation/notArchive')
    })
  }).catch(error => {
    proxy.$toast.clear()
    if (error === 90000) {
      store.commit(`user/${UserType.CLEAR_AUTH}`)
      router.push('/login')
    }
  })
}

function handleQuickRefuel () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  useMemberInfo().then(result => {
    proxy.$toast.clear()
    if (result.activateFlag && result.certified) {
      if (result.bankInfo && result.bankInfo.bindInPayWay.includes('yeepay')) {
        router.push('/unionPay/pay')
      } else {
        /**
         * 一大堆条件
         * 懒得搞........
         */
        router.push('/unionPay/bindPwd')
      }
    } else {
      proxy.$dialog.confirm({
        title: '提示',
        message: '您的加油省钱卡未开通，暂无法在加油站加油。',
        confirmButtonText: '去开通',
        cancelButtonText: '关闭',
        confirmButtonColor: '#389BFF'
      }).then(() => {
        router.push('/openAccount')
      })
    }
  }).catch(error => {
    proxy.$toast.clear()
    if (error === 90000) {
      store.commit(`user/${UserType.CLEAR_AUTH}`)
      router.push('/login')
    }
  })
}

function getAllowanceList () {
  GetAllowanceList({
    statusList: '2' // 待解锁
  }).then(data => {
    allowanceList.value = data.slice(0, 2)
  })
}
</script>

<template>
  <div class="header-box bottom-line">
    <div class="search-wrapper" @click="handleToSearch">
      <div class="search-icon" />
      <div class="search-text">
        输入目的地，查找附近油站
      </div>
    </div>
    <div class="refuel-guide" @click="$router.push('/guide/refuel')">
      加油指引
    </div>
    <div class="shortcut waver">
      <img src="~img/refuel/shortcut.png" alt="云油加油" @click="handleQuickRefuel">
    </div>
  </div>
  <div ref="headerBottomRef" class="header-box">
    <div>
      <div class="oil-type-tab" @click="handleOpenOilType">
        <div class="oil-type-name">
          {{ $store.state.refuel.oilName }}
        </div>
        <div class="drop-down-icon" :class="{ 'rotate-half': show }" />
      </div>
    </div>
    <div class="center-tab flex-1">
      <div class="refuel-station-tab" :class="{ activate: $store.state.refuel.rule === 2 }" @click="handleTapStationTab(2)">
        距离最近
      </div>
    </div>
    <div>
      <div class="refuel-station-tab" :class="{ activate: $store.state.refuel.rule === 1 }" @click="handleTapStationTab(1)">
        特惠油站
      </div>
    </div>
  </div>
  <div v-if="allowanceList.length" class="allowance-wrapper">
    <div v-for="item in allowanceList" :key="item.redEnvelopeId" class="allowance">
      <div class="allowance-icon" />
      <div class="allowance-text">
        {{ `加油支付满${item.acquireConditionStr}送${item.redEnvelopeAmountStr}` }}
      </div>
    </div>
  </div>
  <van-overlay
    class-name="my-overlay"
    :show="show"
    :style="{ top: overlayTop }"
    @click="show = false">
    <div class="oil-type-wrapper" @click.stop>
      <div v-for="(item, key) in oilType" :key="key" class="oil-type-box">
        <div class="oil-type">
          {{ OilTrans[key] }}
        </div>
        <div class="oil-name-box">
          <div
            v-for="oil in item"
            :key="oil.oilId"
            class="oil-name"
            :class="{ activate: $store.state.refuel.oilId === oil.oilId }"
            @click="handleSelectOil(oil.oilId, oil.oilName)">
            {{ oil.oilName }}
          </div>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<style scoped lang="scss">
.header-box {
  height: 100px;
  background: #FFFFFF;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-of-type {
    box-shadow: 0 4px 4px 0 rgba(67, 60, 54, 0.04);
  }
  .search-wrapper {
    flex: 1;
    height: 60px;
    border: 1px solid #EBEDF0;
    border-radius: 30px;
    color: #C8C9CC;
    display: flex;
    align-items: center;
    padding: 0 15px;
    box-sizing: border-box;
    position: relative;
    z-index: 1;
    background: #F7F8FA;
    .search-icon {
      width: 30px;
      height: 30px;
      background-image: url("~img/refuel/search.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      flex-shrink: 0;
      margin-top: 1px;
      margin-right: 10px;
    }
    .search-text {
      font-size: 40px;
      width: 0;
      transform: scale(0.5);
      white-space: nowrap;
    }
  }
  .refuel-guide {
    font-size: 24px;
    color: #969799;
    margin: 0 30px 0 40px;
    position: relative;
    z-index: 1;
  }
  .unemployed {
    font-size: 24px;
    color: #B8C4D6;
    height: 100%;
    text-align: center;
    position: relative;
    z-index: 1;
    .unemployed-text {
      height: 100%;
      display: inline-flex;
      align-items: center;
    }
  }
  .shortcut {
    width: 169px;
    height: 42px;
    text-align: center;
    position: relative;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
      image-rendering: pixelated;
    }
  }
  .waver {
    background: linear-gradient(300deg, #FFFFFF 20%, #fff6be 27%, #FFFFFF 30%, #FFFFFF 50%, #fff6be 67%, #FFFFFF 73%);
    background-size: 400% 100%;
    animation: waver 1.8s ease infinite;
  }
  @keyframes waver {
    0% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0 50%;
    }
  }
  .oil-type-tab {
    border: 1px solid #148CFD;
    border-radius: 14px;
    line-height: 60px;
    text-align: center;
    width: 170px;
    height: 60px;
    color: #148CFD;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    .oil-type-name {
      font-size: 24px;
    }
    .drop-down-icon {
      width: 24px;
      height: 15px;
      background-image: url("~img/refuel/drop-down.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      margin-left: 10px;
      transition: all 0.3s ease-in-out;
    }
    .rotate-half {
      transform: rotate(180deg);
    }
  }
  .center-tab {
    text-align: center;
  }
  .refuel-station-tab {
    display: inline-block;
    border: 1px solid #CBCBCB;
    border-radius: 14px;
    font-size: 24px;
    color: #AEAEAE;
    line-height: 60px;
    text-align: center;
    width: 170px;
    height: 60px;
    box-sizing: border-box;
  }
  .activate {
    background: linear-gradient(144deg, #148CFD 0%, #35A6EA 100%);
    box-shadow: 0 9px 23px 0 rgba(110, 167, 255, 0.39);
    color: #FFFFFF;
    border: none;
  }
}
.allowance-wrapper {
  height: 52px;
  background: #FFF9F4;
  display: flex;
  align-items: center;
  padding: 0 40px;
  .allowance {
    white-space: nowrap;
    width: max-content;
    overflow: hidden;
    .allowance-icon {
      vertical-align: middle;
      display: inline-block;
      flex-shrink: 0;
      width: 36px;
      height: 36px;
      background-image: url("~img/allowance/mini-allowance.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-right: 10px;
    }
    .allowance-text {
      vertical-align: middle;
      display: inline-block;
      font-size: 40px;
      color: #F68300;
      font-weight: 600;
      line-height: 72px;
      transform: translateX(-50%) scale(0.5);
      width: 200%;
      position: relative;
      left: 50%;
    }
  }
}
.my-overlay {
  z-index: 2022;
  .oil-type-wrapper {
    padding: 30px 20px;
    background: #FFFFFF;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    .oil-type-box {
      .oil-type {
        font-size: 32px;
        font-weight: 600;
        color: #222;
      }
      .oil-name-box {
        padding: 40px 20px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 20px;
        .oil-name {
          height: 70px;
          border-radius: 80px;
          display: flex;
          font-size: 28px;
          justify-content: center;
          align-items: center;
          color: #B0B0B0;
          background-color: #f4f5f6;
        }
        .activate {
          background: linear-gradient(90deg, #148cfd 50%, #4fbbda 100%);
          color: #ffffff;
        }
      }
    }
  }
}
</style>
