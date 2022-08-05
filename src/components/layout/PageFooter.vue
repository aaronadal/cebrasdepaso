<script setup lang="ts">
</script>

<template>
  <footer id="page-footer">
    <div class="inner">
      <div class="container">
        <div class="info">
          <div>
            CEBRAS DE PASO
          </div>
          <address>
            Información de contacto.
          </address>
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
