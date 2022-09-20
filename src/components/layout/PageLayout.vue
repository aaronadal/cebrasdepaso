<script setup lang="ts">
import PageFooter from '@/components/layout/PageFooter.vue'
import PageHeader from '@/components/layout/PageHeader.vue'

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})
</script>

<template>
  <div id="page-layout">
    <PageHeader :collapsed="collapsed" />

    <main id="page-content">
      <slot />
    </main>

    <PageFooter />
  </div>
</template>
