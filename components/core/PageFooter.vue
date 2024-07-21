<script setup lang="ts">
import {useConfig} from '~/composables/config';
import {ArrowSquareOutLight, EnvelopeSimpleLight, InstagramLogoLight, PlatformLinks, Tooltip} from "#components";
import LegalLinks from "~/components/core/LegalLinks.vue";
import YoutubeLogoLight from "~/components/icons/youtube-logo-light.vue";

const { instagramUrl, podcastYoutubeUrl, contactEmail } = useConfig();
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
                    <instagram-logo-light class="icon-item icon" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <a :href="podcastYoutubeUrl" target="_blank">
                  <Tooltip message="Por comentarios de YouTube">
                    <youtube-logo-light class="icon-item icon" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <a :href="`mailto://${contactEmail}`" target="_blank">
                  <Tooltip message="Por Email">
                    <envelope-simple-light class="icon-item icon" />
                  </Tooltip>
                </a>
              </div>
              <div>
                <NuxtLink to="/contacto">
                  <Tooltip message="Contacto">
                    <arrow-square-out-light class="icon-item icon" />
                  </Tooltip>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <LegalLinks />
      </div>
    </div>
  </footer>
</template>
