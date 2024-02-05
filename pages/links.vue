<script setup lang="ts">
import {definePageMeta, useCustomMeta} from "#imports";
import {useConfig} from '~/composables/config';

const {instagramUrl, contactEmail, podcastSpotifyUrl, podcastYoutubeUrl} = useConfig();

definePageMeta({
  pageKey: 'links',
  layout: 'landing',
});

useCustomMeta({
  title: 'Enlaces · Cebras de paso',
  description: 'En esta página te dejamos los enlaces más útiles e interesantes de Cebras de paso para ' +
      'que lo tengas todo al alcance de un click.',
});
</script>

<template>
  <div class="page">
    <section class="container">
      <NuxtLink to="/">
        <Logo />
      </NuxtLink>
    </section>
    <section class="container">
      <NuxtLink to="/ultimo" class="link-item">
        Escucha el último episodio
      </NuxtLink>
      <NuxtLink to="/podcast" class="link-item">
        Explora todos los episodios
      </NuxtLink>
      <NuxtLink :to="instagramUrl" class="link-item">
        Síguenos en Instagram
      </NuxtLink>
      <NuxtLink :to="podcastSpotifyUrl" class="link-item">
        Escúchanos en Spotify
      </NuxtLink>
      <NuxtLink :to="podcastYoutubeUrl" class="link-item">
        Míranos en YouTube
      </NuxtLink>
    </section>
    <section class="container">
      <h2>¡Escúchanos donde quieras!</h2>
      <PlatformLinks />
    </section>
  </div>
</template>
