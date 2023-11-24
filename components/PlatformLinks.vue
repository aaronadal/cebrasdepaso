<script setup lang="ts">
import {ref} from "vue";
import {useConfig} from '~/composables/config';
import {
  ApplePodcastsLogoLight,
  GooglePodcastsLogoLight,
  SpotifyLogoLight,
  YoutubeLogoLight,
  AmazonMusicLogoCustomLight,
  IvooxLogoCustomLight,
  PocketcastsLogoCustomLight,
  OvercastsLogoCustomLight
} from "#components";

interface Props {
  more?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  more: false,
});

const {
  published,
  podcastRssUrl,
  podcastSpotifyUrl,
  podcastYoutubeUrl,
  podcastApplePodcastsUrl,
  podcastAmazonMusicUrl,
  podcastGooglePodcastsUrl,
  podcastIvooxUrl,
  podcastPocketcastsUrl,
  podcastOvercastUrl,
} = useConfig();

const showMore = ref(!props.more);

const rssCopied = ref(false);
let rssCopiedTimeout: ReturnType<typeof setTimeout> | null = null;

function copyRss() {
  navigator.clipboard.writeText(podcastRssUrl);
  rssCopied.value = true;

  if (rssCopiedTimeout) {
    clearTimeout(rssCopiedTimeout)
  }

  rssCopiedTimeout = setTimeout(() => {
    rssCopied.value = false;
  }, 1000);
}
</script>

<template>
  <div v-if="published" class="icon-items">
    <div v-if="podcastSpotifyUrl">
      <a :href="podcastSpotifyUrl" target="_blank">
        <Tooltip message="En Spotify">
          <spotify-logo-light class="icon-item icon"/>
        </Tooltip>
      </a>
    </div>
    <div v-if="podcastYoutubeUrl">
      <a :href="podcastYoutubeUrl" target="_blank">
        <Tooltip message="En Youtube">
          <youtube-logo-light class="icon-item icon"/>
        </Tooltip>
      </a>
    </div>
    <div v-if="podcastApplePodcastsUrl">
      <a :href="podcastApplePodcastsUrl" target="_blank">
        <Tooltip message="En Apple Podcasts">
          <apple-podcasts-logo-light class="icon-item icon"/>
        </Tooltip>
      </a>
    </div>
    <template v-if="showMore">
      <div v-if="podcastAmazonMusicUrl">
        <a :href="podcastAmazonMusicUrl" target="_blank">
          <Tooltip message="En Amazon Music">
            <amazon-music-logo-custom-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
      <div v-if="podcastGooglePodcastsUrl">
        <a :href="podcastGooglePodcastsUrl" target="_blank">
          <Tooltip message="En Google Podcasts">
            <google-podcasts-logo-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
      <div v-if="podcastIvooxUrl">
        <a :href="podcastIvooxUrl" target="_blank">
          <Tooltip message="En Ivoox">
            <ivoox-logo-custom-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
      <div v-if="podcastPocketcastsUrl">
        <a :href="podcastPocketcastsUrl" target="_blank">
          <Tooltip message="En PocketCasts">
            <pocketcasts-logo-custom-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
      <div v-if="podcastOvercastUrl">
        <a :href="podcastOvercastUrl" target="_blank">
          <Tooltip message="En Overcast">
            <overcasts-logo-custom-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
      <div>
        <a @click="copyRss()">
          <Tooltip :message="rssCopied ? '¡Enlace copiado!' : 'Feed RSS'">
            <rss-light class="icon-item icon"/>
          </Tooltip>
        </a>
      </div>
    </template>
    <div v-else>
      <Tooltip message="Más...">
        <dots-three-light style="cursor:pointer;" class="icon-item icon" @click="showMore = true"/>
      </Tooltip>
    </div>
  </div>
  <div v-else :style="{fontSize: '1.5rem', marginTop: '.25rem', lineHeight: '1'}">
    Próximamente<span class="loading-ellipsis"><span>.</span><span>.</span><span>.</span></span>
  </div>
</template>
