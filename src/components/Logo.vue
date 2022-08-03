<template>
    <div class="logo">
        <div class="bars">
            <span v-for="i in [1, 2, 3, 4, 5, 6]" :key="i" class="bar" />
        </div>
        <div class="text">
            <span>CEBRAS DE PASO</span>
        </div>
    </div>
</template>
