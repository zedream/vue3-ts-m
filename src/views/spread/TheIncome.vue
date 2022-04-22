<script setup lang="ts">
import { GetIncomeList } from '@/api/spread'

const { proxy } = getCurrentInstance()

const loaded = ref(false)
const page = ref(1)
const pageSize = ref(10)
const incomeList = ref<IncomeListData[]>([])

getIncomeList()

function getIncomeList () {
  proxy.$toast.loading({
    forbidClick: true,
    duration: 0
  })
  GetIncomeList({
    page: page.value,
    pageSize: pageSize.value
  }).then(data => {
    incomeList.value = data?.records
    loaded.value = true
    proxy.$toast.clear()
  }).catch(error => {
    proxy.$notify({ type: 'danger', message: error })
    proxy.$toast.clear()
  })
}
</script>

<template>
  <div class="income-container">
    <template v-if="loaded && incomeList.length">
      <div v-for="item in incomeList" :key="item.fuelNo" class="income bottom-line">
        <div class="top">
          <div class="left">
            +{{ item.incomeAmount }}
            佣金
          </div>
          <div class="right">
            队长
            {{ item.contributorPhone }}
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            加油单号
            {{ item.fuelNo }}
          </div>
          <div class="right">
            {{ item.contributeTime }}
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="loaded && !incomeList.length">
      <div class="no-data-icon" />
      <div class="no-data-text">
        暂无明细
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.income-container {
  height: 100%;
  overflow-y: auto;
  .income {
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
    width: 140px;
    height: 141px;
    background-image: url("~img/spread/no-income.png");
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
  .bottom-line:after {
    z-index: 1;
  }
}
</style>
