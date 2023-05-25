<template>
  <main>
    <section class="mb-5">
      <h1 class="text-primary">Plastic Problemen!</h1>

      <div class="row">
        <article class="col-xl-6 col-sm-12">
          <h3 class="text-primary">Leer over plastic met onze Slime!</h3>
          <p>
            Welkom op de website!<br />
            Misschien heb je er nooit bij stilgestaan, maar de aarde is al 4,6 miljard jaar oud!
            <br />
            Dat ziet er zo uit: 4,543,000,000. Veel ouder dan jou en mij..<br />
            We hebben alleen één groot probleem: onze aarde zal niet lang meer meegaan als we niks
            doen!<br />
            Daarom willen we jou graag helpen om te leren over plastic afval en hoe je het kunt
            verminderen!
          </p>
        </article>

        <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
          <img
            class="w-75"
            src="/assets/images/mascot/mascotte_normal_textbuble.png"
            alt="Normale Slime afbeelding"
          />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <div class="row">
        <article class="col-xl-6 col-sm-12">
          <h3 class="text-primary">Uitleg over plastic afval en het probleem!</h3>

          <p>
            Op dit moment worden er veel plastic flessen weggegooid, terwijl je ze kunt recyclen
            voor statiegeld (15 cent)!<br />
            Als je ze niet inlevert, worden ze verbrand en dat is slecht voor de aarde.<br />
            Sterker nog, het merendeel van de plastic flessen wordt niet gerecycled en belandt in de
            zee.<br />
            De vissen eten het plastic op en dat is slecht voor de vissen en voor ons!<br />
            Wij eten namelijk ook vis en zo krijgen wij ook plastic binnen!
          </p>
        </article>

        <div class="col-xl-6 col-sm-12 d-flex justify-content-center">
          <img
            class="w-75"
            src="/assets/images/mascot/mascotte_disappointed_textbuble.png"
            alt="Teleurgestelde Slime afbeelding"
          />
        </div>
      </div>
    </section>

    <section>
      <article>
        <h3 class="text-primary">Wist je dat?</h3>
        <p>
          1. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de aarde 4 keer
          rondgaan!<br />
          2. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de maan 2 keer
          bereiken!<br />
          3. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de Mount Everest 2
          keer beklimmen!<br />
          4. Plastic bekertjes blijven 50-80 jaar op de aarde liggen voordat ze afgebroken worden.
        </p>
      </article>
    </section>

    <section>
      <h5 class="text-primary">Wil je meer leren? Registreer je dan en daag jezelf uit!</h5>
      <router-link v-if="!isAuthenticated" class="btn btn-primary" :to="{ name: 'register' }">
        Registreer
      </router-link>
    </section>
  </main>
</template>
<script setup>
import { useAuthStore } from '../stores';
import { storeToRefs } from 'pinia';

const { isAuthenticated } = storeToRefs(useAuthStore());
</script>
