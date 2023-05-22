<script setup>
const intro = {
  title: 'Plastic Problemen!',
  subtitle: 'Leer over plastic met onze Slime!'
};

const main = {
  subtitle: 'Uitleg over plastic afval en het probleem!'
};

const footer = {
  subtitle: 'Wist je dat?'
};

const register = {
  subtitle: 'Wil je meer leren? Registreer je dan en daag jezelf uit!'
};

const slimeNormal = {
  alt: 'Normal Slime image',
  context: 'Ik ben Slime! Laten we samen de wereld redden!'
};

const slimeDisappointed = {
  alt: 'Disappointed Slime image',
  context: 'Huh.. dat is meer dan ik dacht, wist jij dit?'
};
</script>

<template>
  <main>
    <div class="intro">
      <h1 class="title">{{ intro.title }}</h1>
      <h3 class="subtitle">{{ intro.subtitle }}</h3>

      <div class="row">
        <div class="col-lg-6">
          <p class="mb-4 text-markup">
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

        <div class="col-lg-6 d-flex justify-content-end">
          <div class="slime-container">
            <img
              class="slime"
              src="/assets/images/mascot/mascotte_normal.png"
              alt="{{ slimeNormal.alt }}"
            />
            <div class="thought-box top-right">
              <p class="slime-text">{{ slimeNormal.context }}</p>
              <div class="thought-link"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main-story">
      <h3 class="subtitle">{{ main.subtitle }}</h3>
      <div class="row">
        <div class="col-lg-6">
          <p class="mb-4 text-markup">
            Op dit moment worden er veel plastic flessen weggegooid, terwijl je ze kunt recyclen
            voor statiegeld (15 cent)!<br />
            Als je ze niet inlevert, worden ze verbrand en dat is slecht voor de aarde.<br />
            Sterker nog, het merendeel van de plastic flessen wordt niet gerecycled en belandt in de
            zee.<br />
            De vissen eten het plastic op en dat is slecht voor de vissen en voor ons!<br />
            Wij eten namelijk ook vis en zo krijgen wij ook plastic binnen!
          </p>
        </div>

        <div class="col-lg-6 d-flex justify-content-start">
          <div class="slime-container align-left">
            <img
              class="slime"
              src="/assets/images/mascot/mascotte_disappointed.png"
              alt="{{ slimeDisappointed.alt }}"
            />
            <div class="thought-box bottom-middle">
              <p class="slime-text">{{ slimeDisappointed.context }}</p>
              <div class="thought-link"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <h3 class="subtitle">{{ footer.subtitle }}</h3>
      <p class="mb-4 text-markup">
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
      <h5 class="mb-2 text-markup">{{ register.subtitle }}</h5>
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
    </div>
  </main>
</template>

<style scoped>
.title {
  font-size: 50px;
  font-weight: bold;
  padding-bottom: 10px;
}

.subtitle {
  font-size: 30px;
  font-weight: bold;
  color: #1d73dd;
  padding-bottom: 5px;
}

.intro {
  background-color: transparent;
  height: 30%;
  width: 100%;
  padding-left: 25px;
}

.slime-text {
  margin: 2px 0 0 2px;
  text-align: center;
}

.slime-container {
  max-width: 300px;
  margin-left: 30px;
  margin-right: 5px;
  position: relative;
}

.slime {
  width: 250px;
  height: auto;
}

.thought-box {
  position: absolute;
  width: 200px;
  height: 120px;
  border: 4px solid #1d73dd;
  background-color: #1d73dd;
  text-align: center;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-weight: 700;
}

.thought-box.top-right {
  top: -150px;
  right: -70px;
}

.thought-box.top-right::after {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #1d73dd;
  border-bottom: 10px solid transparent;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
}

.thought-box.bottom-middle {
  bottom: -90px;
  right: -50%;
  transform: translateX(-50%);
}

.thought-box.bottom-middle::after {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #1d73dd;
  border-top: 10px solid transparent;
  left: 50%;
  bottom: 100%;
  transform: translateX(-50%);
}

.align-left {
  margin-left: 55%;
}

.main-story {
  background-color: transparent;
  width: 100%;
  height: 35%;
  padding-top: 5%;
  padding-bottom: 20px;
  padding-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer {
  padding: 20px;
  width: 63%;
}

.register {
  padding: 20px;
}

@media (max-width: 768px) {
  .title {
    font-size: 40px;
  }

  .subtitle {
    font-size: 25px;
  }

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

  .footer {
    width: 100%;
  }
}
</style>
