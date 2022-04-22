<script setup lang="ts">
interface Props {
  modelValue: string | number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})
const emit = defineEmits<
  {(e: 'onDone', value: string | number): void
  (e: 'update:modelValue', value: string | number): void
  }>()

const inputFocus = ref(true)
const myValue = ref(props.modelValue)
const inputRef = ref()

defineExpose({
  inputRef
})

watch(() => props.modelValue, (value) => {
  myValue.value = value
  if (props.modelValue.toString().length === 6) {
    emit('onDone', props.modelValue)
  }
})

onMounted(() => {
  inputRef.value.focus()
})

function onInput (e) {
  if (e.target.value.length > 6) {
    e.target.value = e.target.value.slice(0, 6)
  }
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="code-wrapper">
    <div
      v-for="(item, index) in 6"
      :key="index"
      class="square-item"
      :class="{ activated: modelValue.toString()[index], activating: index === modelValue.toString().length && inputFocus }">
      {{ modelValue.toString()[index] }}
    </div>
    <input
      ref="inputRef"
      v-model.number="myValue"
      class="input"
      type="number"
      pattern="[0-9]*"
      @input="onInput"
      @focus="inputFocus = true"
      @blur="inputFocus = false">
  </div>
</template>

<style scoped lang="scss">
.code-wrapper {
  height: 300px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 30px;
  align-items: flex-end;
  .square-item {
    margin-bottom: 80px;
    border-bottom: 1px solid #DCDEED;
    text-align: center;
    color: #292929;
    font-size: 48px;
    line-height: 80px;
  }
  .activated {
    border-bottom-color: #4981FA;
    border-bottom-width: 6px;
  }
  .activating {
    position: relative;
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 2px;
      background: #4981FA;
      animation: cursor 1s infinite steps(1, start);
    }
  }
  @keyframes cursor {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  .input {
    opacity: 0;
    position: absolute;
    width: 500%;
    left: -400%;
    height: 100%;
  }
}
</style>
