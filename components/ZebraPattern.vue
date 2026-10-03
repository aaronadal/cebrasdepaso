<!-- The pattern weighs ~0.5 MB, so it lives in a static file the browser caches instead of in every page. -->
<script setup lang="ts">
import {zebraPatternUrl} from "~/composables/zebraPattern";
</script>

<template>
  <use :href="`${zebraPatternUrl}#zebra-pattern`"/>
</template>
