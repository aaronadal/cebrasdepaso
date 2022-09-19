<template>
  <header id="main-menu">
    <div class="item">
      <router-link href="/"
                  :to="{name: 'home'}"
                  class="link"
                  @click.prevent>
          Nosotros
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
      <router-link href="/contacto"
                  :to="{name: 'contact'}"
                  class="link"
                  @click.prevent>
          Contacto
      </router-link>
    </div>
  </header>
</template>
