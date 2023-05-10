<template>
  <main>
    <!--    <section class="row h-100 d-flex align-items-center">-->
    <h1>Challenge Progress View</h1>
    <ChallengeProgress />
    <!--    </section>-->
  </main>
</template>

<script>
import ChallengeProgress from '../components/challenge/progress/ChallengeProgress.vue'

export default {
  name: 'ChallengeProgressView.vue',
  components: { ChallengeProgress }
}
</script>

<style scoped></style>
