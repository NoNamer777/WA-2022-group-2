<template>
    <main>
        <div class="intro">
            <h1 class="mb-4 cloud-text">Plastic Problemen!</h1>
            <h3 class="mb-4">Leer over plastic met onze Slime!</h3>
            <p class="mb-4">
                Welkom op de website! <br>
                Introductie tekst over Slime! <br>
            </p>
            <div class="image-container">
                <img class="w-25" src="/assets/images/mascot/mascotte_normal.png" alt="mascot_normal" />
                <img class="w-25 talk-cloud-image" src="/assets/images/extras/talk_cloud.png" alt="talk_cloud" />
                <p class="image-caption">Hi ik ben Slime!</p>
            </div>
        </div>

        <div class="main story">
            <h3 class="mb-4">Uitleg over plastic afval en het probleem!</h3>
            <div class="image-container">
                <img class="w-25" src="/assets/images/mascot/mascotte_angry.png" alt="mascot_normal" />
                <p class="image-caption">Wauw ik wist niet dat het zó belangrijk was!</p>
            </div>
        </div>

        <div class="register">
            <h5 class="mb-2">Wil je meer leren? Registreer je dan!</h5>
            <router-link class="btn btn-primary" :to="{ name: 'register' }">Registreer</router-link>
        </div>
    </main>
</template>

<style>
.cloud-text {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.image-container {
    position: relative;
    display: flex;
    align-items: center;
}

.image-container img {
    background-color: transparent;
}

.image-caption {
    position: relative;
    z-index: 1;
    margin-top: -120px;
    margin-left: 10px;
    text-align: center;
}

</style>

<script setup>
</script>
