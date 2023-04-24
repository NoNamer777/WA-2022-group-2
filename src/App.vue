<script setup>
import {RouterView} from 'vue-router';
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
    <div class="container h-100 d-flex flex-column">
        <NavigationBar/>

        <RouterView class="box bg-white mt-5"/>
    </div>
</template>

<style scoped>
.box {
    padding: 2rem;
    flex: 1 1 auto;
    opacity: 0.9;

}

@media screen and (min-width: 580px) {
    .box {
        padding: 5rem;
    }
}
</style>