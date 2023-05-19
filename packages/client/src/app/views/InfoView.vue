<template>
  <main>
    <div class="intro">
      <h1 class="mb-4-title">Plastic Problemen!</h1>
      <h3 class="mb-4-subtitle">Leer over plastic met onze Slime!</h3>

      <div class="intro-text">
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
      <h5 class="mb-2 text-markup">Wil je meer leren? Registreer je dan!</h5>
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
    </div>
  </main>
</template>

<style>
.mb-4-title {
  font-family: 'Beaufort-Bold', sans-serif;
  font-size: 50px;
  font-weight: bold;
  color: #1d73dd;
}

.mb-4-subtitle {
  font-family: 'Beaufort-Light', sans-serif;
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
  width: 100%;
  height: 100%;
}

.intro-text {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1%;
}

.slime {
  width: 350px;
  padding-left: 30%;
  align-items: flex-end;
}

.slime-text {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2px 0 0 2px;
  justify-content: flex-start;
  text-align: center;
  font-family: 'Beaufort-Light', sans-serif;
}

.thought-box-1 {
  width: 200px;
  border: 4px solid #1d73dd;
  background-color: #1d73dd;
  left: 75%;
  bottom: 60%;
  padding: 20px;
  text-align: center;
  font-weight: 900;
  color: #fff;
  font-family: 'BeaufortForLoL-Medium', sans-serif;
  position: absolute;
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
  height: 100%;
  padding-top: 5%;
}

.slime-container {
  display: flex;
  align-items: center;
}

.slime-container-2 {
  width: 350px;
  height: 175px;
  align-items: center;
  justify-content: flex-start;
}

.thought-box-2 {
  position: relative;
  width: 200px;
  border: 4px solid #1d73dd;
  background-color: #1d73dd;
  padding: 20px;
  top: 20%;
  left: 8%;
  text-align: center;
  font-weight: 900;
  color: #fff;
  font-family: 'Beaufort-Light', sans-serif;
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
  right: 5px;
  top: -23px;
}

.main-text {
  display: flex;
  align-items: center;
}

.text-markup {
  font-family: 'Beaufort-Light', sans-serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1%;
  color: black;
  width: 75%;
}
</style>

<script setup></script>
