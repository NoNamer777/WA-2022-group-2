<template>
  <div class="my-4">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap gap-5">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-for="i in challengeDays.length"
          v-model:checked="challengeDays[i - 1].earned"
          :key="i"
          :id="challengeDays[i - 1].id"
          :dayNumber="i"
          :today="today"
          :imageName="imageName"
          :imagePath="`url('../assets/profile_pictures/${imageName}.png')`"
          :owner="owner"
        ></CheckBox>
      </div>
      <div class="d-flex flex-column">
        <p>{{ calculation }} dagen</p>
        <button
          v-if="owner"
          :class="challengeDays[today - 1].earned ? 'btn btn-secondary' : 'btn btn-primary'"
          v-on:click="check(today)"
        >
          Vink vandaag {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CheckBox from './ChallengeCheckBox.vue'

export default {
  name: 'ChallengeProgress',
  components: { CheckBox },
  data() {
    return {
      buttonText: String,
      calculation: String,
      complete: Boolean,
      numberOfEarned: Number
    }
  },
  props: {
    userChallenge: Object,
    challengeDays: Array,
    today: Number,
    owner: Boolean,
    imageName: String,
    title: String
  },
  created() {
    this.buttonText = 'aan'
    this.numberOfEarned = this.challengeDays.reduce(
      (count, day) => (day.earned ? count + 1 : count),
      0
    )
    this.calculation = `${this.numberOfEarned}
      van de ${this.challengeDays.length}`
  },
  methods: {
    check(i) {
      // eslint-disable-next-line vue/no-mutating-props
      this.challengeDays[i - 1].earned = !this.challengeDays[i - 1].earned
      if (i === this.today) {
        this.buttonText = this.challengeDays[i - 1].earned ? 'uit' : 'aan'
      }
    }
  },
  watch: {
    challengeDays: {
      handler() {
        this.buttonText = this.challengeDays[this.today - 1].earned ? 'uit' : 'aan'
        this.numberOfEarned = this.challengeDays.reduce(
          (count, day) => (day.earned ? count + 1 : count),
          0
        )
        this.calculation = `${this.numberOfEarned} van de ${this.challengeDays.length}`
        if (this.numberOfEarned === this.challengeDays.length) {
          alert('You got it!')
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
