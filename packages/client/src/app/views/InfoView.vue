<template>
  <main>
    <div class="intro">
      <h1 class="mb-4-title">Plastic Problemen!</h1>
      <h3 class="mb-4-subtitle">Leer over plastic met onze Slime!</h3>
      <div class="intro-text">
        <p class="mb-4">
          Welkom op de website! <br />
          Misschien heb je er nooit bij stilgestaan, maar de aarde is al 4,6 miljard jaar oud!
          <br />
          Dat ziet er zo uit: 4,543,000,000. Veel ouder dan jou en mij.. <br />
          We hebben alleen één groot probleem: onze aarde zal niet lang meer meegaan als we niks
          doen!
          <br />
          Daarom willen we jou graag helpen om te leren over plastic afval en hoe je het kan
          verminderen! <br />
          Mag ik jou voorstellen aan onze mascotte: Slime!<br />
        </p>
        <div class="slime-container">
          <img class="slime" src="/assets/images/mascot/mascotte_normal.png" alt="mascot_normal" />
          <p class="slime-text">
            Hoi! Ik ben Slime! <br />
            Ik ga je helpen door tips te geven! <br />
          </p>
        </div>
      </div>
    </div>

    <div class="main-story">
      <h3 class="mb-4">Uitleg over plastic afval en het probleem!</h3>
      <div class="image-container">
        <img class="w-25" src="/assets/images/mascot/mascotte_angry.png" alt="mascot_normal" />
      </div>
    </div>

    <div class="register">
      <h5 class="mb-2">Wil je meer leren? Registreer je dan!</h5>
      <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
    </div>
  </main>
</template>

<style>
.mb-4-title {
  font-size: 50px;
  font-weight: bold;
  color: #1d73dd;
}

.mb-4-subtitle {
  font-size: 30px;
  font-weight: bold;
  color: #1d73dd;
  padding-bottom: 1%;
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
  margin-top: -4%;
}

.slime {
  width: 350px;
  padding-left: 30%;
}

.slime-container {
  background-color: transparent;
  width: auto;
  height: auto;
}

.slime-text {
  display: flex;
  align-items: center;
  width: 200px;
  height: 75px;
  margin: 20px 0 0 120px;
  justify-content: flex-start;
  font-family: 'Comic Sans MS', cursive;
}

.image-container {
  background-color: transparent;
  width: 300px;
  height: 214px;
  padding-left: 100px;
}

.main-story {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  background-color: transparent;
  width: 100%;
  height: 100%;
  padding-top: 5%;
}
</style>

<script setup></script>
