import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import nav from './modules/nav'
import refuel from './modules/refuel'
import common from './modules/common'
import user from './modules/user'
import spread from './modules/spread'

export interface RootState {
  empty: unknown
}

export interface TypeModule extends RootState {
  nav: ModuleStateNav,
  refuel: ModuleStateRefuel,
  common: ModuleStateCommon,
  user: ModuleStateUser,
  spread: ModuleStateSpread
}

interface TypeStore extends Store<RootState> {
  state: TypeModule
}

export const key: InjectionKey<Store<TypeModule>> = Symbol('InjectionKey')

export const store = createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav,
    refuel,
    common,
    user,
    spread
  }
}) as unknown as TypeStore

export function useStore<T = TypeModule> () {
  return baseUseStore<T>(key)
}
