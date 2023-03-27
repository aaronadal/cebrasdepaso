<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer.vue'
import TeamMember from "@/components/TeamMember.vue";
import Cebra from '@/assets/cebra.mp3'
import EpisodeCard from "@/components/EpisodeCard.vue";
import {PUBLISHED} from "@/config";
import {ComputedRef, inject, Ref} from "vue";
import {Episode, Podcast} from "@/media-types";
import {computed} from "@vue/runtime-core";

const podcast = inject('podcast') as Ref<Podcast>
const allEpisodes = inject('allEpisodes') as ComputedRef<Episode[]>

const trailer = computed(() => [...allEpisodes.value].reverse()[0] || null);
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>¡Esto es CEBRAS DE PASO!</h1>
      <p>El pódcast donde hablamos —con poco criterio, pero mucha voluntad— de las cosas de la vida.
        Si todavía no nos conoces, aquí tienes una breve introducción:</p>
    </section>

    <section v-if="PUBLISHED && trailer && trailer.episodeType === 'trailer'">
      <EpisodeCard
          :podcast="podcast"
          :episode="trailer"
          class="bordered"
          style="margin-top: 2rem;"
          full-background
          no-link
      />
    </section>

    <section class="container">
      <h2>¿Qué es CEBRAS DE PASO?</h2>
      <p>CEBRAS DE PASO es lo que acontece cuando se juntan dos mentes quizá no del todo sanas y
        una frase cuyo poder es casi ilimitado. Las dos mentes son las nuestras
        (más adelante te contamos en detalle quiénes somos exactamente), y la frase es "¡Puede ser divertido!".</p>
    </section>

    <section class="container">
      <h2>¿Por qué CEBRAS y por qué DE PASO?</h2>
      <p>Bueno, pues muy sencillo: lo de "CEBRAS" es porque nos gusta rayarnos la cabeza. Y todos
        sabemos que, si algún animal se caracteriza por sus rayas, este es la cebra. Además,
        ¡las cebras molan!</p>
      <p>Por cierto, ¿sabías que este es el sonido que hacen las cebras? (Igualito a nosotras, ¿a que sí?)
        ¡Si es que no podríamos haber elegido un nombre mejor!</p>

      <AudioPlayer
          :track="{
            mediaUrl:  Cebra,
            mediaType: 'audio/mpeg',
            title:     '¿Qué sonido hacen las cebras?',
            artist:    '',
            album:     '',
          }"/>

      <p>Lo de "DE PASO" es un poco más complejo. La versión corta (y que, probablemente, se aproxima
        más a la realidad) es que somos unas adictas a los juegos de palabras. La versión oficial,
        por su parte, dice que es porque somos unas nómadas del intelecto (o unas dispersas de manual,
        en términos de andar por casa): no nos centramos en una única temática, sino que vamos "pasando"
        de la una a la otra sin detenernos demasiado. Por último, está la versión antropológica y existencial,
        que dice todos estamos aquí de paso, algún día nosotras no estaremos y serán otras CEBRAS las que ocupen
        nuestro lugar. Puedes quedarte con la que más te guste de las tres.</p>
    </section>

    <section class="container">
      <h2>¿Por qué un pódcast?</h2>
      <p>Es curioso. Solemos hablar mucho, incluso aunque no tengamos dos micrófonos delante.
        Cuando lo hacemos, surgen temáticas y reflexiones de lo más interesantes. El problema es
        que, unas veces porque no tenemos tiempo y otras porque divagamos y nos pasamos de CEBRAS,
        casi nunca llegamos a profundizar lo suficiente.</p>
      <p>Grabar un pódcast es la excusa perfecta para charlar sobre una temática concreta durante
        un tiempo suficiente y alcanzar cierto grado de profundidad. Y, como punto a favor,
        queda la conversación grabada para la posteridad. ¡Si es que son todo ventajas!</p>
      <p>Además, tenemos la certeza de que <b>sois muchísima más gente con intereses similares a los nuestros</b>
        ahí afuera en la vasta infinidad del Internet y, oye, nos parece una magnífica idea poder conoceros.
        (Si eres una de estas personas, por favor,
        <router-link href="/contacto" :to="{name: 'contact'}" class="link">contacta con nosotros</router-link>
        )
      </p>
    </section>

    <section class="container">
      <h2>¿Quiénes conforman la manada?</h2>
      <div class="team">
        <TeamMember avatar="/cebrasdepaso-aaron-nadal.jpg" name="Aarón Nadal">
          <p><b>Desarrollador web, diseñador y tremendamente disperso.</b></p>
          <p>Le encanta el olor que se produce al abrir un libro por primera vez, la luz al incidir
            sobre las cosas, la luna y las duchas de agua fría en días de calor.</p>
          <p>En cambio, le disgustan los ambientes ruidosos, los días de viento y
            las cosas que se quedan a mitad hacer.</p>
        </TeamMember>
        <TeamMember avatar="/cebrasdepaso-laia-lopez.jpg" name="Laia López">
          <p><b>Teacher a tiempo completo (excepto en verano) y cabecita loca.</b></p>
          <p>Le encanta fijarse en los detalles que nadie más ve, las sombras y los reflejos, el mar
            y el ronroneo de su gata cuando ambas se quedan dormidas en el sofá.</p>
          <p>En cambio, le disgustan las personas que no son lo que parecen, lo superficial
            y las cosas que no están en su lugar.
          </p>
        </TeamMember>
      </div>
    </section>
  </div>
</template>
