<script setup lang="ts">
// eslint-disable-next-line no-undef
defineProps({
  icon: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: false,
    default: ''
  },
  spin: {
    type: Boolean,
    required: false,
    default: false
  },
  spinSteps: {
    type: Number,
    required: false,
    default: null
  }
})
</script>

<template>
  <i
    class="c-icon"
    :class="{
      [`ph-${icon}`]: !weight || weight === 'regular',
      [`ph-${icon}-${weight}`]: weight && weight !== 'regular',
      spin,
      [`spin-steps-${spinSteps}`]: !!spinSteps,
    }"
  />
</template>
