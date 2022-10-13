<script setup lang="ts">
import PageFooter from '@/components/layout/PageFooter.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import MainPlayer from '@/components/layout/MainPlayer.vue'
import { mainPlayer, currentTrack } from "@/media";
import { nextTick, ref, watch } from 'vue';

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const player = ref();
watch(player, () => {
  mainPlayer.value = player.value;});

const paddingBottom = ref(0);
function calculatePaddingBottom() {
  const mainPlayerElement = player.value?.element as HTMLElement|undefined;
  nextTick(() => {
    if(mainPlayerElement) {
      if(player.value?.isCollapsed) {
        paddingBottom.value = 0;
      }
      else {
        paddingBottom.value = mainPlayerElement.offsetHeight;
      }
    }
  });
}

watch(() => player.value?.isCollapsed, () => calculatePaddingBottom());
watch(currentTrack, () => calculatePaddingBottom());
window.addEventListener('resize', () => calculatePaddingBottom());
</script>

<template>
  <div id="page-layout" :style="{paddingBottom: `${paddingBottom}px`}">
    <PageHeader :collapsed="collapsed" />

    <main id="page-content">
      <slot />
    </main>

    <PageFooter />
    <MainPlayer ref="player" />
  </div>
</template>
