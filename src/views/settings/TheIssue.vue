<script setup lang="ts">
const targetList = [{
  name: '产品经理',
  key: 0
}, {
  name: '工程师',
  key: 1
}, {
  name: '策划运营',
  key: 2
}, {
  name: '设计师',
  key: 3
}]

const showPicker = ref(false)
const result = ref('')
const username = ref('')
const message = ref('')
const checked = ref<number[]>([])
const files = ref<{ url: string }[]>([])
const columns = ['流程阻塞', '用户体验', '页面布局', '系统崩溃', '其他']

const onConfirm = (value) => {
  result.value = value
  showPicker.value = false
}

const onSubmit = (values) => {
  console.log('submit', values)
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model="$store.state.user.account"
        readonly
        name="用户名"
        label="用户名"
        placeholder="用户名" />
      <van-field
        v-model="result"
        is-link
        readonly
        name="picker"
        label="问题类型"
        placeholder="点击选择类型"
        @click="showPicker = true" />
      <van-field name="checkboxGroup" label="问题提给">
        <template #input>
          <van-checkbox-group v-model="checked" direction="horizontal">
            <van-checkbox
              v-for="item in targetList"
              :key="item.key"
              :name="item.key"
              shape="square">
              {{ item.name }}
            </van-checkbox>
          </van-checkbox-group>
        </template>
      </van-field>
      <van-field
        v-model="message"
        rows="1"
        autosize
        label="详细说明"
        type="textarea"
        maxlength="200"
        show-word-limit
        placeholder="请输入详细说明" />
      <van-field name="uploader" label="问题截图">
        <template #input>
          <van-uploader v-model="files" />
        </template>
      </van-field>
    </van-cell-group>
    <div class="button-box">
      <van-button
        round
        block
        type="primary"
        native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  <van-popup v-model:show="showPicker" position="bottom">
    <van-picker
      :columns="columns"
      @confirm="onConfirm"
      @cancel="showPicker = false" />
  </van-popup>
</template>

<style scoped lang="scss">
.van-form {
  margin-top: 32px;
}

.van-checkbox {
  margin-top: 20px;
  &:nth-child(1), &:nth-child(2) {
    margin-top: 0;
  }
}
.button-box {
  margin: 32px;
}
</style>
