<template>
  <main>
    <h1>Challenge Progress View</h1>
    <ChallengeProgress :id="user1" :amountOfDays="amountOfDays" :today="today" :owner="true" />
    <ChallengeProgress :id="user2" :amountOfDays="amountOfDays" :today="today" :owner="false" />
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
      today: Number,
      user1: String,
      user2: String
    }
  },
  created() {
    this.getDays()
    this.user1 = 'user1'
    this.user2 = 'user2'
  },
  methods: {
    getDays() {
      //   from challenge:
      const startDate = new Date('May 10, 2023')
      const endDate = new Date('May 14, 2023')
      const timeDiff = endDate.getTime() - startDate.getTime()
      const todayDiff = new Date().getTime() - startDate.getTime()
      this.amountOfDays = timeDiff / (1000 * 60 * 60 * 24) + 1
      this.today = Math.ceil(todayDiff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style scoped></style>
