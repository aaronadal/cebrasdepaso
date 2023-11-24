<script setup lang="ts">
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
</script>

<template>
  <header id="page-header" :class="{collapsed}">
    <div class="inner">
      <div class="container">
        <NuxtLink to="/">
          <Logo :style="logoStyle" />
        </NuxtLink>
        <MainMenu />
      </div>
    </div>
  </header>
</template>
