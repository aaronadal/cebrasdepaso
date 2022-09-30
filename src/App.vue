<script setup lang="ts">
import PageLayout from '@/components/layout/PageLayout.vue'
import { useRoute } from 'vue-router'
import {computed} from "@vue/runtime-core";

const route = useRoute()

const layoutCollapsed = computed(() => {
  return route.name !== 'home';
})
</script>

<template>
  <PageLayout :collapsed="layoutCollapsed" :data-page="route.name || 'none'">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <div class="inner" :key="route.path">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </div>
      </transition>
    </router-view>
  </PageLayout>
</template>
