<script setup lang="ts">
import type {Episode, Podcast} from "~/composables/media";
import {computed, definePageMeta, inject, useCustomMeta} from "#imports";
import {useConfig} from '~/composables/config';
import type {ComputedRef, Ref} from "vue";
import {AudioPlayer, EpisodeCard, TeamMember} from "#components";

definePageMeta({
  pageKey: 'index',
});

const { published } = useConfig();

const podcast = inject('podcast') as Ref<Podcast>
const allEpisodes = inject('allEpisodes') as ComputedRef<Episode[]>

const trailer = computed<Episode|null>(() => [...allEpisodes.value].reverse()[0] || null);
const lastEpisode = computed<Episode|null>(() => [...allEpisodes.value].find((e) => e.episodeType === 'full') || null);

const yearsFromTrailer = computed<number>(() => {
  const trailerDate = trailer.value?.date;
  if(!trailerDate) {
    return 0;
  }

  const ageDifMs = Date.now() - new Date(trailerDate).getTime();
  const ageDate = new Date(ageDifMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970) + 1;
});

useCustomMeta({
  title: 'Cebras de paso · El pódcast donde hablamos de las cosas de la vida',
  description: '¡Esto es Cebras de paso! El pódcast donde hablamos —con poco criterio, pero mucha voluntad— ' +
      'de las cosas de la vida. Somos Aarón Nadal y Laia López, dos cebras muy cebras que conversan sobre temas ' +
      'que van desde lo absurdo a lo existencial. ¡Únete a la manada y acompáñanos en nuestras rayadas!',
});
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>¡Esto es CEBRAS DE PASO!</h1>
      <p>El pódcast donde hablamos —con poco criterio, pero mucha voluntad— de las cosas de la vida.
        <template v-if="published && lastEpisode">
          En nuestro último episodio —¡el #{{ lastEpisode?.number }} ya!— tratamos el tema
          {{ lastEpisode?.title?.toLowerCase() }}. A continuación te lo dejamos. Esperamos que te guste.
        </template>
      </p>
    </section>

    <section v-if="published && lastEpisode">
      <EpisodeCard
          :podcast="podcast"
          :episode="lastEpisode"
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
            mediaUrl:  '/cebra.mp3',
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
        que dice todos estamos aquí de paso: algún día nosotras no estaremos y serán otras CEBRAS las que ocupen
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
        ahí afuera en la vasta infinidad del Internet y, oye, nos parece una magnífica idea poder conoceros.</p>
      <p>(Si eres una de estas personas, por favor,
        <NuxtLink to="/contacto" class="link">contacta con nosotros</NuxtLink>)</p>
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
            y el ronroneo de sus gatos cuando se quedan dormidos en el sofá.</p>
          <p>En cambio, le disgustan las personas que no son lo que parecen, lo superficial
            y las cosas que no están en su lugar.
          </p>
        </TeamMember>
      </div>
    </section>

    <section class="container" v-if="published && trailer && trailer.episodeType === 'trailer'">
      <h2>Más sobre este proyecto</h2>
      <p>Si has llegado hasta aquí ya debes conocernos bien, pero hay una cosa que quizá no conozcas:
        nuestras voces. Por aquí te dejamos nuestro primer episodio, el episodio cero, en el que nos presentamos
        y te explicamos de viva voz y con un poco más de detalle de qué va este proyecto. Para que te vayas
        familiarizando con nosotros.</p>
      <p>Eso sí, ten en cuenta que han pasado ya {{ yearsFromTrailer }} años desde que grabamos esto.
        Éramos jóvenes e inexpertos&hellip;</p>

      <p style="text-align: center">
        <NuxtLink to="/podcast/avance/0" class="button neutral">
          Escucha el episodio #00
        </NuxtLink>
      </p>
    </section>

    <section class="container">
      <h2>Y ahora, ¿qué?</h2>
      <p>Bueno, ya nos conoces bien, sabes de qué va el proyecto, te has empapado de todos los porqués
        que nos han traído hasta aquí y has escuchado nuestras voces.</p>
      <p>Ahora te falta lo más importante:</p>
      <p style="text-align: center">
        <NuxtLink to="/podcast" class="button">
          ¡Escucha a las cebras!
        </NuxtLink>
      </p>
    </section>
  </div>
</template>
