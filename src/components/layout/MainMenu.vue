<template>
  <header id="main-menu">
    <router-link href="/"
                 :to="{name: 'home'}"
                 class="item"
                 @click.prevent>
        Inicio
    </router-link>
    <router-link href="/"
                 :to="{name: 'home'}"
                 class="item"
                 @click.prevent>
        Podcast
    </router-link>
    <router-link href="/"
                 :to="{name: 'home'}"
                 class="item"
                 @click.prevent>
        Nosotros
    </router-link>
  </header>
</template>
