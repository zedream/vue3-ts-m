import { Module } from 'vuex'
import { RootState } from '@/store'
import { CommonType } from '@/store/mutation.types'
import { StorageExpire, StorageTypesCommon, StorageTypesUrlSearch } from '@/types/storage.types'
import Storage from '@/utils/storage'

const partnerCode = process.env.APP_NODE_ENV === 'prod' ? 'c2b646mucch13g0u3974' : 'c2be2w73abp2vc246115'

export default {
  namespaced: true,
  state: {
    partnerCode: Storage.Local.get(StorageTypesUrlSearch.APP_STORE_PARTNER_CODE_LOCAL) || partnerCode,
    longitude: '114.05454',
    latitude: '22.52291',
    showMoney: !!Storage.Local.get(StorageTypesCommon.APP_STORE_EYES_LOCAL),
    hasAllowance: !!Storage.Session.get(StorageTypesCommon.APP_STORE_HAS_ALLOWANCE_SESSION),
    canLoadMP: false // 是否可以加载多弹窗
  },
  mutations: {
    [CommonType.SET_PARTNER_CODE] (state, value) {
      state.partnerCode = value
    },
    [CommonType.SET_LONGITUDE] (state, value) {
      state.longitude = value
    },
    [CommonType.SET_LATITUDE] (state, value) {
      state.latitude = value
    },
    [CommonType.SET_SHOW_MONEY] (state, value) {
      state.showMoney = value
      Storage.Local.set(StorageTypesCommon.APP_STORE_EYES_LOCAL, value, StorageExpire.Year)
    },
    [CommonType.SET_HAS_ALLOWANCE] (state, value) {
      state.hasAllowance = value
      Storage.Session.set(StorageTypesCommon.APP_STORE_HAS_ALLOWANCE_SESSION, value, StorageExpire.Week)
    },
    [CommonType.SET_CAN_LOAD_MP] (state, value) {
      state.canLoadMP = value
    }
  }
} as Module<ModuleStateCommon, RootState>
