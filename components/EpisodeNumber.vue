<script setup lang="ts">
import {useEpisodeTypeSymbol} from "~/composables/media/episodeTypeSymbol";
import type {EpisodeType} from "~/composables/media";
import {toRefs} from "vue";
import {ref} from "@vue/reactivity";
import {usePropertyValue} from "~/composables/propertyValue";
import {useOnResize} from "~/composables/onResize";
import {computed} from "@vue/runtime-core";

interface Props {
  type: EpisodeType;
  number: number;
  disableAnimations?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disableAnimations: false,
})
const {type} = toRefs(props)

const typeSymbol = useEpisodeTypeSymbol(type.value)

const viewBoxHeight = ref(0);
function updateViewBoxHeight() {
  let doc = null;
  if (typeof window !== 'undefined') {
    doc = window.document.body;
  }

  viewBoxHeight.value = parseInt(usePropertyValue(doc, '--episode-thumbnail-number-size', '125').value);
}

useOnResize(updateViewBoxHeight);
updateViewBoxHeight();

const textVerticalPosition = computed(() => viewBoxHeight.value - 4);

const element = ref();

defineExpose({
  element,
})
</script>

<template>
  <div ref="element" style="display: contents;">
    <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 265 ${viewBoxHeight}`" class="episode-number">
      <mask :id="`${type}-number-${number}`">
        <rect x="0" y="0" width="100" height="100" fill="black" />
        <text class="title" x="0" :y="textVerticalPosition" fill="white">
          {{ typeSymbol }}{{ `${number}`.padStart(2, '0') }}
        </text>
      </mask>

      <g :mask="`url(#${type}-number-${number})`" fill="var(--text-color)">
        <g>
          <ZebraPattern x="0" y="0" transform="scale(1.5)" />
          <ZebraPattern x="0" y="0" transform="scale(1.5) translate(138)" />
          <ZebraPattern x="0" y="0" transform="scale(1.5) translate(276)" />
          <animateTransform
            v-if="!disableAnimations"
            attributeName="transform"
            attributeType="XML"
            dur="12s"
            repeatCount="indefinite"
            type="translate"
            values="0;-207"
            calcMode="linear" />
        </g>
      </g>
      <text class="title text-border" x="0" :y="textVerticalPosition">
        {{ typeSymbol }}{{ `${number}`.padStart(2, '0') }}
      </text>
    </svg>
  </div>
</template>

<style scoped>
  .title {
    font-size: var(--episode-thumbnail-number-size);
    font-family:var(--font-family-heading);
    font-weight: var(--font-weight-heading);
  }

  .text-border {
    fill: none;
    fill-opacity: 0;

    stroke: var(--text-color);
    stroke-width: 3px;
    stroke-opacity: 1;
  }
</style>
