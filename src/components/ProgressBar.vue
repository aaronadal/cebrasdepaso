<script setup lang="ts">
import { ref, toRefs } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'

// eslint-disable-next-line
const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void,
  (e: 'dragstart'): void
  (e: 'drag', value: number): void
  (e: 'dragend'): void
}>()

declare interface Props {
    modelValue?: number,
    max?: number
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  max: 100
})

const { modelValue, max } = toRefs(props)

const barRef = ref<HTMLDivElement>()
const valueRef = ref<HTMLDivElement>()

const isDragging = ref(false)

const left = computed(() => {
  const barWidth = barRef.value?.offsetWidth
  const valueWidth = valueRef.value?.offsetWidth
  if (!barWidth || !valueWidth) {
    return 0
  }

  return (barWidth - valueWidth) * modelValue.value / max.value
})

function onDrag (evt: MouseEvent|TouchEvent) {
  const barWidth = barRef.value?.offsetWidth
  const valueWidth = valueRef.value?.offsetWidth
  if (!barWidth || !valueWidth) {
    return 0
  }

  const barStart = barRef.value?.offsetLeft || 0

  let x
  if (evt instanceof MouseEvent) {
    x = evt.clientX - barStart
  } else {
    x = evt.touches[0].clientX
  }

  let value = x * max.value / barWidth

  if (value <= 0) {
    value = 0
  }

  if (value >= max.value) {
    value = max.value
  }

  emit('drag', value)
}

function onMouseDown () {
  emit('dragstart')
  isDragging.value = true

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onDrag)
  }, { once: true })
}

function onMouseUp (evt: MouseEvent|TouchEvent) {
  if (!isDragging.value) {
    return
  }

  const barWidth = barRef.value?.offsetWidth
  const valueWidth = valueRef.value?.offsetWidth
  if (!barWidth || !valueWidth) {
    return 0
  }

  const barStart = barRef.value?.offsetLeft || 0

  let x
  if (evt instanceof MouseEvent) {
    x = evt.clientX - barStart
  } else {
    x = evt.touches[0].clientX
  }

  let value = x * max.value / barWidth

  if (value <= 0) {
    value = 0
  }

  if (value >= max.value) {
    value = max.value
  }

  emit('update:modelValue', value)
  emit('dragend')
}

function onTouchStart () {
  emit('dragstart')
  isDragging.value = true

  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', () => {
    isDragging.value = false
    document.removeEventListener('touchmove', onDrag)
  }, { once: true })
}

function onTouchEnd (evt: TouchEvent) {
  onMouseUp(evt)
}
</script>

<template>
    <div ref="barRef" class="progress-bar" @mousedown="onMouseDown" @mouseup="onMouseUp" @touchstart="onTouchStart" @touchend="onTouchEnd">
        <div ref="valueRef" class="value" :style="{left: `${left}px`}" />
    </div>
</template>
