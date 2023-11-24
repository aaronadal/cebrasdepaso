<script setup lang="ts">
import {PhArrowSquareOut, PhEnvelopeSimple, PhInstagramLogo} from "@phosphor-icons/vue";

const { instagramUrl, contactEmail } = useAppConfig();
</script>

<template>
  <footer id="page-footer">
    <div class="inner">
      <div class="container">
        <div class="info">
          <div>
            <h2>¡Escúchanos!</h2>
            <div>En tu plataforma favorita</div>
            <PlatformLinks :more="true"/>
          </div>
          <div class="separator"/>
          <div>
            <h2>¡Hablemos!</h2>
            <div>Por donde tú quieras</div>
            <div class="icon-items">
              <div>
                <a :href="instagramUrl" target="_blank">
                  <Tooltip message="Por Instagram">
                    <PhInstagramLogo class="icon-item icon" weight="light" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <a :href="`mailto://${contactEmail}`" target="_blank">
                  <Tooltip message="Por Email">
                    <PhEnvelopeSimple class="icon-item icon" weight="light" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <NuxtLink to="/contacto">
                  <Tooltip message="Contacto">
                    <PhArrowSquareOut class="icon-item icon" weight="light" />
                  </Tooltip>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <nav class="legal-links">
          <div>
            <NuxtLink class="link" to="/aviso-legal">
                Aviso legal
            </NuxtLink>
          </div>
          <div>
            <NuxtLink class="link" to="/aviso-legal#toc-politica-de-privacidad">
                Política de privacidad
            </NuxtLink>
          </div>
          <div>
            <NuxtLink class="link" to="/aviso-legal#toc-politica-de-cookies">
                Política de cookies
            </NuxtLink>
          </div>
        </nav>
      </div>
    </div>
  </footer>
</template>
