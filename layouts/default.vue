<script setup lang="ts">
const route = useRoute();

const state = useNotFoundState();
const key = ref('');
watch(
    [
        state,
        () => route.meta,
    ],
    () => {
      key.value =  state.value ? 'notfound' : 'pageKey' in route.meta ? `${route.meta.pageKey}` : 'none';
    },
    { immediate: true }
)
</script>

<template>
  <PageLayout :data-page="key">
    <slot/>
  </PageLayout>
</template>
