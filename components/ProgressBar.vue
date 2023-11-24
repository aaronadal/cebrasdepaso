<script setup lang="ts">
// eslint-disable-next-line
import {toRefs} from "vue";
import {ref} from "@vue/reactivity";
import {computed} from "@vue/runtime-core";

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void,
  (e: 'dragstart'): void
  (e: 'drag', value: number): void
  (e: 'dragend'): void
}>()

interface Props {
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

const lastDragValue = ref(0)

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
    x = evt.touches[0].clientX - barStart
  }

  let value = x * max.value / barWidth

  if (value <= 0) {
    value = 0
  }

  if (value >= max.value) {
    value = max.value
  }

  lastDragValue.value = value
  emit('drag', value)
}

function onMouseDown (evt: MouseEvent) {
  emit('dragstart')
  isDragging.value = true

  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', () => {
    onMouseUp()
    document.removeEventListener('mousemove', onDrag)
  }, { once: true })

  onDrag(evt)
}

function onMouseUp () {
  if (!isDragging.value) {
    return
  }

  isDragging.value = false

  emit('update:modelValue', lastDragValue.value)
  emit('dragend')
}

function onTouchStart () {
  emit('dragstart')
  isDragging.value = true

  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', () => {
    onTouchEnd()
    document.removeEventListener('touchmove', onDrag)
  }, { once: true })
}

function onTouchEnd () {
  onMouseUp()
}
</script>

<template>
    <div ref="barRef" class="progress-bar" @mousedown="onMouseDown" @touchstart="onTouchStart">
        <div ref="valueRef" class="value" :style="{left: `${left}px`}" />
    </div>
</template>
