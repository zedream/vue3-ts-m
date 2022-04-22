<script setup lang="ts">
import { GetServiceTabs, GetServiceQAList } from '@/api/common'
import { platform } from '@/utils/utils'
import { app } from '../../../config/config'

const { proxy } = getCurrentInstance()

const wx = platform.WeChat()
const collapse = ref('')
const active = ref('cjwt')
const types = ref<string[]>([])
const tabs = ref<ServiceTabsData[]>([])
const qaListMap = ref({})

GetServiceTabs().then(data => {
  tabs.value = data?.dataList
  tabs.value.forEach(_ => {
    types.value.push(_.link_url.split('/')[_.link_url.split('/').length - 1])
  })
  getServiceQAList(active.value)
})

function getServiceQAList (type) {
  GetServiceQAList({
    type,
    pageSize: 20
  }).then(data => {
    qaListMap.value[type] = data.dataList
  })
}

function handleOnlineService () {
  proxy.$toast('努力开发中...')
}

function handleFeedback () {
  proxy.$toast('努力开发中...')
}

function onTabChange (value) {
  const type = value.split('/')[value.split('/').length - 1]
  /**
   * 将每个tab下的问题缓存，不再重复请求接口
   * 其他页面有类似处理
   */
  if (qaListMap.value[type]) {
    return qaListMap.value[type]
  } else {
    getServiceQAList(value)
  }
}
</script>

<template>
  <div class="service-container">
    <div class="service-header">
      <div class="service">
        <a class="tel-link" :href="`tel:${app.tel}`" />
        <div class="icon tel" />
        <div class="name">
          电话客户
        </div>
      </div>
      <div class="service" @click="handleOnlineService">
        <div class="icon online" />
        <div class="name">
          在线客服
        </div>
      </div>
      <div class="service" @click="handleFeedback">
        <div class="icon feedback" />
        <div class="name">
          意见反馈
        </div>
      </div>
    </div>
    <van-tabs
      v-if="tabs.length"
      v-model:active="active"
      swipeable
      sticky
      class="my-tabs"
      :offset-top="wx ? '0' : '12.26667vw'"
      title-active-color="#4A90E2"
      color="#4A90E2"
      @change="onTabChange">
      <van-tab
        v-for="(item, index) in tabs"
        :key="item.title"
        :name="types[index]"
        :title="item.title">
        <van-collapse
          v-for="qa in qaListMap[active]"
          :key="qa.id"
          v-model="collapse"
          accordion>
          <van-collapse-item :title="qa.title" :name="qa.id">
            <div v-html="qa.content" />
          </van-collapse-item>
        </van-collapse>
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
.service-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.service-header {
  display: flex;
  align-items: center;
  background: #FFFFFF;
  height: 240px;
  flex-shrink: 0;
  box-sizing: border-box;
  .service {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .tel-link {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .icon {
      width: 64px;
      height: 64px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 100% 100%;
    }
    .tel {
      background-image: url("~img/other/tel-service.png");
    }
    .online {
      background-image: url("~img/other/online-service.png");
    }
    .feedback {
      background-image: url("~img/other/feedback.png");
    }
    .name {
      margin-top: 30px;
      font-size: 26px;
      color: #333333;
    }
  }
}
.my-tabs {
  flex: 1;
  display: flex;
  flex-direction: column;
  :deep(.van-tabs__content) {
    flex: 1;
  }
}
</style>
