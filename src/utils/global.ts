/**
 * @description 首次加载时需要执行的方法（在main.ts中被引入）
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022-2-26 下午 3:13
 */
import Storage from '@/utils/storage'
import { platform } from '@/utils/utils'
import {
  StorageTypesUrlSearch,
  StorageTypesCommon,
  StorageExpire,
  StorageTypesPay,
  StorageTypesUser
} from '@/types/storage.types'
import { GetActivityConfig, CheckParticipate } from '@/api/activity'
import { GetAccountInfo } from '@/api/user'
import { store } from '@/store'
import { UserType } from '@/store/mutation.types'

enum Env {
  WeChat = 'wechat',
  Android = 'android',
  IOS = 'ios'
}
/**
 * 通过URL search参数获取相关信息并存入Storage
 * @param [activityCode] - 渠道码
 * @param [pcode] - 渠道码
 * @param [logintype] - 登录方式 [auto]
 * @param [u] - 授权登录用户加密信息
 * @param [fromApp] - 云油加油app访问H5携带的参数 [c2b_android_phone | c2b_ios_phone]
 * @param [ghOpenId] - 对渠道的openId
 * @param [token] - 令牌
 */
enum UrlSearch {
  activityCode = StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL,
  pcode = StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL,
  logintype = StorageTypesUrlSearch.APP_LOGIN_TYPE_SESSION,
  u = StorageTypesUrlSearch.APP_U_SESSION,
  fromApp = StorageTypesUrlSearch.APP_FROM_APP_SESSION,
  ghOpenId = StorageTypesUrlSearch.APP_OPEN_ID_SESSION,
  token = StorageTypesUser.APP_STORE_TOKEN_LOCAL
}
// 需要存入localStorage的字段， 其余存入sessionStorage
const StoreInLocal = ['activityCode', 'pcode', 'token']
/**
 * @description 遍历 location.search 参数 存入本地， 供其他业务使用
 * @author Tang Hao(1115491560@qq.com)
 * @date 2022/4/2 18:05
 */
const urlParams = new URLSearchParams(window.location.search)
for (const [key, value] of urlParams) {
  if (StoreInLocal.includes(key)) {
    UrlSearch[key] && Storage.Local.set(UrlSearch[key], value)
  } else {
    UrlSearch[key] && Storage.Session.set(UrlSearch[key], value)
  }
  if (key === 'token') {
    GetAccountInfo().then(data => {
      store.commit(`user/${UserType.SET_MEMBER_ID}`, data.memberId)
      store.commit(`user/${UserType.SET_MOBILE}`, data.mobile)
      store.commit(`user${UserType.SET_ACCOUNT}`, data.account)
      store.commit(`user/${UserType.SET_TOKEN}`, value)
    })
  }
}

if (platform.WeChat()) {
  Storage.Local.set(StorageTypesCommon.APP_ENV_LOCAL, Env.WeChat)
}

getActivityConfig().then(data => {
  /**
   * 将活动配置存入sessionStorage
   * 过期时间一小时
   * 从storage读取活动配置时间最长不超过20毫秒
   * size：5-10 Kb
   */
  Storage.Session.set(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION, data, StorageExpire.Hour)
}).catch(() => {
  Storage.Session.remove(StorageTypesCommon.APP_ACTIVITY_CONFIG_SESSION)
})

/**
 * 获取渠道活动配置
 */
function getActivityConfig () {
  return new Promise<ActivityConfigData>((resolve, reject) => {
    const partnerCode = process.env.APP_NODE_ENV === 'prod' ? 'c2b646mucch13g0u3974' : 'c2be2w73abp2vc246115'
    GetActivityConfig({
      activityCode: Storage.Local.get(StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL) || partnerCode
    }).then(data => {
      if (data.productTypeMap && data.productTypeMap[0] && data.productTypeMap[0].recommendMoney) {
        Storage.Session.set(StorageTypesPay.APP_ACTIVITY_RECOMMEND_MONEY_SESSION, data.productTypeMap[0].recommendMoney, StorageExpire.Hour)
      }
      if (data.buyTopConfig && data.buyTopConfig.length) {
        checkParticipate().then(dataP => {
          dataP.listBuyTopRsps.forEach(listBuyTopRspsItem => {
            data.buyTopConfig.forEach(buyTopConfigItem => {
              if (buyTopConfigItem.buyTopImg.indexOf(listBuyTopRspsItem.h5SortNo) > -1) {
                buyTopConfigItem.checkParticipate = listBuyTopRspsItem.checkH5BuyTopPicParticipant
              }
            })
          })
          dataP.listRsps.forEach(listBuyTopRspsItem => {
            data.stationRotation.forEach(stationRotationItem => {
              if (stationRotationItem.image.indexOf(listBuyTopRspsItem.image) > -1) {
                stationRotationItem.checkParticipate = listBuyTopRspsItem.checkParticipantH5
              }
            })
          })
          resolve(data)
        }).catch(() => {
          resolve(data)
        })
      } else {
        resolve(data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
/**
 * 获取是否活动参与对象
 */
function checkParticipate () {
  return new Promise<ParticipateData>((resolve, reject) => {
    if (store.state.user.memberId) {
      CheckParticipate({
        checkParticipantH5: '1',
        memberId: store.state.user.memberId,
        pcode: Storage.Local.get(StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL)
      }).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    } else {
      reject(new Error('无memberId'))
    }
  })
}

export {
  getActivityConfig,
  Env
}
