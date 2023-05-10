<template>
  <div class="d-flex flex-row flex-wrap">
    <CheckBox
      v-model:checked="checked[i - 1]"
      :key="i"
      v-for="i in checked.length"
      :id="i"
      image-name="zebra"
      :image-path="`url('../assets/profile_pictures/parrot.png')`"
    ></CheckBox>
  </div>
  <button class="btn btn-primary" @click="check(1)">Vink vandaag af</button>
</template>

<script>
import CheckBox from './ChallengeCheckBox.vue'

export default {
  name: 'ChallengeProgress',
  components: { CheckBox },
  data: function () {
    return {
      checked: [false, false, true, false, false]
    }
  },
  methods: {
    check(i) {
      this.checked[i - 1] = !this.checked[i - 1]
    }
  }
  // computed: {
  //   check1: {
  //     get() {
  //       return this.checked
  //     },
  //     set(i) {
  //       this.checked[i] = !this.checked[i]
  //     }
  //   }
  // }
}
</script>

<style scoped></style>
