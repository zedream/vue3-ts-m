<script setup lang="ts">
import { version } from '../../../config/config'
import service from 'img/mine/service.png'
import about from 'img/mine/about.png'
import clause from 'img/mine/clause.png'
import versionIcon from 'img/mine/version.png'
import official from 'img/mine/official.png'

const { proxy } = getCurrentInstance()
const router = useRouter()

function handleTapItem (path, name) {
  // router.push(path)
  if (name === '当前版本') {
    proxy.$toast(`当前版本号：v${version}`)
  } else if (path) {
    router.push(path)
  } else {
    proxy.$toast('努力开发中...')
  }
}

const list = [
  {
    name: '客服中心',
    path: '/service',
    icon: service
  },
  {
    name: '关于云油',
    path: '/about',
    icon: about
  },
  {
    name: '隐私政策',
    path: '/agreement/private',
    icon: clause
  },
  // {
  //   name: '当前版本',
  //   path: '',
  //   icon: versionIcon
  // },
  {
    name: '公众号',
    path: '/activity/officialAccount',
    icon: official
  }
]
</script>

<template>
  <div class="mine-section">
    <div class="section-title bottom-line">
      帮助中心
    </div>
    <div class="section-body">
      <div
        v-for="item in list"
        :key="item.name"
        class="item"
        @click="handleTapItem(item.path, item.name)">
        <img class="icon" :src="item.icon" alt="云油加油">
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.mine-section {
  padding: 0 20px;
  background: #FFFFFF;
  box-shadow: 0 6px 14px 0 rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  .section-title {
    height: 90px;
    line-height: 90px;
    font-size: 30px;
    color: #292929;
    font-weight: 600;
  }
  .section-body {
    padding: 30px;
    display: grid;
    grid-template-columns: repeat(4, 96px);
    grid-row-gap: 30px;
    justify-content: space-between;
    white-space: nowrap;
    text-align: center;
    .item {
      font-size: 24px;
      color: #4A4A4A;
      text-align: center;
      line-height: 26px;
      .icon {
        width: 60px;
        height: 60px;
        margin-bottom: 16px;
      }
    }
  }
}
</style>
