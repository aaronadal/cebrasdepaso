<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { CONTACT_EMAIL } from '@/config'
</script>

<template>
  <footer id="page-footer">
    <div class="inner">
      <div class="container">
        <div class="info">
          <div>
            <h2>¡Escúchanos!</h2>
            <div>En tu plataforma favorita</div>
            <div class="icon-items">
              <Icon class="icon-item icon" weight="light" icon="spotify-logo" />
              <Icon class="icon-item icon" weight="light" icon="google-podcasts-logo" />
              <Icon class="icon-item icon" weight="light" icon="apple-podcasts-logo" />
              <Icon class="icon-item icon" weight="light" icon="rss" />
            </div>
          </div>
          <div class="separator" />
          <div>
            <h2>¡Hablemos!</h2>
            <address><a :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></address>
            <div class="icon-items">
              <Icon class="icon-item icon" weight="light" icon="facebook-logo" />
              <Icon class="icon-item icon" weight="light" icon="instagram-logo" />
              <Icon class="icon-item icon" weight="light" icon="twitter-logo" />
              <Icon class="icon-item icon" weight="light" icon="tiktok-logo" />
            </div>
          </div>
        </div>
        <nav class="legal-links">
          <div>
            <router-link
              class="link"
              href="/aviso-legal"
              :to="{name: 'legal'}">
                Aviso legal
            </router-link>
          </div>
          <div>
            <router-link
              class="link"
              href="/aviso-legal#toc-politica-de-privacidad"
              :to="{name: 'legal', hash: '#toc-politica-de-privacidad'}">
                Política de privacidad
            </router-link>
          </div>
          <div>
            <router-link
              class="link"
              href="/aviso-legal#toc-politica-de-cookies"
              :to="{name: 'legal', hash: '#toc-politica-de-cookies'}">
                Política de cookies
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </footer>
</template>
