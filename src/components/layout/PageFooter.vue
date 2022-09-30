<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
} from '@/config'
import Tooltip from "@/components/Tooltip.vue";
import PlatformLinks from '@/components/PlatformLinks.vue'
import {ref} from "@vue/reactivity";

const showMoreAudioSources = ref(false);
</script>

<template>
  <footer id="page-footer">
    <div class="inner">
      <div class="container">
        <div class="info">
          <div>
            <h2>¡Escúchanos!</h2>
            <div>En tu plataforma favorita</div>
            <PlatformLinks :more="true" />
          </div>
          <div class="separator" />
          <div>
            <h2>¡Hablemos!</h2>
            <div>Por donde tú quieras</div>
            <div class="icon-items">
              <div>
                <a :href="INSTAGRAM_URL" target="_blank">
                  <Tooltip message="Por Instagram">
                    <Icon class="icon-item icon" weight="light" icon="instagram-logo" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <a :href="`mailto://${CONTACT_EMAIL}`" target="_blank">
                  <Tooltip message="Por Email">
                    <Icon class="icon-item icon" weight="light" icon="envelope-simple" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <router-link href="/contacto" :to="{name: 'contact'}">
                  <Tooltip message="Contacto">
                    <Icon class="icon-item icon" weight="light" icon="arrow-square-out" />
                  </Tooltip>
                </router-link>
              </div>
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
