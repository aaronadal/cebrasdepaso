<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import Cebra from '@/assets/cebra.mp3'
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>¿Qué es CEBRAS DE PASO?</h1>
      <p>CEBRAS DE PASO es lo que acontece cuando se juntan dos mentes quizá no del todo sanas y
        una frase cuyo poder es casi ilimitado. Las dos mentes son las nuestras
        (más adelante te contamos en detalle quiénes somos exactamente), y la frase es "¡Puede ser divertido!".</p>
    </section>
    <section class="container">
      <h2>¿Por qué CEBRAS y por qué DE PASO?</h2>
      <p>Bueno, pues muy sencillo: lo de "CEBRAS" es porque nos gusta rayarnos la cabeza. Y todos
        sabemos que, si algún animal se caracteriza por sus rayas, este es la cebra. Además,
        ¡las cebras molan!</p>
      <p>Por cierto, ¿sabías que este es el sonido que hacen las cebras? (Igualito a nosotros, ¿a que sí?)</p>

      <AudioPlayer
          :url="Cebra"
          type="audio/mpeg"
          title="¿Qué sonido hacen las cebras?"
          artist=""
          album=""
          :artworks="[]"
          is-media-session-disabled />

      <p>Lo de "DE PASO" es un poco más complejo. La versión corta (y que, probablemente, se aproxima
        más a la realidad) es que somos unos adictos a los juegos de palabras. La versión oficial,
        por su parte, dice que es porque somos unos nómadas del intelecto (o unos dispersos de manual,
        en términos menos llamativos). No nos centramos en una única temática, sino que vamos "pasando"
        de la una a la otra sin detenernos demasiado en cada una de ellas.</p>
    </section>
    <section class="container">
      <h2>¿Por qué un pódcast?</h2>
      <p>Es curioso. Solemos hablar mucho, incluso aunque no tengamos dos micrófonos delante.
        Cuando lo hacemos, surgen temáticas y reflexiones de lo más interesantes. El problema es
        que, unas veces porque no tenemos tiempo y otras porque divagamos y nos pasamos de CEBRAS,
        casi nunca llegamos a profundizar lo suficiente.</p>
      <p>Grabar un pódcast es la excusa perfecta para charlar sobre una temática concreta durante
        un tiempo suficiente y alcanzar cierto grado de profundidad.</p>
      <p>Además, tenemos la certeza de que sois mucha más gente con intereses similares a los nuestros
        ahí fuera en la infinidad del Internet y, oye, nos parece una buena idea poder conoceros.</p>
    </section>
    <section class="container">
      <h2>¿Quiénes conforman la manada?</h2>
    </section>
  </div>
</template>
