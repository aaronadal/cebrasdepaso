<script setup lang="ts">
import {onActivated, onMounted, toRefs, ref, computed} from "vue";
import {CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight} from "#components";

const emit = defineEmits<{
  (e: 'init', page: number, items: any[]): void,
  (e: 'paginate', page: number, items: any[]): void,
}>()

interface Props {
    items: any[],
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
        <a role="navigation" @click="goTo(1)"><caret-double-left class="c-icon" /></a>
        <a role="navigation" @click="goTo(page - 1)"><caret-left class="c-icon" /></a>
        <a role="navigation" v-for="i in end" :key="i + start" @click="goTo(i + start)">{{ i + start }}</a>
        <a role="navigation" @click="goTo(page + 1)"><caret-right class="c-icon" /></a>
        <a role="navigation" @click="goTo(totalPages)"><caret-double-right class="c-icon" /></a>
    </div>
</template>
