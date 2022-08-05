<script setup lang="ts">
import TableOfContents from '@/components/TableOfContents.vue'
import { ref } from '@vue/reactivity'
import { CONTACT_EMAIL } from '@/config'

const toc = ref()
</script>

<template>
  <div class="page">
    <section class="container">
      <h1>Aviso legal</h1>

      <h2>Índice</h2>
      <TableOfContents :target="toc" />
    </section>

    <div ref="toc" style="margin-top: 5rem;">
      <section class="container">
        <h2>Información legal y aceptación</h2>
        <p>
          En cumplimiento con lo establecido en la Ley 34/2002 de 11 de Julio, de
          Servicios de la Sociedad de la Información y el Comercio Electrónico
          (LSSICE), las presentes disposiciones regulan el uso del servicio del
          Website que Cebras de Paso pone a disposición de los usuarios de Internet.
        </p>
        <p>
          El acceso al Website es gratuito salvo en lo relativo al coste de la
          conexión a través de la red de telecomunicaciones suministrada por el
          proveedor de acceso contratado por los usuarios.
        </p>
        <p>
          La utilización del Website atribuye la condición de usuario del Website
          e implica la aceptación de todas las condiciones incluidas en este Aviso
          Legal. El Usuario debe leer atentamente el presente Aviso Legal y volver
          a él regularmente, ya que éste y sus condiciones de uso pueden sufrir
          modificaciones.
        </p>
      </section>

      <section class="container">
        <h2>Identificación del propietario</h2>
        <p>
          El Website es propiedad de Aarón Nadal y Laia López. Si necesitas contactar
          con nosotros puedes hacerlo a través de la dirección de correo electrónico
          <a class="link" :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a>.
        </p>
      </section>

      <section class="container">
        <h2>Propiedad intelectual</h2>
        <p>
          Todos los elementos que forman el Website (los textos, fotografías,
          gráficos, imágenes, iconos, tecnología y demás contenidos audiovisuales o
          sonoros, así como su estructura, diseño gráfico, códigos fuente, logos,
          marcas y demás signos distintivos) son titularidad de Cebras de Paso o
          de sus colaboradores y están protegidos por los correspondientes derechos
          de propiedad intelectual e industrial.
        </p>
        <p>
          Asímismo, el uso de los contenidos deberá respetar su licenciamiento
          particular. De tal modo, su uso, reproducción, distribución, comunicación
          pública, transformación o cualquier otra actividad similar queda
          totalmente prohibida salvo previa y expresa autorización de Cebras de Paso.
        </p>
        <p>
          Únicamente se autoriza la reproducción total o parcial de los textos y
          contenidos proporcionados por el sitio Web, siempre que concurran todas y
          cada una de las siguientes condiciones:
        </p>
        <ul class="list">
          <li>
            Se mantenga la integridad de los contenidos, documentos o gráficos.
          </li>
          <li>
            Se cite expresamente a Cebras de paso como fuente y origen de estos.
          </li>
          <li>
            El propósito y la finalidad de tal uso sea compatible con los fines del titular del sitio Web.
          </li>
          <li>
            No se pretenda un uso comercial, quedando expresamente prohibidas su distribución, comunicación pública o transformación
          </li>
        </ul>
        <p>
          Cualquier otro uso tendrá que ser comunicado y autorizado por Cebras de paso previa y expresamente.
        </p>

        <h3>De terceros</h3>
        <p>
          Cebras de Paso declara su respeto a los derechos de propiedad intelectual
          e industrial de terceros; por ello, si considera que el
          Website pudiera estar violando sus derechos, rogamos se ponga en
          contacto con nosotros.
        </p>
      </section>

      <section class="container">
        <h2>Condiciones generales de uso</h2>
        <p>
          El Website tiene como objeto facilitar al público, en general, el
          conocimiento de las actividades que esta organización realiza.
          El uso de cualquiera de las funcionalidades del sitio Web implica la
          expresa y plena aceptación de las condiciones aquí expuestas.
        </p>
        <p>
          Cebras de paso se reserva la facultad de efectuar, en cualquier
          momento y sin necesidad de previo aviso, modificaciones y actualizaciones
          de la información contenida en el Website o en la configuración y presentación
          de ésta.
        </p>
      </section>

      <section class="container">
        <h2>Exclusión de responsabilidad</h2>

        <h3>De la información</h3>
        <p>
          El acceso al Website no implica obligación por parte de Cebras de Paso de
          comprobar la veracidad, exactitud, adecuación, idoneidad, exhaustividad y
          actualidad de la información suministrada a través del mismo.
        </p>
        <p>
          Cebras de Paso no se responsabiliza de las decisiones tomadas a partir de
          la información suministrada en el Website.
        </p>

        <h3>De la calidad</h3>
        <p>
          El acceso al Website no implica la obligación por parte de Cebras de Paso
          de controlar la ausencia de virus, gusanos o cualquier otro elemento
          informático dañino. Corresponde al Usuario, en todo caso, la
          disponibilidad de herramientas adecuadas para la detección y desinfección
          de programas informáticos dañinos.
        </p>
        <p>
          Cebras de Paso no se responsabiliza de los daños producidos en los equipos
          informáticos de los Usuarios o de terceros durante la prestación del
          servicio del Website, ni del mal funcionamiento del navegador Web o el uso
          de versiones no actualizadas del mismo.
        </p>

        <h3>De la disponibilidad</h3>
        <p>
          El acceso al Website requiere de servicios y suministros de terceros,
          incluidos el transporte a través de redes de telecomunicaciones cuya
          fiabilidad, calidad, continuidad y funcionamiento no corresponde a Cebras
          de Paso. Por consiguiente, los servicios que se proveen a través del
          Website pueden ser suspendidos, cancelados o resultar inaccesibles.
        </p>
        <p>
          Cebras de Paso no se responsabiliza de los daños y perjuicios de cualquier
          tipo producidos en el Usuario a causa de fallos o desconexiones
          en las redes de telecomunicaciones que produzcan la suspensión,
          cancelación o interrupción del servicio.
        </p>

        <h3>De los contenidos enlazados</h3>
        <p>
          El servicio de acceso al Website incluye mecanismos que permiten al Usuario
          acceder a otras páginas y portales de Internet. En estos casos,
          Cebras de Paso actúa como prestador de servicios de intermediación de
          conformidad con el artículo 17 de la Ley 34/2002, de 12 de julio, de
          Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSICE)
          y sólo será responsable de los contenidos y servicios suministrados en los
          sitios enlazados en la medida en que tenga conocimiento efectivo de la ilicitud
          y no haya desactivado el enlace con la debida diligencia.
        </p>
        <p>
          En el supuesto de que el Usuario considere que existe un Sitio Enlazado
          con contenidos ilícitos o inadecuados podrá comunicárselo a Cebras de Paso
          sin que en ningún caso esta comunicación conlleve la obligación de
          retirar el correspondiente enlace.
        </p>
        <p>
          Asímismo, la existencia de sitios enlazados no debe presuponer en ningún caso la
          existencia de acuerdos con los responsables o titulares de los mismos, ni
          la recomendación, promoción o identificación de Cebras de Paso con las
          manifestaciones, contenidos o servicios que se proveen.
        </p>
        <p>
          Cebras de Paso no conoce los contenidos y servicios de los Sitios
          Enlazados y por tanto no se hace responsable por los daños producidos por
          la ilicitud, calidad, desactualización, indisponibilidad, error e
          inutilidad de los contenidos y/o servicios de los sitios enlazados ni por
          cualquier otro daño que no sea directamente imputable a Cebras de Paso.
        </p>
      </section>

      <section class="container">
        <h2>Política de privacidad</h2>
        <p>
          El Website <b>NO TRATA TUS DATOS PERSONALES</b>. No te vamos a pedir ningún dato
          para navegar, ni para acceder a ninguna sección del Website. Olvídate de cesiones
          de datos a terceros, de consentimientos y políticas de privacidad ininteligibles.
        </p>
        <p>Los únicos datos personales que podemos llegar a tratar son tu nombre y tu
          dirección de correo electrónico, aunque esto únicamente lo haremos si decides
          enviarnos un email de contacto y tan solo para poder dirigirnos a ti y responderte.
        </p>
      </section>

      <section class="container">
        <h2>Política de cookies</h2>
        <p>
          El Website <b>NO UTILIZA COOKIES</b>. Puedes navegar sin preocupaciones
          porque no analizamos las visitas, no realizamos seguimiento de ningún tipo y no cedemos
          tus datos a terceros.
        </p>
      </section>

      <section class="container">
        <h2>Jurisdicción</h2>
        <p>
          Cebras de Paso se reserva la facultad de presentar las acciones civiles o
          penales que considere necesarias por la utilización indebida del Website
          y contenidos, o por el incumplimiento de las presentes condiciones del
          Aviso Legal.
        </p>
      </section>

      <section class="container">
        <h2>Ley aplicable</h2>
        <p>
          La ley aplicable en caso de disputa o conflicto de interpretación de los
          términos que conforman este Aviso Legal, así como cualquier cuestión
          relacionada con los servicios del presente Website, se regirá por la
          normativa vigente y de aplicación en el territorio español.
        </p>
        <p>
          Reservados todos los derechos de autor por las leyes y tratados
          internacionales de propiedad intelectual. Queda expresamente prohibida su
          copia, reproducción o difusión, total o parcial, por cualquier medio.
        </p>
      </section>

      <section class="container">
        <p style="text-align: right;">Versión de 05 de agosto de 2022</p>
      </section>
    </div>
  </div>
</template>
