<script setup lang="ts">
import html2canvas from "html2canvas"
import {ref, computed} from 'vue'
import {definePageMeta, useCustomMeta} from "#imports";

const gradient = ref('--gradient-gray');
const width = ref(1080);
const height = ref(1920);

function toggle() {
  const tmp = width.value;

  width.value = height.value;
  height.value = tmp;
}

const targetRef = ref<HTMLElement | null>(null);
const generating = ref(false);
const generatedImage = ref<string | null>(null);

const scale = computed(() => {
  const target = targetRef.value
  if (!target) {
    return 1
  }

  return width.value / parseInt(getComputedStyle(target).getPropertyValue('--card-thumbnail-size'))
});

function download() {
  const target = targetRef.value;
  if (generating.value || target === null) {
    return;
  }

  generating.value = true

  html2canvas(target, {
    backgroundColor: null,
    scale: scale.value,
  })
      .then((canvas) => {
        generatedImage.value = canvas.toDataURL("image/png")
        generating.value = false
      });
}

definePageMeta({
  pageKey: 'gradient-generator',
});

useCustomMeta({
  title: 'Generador de degradados · Cebras de paso',
  robots: 'noindex, nofollow',
});
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
    <section class="container">
      <label>
        <span>Degradado</span>
        <select v-model="gradient">
          <optgroup label="Degradados">
            <option value="--gradient-gray">Neutro</option>
            <option value="--full-gradient">Completo</option>
            <option value="--four-gradient">4 esquinas</option>
            <option value="--gradient-1">Orange/Pink</option>
            <option value="--gradient-2">Red/Purple</option>
            <option value="--gradient-3">Pink/Blue</option>
            <option value="--gradient-4">Purple/Cyan</option>
            <option value="--gradient-5">Blue/Teal</option>
            <option value="--gradient-6">Cyan/Green</option>
            <option value="--gradient-7">Teal/Yellow</option>
            <option value="--gradient-8">Green/Orange</option>
            <option value="--gradient-9">Yellow/Red</option>
          </optgroup>

          <optgroup label="Colores sólidos">
            <option value="--color-orange">Orange</option>
            <option value="--color-red">Red</option>
            <option value="--color-pink">Pink</option>
            <option value="--color-purple">Purple</option>
            <option value="--color-blue">Blue</option>
            <option value="--color-cyan">Cyan</option>
            <option value="--color-teal">Teal</option>
            <option value="--color-green">Green</option>
            <option value="--color-yellow">Yellow</option>
          </optgroup>
        </select>
      </label>
      <label>
        <span>Ancho</span>
        <input type="number" min="1" max="8192" v-model="width"/>
      </label>
      <label>
        <span>Alto</span>
        <input type="number" min="1" max="8192" v-model="height"/>
      </label>
      <a class="button" @click="toggle" style="margin: .5rem 0 0;">Alternar ancho y alto</a>
    </section>
    <section class="container" style="width: var(--card-thumbnail-size); padding: 0">
      <div ref="targetRef" :style="{
        width: '100%',
        aspectRatio: `${width/height}`,
        background: `var(${gradient})`,
      }"/>
    </section>
    <section class="container" style="text-align:center;">
      <a class="button" @click="download">{{ generating ? 'Generando...' : 'Descargar' }}</a>
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
  border-radius: 1rem;
  font-family: var(--font-family-mono);
  font-weight: var(--font-weight-mono);
}
</style>
