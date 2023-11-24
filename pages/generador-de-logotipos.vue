<script setup lang="ts">
import html2canvas from "html2canvas";
import {ref} from "@vue/reactivity";
import {computed} from "@vue/runtime-core";
import {definePageMeta, useCustomMeta} from "#imports";
import {Logo, ProgressBar} from "#components";

const background = ref('transparent');
const size = ref(1080);
const margin = ref(0);
const displayText = ref('1');
const radius = ref(0);

const targetRef = ref();
const generating = ref(false);
const generatedImage = ref<string | null>(null);

const scale = computed(() => {
  const target = targetRef.value
  if (!target) {
    return 1
  }

  return size.value / parseInt(getComputedStyle(target).getPropertyValue('--card-thumbnail-size'))
});

function download() {
  if (generating.value) {
    return;
  }

  generating.value = true

  html2canvas(targetRef.value, {
    backgroundColor: null,
    scale: scale.value,
  })
      .then((canvas) => {
        generatedImage.value = canvas.toDataURL("image/png")
        generating.value = false
      });
}

definePageMeta({
  pageKey: 'logo-generator',
});

useCustomMeta({
  title: 'Generador de logotipos · Cebras de paso',
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
        <span>Color de fondo</span>
        <select v-model="background">
          <option value="transparent">Ninguno</option>
          <optgroup label="Degradados">
            <option value="var(--gradient-gray)">Neutro</option>
            <option value="var(--full-gradient)">Completo</option>
            <option value="var(--gradient-1)">Orange/Pink</option>
            <option value="var(--gradient-2)">Red/Purple</option>
            <option value="var(--gradient-3)">Pink/Blue</option>
            <option value="var(--gradient-4)">Purple/Cyan</option>
            <option value="var(--gradient-5)">Blue/Teal</option>
            <option value="var(--gradient-6)">Cyan/Green</option>
            <option value="var(--gradient-7)">Teal/Yellow</option>
            <option value="var(--gradient-8)">Green/Orange</option>
            <option value="var(--gradient-9)">Yellow/Red</option>
          </optgroup>

          <optgroup label="Colores sólidos">
            <option value="var(--color-orange)">Orange</option>
            <option value="var(--color-red)">Red</option>
            <option value="var(--color-pink)">Pink</option>
            <option value="var(--color-purple)">Purple</option>
            <option value="var(--color-blue)">Blue</option>
            <option value="var(--color-cyan)">Cyan</option>
            <option value="var(--color-teal)">Teal</option>
            <option value="var(--color-green)">Green</option>
            <option value="var(--color-yellow)">Yellow</option>
          </optgroup>
        </select>
      </label>
      <label>
        <span>Tamaño</span>
        <input type="number" min="1" max="8192" v-model="size"/>
      </label>
      <label>
        <span>Margen</span>
        <ProgressBar v-model="margin" :max="50" @drag="(value) => margin = value"/>
      </label>
      <label>
        <span>Mostrar texto</span>
        <select v-model="displayText">
          <option value="1">Sí</option>
          <option value="0">No</option>
        </select>
      </label>
      <label>
        <span>Redondear bordes</span>
        <ProgressBar v-model="radius" :max="50" @drag="(value) => radius = value"/>
      </label>
    </section>
    <section class="container" style="width: var(--card-thumbnail-size); padding: 0">
      <div ref="targetRef" :style="{
        width: '100%',
        aspectRatio: '1',
        background: background,
        borderRadius: `${radius}%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }">
        <Logo :class="{'no-text': displayText === '0'}" :style="`transform: scale(${1-(margin/100)})`"/>
      </div>
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

.logo.no-text {
  height: 127px;
}
</style>
