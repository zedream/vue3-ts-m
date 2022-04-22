<script setup lang="ts">
import { GetSpreadMemberCount, GetSpreadMemberList } from '@/api/spread'
import router from '@/router'
import { store } from '@/store'
import { SpreadType } from '@/store/mutation.types'

const { proxy } = getCurrentInstance()

const page = ref(1)
const pageSize = ref(10)
const memberList = ref<SpreadMemberListData[]>([])
const memberCountState = reactive<SpreadMemberCountData>({
  captainCount: 0,
  memberCount: 0,
  memberType: 0,
  totalCount: 0
})

proxy.$toast.loading({
  forbidClick: true,
  duration: 0
})
GetSpreadMemberCount().then(data => {
  Object.assign(memberCountState, data)
  proxy.$toast.clear()
}).catch(error => {
  proxy.$notify({ type: 'danger', message: error })
  proxy.$toast.clear()
})
getSpreadMemberList()

function handleToDetail (memberId) {
  store.commit(`spread/${SpreadType.SET_CURRENT_CAPTAIN_ID}`, memberId)
  router.push(`team/${memberId}`)
}

function getSpreadMemberList () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  GetSpreadMemberList({
    page: page.value,
    pageSize: pageSize.value
  }).then(data => {
    memberList.value = data.records
    proxy.$toast.clear()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    proxy.$toast.clear()
  })
}
</script>

<template>
  <div class="top-backdrop-wrapper">
    <div class="top-backdrop" />
  </div>
  <div class="detached-container">
    <div class="team-info-wrapper">
      <div class="title">
        战队数据汇总
      </div>
      <div class="team-count-box">
        <div class="team-count">
          <div class="count">
            {{ memberCountState.totalCount }}
          </div>
          <div class="label">
            战队总人数
          </div>
        </div>
        <div class="team-count">
          <div class="count">
            {{ memberCountState.captainCount }}
          </div>
          <div class="label">
            队长
          </div>
        </div>
        <div class="team-count">
          <div class="count">
            {{ memberCountState.memberCount }}
          </div>
          <div class="label">
            队员
          </div>
        </div>
      </div>
    </div>
    <div class="team-member-wrapper">
      <div
        v-for="(item, index) in memberList"
        :key="item.memberId"
        class="team-member"
        :class="{ 'bottom-line': index < memberList.length - 1 }">
        <div class="click" @click="handleToDetail(item.memberId)" />
        <div class="top">
          <div class="name-box">
            <div class="name">
              车主
              {{ item.memberPhone }}
            </div>
            <div class="my-captain" />
          </div>
          <div class="arrow">
            >
          </div>
        </div>
        <div class="bottom">
          <div class="time">
            注册时间
            {{ item.regTime }}
          </div>
          <div class="amount-box">
            <div class="label">
              贡献佣金
            </div>
            <div class="amount">
              ￥{{ item.incomeMonth }}
            </div>
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
.top-backdrop-wrapper {
  height: 0;
  .top-backdrop {
    width: 750px;
    height: 700px;
    background-image: url("~img/spread/top-backdrop.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }
}
.detached-container {
  padding: calc($navBarHeight + 20px) 30px 20px;
  height: 100%;
  box-sizing: border-box;
  .team-info-wrapper {
    .title {
      font-size: 32px;
      color: #222A37;
      font-weight: 600;
      display: flex;
      align-items: center;
      &:before {
        content: "";
        display: inline-block;
        width: 8px;
        height: 32px;
        margin-right: 15px;
        background: linear-gradient(176deg, #8CC2FF 0%, #0267D8 92%);
      }
    }
    .team-count-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      .team-count {
        display: flex;
        align-items: center;
        flex-direction: column;
        flex: 1;
        .count {
          font-size: 40px;
          color: #1E1E1E;
          font-weight: 600;
          line-height: 56px;
        }
        .label {
          font-size: 24px;
          color: #787878;
        }
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
      position: relative;
      .click {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
      .top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name-box {
          display: flex;
          align-items: center;
          .name {
            font-size: 26px;
            color: #323233;
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
        .arrow {
          color: #646566;
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
        .amount-box {
          font-weight: 600;
          display: flex;
          align-items: center;
          .label {
            font-size: 26px;
            color: #969799;
            margin-right: 12px;
          }
          .amount {
            font-size: 26px;
            color: #FF7F41;
          }
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
