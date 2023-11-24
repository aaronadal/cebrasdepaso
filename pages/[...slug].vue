<script setup lang="ts">
definePageMeta({
  pageKey: 'notfound',
});

useCustomMeta({
  title: '[404] Página no encontrada · Cebras de paso',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <NotFound />
</template>
