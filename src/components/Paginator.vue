<script setup lang="ts">
import Icon from '@/components/Icon.vue'
import { ref, toRefs } from '@vue/reactivity'
import { computed, onActivated, onMounted } from '@vue/runtime-core'

// eslint-disable-next-line
const emit = defineEmits<{
  (e: 'init', page: number, items: unknown[]): void,
  (e: 'paginate', page: number, items: unknown[]): void,
}>()

interface Props {
    items: unknown[],
    itemsPerPage: number,
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
})

const { items, itemsPerPage } = toRefs(props)

const maxShown = 9

const page = ref(1)
const totalPages = computed(() => {
  return Math.ceil((items.value.length || 1) / itemsPerPage.value)
})

const theoreticalStart = computed(() => Math.max(1, page.value - Math.ceil(maxShown / 2) + 1))
const end = computed(() => Math.min(totalPages.value, theoreticalStart.value + maxShown - 1))
const start = computed(() => Math.max(0, end.value - maxShown))

function getSlicedItems () {
  return items.value.slice((page.value - 1) * itemsPerPage.value, page.value * itemsPerPage.value)
}

function goTo (number: number) {
  if (number < 1) {
    number = 1
  }

  if (number > totalPages.value) {
    number = totalPages.value
  }

  if (page.value === number) {
    return
  }

  page.value = number
  emit('paginate', number, getSlicedItems())
}

onMounted(() => emit('init', page.value, getSlicedItems()))
onActivated(() => {
  page.value = 1
  emit('init', page.value, getSlicedItems())
})


</script>

<template>
    <div class="paginator" v-if="end > 1">
        <a role="navigation" @click="goTo(1)"><Icon icon="caret-double-left" /></a>
        <a role="navigation" @click="goTo(page - 1)"><Icon icon="caret-left" /></a>
        <a role="navigation" v-for="i in end" :key="i + start" @click="goTo(i + start)">{{ i + start }}</a>
        <a role="navigation" @click="goTo(page + 1)"><Icon icon="caret-right" /></a>
        <a role="navigation" @click="goTo(totalPages)"><Icon icon="caret-double-right" /></a>
    </div>
</template>
