import { defineComponent } from 'vue'
import Storage from '@/utils/storage'
import { StorageTypesCommon } from '@/types/storage.types'
import { version } from '../../../config/config'
import { compareVersion } from '@/utils/utils'
import moment from '@/utils/moment'
import './index.scss'

export default defineComponent({
  setup () {
    const app = getCurrentInstance()

    const previous = Storage.Local.get(StorageTypesCommon.APP_VERSION_LOCAL)

    Storage.Local.set(StorageTypesCommon.APP_VERSION_LOCAL, version)

    const feature = process.env.changeLog as unknown as string[]
    const releaseDate = process.env.releaseDate

    const message = () => (
      <div class="update-content">
        {
          feature.length
            ? (
                <div class="block">
                  <div class="title">
                    新版特性
                  </div>
                  {
                    feature?.map(fea => {
                      return <p class="li">{ fea }</p>
                    })
                  }
                </div>
              )
            : null
        }
        <div class="block mt-12">
          <div class="title">
            其他信息
          </div>
          <p class="li">
            <span>更新日期：</span>
            <span>{ moment.format('yyyy-MM-dd', releaseDate) }</span>
          </p>
          <p class="li">
            <span>版本号：</span>
            <span>v{ version }</span>
          </p>
        </div>
      </div>
    )

    if (compareVersion(version, previous) === 1 || !previous) {
      setTimeout(() => {
        app?.proxy?.$dialog.confirm({
          title: '有新的更新内容',
          message: message,
          showCancelButton: false,
          confirmButtonText: '我知道了~',
          messageAlign: 'left',
          confirmButtonColor: '#389BFF'
        })
      }, 2500)
    }
    return () => null
  }
})
