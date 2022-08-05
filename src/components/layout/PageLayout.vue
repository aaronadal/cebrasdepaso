<script setup lang="ts">
import PageFooter from '@/components/layout/PageFooter.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
</script>

<template>
  <div id="page-layout">
    <PageHeader />

    <main id="page-content">
      <slot />
    </main>

    <PageFooter />
  </div>
</template>
