<script setup lang="ts">
import {useOnResize} from "~/composables/onResize";
import {ref} from "@vue/reactivity";
import {inject, nextTick, watch} from "vue";

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

//const {component: mainPlayer} = useMainPlayer();
const mainPlayer = ref();

const paddingBottom = ref(0);
function calculatePaddingBottom() {
  nextTick(() => {
    const mainPlayerElement = mainPlayer.value?.element as HTMLElement|undefined;
    if(mainPlayerElement) {
      if(mainPlayer.value?.isCollapsed) {
        paddingBottom.value = 0;
      }
      else {
        paddingBottom.value = mainPlayerElement.offsetHeight;
      }
    }
  });
}

watch(() => mainPlayer.value?.isCollapsed, () => calculatePaddingBottom());

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
    <MainPlayer ref="mainPlayer" />
  </div>
</template>
