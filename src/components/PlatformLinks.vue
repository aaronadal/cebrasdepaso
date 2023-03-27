<script setup lang="ts">
import { ref } from "@vue/reactivity";
import {
  PUBLISHED,
  PODCAST_AMAZON_MUSIC_URL,
  PODCAST_APPLE_PODCASTS_URL,
  PODCAST_GOOGLE_PODCASTS_URL,
  PODCAST_IVOOX_URL,
  PODCAST_OVERCAST_URL,
  PODCAST_POCKETCASTS_URL,
  PODCAST_RSS_URL,
  PODCAST_SPOTIFY_URL
} from '@/config'
import Icon from "@/components/Icon.vue";
import Tooltip from "@/components/Tooltip.vue";

interface Props {
  more?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  more: false,
});

const showMore = ref(!props.more);

const rssCopied = ref(false);
let rssCopiedTimeout: ReturnType<typeof setTimeout>|null = null;

function copyRss() {
  navigator.clipboard.writeText(PODCAST_RSS_URL);
  rssCopied.value = true;

  if(rssCopiedTimeout) {
    clearTimeout(rssCopiedTimeout)
  }

  rssCopiedTimeout = setTimeout(() => {
    rssCopied.value = false;
  }, 1000);
}
</script>

<template>
  <div v-if="PUBLISHED" class="icon-items">
    <div v-if="PODCAST_SPOTIFY_URL !== null">
      <a :href="PODCAST_SPOTIFY_URL" target="_blank">
        <Tooltip message="En Spotify">
          <Icon class="icon-item icon" weight="light" icon="spotify-logo" />
        </Tooltip>
      </a>
    </div>
    <div v-if="PODCAST_GOOGLE_PODCASTS_URL !== null">
      <a :href="PODCAST_GOOGLE_PODCASTS_URL" target="_blank">
        <Tooltip message="En Google Podcasts">
          <Icon class="icon-item icon" weight="light" icon="google-podcasts-logo" />
        </Tooltip>
      </a>
    </div>
    <div v-if="PODCAST_APPLE_PODCASTS_URL !== null">
      <a :href="PODCAST_APPLE_PODCASTS_URL" target="_blank">
        <Tooltip message="En Apple Podcasts">
          <Icon class="icon-item icon" weight="light" icon="apple-podcasts-logo" />
        </Tooltip>
      </a>
    </div>
    <template v-if="showMore">
    <div v-if="PODCAST_AMAZON_MUSIC_URL !== null">
        <a :href="PODCAST_AMAZON_MUSIC_URL" target="_blank">
          <Tooltip message="En Amazon Music">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M65.64,46.26a5,5,0,0,1-2.77.75,17,17,0,0,1-5.23-.75,6.16,6.16,0,0,0-1-.21c-.32,0-.43.21-.43.64v1.07a1.66,1.66,0,0,0,.21.75,1.72,1.72,0,0,0,.65.42A14.12,14.12,0,0,0,62.87,50a8.32,8.32,0,0,0,5.33-1.6,5,5,0,0,0,2-4.27,4.85,4.85,0,0,0-1-3.09,7.49,7.49,0,0,0-3.2-2l-3-1.18a5.58,5.58,0,0,1-2.35-1.28,2,2,0,0,1-.64-1.6c0-1.6,1.18-2.45,3.63-2.45a12.83,12.83,0,0,1,4.06.64c.42.1.74.21.85.21.32,0,.53-.21.53-.64V31.64A1.47,1.47,0,0,0,69,30.9c-.11-.22-.32-.32-.64-.43a15.27,15.27,0,0,0-4.8-.85,8.24,8.24,0,0,0-5,1.49,4.76,4.76,0,0,0-1.92,4c0,2.45,1.39,4.27,4.16,5.33l3.21,1.18a6.54,6.54,0,0,1,2.13,1.17,1.86,1.86,0,0,1,.53,1.5A2.33,2.33,0,0,1,65.64,46.26Z" transform="translate(0)"/><path d="M48.89,30.9V45.09a10.1,10.1,0,0,1-5.45,1.82,3.17,3.17,0,0,1-2.56-1,4.58,4.58,0,0,1-.74-3V30.9c0-.54-.22-.75-.75-.75H37.15c-.54,0-.75.21-.75.75V44.13a5.9,5.9,0,0,0,1.39,4.27A5.66,5.66,0,0,0,42,49.89a12.26,12.26,0,0,0,7.26-2.56l.21,1.28a.51.51,0,0,0,.32.54c.11.1.32.1.64.1H52c.54,0,.75-.21.75-.74V30.9c0-.54-.21-.75-.75-.75H49.74C49.1,30.15,48.89,30.47,48.89,30.9Z" transform="translate(0)"/><path d="M28.61,49.36h2.24c.54,0,.75-.21.75-.75V35.27a5.62,5.62,0,0,0-1.39-4.16,5.39,5.39,0,0,0-4.05-1.49,12.55,12.55,0,0,0-7.47,2.66c-.86-1.81-2.46-2.66-4.81-2.66a12.51,12.51,0,0,0-7,2.45L6.63,30.9a.51.51,0,0,0-.32-.54.86.86,0,0,0-.54-.1H4.06c-.53,0-.74.21-.74.74V48.72c0,.53.21.75.74.75H6.31c.53,0,.74-.22.74-.75V34.31A10.88,10.88,0,0,1,12.6,32.6a2.48,2.48,0,0,1,2.24,1,4.8,4.8,0,0,1,.75,2.78V48.61c0,.54.21.75.75.75h2.24c.53,0,.75-.21.75-.75V34.31a10.5,10.5,0,0,1,5.55-1.71,2.5,2.5,0,0,1,2.24,1,4.88,4.88,0,0,1,.74,2.78V48.61C27.86,49.15,28.08,49.36,28.61,49.36Z" transform="translate(0)"/><path d="M86.77,63.55a94.12,94.12,0,0,1-35.85,7.37A94.25,94.25,0,0,1,4,58.43a1.51,1.51,0,0,0-.64-.21c-.75,0-1.18.85-.43,1.6a69.6,69.6,0,0,0,47,17.93c13,0,28.07-4.06,38.42-11.74C90.08,64.73,88.59,62.81,86.77,63.55Z" transform="translate(0)"/><path d="M86.45,34.42c1-1.07,2.46-1.6,4.59-1.6a9.89,9.89,0,0,1,3.1.42,1.53,1.53,0,0,0,.64.11c.32,0,.53-.21.53-.75V31.54a1.24,1.24,0,0,0-.21-.75,2.31,2.31,0,0,0-.54-.43,18.69,18.69,0,0,0-4-.64,9,9,0,0,0-6.94,2.67c-1.6,1.71-2.45,4.27-2.45,7.47s.74,5.66,2.35,7.37a8.88,8.88,0,0,0,6.83,2.56A10.53,10.53,0,0,0,94.56,49c.33-.11.54-.21.65-.43s.1-.42.1-.74V46.8c0-.54-.21-.75-.53-.75a1.16,1.16,0,0,0-.54.11,13.24,13.24,0,0,1-3.41.53,5.72,5.72,0,0,1-4.48-1.6c-1-1.07-1.39-2.77-1.39-5v-.53C85.07,37.19,85.49,35.49,86.45,34.42Z" transform="translate(0)"/><path d="M91.26,73.59c5.55-4.7,7-14.41,5.87-15.91-.54-.64-3.1-1.28-6.3-1.28a19.1,19.1,0,0,0-10.57,2.88c-1,.65-.74,1.5.22,1.39,3.31-.42,10.78-1.28,12.16.43S91.15,69.85,89.87,73C89.55,73.91,90.3,74.23,91.26,73.59Z" transform="translate(0)"/><path d="M76.42,30.15H74.18c-.53,0-.75.21-.75.75V48.61c0,.54.22.75.75.75h2.24c.54,0,.75-.21.75-.75V30.9A.67.67,0,0,0,76.42,30.15Z" transform="translate(0)"/><path d="M77.06,22.89a2.51,2.51,0,0,0-1.81-.64,2.29,2.29,0,0,0-1.71.64,2.16,2.16,0,0,0-.64,1.6,2,2,0,0,0,.64,1.6,2.6,2.6,0,0,0,3.42,0,2.19,2.19,0,0,0,.64-1.6A2,2,0,0,0,77.06,22.89Z" transform="translate(0)"/></svg>
          </Tooltip>
        </a>
      </div>
      <div>
        <a :href="PODCAST_IVOOX_URL" target="_blank">
          <Tooltip message="En Ivoox">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M49.67,26.44a4,4,0,1,1-2.93,6.83,4,4,0,0,1-1.1-2.91,3.89,3.89,0,0,1,4-3.92m0-4a8,8,0,1,0,7.93,8,7.87,7.87,0,0,0-7.93-8Z" transform="translate(0)"/><path d="M50,14.33a36,36,0,0,1,11.3,70.23V67c0-2.77,0-4.36,0-5.94s0-3.23,0-6.07c0-4.54-2.2-6.76-4.07-7.83a11,11,0,0,0-4.89-1.48h-.14c-3.08,0-6.36-.07-10.66-.07H31a4.76,4.76,0,0,0-4.95,5v0c.05,4,.05,8,0,12v0a4.69,4.69,0,0,0,4.95,5h.06c1.15,0,2.3,0,3.45,0h4.25c0,4.44,0,6.8,0,9.16,0,2.09,0,4.19,0,7.73a36,36,0,0,1,6.65-70A38.32,38.32,0,0,1,50,14.33m0-4a42.52,42.52,0,0,0-5,.3A40,40,0,0,0,10.15,53.92C11.86,73.71,27.6,87.38,42.92,89.61a3.36,3.36,0,0,0-.11-1c0-12.44-.05-11.14-.05-23.64,0-1.28,0-1.28-1.23-1.28l-7,0c-1.17,0-2.34,0-3.51,0-.74,0-.95-.21-.95-1q.07-6.06,0-12.12c0-.75.21-1,.95-1l10.57,0c3.53,0,7.07,0,10.6.07a7,7,0,0,1,3.09,1c1.59.9,2.07,2.55,2.07,4.36,0,5.64,0,6.42,0,12V88.76c0,.32,0,.59,0,.91A40,40,0,0,0,50,10.33Z" transform="translate(0)"/></svg>
          </Tooltip>
        </a>
      </div>
      <div>
        <a :href="PODCAST_POCKETCASTS_URL" target="_blank">
          <Tooltip message="En PocketCasts">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M50,14A36,36,0,1,1,14,50,36,36,0,0,1,50,14m0-4A40,40,0,1,0,90,50,40,40,0,0,0,50,10Z" transform="translate(0)"/><path d="M50,77.05A27.05,27.05,0,1,1,77.05,50h-4a23,23,0,1,0-23,23Z" transform="translate(0)"/><path d="M50,64.69A14.69,14.69,0,1,1,64.69,50h-4A10.69,10.69,0,1,0,50,60.69Z" transform="translate(0)"/></svg>
          </Tooltip>
        </a>
      </div>
    <div v-if="PODCAST_OVERCAST_URL !== null">
        <a :href="PODCAST_OVERCAST_URL" target="_blank">
          <Tooltip message="En Overcast">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M81,24.71A40,40,0,1,0,90,50,40,40,0,0,0,81,24.71ZM42.3,85.19,50,57.47l7.7,27.72a35.71,35.71,0,0,1-15.4,0ZM77.91,72.75A36.19,36.19,0,0,1,61.55,84.12L53.63,55.59a6.67,6.67,0,1,0-7.26,0L38.45,84.12A36.06,36.06,0,1,1,77.91,72.75Z" transform="translate(0)"/><path d="M29.66,66.58h0a2,2,0,0,0,.37-2.7,24.27,24.27,0,0,1,0-27.76,2,2,0,0,0-.37-2.7h0a2,2,0,0,0-2.91.39,28.34,28.34,0,0,0,0,32.38A2,2,0,0,0,29.66,66.58Z" transform="translate(0)"/><path d="M74.33,50A24.16,24.16,0,0,1,70,63.88a2,2,0,0,0,.37,2.7h0a2,2,0,0,0,2.91-.39,28.34,28.34,0,0,0,0-32.38,2,2,0,0,0-2.91-.39h0a2,2,0,0,0-.37,2.7A24.16,24.16,0,0,1,74.33,50Z" transform="translate(0)"/><path d="M62.54,39.78h0a2,2,0,0,0-.4,2.65,14.29,14.29,0,0,1,0,15.14,2,2,0,0,0,.4,2.65h0a2,2,0,0,0,3-.5,18.33,18.33,0,0,0,0-19.44A2,2,0,0,0,62.54,39.78Z" transform="translate(0)"/><path d="M35.69,50a14.18,14.18,0,0,1,2.17-7.57,2,2,0,0,0-.4-2.65h0a2,2,0,0,0-3,.5,18.33,18.33,0,0,0,0,19.44,2,2,0,0,0,3,.5h0a2,2,0,0,0,.4-2.65A14.18,14.18,0,0,1,35.69,50Z" transform="translate(0)"/></svg>
          </Tooltip>
        </a>
      </div>
    <div v-if="PODCAST_RSS_URL !== null">
        <a @click="copyRss()">
          <Tooltip :message="rssCopied ? '¡Enlace copiado!' : 'Feed RSS'">
            <Icon class="icon-item icon" weight="light" icon="rss" />
          </Tooltip>
        </a>
      </div>
    </template>
    <div v-else>
      <Tooltip message="Más...">
        <Icon style="cursor:pointer;" class="icon-item icon" weight="light" icon="dots-three" @click="showMore = true" />
      </Tooltip>
    </div>
  </div>
  <div v-else :style="{fontSize: '1.5rem', marginTop: '.25rem', lineHeight: '1'}">
    Próximamente<span class="loading-ellipsis"><span>.</span><span>.</span><span>.</span></span>
  </div>
</template>
