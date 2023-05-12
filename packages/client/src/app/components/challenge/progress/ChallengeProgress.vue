<template>
  <h3>{{ title }}</h3>
  <div class="d-flex flex-row flex-wrap gap-5">
    <div class="d-flex flex-row flex-wrap">
      <CheckBox
        v-model:checked="checked[i - 1]"
        :key="i"
        v-for="i in amountOfDays"
        :dayNumber="i"
        :today="today"
        image-name="{{ imageName }}"
        :image-path="`url('../assets/profile_pictures/${imageName}.png')`"
      ></CheckBox>
    </div>
    <div class="d-flex flex-column">
      {{ calculation }} dagen
      <button
        :class="checked[today - 1] ? 'btn btn-secondary mt-auto' : 'btn btn-primary mt-auto'"
        v-on:click="check(today)"
      >
        Vink vandaag {{ buttonText }}
      </button>
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
      title: String,
      imageName: String,
      checked: [],
      buttonText: String,
      calculation: String
    }
  },
  props: {
    amountOfDays: Number,
    today: Number
  },
  created() {
    this.title = 'Mijn voortgang'
    this.imageName = 'narwal'
    this.checked = [true, false, false, false, false]
    this.buttonText = 'aan'
    this.calculation = `${this.checked.filter(Boolean).length} van de ${this.checked.length}`
  },
  methods: {
    check(i) {
      this.checked[i - 1] = !this.checked[i - 1]
      if (i === this.today) {
        this.buttonText = this.checked[i - 1] ? 'uit' : 'aan'
      }
    }
  },
  watch: {
    checked: {
      handler() {
        this.buttonText = this.checked[this.today - 1] ? 'uit' : 'aan'
        this.calculation = `${this.checked.filter(Boolean).length} van de ${this.checked.length}`
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
