<script setup lang="ts">
import { ref, toRefs } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

interface Props {
  target: HTMLElement | undefined;
}

interface TocItem {
    title: string;
    anchor: string;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {})

const { target } = toRefs(props)

const toc = ref<TocItem[]>([])

function strToSlug (str: string) {
  const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;'
  const to = 'aaaaeeeeiiiioooouuuunc------'

  str = str.toLowerCase()
  for (let i = 0; i < from.length; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }

  return str
    .trim() // Remove whitespace from both sides of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-y-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
}

watch(target, (newTarget) => {
  if (!newTarget) {
    toc.value = []
    return
  }

  const tocItems: TocItem[] = []
  const items = newTarget.querySelectorAll('h2')
  items.forEach((item, index) => {
    if(!item.dataset['toc_numeral']) {
      item.dataset['toc_numeral'] = (index + 1).toString();
      item.dataset['toc_title'] = `${item.dataset['toc_numeral']}. ${item.textContent || ''}`;
      item.dataset['toc_anchor'] = `toc-${strToSlug(item.textContent || '')}`;
    }

    const title = item.dataset['toc_title'] || ''
    const anchor = item.dataset['toc_anchor'] || ''

    item.textContent = title;
    item.parentElement ? item.parentElement.id = anchor : item.id = anchor

    tocItems.push({
      title,
      anchor,
    })
  })

  toc.value = tocItems
})
</script>

<template>
  <aside class="toc">
    <ul>
      <li v-for="item, index in toc" :key="index">
        <router-link
          class="link"
          style="font-weight: var(--font-weight-text)"
          :href="`#${item.anchor}`"
          :to="{hash: `#${item.anchor}`}">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>
