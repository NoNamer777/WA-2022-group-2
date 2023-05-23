<template>
  <main>
    <div class="intro">
      <h1 class="text-primary">Plastic Problemen!</h1>
      <h3 class="text-primary">Leer over plastic met onze Slime!</h3>

      <div class="row">
        <div class="col-lg-6">
          <p class="text-markup">
            Welkom op de website!<br />
            Misschien heb je er nooit bij stilgestaan, maar de aarde is al 4,6 miljard jaar oud!
            <br />
            Dat ziet er zo uit: 4,543,000,000. Veel ouder dan jou en mij..<br />
            We hebben alleen één groot probleem: onze aarde zal niet lang meer meegaan als we niks
            doen!<br />
            Daarom willen we jou graag helpen om te leren over plastic afval en hoe je het kunt
            verminderen!
          </p>
        </div>

        <div class="col-lg-6 d-flex justify-content-md-around">
          <div class="slime-container">
            <img
              class="slime"
              src="/assets/images/mascot/mascotte_normal.png"
              alt="Normal Slime image"
            />
            <div class="thought-box">
              <p class="slime-text">Ik ben Slime! Laten we samen de wereld redden!</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-story">
      <h3 class="text-primary">Uitleg over plastic afval en het probleem!</h3>
      <div class="row">
        <div class="col-lg-6">
          <p class="text-markup">
            Op dit moment worden er veel plastic flessen weggegooid, terwijl je ze kunt recyclen
            voor statiegeld (15 cent)!<br />
            Als je ze niet inlevert, worden ze verbrand en dat is slecht voor de aarde.<br />
            Sterker nog, het merendeel van de plastic flessen wordt niet gerecycled en belandt in de
            zee.<br />
            De vissen eten het plastic op en dat is slecht voor de vissen en voor ons!<br />
            Wij eten namelijk ook vis en zo krijgen wij ook plastic binnen!
          </p>
        </div>

        <div class="col-lg-6 d-flex justify-content-sm-start">
          <div class="slime-container align-left">
            <img
              class="slime"
              src="/assets/images/mascot/mascotte_disappointed.png"
              alt="Disappointed Slime image"
            />
            <div class="thought-box">
              <p class="slime-text">Huh.. dat is meer dan ik dacht, wist jij dit?</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <h3 class="text-primary">Wist je dat?</h3>
      <p class="text-markup">
        1. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de aarde 4 keer
        rondgaan!<br />
        2. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de maan 2 keer
        bereiken!<br />
        3. Als je alle plastic flessen van 1 jaar op elkaar stapelt, kun je de Mount Everest 2 keer
        beklimmen!<br />
        4. Plastic bekertjes blijven 50-80 jaar op de aarde liggen voordat ze afgebroken worden.
      </p>
    </div>

    <div class="register">
      <h5 class="text-primary">Wil je meer leren? Registreer je dan en daag jezelf uit!</h5>
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import 'packages/client/src/public/assets/styles/bootstrap-custom.scss';

.primary-color {
  color: $primary;
}

.intro,
.main-story,
.footer,
.register {
  padding: 20px;
}

.intro,
.main-story {
  width: 100%;
}

.intro {
  height: 30%;
  margin-bottom: 5%;
}

.main-story {
  height: 35%;
}

.slime-container {
  position: relative;
}

.slime-text {
  margin: 2px 0 0 2px;
  text-align: center;
}

.slime {
  width: 250px;
  height: auto;
}

.thought-box {
  width: 200px;
  height: 120px;
  border: 4px solid $primary;
  background-color: $primary;
  text-align: center;
  color: #fff;
  padding: 10px;
  top: -57%;
  right: -50%;
  border-radius: 5px;
  font-weight: 700;
}

.thought-box::after {
  content: '';
  width: 30px;
  height: 30px;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid $primary;
  left: 6%;
  top: 89%;
  transform: translateX(-50%) rotate(300deg);
}

.align-left {
  margin-left: 40%;
}

@media (max-width: 768px) {
  .thought-box {
    left: 50%;
    bottom: 120%;
    transform: translateX(-50%);
  }

  .main-story {
    align-items: center;
  }

  .slime-container {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 20px;
  }

  .align-left {
    margin-left: 0;
  }
}
</style>
