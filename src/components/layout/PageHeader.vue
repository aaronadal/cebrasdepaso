<script setup lang="ts">
import MainMenu from '@/components/layout/MainMenu.vue'
import Logo from '@/components/Logo.vue'
import { ref } from '@vue/runtime-core'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  collapsed: false,
})

const route = useRoute()
const router = useRouter()

const logoStyle = ref(route.name === 'home' ? '' : 'cursor: pointer')
router.beforeEach((to) => {
  if (to.name === 'home') {
    logoStyle.value = ''
  } else {
    logoStyle.value = 'cursor: pointer'
  }
})

function onClickLogo () {
  if (route.name === 'home') {
    return
  }

  router.push({ name: 'home' })
}
</script>

<template>
  <header id="page-header" :class="{collapsed}">
    <div class="inner">
      <div class="container">
        <Logo :style="logoStyle" @click="onClickLogo" />
        <MainMenu />
      </div>
    </div>
  </header>
</template>
