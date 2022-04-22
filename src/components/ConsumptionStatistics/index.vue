<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { store } from '@/store'

interface Props {
  memberLevel: MemberLevel
  totalAmount: string
  memberAmount: string
  saveAmount: string
}
const props = withDefaults(defineProps<Props>(), {
  memberLevel: '',
  totalAmount: '0.00',
  memberAmount: '0.00',
  saveAmount: '0.00'
})

const { proxy } = getCurrentInstance()
const router = useRouter()

const showMoney = computed(() => store.state.common.showMoney)

function handleToMember () {
  router.push('/member')
}
</script>

<template>
  <div class="consumption-wrapper">
    <div class="member-level-box level-bg" :class="props.memberLevel" @click="handleToMember" />
    <div class="consumption-amount">
      <div>
        <div class="consumption-value">
          <div v-if="showMoney">
            {{ props.totalAmount }}
          </div>
          <div v-else>
            ****
          </div>
        </div>
        <div class="consumption-label">
          累计消费(元)
        </div>
      </div>
      <div>
        <div class="consumption-value">
          <div v-if="showMoney">
            {{ props.memberAmount }}
          </div>
          <div v-else>
            ****
          </div>
        </div>
        <div class="consumption-label">
          会员消费(元)
        </div>
      </div>
      <div>
        <div class="consumption-value">
          <div v-if="showMoney">
            {{ props.saveAmount }}
          </div>
          <div v-else>
            ****
          </div>
        </div>
        <div class="consumption-label">
          累计节省(元)
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.consumption-wrapper {
  position: relative;
  margin-top: -180px;
  background: #FFFFFF;
  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  overflow: hidden;
  .member-level-box {
    width: 100%;
    height: 63px;
    background: #F7F8FA;
  }
  .level-bg {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
  .normal {
    background-image: url("~img/mine/normal.png");
  }
  .silver {
    background-image: url("~img/mine/silver.png");
  }
  .gold {
    background-image: url("~img/mine/gold.png");
  }
  .platinum {
    background-image: url("~img/mine/platinum.png");
  }
  .diamond {
    background-image: url("~img/mine/diamond.png");
  }
  .consumption-amount {
    padding: 40px 40px 30px;
    height: 145px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .consumption-value {
      font-size: 34px;
      color: #292929;
      font-weight: 600;
      line-height: 40px;
      height: 40px;
    }
    .consumption-label {
      font-size: 22px;
      color: #4A4A4A;
      line-height: 26px;
      margin-top: 8px;
    }
  }
}
</style>
