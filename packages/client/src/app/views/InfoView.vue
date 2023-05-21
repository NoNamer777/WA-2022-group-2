<template>
  <main>
    <div class="intro">
      <h1 class="mb-4-title text-primary">Plastic Problemen!</h1>
      <h3 class="mb-4-subtitle">Leer over plastic met onze Slime!</h3>

      <div class="intro-text d-flex flex-row flex-wrap">
        <p class="mb-4 text-markup">
          Welkom op de website! <br />
          Misschien heb je er nooit bij stilgestaan, maar de aarde is al 4,6 miljard jaar oud!
          <br />
          Dat ziet er zo uit: 4,543,000,000. Veel ouder dan jou en mij.. <br />
          We hebben alleen één groot probleem: onze aarde zal niet lang meer meegaan als we niks
          doen!
          <br />
          Daarom willen we jou graag helpen om te leren over plastic afval en hoe je het kan
          verminderen! <br />
        </p>

        <div class="slime-container">
          <img class="slime" src="/assets/images/mascot/mascotte_normal.png" alt="mascot_normal" />
          <div class="thought-box-1">
            <p class="slime-text">
              Ik ben Slime! <br />
              Laten we samen de wereld redden! <br />
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="main-story">
      <h3 class="mb-4-subtitle">Uitleg over plastic afval en het probleem!</h3>
      <div class="main-text">
        <p class="mb-4 text-markup">
          Op dit moment worden er veel plastic flessen weggegooid, terwijl je ze kunt recyclen voor
          statiegeld (15 cent)!<br />
          Als je ze niet inlevert, worden ze verbrand en dat is slecht voor de aarde. <br />
          Sterker nog, het meerendeel van de plastic flessen wordt niet gerecycled en belandt in de
          zee. <br />
          De vissen eten het plastic op en dat is slecht voor de vissen en voor ons! <br />
          Wij eten namelijk ook vis en zo krijgen wij ook plastic binnen! <br />
          <br />
        </p>

        <div class="slime-container-2">
          <img
            class="slime"
            src="/assets/images/mascot/mascotte_disappointed.png"
            alt="mascot_disappointed"
          />
          <div class="thought-box-2">
            <p class="slime-text">Huh.. dat is meer dan ik dacht, wist jij dit? <br /></p>
          </div>
        </div>
      </div>
    </div>

    <p class="mb-4-subtitle">Wist je dat? <br /></p>
    <p class="mb-4 text-markup">
      1. Als je alle plastic flessen van 1 jaar op elkaar stapelt, je de aarde 4 keer rond kan gaan?
      <br />
      2. Als je alle plastic flessen van 1 jaar op elkaar stapelt, je de maan 2 keer kan bereiken?
      <br />
      3. Als je alle plastic flessen van 1 jaar op elkaar stapelt, je de Mount Everest 2 keer kan
      beklimmen? <br />
      4. Dat plastic bekertjes 50-80 jaar rond blijven liggen op de aarde, voordat ze afgebroken
      worden? <br />
      <br />
    </p>

    <div class="register">
      <h5 class="mb-2 text-markup">Wil je meer leren? Registreer je dan en daag jezelf uit!</h5>
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
    </div>
  </main>
</template>

<style>
.mb-4-title {
  font-size: 50px;
  font-weight: bold;
}

.mb-4-subtitle {
  font-size: 30px;
  font-weight: bold;
  color: #1d73dd;
}

.intro {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  background-color: transparent;
  height: 30%;
  width: 100%;
}

.intro-text {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1%;
}

.slime {
  width: 350px;
  padding-left: 40%;
  padding-right: 10%;
  padding-top: 20px;
  align-items: flex-end;
}

.slime-text {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2px 0 0 2px;
  justify-content: flex-start;
  text-align: center;
}

.thought-box-1 {
  position: absolute;
  width: 200px;
  height: 120px;
  border: 4px solid #1d73dd;
  background-color: #1d73dd;
  left: 102%;
  bottom: 135%;
  transform: translate(-50%, 50%);
  padding: 20px;
  margin-top: 0;
  text-align: center;
  font-weight: 900;
  color: #fff;
  border-radius: 10px;
}

.thought-box-1::before {
  content: '';
  position: absolute;
  border-left: 10px solid #1d73dd;
  border-right: 10px solid transparent;
  border-top: 10px solid #1d73dd;
  border-bottom: 10px solid transparent;
  left: 19px;
  bottom: -20px;
  border-radius: 3px 0 0 0;
}

.main-story {
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  background-color: transparent;
  width: 100%;
  height: 35%;
  padding-top: 5%;
}

.slime-container {
  display: flex;
  align-items: center;
}

.slime-container-2 {
  width: 340px;
  align-items: center;
  justify-content: flex-start;
  margin-top: 9%;
  margin-left: -10%;
}

.thought-box-2 {
  position: relative;
  width: 200px;
  border: 4px solid #1d73dd;
  background-color: #1d73dd;
  padding: 20px;
  margin-top: 8%;
  top: 20%;
  left: 55%;
  text-align: center;
  font-weight: 900;
  color: #fff;
  border-radius: 10px;
}

.thought-box-2:before {
  content: '';
  width: 0;
  height: 0;
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid transparent;
  border-bottom: 10px solid #1d73dd;
  right: 135px;
  top: -23px;
}

.main-text {
  display: flex;
  align-items: center;
  margin-top: -8%;
}

.text-markup {
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: black;
  width: 75%;
  margin-top: -11.6px;
}
</style>

<script setup></script>
