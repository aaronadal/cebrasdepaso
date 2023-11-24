<script setup lang="ts">
import {definePageMeta, useCustomMeta} from "#imports";
import {NotFound} from "#components";

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
