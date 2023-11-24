<script setup lang="ts">
import {definePageMeta, useCustomMeta} from "#imports";
import {useConfig} from '~/composables/config';
import {EnvelopeSimpleLight, InstagramLogoLight} from "#components";

const {instagramUrl, contactEmail} = useConfig();

definePageMeta({
  pageKey: 'contact',
});

useCustomMeta({
  title: 'Contacto · Cebras de paso',
  description: '¿Quieres contarnos algo? ¿Decirnos que nos quieres? ¿Que nos odias, tal vez? ' +
      '¿Que te gusta el pódcast? ¿Quieres hacernos saber que te caemos bien? ¿Que te gustaría ser nuestro amigo? ' +
      '¿Quieres proponer algún tema? ¿Puntualizar alguna cosa que hayamos dicho? ¿Darnos tu opinión? ' +
      'En esta página podrás encontrar las vías más adecuadas para contactar con Cebras de paso.',
});
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>¡Contacta con las CEBRAS!</h1>
      <p>¿Quieres contarnos algo? ¿Decirnos que nos quieres? ¿Que nos odias, tal vez? ¿Que te gusta el pódcast?
        ¿Quieres hacernos saber que te caemos bien? ¿Que te gustaría ser nuestro amigo? ¿Quieres proponer algún tema?
        ¿Puntualizar alguna cosa que hayamos dicho? ¿Darnos tu opinión?</p>
      <p>Pues para eso y todo lo que se te ocurra, nos ponemos a tu disposición a través de estos dos canales:</p>
    </section>
    <section class="container">
      <div class="contact-channels">
        <div>
          <instagram-logo-light class="c-icon" />
          <p>Envíanos un mensaje<br />a nuestra cuenta<br />de Instagram.</p>
          <a class="button" :href="instagramUrl" target="_blank">Ir a Instagram</a>
        </div>
        <div>
          <envelope-simple-light class="c-icon" />
          <p>O, si lo prefieres,<br />contacta con nosotros<br />por email.</p>
          <a class="button" :href="`mailto:${contactEmail}`">Enviar email</a>
        </div>
      </div>
    </section>
    <section class="container">
      <p><b>Disclaimer:</b> Respondemos a TODOS los mensajes que nos enviáis. No obstante, a veces andamos más liadas de lo que nos
        gustaría y es posible que tardemos. Si contactas con nosotras, por favor, ten paciencia. Y si después de
        unos días no te hemos dicho nada, no dudes en insistir. Somos CEBRAS y, como tales, es posible que alguna
        vez se nos traspapele algún mensaje.</p>
      <p>Dicho esto, ¡un placer conocerte!</p>
    </section>
  </div>
</template>
