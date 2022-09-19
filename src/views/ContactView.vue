<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import {CONTACT_EMAIL, INSTAGRAM_URL, TELEGRAM_URL} from "@/config";
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>¡Contacta con nosotros!</h1>
      <p>¿Quieres contarnos algo? ¿Decírnos que nos quieres? ¿Que nos odias, tal vez? ¿Que te gusta el pódcast?
        ¿Quieres hacernos saber que te caemos bien? ¿Que te gustaría ser nuestro amigo? ¿Quieres proponer algún tema?
        ¿Puntualizar alguna cosa que hayamos dicho? ¿Darnos tu opinión?</p>
      <p>Pues para eso y todo lo que se te ocurra, nos ponemos a tu disposición a través de estos tres canales:</p>
    </section>
    <section class="container">
      <div class="contact-channels">
        <div>
          <Icon icon="telegram-logo" weight="light" />
          <p>Abre un chat de Telegram con nosotros y cuéntanos lo que te apetezca. </p>
          <a class="button" :href="TELEGRAM_URL" target="_blank">Ir a Telegram</a>
        </div>
        <div>
          <Icon icon="instagram-logo" weight="light" />
          <p>También puedes enviarnos un mensaje a nuestra cuenta de Instagram. </p>
          <a class="button" :href="INSTAGRAM_URL" target="_blank">Ir a Instagram</a>
        </div>
        <div>
          <Icon icon="envelope-simple" weight="light" />
          <p>O, si lo prefieres, puedes contactarnos a través de nuestro email. </p>
          <a class="button" :href="`mailto:${CONTACT_EMAIL}`">Enviar email</a>
        </div>
      </div>
    </section>
    <section class="container">
      <p><b>Disclaimer:</b> Respondemos a TODOS los mensajes que nos enviáis. No obstante, a veces andamos más liados de lo que nos
        gustaría y es posible que tardemos. Si contactas con nosotros, por favor, ten paciencia. Y si después de
        unos días no te hemos dicho nada, no dudes en insistir. Somos CEBRAS y, como tales, es posible que alguna
        vez se nos traspapele algún mensaje.</p>
      <p>Dicho esto, ¡un placer conocerte!</p>
    </section>
  </div>
</template>
