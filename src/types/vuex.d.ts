import { ComponentCustomProperties } from 'vue'
import { Store, Commit, Dispatch } from 'vuex'
import { TypeModule } from '@/store'

declare module '@vue/runtime-core' {
  // 为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<TypeModule>
    // state: Modules
    commit: Commit
    dispatch: Dispatch
  }
}
