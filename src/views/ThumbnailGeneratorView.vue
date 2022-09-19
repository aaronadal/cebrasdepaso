<script setup lang="ts">
import EpisodeThumbnail from '@/components/EpisodeThumbnail.vue'
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import html2canvas from "html2canvas";

const type = ref<"full" | "bonus" | "trailer">('full')
const title = ref('')
const number = ref(0)
const season = ref(0)
const numberInSeason = ref(0)

const targetRef = ref()

const scale = computed(() => {
  const target = targetRef.value
  if (!target) {
    return 1
  }

  return 3000 / parseInt(getComputedStyle(target.element).getPropertyValue('--card-thumbnail-size'))
})

function download() {
  html2canvas(targetRef.value.element, {
    backgroundColor: null,
    scale: scale.value,
  })
      .then((canvas) => {
        window.location.href = canvas.toDataURL("image/png");
      });
}
</script>

<template>
  <div class="page">
    <section class="container">
      <label>
        <span>Tipo</span>
        <select v-model="type">
          <option value="full">Estándar</option>
          <option value="bonus">Extra</option>
          <option value="trailer">Avance</option>
        </select>
      </label>
      <label>
        <span>Título</span>
        <textarea v-model="title" />
      </label>
      <label>
        <span>Número</span>
        <input type="number" min="0" v-model="number" />
      </label>
      <label>
        <span>Temporada</span>
        <input type="number" min="0" v-model="season" />
      </label>
      <label>
        <span>Número dentro de la temporada</span>
        <input type="number" min="0" v-model="numberInSeason" />
      </label>
    </section>
    <section class="container" style="width: var(--card-thumbnail-size); padding: 0;">
      <EpisodeThumbnail
          ref="targetRef"
          :type="type"
          :title="title.replace(/\r?\n/g, '<br />')"
          :number="number"
          :season="season"
          :numberInSeason="numberInSeason"
          is-title-html
          disable-animations
        />
    </section>
    <section class="container">
      <button @click="download">Descargar</button>
    </section>
  </div>
</template>

<style lang="scss" scoped>
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
  border-radius: .5rem;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-mono);
}
</style>
