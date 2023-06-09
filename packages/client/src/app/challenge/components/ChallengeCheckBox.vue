<template>
  <div class="d-flex justify-content-center">
    <div class="check position-relative w-100">
      <input
        :id="challengeDay.id"
        type="checkbox"
        :checked="checked"
        @change="$emit('update:checked', $event.target.checked)"
        :disabled="isCompleted || isDisabled"
      />
      <label
        :for="challengeDay.id"
        :aria-label="`${imageName}, dag ${dayNumber}`"
        class="transition"
        :style="{
          transform: `rotateY(${this.deg}deg)`
        }"
      />
      <p class="position-absolute top-50" :class="getButtonClass" :aria-hidden="true">
        {{ getCheckmarks }}
      </p>
      <div class="d-flex justify-content-center" :class="getDayClass">Dag {{ dayNumber }}</div>
    </div>
  </div>
</template>

<script>
import { ChallengeDayService } from '../services/challenge_day.service.js';

export default {
  name: 'CheckBox',
  data() {
    return {
      deg: Number,
      isDisabled: Boolean
    };
  },
  created() {
    this.deg = 0;
    this.isDisabled = this.getIsDisabled();
  },
  props: {
    challengeDay: Object,
    dayNumber: Number,
    todayNumber: Number,
    imageName: String,
    imagePath: String,
    checked: Boolean,
    isOwner: Boolean,
    isCompleted: Boolean
  },
  methods: {
    rotate() {
      this.deg += 180;
    },
    getIsDisabled() {
      return this.isOwner
        ? this.dayNumber > this.todayNumber || this.dayNumber < this.todayNumber - 1
        : true;
    }
  },
  watch: {
    async checked() {
      this.rotate();
      await ChallengeDayService.instance().updateChallengeDay(
        this.challengeDay.id,
        this.challengeDay
      );
    }
  },
  computed: {
    getButtonClass() {
      return this.checked ? 'text-tertiary' : 'text-secondary';
    },
    getCheckmarks() {
      return this.checked ? '✔' : this.dayNumber < this.todayNumber ? '✘' : ' ';
    },
    getDayClass() {
      return this.dayNumber === this.todayNumber ? 'fw-bold text-primary' : '';
    }
  }
};
</script>

<style scoped>
.check input[type='checkbox'] {
  position: absolute;
  left: -100vw;
}

.check input[type='checkbox'] + label {
  width: 75px;
  height: 75px;
  background-image: v-bind('imagePath');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 5px;
  filter: grayscale(1);
  opacity: 50%;
}

.check input[type='checkbox']:checked + label {
  filter: none;
  opacity: 100%;
}

.check input[type='checkbox']:focus-visible + label {
  outline: auto;
  opacity: 100%;
}

.check input[type='checkbox']:hover + label {
  opacity: 100%;
}

.transition {
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

@media only screen and (max-width: 600px) {
  .check input[type='checkbox'] + label {
    width: 52px;
    height: 52px;
  }
}
</style>
