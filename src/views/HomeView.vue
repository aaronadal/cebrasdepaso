<script setup lang="ts">
import Card from '@/components/Card.vue'
</script>

<template>
  <section class="container">
    <h1>Esto es CEBRAS DE PASO</h1>
    <p>El pódcast donde hablamos (con poco criterio, pero mucha voluntad) de las cosas de la vida.</p>
  </section>

  <section class="container">
    <h2>Lorem ipsum dolor sit amet</h2>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, <a class="link">remaining essentially</a> unchanged. It was popularised in
      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.</p>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap into
      electronic typesetting, <a class="link">remaining essentially</a> unchanged. It was popularised in
      the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
      and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.</p>
  </section>

  <section>
      <Card v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]" :key="i" :number="i" title="Recently with desktop publishing">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, <a class="link">remaining essentially</a> unchanged. It was popularised in
              the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum.</p>
      </Card>
  </section>

  <section class="container">
      <div :style="{display: 'flex', 'flex-direction': 'column', gap: '2rem', 'align-items': 'center'}">
        <div v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="i" :style="{background: `var(--gradient-${i})`, width: '10rem', height: '10rem', 'border-radius': '.5rem'}">
        </div>
      </div>
  </section>
</template>
