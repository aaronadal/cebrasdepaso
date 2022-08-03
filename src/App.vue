<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <PageLayout>
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </PageLayout>
</template>
