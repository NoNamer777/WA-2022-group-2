<template>
  <div class="my-4">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap gap-5">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-model:checked="checked[i - 1]"
          :key="i"
          v-for="i in amountOfDays"
          :dayNumber="i"
          :today="today"
          :imageName="imageName"
          :imagePath="`url('../assets/profile_pictures/${imageName}.png')`"
          :owner="owner"
          :id="id"
        ></CheckBox>
      </div>
      <div class="d-flex flex-column">
        <p>{{ calculation }} dagen</p>
        <button
          v-if="owner"
          :class="checked[today - 1] ? 'btn btn-secondary' : 'btn btn-primary'"
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
      checked: [],
      buttonText: String,
      calculation: String,
      complete: Boolean
    }
  },
  props: {
    amountOfDays: Number,
    today: Number,
    owner: Boolean,
    id: String,
    imageName: String,
    title: String
  },
  created() {
    this.checked = [false, true, false, false, false]
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
        this.complete = this.checked.filter(Boolean).length === this.checked.length
        if (this.complete) {
          alert('You got it!')
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped></style>
