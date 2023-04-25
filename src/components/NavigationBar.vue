<template>
    <nav class="navbar navbar-expand-lg bg-custom-primary mt-5 p-4">
        <div class="container-fluid">
            <a class="navbar-brand text-white">Wasted</a>
            <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{name: 'home'}">Hoofdpagina</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{name: 'home'}">Quiz</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{name: 'home'}">Uitdaging</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{name: 'home'}">Info</router-link>
                    </li>
                </ul>
                <hr class="d-xl-none">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" :to="{name: 'login'}">Inloggen</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="btn bg-white" :to="{name: 'register'}">Registreer</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "NavigationBar"
}
</script>

<style scoped>

</style>