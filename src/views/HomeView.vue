<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import IntroCebras from '@/assets/intro-cebras.mp3'
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>Esto es CEBRAS DE PASO</h1>
      <p>El pódcast donde hablamos —con poco criterio, pero mucha voluntad— de las cosas de la vida.</p>
    </section>

    <section class="container">
      <h2>Si todavía no nos conoces</h2>
      <p>Aquí tienes una breve introducción sobre quiénes somos y qué es esto de las cebras:</p>

      <AudioPlayer
          :url="IntroCebras"
          type="audio/mpeg"
          title="Breve introducción a CEBRAS DE PASO"
          artist=""
          album=""
          :artworks="[]"
          is-media-session-disabled />

        <p>Además, en esta misma web puedes encontrar una sección con
          <router-link href="/nosotros" :to="{name: 'about'}" class="link">información sobre nosotros</router-link>
          y otra con todos los
          <router-link href="/podcast" :to="{name: 'podcast'}" class="link">episodios que hemos publicado</router-link>
          hasta ahora para que puedas ponerte al día.
        </p>
    </section>
  </div>
</template>
