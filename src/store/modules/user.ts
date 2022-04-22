import { Module } from 'vuex'
import { RootState } from '@/store'
import { UserType } from '@/store/mutation.types'
import { SignInByCode, SignOut } from '@/api/user'
import Storage from '@/utils/storage'
import { StorageTypesUser } from '@/types/storage.types'

export default {
  namespaced: true,
  state: {
    memberId: Storage.Local.get(StorageTypesUser.APP_STORE_MEMBER_ID_LOCAL),
    mobile: Storage.Local.get(StorageTypesUser.APP_STORE_MOBILE_LOCAL),
    account: Storage.Local.get(StorageTypesUser.APP_STORE_ACCOUNT_LOCAL),
    token: Storage.Local.get(StorageTypesUser.APP_STORE_TOKEN_LOCAL),
    newbie: false
  },
  mutations: {
    [UserType.SET_MEMBER_ID] (state, value) {
      state.memberId = value
      Storage.Local.set(StorageTypesUser.APP_STORE_MEMBER_ID_LOCAL, value)
    },
    [UserType.SET_MOBILE] (state, value) {
      state.mobile = value
      Storage.Local.set(StorageTypesUser.APP_STORE_MOBILE_LOCAL, value)
    },
    [UserType.SET_ACCOUNT] (state, value) {
      state.account = value
      Storage.Local.set(StorageTypesUser.APP_STORE_ACCOUNT_LOCAL, value)
    },
    [UserType.SET_TOKEN] (state, value) {
      state.token = value
      Storage.Local.set(StorageTypesUser.APP_STORE_TOKEN_LOCAL, value)
    },
    [UserType.SET_NEWBIE] (state, value) {
      state.newbie = value
    },
    [UserType.CLEAR_AUTH] (state) {
      state.memberId = ''
      state.mobile = ''
      state.account = ''
      state.token = ''
      Storage.Local.remove(StorageTypesUser.APP_STORE_MEMBER_ID_LOCAL)
      Storage.Local.remove(StorageTypesUser.APP_STORE_MOBILE_LOCAL)
      Storage.Local.remove(StorageTypesUser.APP_STORE_ACCOUNT_LOCAL)
      Storage.Local.remove(StorageTypesUser.APP_STORE_TOKEN_LOCAL)
    }
  },
  actions: {
    signInByCode ({ commit }, data) {
      return new Promise<void>((resolve, reject) => {
        SignInByCode(data).then(data => {
          commit(UserType.SET_MEMBER_ID, data.memberId)
          commit(UserType.SET_MOBILE, data.mobile)
          commit(UserType.SET_ACCOUNT, data.account)
          commit(UserType.SET_TOKEN, data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    signOut ({ commit }) {
      return new Promise<void>((resolve, reject) => {
        SignOut().then(() => {
          commit(UserType.CLEAR_AUTH)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
} as Module<ModuleStateUser, RootState>
