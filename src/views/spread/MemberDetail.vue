<script setup lang="ts">
import { GetSpreadMemberDetail, GetSpreadMemberContributeList } from '@/api/spread'
import router from '@/router'
import { store } from '@/store'

const route = useRoute()
const { proxy } = getCurrentInstance()

const page = ref(1)
const pageSize = ref(10)
const memberList = ref<SpreadMemberContributeListData[]>([])
const memberState = reactive<SpreadMemberDetailData>({
  contributeIncomeMonth: '0',
  contributeIncomeTotal: '0.00',
  memberType: -1,
  phone: '',
  regTime: '',
  totalNumber: 0
})

if (!store.state.spread.currentCaptainId) {
  router.go(-1)
}

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetSpreadMemberContributeList({
  page: page.value,
  pageSize: pageSize.value,
  contributorMemberId: route.params.memberId
}).then(data => {
  memberList.value = data.records
})

onMounted(() => {
  const setTitle = inject('navBarRef').value.setTitle
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  GetSpreadMemberDetail(route.params.memberId).then(data => {
    Object.assign(memberState, data)
    if (data.memberType === 2) {
      setTitle('队长详情')
    } else if (data.memberType === 3) {
      setTitle('队员详情')
    }
    proxy.$toast.clear()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    proxy.$toast.clear()
    router.back()
  })
})

function handleToMemberSetting () {
  router.push(`${route.params.memberId}/setting`)
}
</script>

<template>
  <div class="detached-container">
    <div class="member-info-wrapper">
      <div class="info-box">
        <div class="info">
          <div class="account">
            车主
            {{ memberState.phone }}
          </div>
          <div v-if="memberState.memberType === 2" class="my-captain" />
        </div>
        <div class="time">
          注册时间
          {{ memberState.regTime }}
        </div>
      </div>
      <div class="set-captain-commission-btn" @click="handleToMemberSetting" />
    </div>
    <div class="data-wrapper">
      <div class="data-box">
        <div class="data">
          {{ memberState.contributeIncomeTotal }}
        </div>
        <div class="label">
          累计有效业绩(元)
        </div>
      </div>
      <div class="data-box">
        <div class="data">
          {{ memberState.totalNumber }}
        </div>
        <div class="label">
          战队人数(人)
        </div>
      </div>
    </div>
    <div class="team-member-wrapper">
      <div
        v-for="(item, index) in memberList"
        :key="item.memberId"
        class="team-member"
        :class="{ 'bottom-line': index < memberList.length - 1 }">
        <div class="top">
          <div class="refuel-order">
            加油单号
            {{ item.fuelNo }}
          </div>
          <div class="refuel-amount">
            -
            {{ item.fuelAmount }}
          </div>
        </div>
        <div class="bottom">
          <div class="time">
            {{ item.fuelTime }}
          </div>
          <div class="amount">
            +佣金￥
            {{ item.incomeAmount }}
          </div>
        </div>
      </div>
    </div>
    <div class="all">
      已显示全部
    </div>
  </div>
</template>

<style scoped lang="scss">
.detached-container {
  .member-info-wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 0;
    .info-box {
      .info {
        display: flex;
        align-items: center;
        .account {
          font-size: 30px;
          color: #222A37;
          font-weight: 600;
        }
        .my-captain {
          margin-left: 16px;
          width: 144px;
          height: 38px;
          background-image: url("~img/spread/my-captain.png");
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 100% 100%;
        }
      }
    }
    .time {
      font-size: 22px;
      color: #787878;
      margin-top: 12px;
    }
    .set-captain-commission-btn {
      width: 260px;
      height: 66px;
      background-image: url("~img/spread/set-captain-commission.png");
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
      margin-right: -30px;
      margin-top: -10px;
    }
  }
  .data-wrapper {
    display: flex;
    align-items: center;
    margin-top: 50px;
    .data-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .data {
        font-size: 40px;
        color: #1E1E1E;
        font-weight: 600;
      }
      .label {
        font-size: 24px;
        color: #787878;
      }
    }
  }
  .team-member-wrapper {
    background: #FFFFFF;
    box-shadow: 0 2px 6px 0 rgba(54, 54, 54, 0.05);
    border-radius: 24px;
    padding: 40px 30px;
    margin-top: 60px;
    min-height: 500px;
    max-height: calc(100vh - 600px);
    overflow-y: auto;
    .team-member {
      padding: 20px 0;
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .refuel-order {
          font-size: 24px;
          color: #969799;
        }
        .refuel-amount {
          font-size: 26px;
          color: #323233;
          font-weight: 600;
        }
      }
      .bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
        .time {
          font-size: 22px;
          color: #969799;
        }
        .amount {
          font-size: 26px;
          color: #FF7F41;
          font-weight: 600;
        }
      }
    }
  }
  .all {
    font-size: 24px;
    color: #848385;
    text-align: center;
    margin-top: 100px;
  }
}
</style>
