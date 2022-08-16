<script setup lang="ts">
declare interface Props {
    avatar: string,
    name: string,
}

// eslint-disable-next-line no-undef
defineProps<Props>()
</script>

<template>
    <article class="team-member">
        <img :src="avatar" class="avatar" />
        <h3 class="name">{{ name }}</h3>
        <div class="content">
            <slot />
        </div>
    </article>
</template>
