<script setup lang="ts">
import {definePageMeta, setResponseStatus, useCustomMeta, useRequestEvent} from "#imports";
import {NotFound} from "#components";

definePageMeta({
  pageKey: 'notfound',
});

if (import.meta.server) {
  setResponseStatus(useRequestEvent()!, 404);
}

useCustomMeta({
  title: '[404] Página no encontrada · Cebras de paso',
  robots: 'noindex, nofollow',
})
</script>

<template>
  <NotFound />
</template>
