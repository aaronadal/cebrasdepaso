<script setup lang="ts">
const toc = ref()
const { contactEmail } = useAppConfig();

definePageMeta({
  pageKey: 'legal',
});

useCustomMeta({
  title: 'Aviso legal · Cebras de paso',
})
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
          Este documento regula el uso de la web que ponemos a
          disposición de los usuarios de Internet, en cumplimiento con lo
          establecido en la Ley 34/2002 del 11 de Julio, de Servicios de
          la Sociedad de la Información y el Comercio Electrónico (LSSICE).
        </p>
        <p>
          La utilización de la web por parte del Usuario implica la aceptación de todas
          las condiciones incluidas en este Aviso Legal. El Usuario debe leer atentamente
          el documento y volver a él regularmente, ya que puede sufrir modificaciones.
        </p>
      </section>

      <section class="container">
        <h2>Identificación del propietario</h2>
        <p>
          La web es propiedad de Aarón Nadal y Laia López. Si necesitas contactar
          con nosotros puedes hacerlo a través de la dirección de correo electrónico
          <a class="link" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>.
        </p>
      </section>

      <section class="container">
        <h2>Propiedad intelectual</h2>
        <p>
          Todos los elementos que conforman la web (los textos, fotografías,
          gráficos, imágenes, iconos, tecnología y demás contenidos audiovisuales o
          sonoros, así como su estructura, diseño gráfico, códigos fuente, logos,
          marcas y demás signos distintivos) son propiedad de CEBRAS DE PASO o
          de nuestros colaboradores y están protegidos por los correspondientes
          derechos de propiedad intelectual e industrial.
        </p>
        <p>
          Por esta razón, su uso, reproducción, distribución, comunicación
          pública, transformación o cualquier otra actividad similar queda
          totalmente prohibida salvo previa y expresa autorización de CEBRAS DE PASO.
        </p>
        <p>
          Únicamente autorizamos la reproducción total o parcial de los contenidos
          de la web si se cumplen todas y cada una de las siguientes condiciones:
        </p>
        <ul class="list">
          <li>
            Se mantiene la integridad de los contenidos, documentos o gráficos.
          </li>
          <li>
            Se cita expresamente a CEBRAS DE PASO como fuente y origen de estos.
          </li>
          <li>
            El propósito y la finalidad del uso es compatible con los fines de CEBRAS DE PASO.
          </li>
          <li>
            No se pretende un uso comercial, quedando expresamente prohibida la distribución, comunicación pública o transformación.
          </li>
        </ul>
        <p>
          Para cualquier otro uso, puedes solicitar una autorización en el correo habilitado en el apartado anterior.
        </p>

        <h3>De terceros</h3>
        <p>
          CEBRAS DE PASO declara su respeto a los derechos de propiedad intelectual
          e industrial de terceros; por ello, si el Usuario considera que la web
          pudiera estar violando sus derechos, rogamos se ponga en contacto con nosotros a través del correo habilitado en el apartado anterior.
        </p>
      </section>

      <section class="container">
        <h2>Exclusión de responsabilidad</h2>

        <h3>De la información</h3>
        <p>
          El acceso a la web no implica obligación por parte de CEBRAS DE PASO de
          comprobar la veracidad, exactitud, adecuación, idoneidad, exhaustividad y
          actualidad de la información suministrada.
        </p>
        <p>
          CEBRAS DE PASO no se responsabiliza de las decisiones tomadas por el Usuario
          o por terceros a partir de la información suministrada en la web.
        </p>

        <h3>De la calidad</h3>
        <p>
          El acceso a la web no implica la obligación por parte de CEBRAS DE PASO
          de controlar la ausencia de virus, gusanos o cualquier otro elemento
          informático dañino. Corresponde al Usuario, en todo caso, la
          disponibilidad de herramientas adecuadas para la detección y desinfección
          de programas informáticos dañinos.
        </p>
        <p>
          CEBRAS DE PASO no se responsabiliza de los daños producidos en los equipos
          informáticos del Usuario o de terceros, del mal funcionamiento del navegador web o del uso
          de versiones no actualizadas del mismo.
        </p>

        <h3>De la disponibilidad</h3>
        <p>
          El acceso a la web requiere de servicios y suministros de terceros,
          incluidos el transporte a través de redes de telecomunicaciones cuya
          fiabilidad, calidad, continuidad y funcionamiento no corresponde a CEBRAS
          DE PASO. Por consiguiente, los servicios que se proveen a través del
          Website pueden ser suspendidos, cancelados o resultar inaccesibles.
        </p>
        <p>
          CEBRAS DE PASO no se responsabiliza de los daños y perjuicios de cualquier
          tipo producidos en el Usuario a causa de fallos o desconexiones
          en las redes de telecomunicaciones que produzcan la suspensión,
          cancelación o interrupción del servicio.
        </p>

        <h3>De los contenidos enlazados</h3>
        <p>
          El servicio de acceso a la web incluye mecanismos que permiten al Usuario
          acceder a otras páginas y portales de Internet. En estos casos,
          CEBRAS DE PASO actúa como prestador de servicios de intermediación de
          conformidad con el artículo 17 de la Ley 34/2002, de 12 de julio, de
          Servicios de la Sociedad de la Información y el Comercio Electrónico (LSSICE)
          y sólo será responsable de los contenidos y servicios suministrados en los
          sitios enlazados en la medida en que tenga conocimiento efectivo de la ilicitud
          y no haya desactivado el enlace con la debida diligencia.
        </p>
        <p>
          En el supuesto de que el Usuario considere que existe un Sitio Enlazado
          con contenidos ilícitos o inadecuados podrá comunicárselo a CEBRAS DE PASO
          sin que en ningún caso esta comunicación conlleve la obligación de
          retirar el correspondiente enlace.
        </p>
        <p>
          Asímismo, la existencia de sitios enlazados no debe presuponer en ningún caso la
          existencia de acuerdos con los responsables o titulares de los mismos, ni
          la recomendación, promoción o identificación de CEBRAS DE PASO con las
          manifestaciones, contenidos o servicios que se proveen.
        </p>
        <p>
          CEBRAS DE PASO no conoce los contenidos y servicios de los Sitios
          Enlazados y por tanto no se hace responsable por los daños producidos por
          la ilicitud, calidad, desactualización, indisponibilidad, error e
          inutilidad de los contenidos y/o servicios de los sitios enlazados ni por
          cualquier otro daño que no sea directamente imputable a CEBRAS DE PASO.
        </p>
      </section>

      <section class="container">
        <h2>Política de privacidad</h2>
        <p>
          Esta web <b>NO TRATA TUS DATOS PERSONALES</b>. No te vamos a pedir ningún dato
          para navegar, ni para acceder a ninguna sección del Website. Olvídate de cesiones
          de datos a terceros, de consentimientos y políticas de privacidad ininteligibles.
        </p>
        <p>
          Los únicos datos personales que podemos llegar a tratar son tu nombre y tu
          dirección de correo electrónico, aunque esto únicamente lo haremos si decides
          enviarnos un email de contacto y tan solo para poder dirigirnos a ti y responderte.
        </p>
      </section>

      <section class="container">
        <h2>Política de cookies</h2>
        <p>
          Esta web <b>NO UTILIZA COOKIES</b>. Puedes navegar sin preocupaciones
          porque no analizamos las visitas, no realizamos seguimiento de ningún tipo y no cedemos
          tus datos a terceros.
        </p>
      </section>

      <section class="container">
        <h2>Jurisdicción</h2>
        <p>
          CEBRAS DE PASO se reserva la facultad de presentar las acciones civiles o
          penales que considere necesarias por la utilización indebida de la web
          o sus contenidos, o por el incumplimiento de las presentes condiciones del
          Aviso Legal.
        </p>
      </section>

      <section class="container">
        <h2>Ley aplicable</h2>
        <p>
          La ley aplicable en caso de disputa o conflicto de interpretación de los
          términos que conforman este Aviso Legal, así como cualquier cuestión
          relacionada con los servicios de la web, se regirá por la
          normativa vigente y de aplicación en el territorio español.
        </p>
        <p>
          Reservados todos los derechos de autor por las leyes y tratados
          internacionales de propiedad intelectual. Queda expresamente prohibida su
          copia, reproducción o difusión, total o parcial, por cualquier medio.
        </p>
      </section>

      <section class="container">
        <p style="text-align: right;">Versión del 12 de septiembre de 2022</p>
      </section>
    </div>
  </div>
</template>
