<script setup lang="ts">
import {useRoute} from "vue-router";
import {useNotFoundState} from "~/composables/notFoundState";
import {ref} from "@vue/reactivity";
import {watch} from "vue";

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
