<script setup lang="ts">
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
import {ref} from '@vue/reactivity'
import {computed} from '@vue/runtime-core'
import html2canvas from "html2canvas";
import {getEpisodeBackground} from "@/media-types";

const target = ref<"podcast" | "youtube">('podcast')
const type = ref<"full" | "bonus" | "trailer">('full')
const title = ref('')
const guest = ref('');
const number = ref(0)
const season = ref(0)
const numberInSeason = ref(0)
const size = ref(3000)

const htmlTitle = computed(() => title.value.replace(/\r?\n/g, '<br />'))

const containerWidth = computed(() => {
  if (target.value === 'youtube') {
    return `calc(var(--card-thumbnail-size) * 16 / 9)`;
  }

  return `var(--card-thumbnail-size)`;
});
const background = computed(() => {
  if (target.value === 'youtube') {
    return getEpisodeBackground(type.value, number.value);
  }

  return 'transparent';
});

const targetRef = ref()
const generating = ref(false)
const generatedImage = ref<string | null>(null)

const scale = computed(() => {
  const target = targetRef.value
  if (!target) {
    return 1
  }

  return size.value / parseInt(getComputedStyle(target.element).getPropertyValue('--card-thumbnail-size'))
})

function download() {
  if (generating.value) {
    return;
  }

  generating.value = true

  setTimeout(() => {
    html2canvas(targetRef.value.element, {
      backgroundColor: null,
      scale: scale.value,
    })
        .then((canvas) => {
          generatedImage.value = canvas.toDataURL("image/png")
          generating.value = false
        });
  }, 100)
}
</script>

<template>
  <div class="page" v-if="generatedImage">
    <section class="container" style="width: var(--card-thumbnail-size); padding: 0;">
      <img :src="generatedImage" style="width: 100%;"/>
    </section>
    <section class="container" style="text-align:center;">
      <a class="button" @click="generatedImage = null">Volver</a>
    </section>
  </div>

  <div class="page" v-else>
    <section class="container fields">
      <label class="target">
        <span>Para</span>
        <select v-model="target">
          <option value="podcast">Podcast</option>
          <option value="youtube">YouTube</option>
        </select>
      </label>
      <label class="type">
        <span>Tipo</span>
        <select v-model="type">
          <option value="full">Estándar</option>
          <option value="bonus">Extra</option>
          <option value="trailer">Avance</option>
        </select>
      </label>
      <label class="title">
        <span>Título</span>
        <textarea v-model="title"/>
      </label>
      <label class="guest">
        <span>Invitado</span>
        <input type="text" v-model="guest"/>
      </label>
      <label class="number">
        <span>Número</span>
        <input type="number" min="0" v-model="number"/>
      </label>
      <label class="season">
        <span>Temporada</span>
        <input type="number" min="0" v-model="season"/>
      </label>
      <label class="number-in-season">
        <span>Número en la temporada</span>
        <input type="number" min="0" v-model="numberInSeason"/>
      </label>
    </section>
    <section class="container" :style="{width: containerWidth, padding: 0, background}">
      <div style="width: var(--card-thumbnail-size);">
        <EpisodeThumbnail
            ref="targetRef"
            :type="type"
            :title="htmlTitle"
            :guest="guest"
            :number="number"
            :season="season"
            :numberInSeason="numberInSeason"
            :is-title-html="htmlTitle.includes('<br />')"
            :no-background="target === 'youtube'"
            disable-animations
        />
      </div>
    </section>
    <section class="container" style="text-align:center;">
      <a class="button" @click="download">{{ generating ? 'Generando...' : 'Descargar' }}</a>
    </section>
  </div>
</template>

<style lang="scss" scoped>
section.container.fields {
  display: grid;

  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  align-items: start;

  > * {
    margin: 0;
  }

  > .target {
    grid-column: span 3;
  }

  > .type {
    grid-column: span 3;
  }

  > .title {
    grid-column: span 6;
  }

  > .guest {
    grid-column: span 6;
  }

  > .number {
    grid-column: span 2;
  }

  > .season {
    grid-column: span 2;
  }

  > .number-in-season {
    grid-column: span 2;
  }
}

label {
  display: block;
  font-family: var(--font-family-text);
  font-weight: var(--font-weight-text);
  text-transform: uppercase;
  font-size: .7rem;

  span {
    padding: 0 .5rem;
  }

  + label {
    margin-top: .5rem;
  }
}

select,
input,
textarea {
  display: block;
  width: 100%;
  padding: .25rem .5rem;
  font-size: 1rem;
  background: none;
  outline: none;
  border: solid 2px var(--text-color);
  border-radius: 1rem;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-mono);
}

.episode-thumbnail {
  border-radius: 0;
}
</style>
