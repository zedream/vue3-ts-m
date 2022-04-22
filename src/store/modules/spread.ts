import { Module } from 'vuex'
import { RootState } from '@/store'
import { SpreadType } from '@/store/mutation.types'

export default {
  namespaced: true,
  state: {
    agentLevel: 0,
    grantStatus: 0,
    currentCaptainId: ''
  },
  mutations: {
    [SpreadType.SET_AGENT_LEVEL] (state, value) {
      state.agentLevel = value
    },
    [SpreadType.SET_GRANT_STATUS] (state, value) {
      state.grantStatus = value
    },
    [SpreadType.SET_CURRENT_CAPTAIN_ID] (state, value) {
      state.currentCaptainId = value
    }
  }
} as Module<ModuleStateSpread, RootState>
