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

const myValue = ref(props.modelValue)
const inputRef = ref()

watch(() => props.modelValue, (value) => {
  myValue.value = value
  // if (props.modelValue.toString().length === 6) {
  //   emit('onDone', props.modelValue)
  // }
})

onMounted(() => {
  inputRef.value.focus()
})

function onInput (e) {
  e.target.value = e.target.value.replace(/[^\d]/g, '')
  if (e.target.value.length > 6) {
    e.target.value = e.target.value.slice(0, 6)
  }
  emit('update:modelValue', e.target.value)
}
</script>

<template>
  <div class="password-wrapper">
    <div
      v-for="(item, index) in 6"
      :key="index"
      class="square-item"
      :class="{ activate: modelValue.toString()[index] }" />
    <input
      ref="inputRef"
      v-model.number="myValue"
      class="input"
      type="number"
      pattern="[0-9]*"
      @input="onInput">
  </div>
</template>

<style scoped lang="scss">
.password-wrapper {
  height: 110px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 18px;
  align-items: flex-end;
  .square-item {
    width: 100%;
    height: 110px;
    background: #F3F3F3;
    border-radius: 10px;
  }
  .activate {
    display: flex;
    align-items: center;
    justify-content: center;
    &:before {
      display: inline-block;
      content: "";
      width: 20px;
      height: 20px;
      background: #292929;
      border-radius: 50%;
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
