<script setup lang="ts">
const router = useRouter()

interface Props {
  data: DataListData,
  type?: 'recharge' | 'refuel' | ''
}
const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {} as DataListData
  },
  type: ''
})

const emit = defineEmits<{(e: 'onTapNav', data: { longitude: string | number, latitude: string | number, address: string }): void}>()

function handleTapStation (stationId, chinaMainland) {
  if (chinaMainland) {
    router.push({
      path: '/hongKongAndMacao',
      query: {
        stationId
      }
    })
  } else {
    router.push(`/petrolStation/${stationId}`)
  }
}

function handleTapNav (longitude, latitude, address) {
  emit('onTapNav', { longitude, latitude, address })
}
</script>

<template>
  <div class="refuel-station-item">
    <div class="left" @click="handleTapStation(props.data.stationId, props.data.chinaMainland)">
      <div class="refuel-station-name">
        <div class="ellipsis">
          {{ props.data.stationName }}
        </div>
        <div v-if="props.data.chinaMainland" class="icon">
          港澳
        </div>
        <div v-if="props.data.type === 4 && props.data.hzType === 'yhj'" class="discount-icon" />
      </div>
      <div class="refuel-station-address ellipsis">
        {{ props.data.addr }}
      </div>
      <div class="price-box">
        <div class="actual-price-box">
          <div class="price-unit">
            {{ props.data.currencyCode }}
          </div>
          <div v-if="props.data.hzType === 'yhj'" class="actual-price">
            {{ props.data.bwoilPrice }}
          </div>
          <div v-else-if="props.data.hzType === 'yhj_jy'" class="actual-price">
            {{ props.data.oilPrice }}
          </div>
          <div v-else class="actual-price">
            {{ props.data.oilPrice }}
          </div>
        </div>
        <div v-if="props.data.type === 4" class="original-price">
          {{ props.data.currencyCode }}{{ props.data.standardPrice }}
        </div>
        <div v-if="props.type === 'recharge'" class="oil-name">
          {{ props.data.oilSimpleName }}
        </div>
      </div>
      <div v-if="!props.data.chinaMainland" class="discount-tip">
        {{ props.data.type === 4 ? `${props.data.coorpCashBackText}` : `${props.data.refuelRebateText}${props.data.rebateScaleText}` }}
      </div>
    </div>
    <div class="right" @click="handleTapNav(props.data.longitude, props.data.latitude, props.data.addr)">
      <div class="navigation-box">
        <div class="navigation" />
        <div class="distance">
          {{ props.data.distance }}
        </div>
      </div>
      <div class="right-refuel" @click.stop="handleTapStation(props.data.stationId, props.data.chinaMainland)">
        <span class="button">
          立即加油
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.refuel-station-item {
  margin-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  &:last-of-type {
    margin-bottom: 0;
  }
  .left {
    flex: 1;
    overflow: hidden;
    .refuel-station-name {
      font-size: 30px;
      color: #292929;
      line-height: 42px;
      font-weight: 600;
      display: flex;
      align-items: center;
      .icon {
        font-size: 40px;
        color: #FFFFFF;
        line-height: 40px;
        padding: 12px 16px;
        text-align: center;
        background: #427CFF;
        border-radius: 8px;
        margin-left: -8px;
        flex-shrink: 0;
        transform: scale(0.5);
      }
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
    .refuel-station-address {
      font-size: 24px;
      color: #999999;
      line-height: 36px;
    }
    .price-box {
      display: flex;
      align-items: center;
      margin: 6px 0;
      .actual-price-box {
        display: flex;
        align-items: center;
        line-height: 48px;
        .price-unit {
          font-size: 24px;
          color: #292929;
          font-weight: 600;
        }
        .actual-price {
          font-size: 34px;
          color: #292929;
          font-weight: 600;
        }
      }
      .original-price {
        margin-left: 20px;
        font-size: 22px;
        color: #666666;
        line-height: 24px;
        text-decoration: line-through;
      }
      .oil-name {
        font-size: 24px;
        color: #333333;
        text-align: center;
        line-height: 36px;
        padding: 0 10px;
        background: #EEEEEE;
        border-radius: 4px;
        margin-left: 24px;
      }
    }
    .discount-tip {
      display: inline-block;
      padding: 4px 10px;
      background: #FCF5ED;
      border-radius: 4px;
      font-size: 20px;
      color: #F68300;
      box-sizing: border-box;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    .navigation-box {
      //display: flex;
      //align-items: center;
    }
    .navigation {
      width: 42px;
      height: 42px;
      background-image: url("~img/refuel/nav.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
      display: inline-block;
      vertical-align: middle;
    }
    .distance {
      font-size: 22px;
      color: #9B9B9B;
      display: inline-block;
      vertical-align: baseline;
    }
    .distance-icon {
      width: 40px;
      height: 40px;
      background-image: url("~img/refuel/distance.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center center;
    }
    .right-refuel {
      position: relative;
      width: 120px;
      height: 44px;
      background: linear-gradient(144deg, #148CFD 0%, #35A6EA 100%);
      border-radius: 6px;
      color: #FFFFFF;
      text-align: center;
      margin-top: 36px;
      line-height: 44px;
      letter-spacing: 1px;
      box-shadow: 0 4px 18px 0 rgba(110, 167, 255, 0.5);
      .button {
        font-size: 44px;
        transform: scale(0.5);
        position: absolute;
        display: inline-block;
        width: 200%;
        left: -50%;
      }
    }
  }
}
</style>
