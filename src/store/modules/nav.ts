import { Module } from 'vuex'
import { RootState } from '@/store'
import { NavType } from '@/store/mutation.types'

export default {
  namespaced: true,
  state: {
    path: ''
  },
  mutations: {
    [NavType.SET_PATH] (state, value) {
      state.path = value
    }
  }
} as Module<ModuleStateNav, RootState>
