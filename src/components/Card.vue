<script setup lang="ts">
interface Props {
    title?: string,
}

// eslint-disable-next-line no-undef
defineProps<Props>()
</script>

<template>
    <article class="card">
        <div class="inner">
            <div class="thumbnail">
                <slot name="thumbnail" />
            </div>
            <h2 class="title">
              <slot name="title">
                {{ title }}
              </slot>
            </h2>
            <div class="content">
                <slot />
            </div>
        </div>
    </article>
</template>
