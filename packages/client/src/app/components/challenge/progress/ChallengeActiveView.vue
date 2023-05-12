<template>
  <main>
    <div class="mb-4">
      <div class="d-flex flex-row flex-wrap w-100 justify-content-between">
        <h1>5 dagen lang geen wegwerpdrinkpakjes!</h1>
        <button class="btn btn-primary h-50">Pas aan</button>
      </div>
      <p>Startdatum: {{ startDate }}</p>
    </div>
    <p>Vandaag: Dag {{ today }}</p>

    <div>
      <ChallengeProgress
        :id="user1"
        :amountOfDays="amountOfDays"
        :today="today"
        :imageName="image1"
        :owner="true"
        :title="title1"
      />
      <ChallengeProgress
        :id="user2"
        :amountOfDays="amountOfDays"
        :today="today"
        :imageName="image2"
        :owner="false"
        :title="title2"
      />
    </div>
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
      user2: String,
      image1: String,
      image2: String,
      title1: String,
      title2: String,
      startDate: Date
    }
  },
  created() {
    this.getDays()
    this.user1 = 'user1'
    this.user2 = 'user2'
    this.image1 = 'papegaai'
    this.image2 = 'giraf'
    this.title1 = 'Mijn voortgang'
    this.title2 = 'Voortgang van tegenstander'
  },
  methods: {
    getDays() {
      //   from challenge:
      const startDate = new Date('May 10, 2023')
      const endDate = new Date('May 14, 2023')
      const timeDiff = endDate.getTime() - startDate.getTime()
      const todayDiff = new Date().getTime() - startDate.getTime()
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      this.startDate = startDate.toLocaleDateString('nl-NL', options)
      this.amountOfDays = timeDiff / (1000 * 60 * 60 * 24) + 1
      this.today = Math.ceil(todayDiff / (1000 * 60 * 60 * 24))
    }
  }
}
</script>

<style scoped></style>
