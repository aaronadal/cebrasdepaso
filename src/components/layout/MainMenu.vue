<template>
  <header id="main-menu">
    <div class="item">
      <router-link href="/"
                  :to="{name: 'home'}"
                  class="link"
                  @click.prevent>
          Inicio
      </router-link>
    </div>
    <div class="item">
      <router-link href="/podcast"
                  :to="{name: 'podcast'}"
                  class="link"
                  @click.prevent>
          Podcast
      </router-link>
    </div>
    <div class="item">
      <router-link href="/nosotros"
                  :to="{name: 'about'}"
                  class="link"
                  @click.prevent>
          Cebras
      </router-link>
    </div>
  </header>
</template>
