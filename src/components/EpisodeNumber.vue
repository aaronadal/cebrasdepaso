<script setup lang="ts">
import ZebraPattern from '@/components/ZebraPattern.vue'
import { EpisodeType, getEpisodeTypeSymbol } from '@/media'
import { toRefs } from '@vue/reactivity'
import {computed, ref} from '@vue/runtime-core'

interface Props {
  type: EpisodeType;
  number: number;
  disableAnimations?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disableAnimations: false,
})
const {type} = toRefs(props)

const episodeSymbol = computed(() => getEpisodeTypeSymbol(type.value))

const viewBoxHeight = ref(0);
function updateViewBoxHeight() {
  viewBoxHeight.value = parseInt(getComputedStyle(document.body).getPropertyValue('--episode-thumbnail-number-size'));
}

window.addEventListener('resize', () => updateViewBoxHeight());
updateViewBoxHeight();

const textVerticalPosition = computed(() => viewBoxHeight.value - 4);
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 265 ${viewBoxHeight}`" class="episode-number">
    <mask :id="`episode-number-${number}`">
      <rect x="0" y="0" width="100" height="100" fill="black" />
      <text class="title" x="0" :y="textVerticalPosition" fill="white">
        {{ episodeSymbol }}{{ `${number}`.padStart(2, '0') }}
      </text>
    </mask>

    <g :mask="`url(#episode-number-${number})`" fill="var(--text-color)">
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
      {{ episodeSymbol }}{{ `${number}`.padStart(2, '0') }}
    </text>
  </svg>
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
