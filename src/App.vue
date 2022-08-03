<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <PageLayout>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </PageLayout>
</template>
