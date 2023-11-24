<script setup lang="ts">
interface Props {
  message: string;
  position?: 'top';
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
})
</script>

<template>
  <div class="c-tooltip">
    <div class="message" v-text="message" />
    <slot />
  </div>
</template>
