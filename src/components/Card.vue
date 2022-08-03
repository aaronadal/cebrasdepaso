<script setup lang="ts">
declare interface Props {
    title: string,
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
            <h2 class="title">{{ title }}</h2>
            <div class="content">
                <slot />
            </div>
        </div>
    </article>
</template>
