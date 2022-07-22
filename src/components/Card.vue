<script setup lang="ts">
declare interface Props {
    number: number,
    title: string,
}

// eslint-disable-next-line no-undef
defineProps<Props>()
</script>

<template>
    <article class="card">
        <div class="inner">
            <div class="thumbnail" :style="{background: `var(--gradient-${((number-1)%8)+1})`}">
                <span class="number">{{ number }}</span>
            </div>
            <h2 class="title">{{ title }}</h2>
            <div class="content">
                <slot />
            </div>
        </div>
    </article>
</template>
