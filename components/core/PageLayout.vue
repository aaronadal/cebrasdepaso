<script setup lang="ts">
import {useOnResize} from "~/composables/onResize";
import {inject, nextTick, watch, ref} from "vue";
import {useMainPlayer} from "#imports";

interface Props {
  collapsed?: boolean;
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const { isCollapsed } = useMainPlayer();
const mainPlayerElementRef = ref();

const paddingBottom = ref(0);
function calculatePaddingBottom() {
  nextTick(() => {
    const mainPlayerElement = mainPlayerElementRef.value?.element as HTMLElement|undefined;
    if(mainPlayerElement) {
      if(isCollapsed.value) {
        paddingBottom.value = 0;
      }
      else {
        paddingBottom.value = mainPlayerElement.offsetHeight;
      }
    }
  });
}

watch(isCollapsed, calculatePaddingBottom);

useOnResize(calculatePaddingBottom);

const layoutCollapsed = inject<boolean>('layoutCollapsed', false);
</script>

<template>
  <div id="page-layout" :style="{paddingBottom: `${paddingBottom}px`}">
    <PageHeader :collapsed="collapsed || layoutCollapsed" />

    <main id="page-content">
      <slot />
    </main>

    <PageFooter />
    <MainPlayer ref="mainPlayerElementRef" />
  </div>
</template>
