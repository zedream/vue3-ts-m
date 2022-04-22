import { Module } from 'vuex'
import { RootState } from '@/store'
import { RefuelType } from '@/store/mutation.types'
import Storage from '@/utils/storage'
import { StorageExpire, StorageTypesRefuel } from '@/types/storage.types'

export default {
  namespaced: true,
  state: {
    rule: 2,
    exempt: !!Storage.Session.get(StorageTypesRefuel.APP_STORE_EXEMPT_SESSION),
    oilId: process.env.APP_NODE_ENV === 'prod' ? 51 : 71,
    oilName: '92#',
    searchHistory: JSON.parse(Storage.Local.get(StorageTypesRefuel.APP_SEARCH_HISTORY_LOCAL) || '[]')
  },
  mutations: {
    [RefuelType.SET_RULE] (state, value) {
      state.rule = value
    },
    [RefuelType.SET_EXEMPT] (state, value) {
      state.exempt = JSON.parse(value)
      Storage.Session.set(StorageTypesRefuel.APP_STORE_EXEMPT_SESSION, value)
    },
    [RefuelType.SET_OIL] (state, value) {
      state.oilId = value.oilId
      state.oilName = value.oilName
    },
    [RefuelType.SET_SEARCH_HISTORY] (state, value) {
      const existIndex = state.searchHistory.findIndex(_ => _.name === value.name)
      if (existIndex > -1) {
        state.searchHistory.splice(existIndex, 1)
      }
      state.searchHistory.unshift(value)
      Storage.Local.set(StorageTypesRefuel.APP_SEARCH_HISTORY_LOCAL, state.searchHistory, StorageExpire.Year)
    },
    [RefuelType.CLEAR_SEARCH_HISTORY] (state) {
      state.searchHistory = []
      Storage.Local.remove(StorageTypesRefuel.APP_SEARCH_HISTORY_LOCAL)
    }
  }
} as Module<ModuleStateRefuel, RootState>
