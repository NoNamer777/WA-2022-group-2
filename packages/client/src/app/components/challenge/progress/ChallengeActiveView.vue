<template>
  <main>
    <h1>Challenge Progress View</h1>
    <ChallengeProgress :amountOfDays="amountOfDays" :today="today" />
  </main>
</template>

<script>
import ChallengeProgress from './ChallengeProgress.vue'

export default {
  name: 'ChallengeProgressView.vue',
  components: { ChallengeProgress },
  data() {
    return {
      amountOfDays: Number,
      today: Number
    }
  },
  created() {
    this.getDays()
  },
  methods: {
    getDays() {
      //   from challenge:
      const startDate = new Date('May 10, 2023')
      const endDate = new Date('May 20, 2023')
      const timeDiff = endDate.getTime() - startDate.getTime()
      const todayDiff = new Date().getTime() - startDate.getTime()
      this.amountOfDays = timeDiff / (1000 * 60 * 60 * 24) + 1
      this.today = Math.ceil(todayDiff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style scoped></style>
