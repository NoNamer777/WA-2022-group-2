<template>
  <div class="d-flex justify-content-center">
    <div class="check position-relative w-100">
      <input
        type="checkbox"
        :id="'challenge-day-' + challengeDay.id"
        :checked="checked"
        :disabled="isCompleted || isDisabled"
        @change="() => onToggleCheck('checked')"
      />
      <label
        class="transition"
        :for="'challenge-day-' + challengeDay.id"
        :aria-label="`${imageName}, dag ${dayNumber}`"
        :style="{
          transform: `rotateY(${deg}deg)`
        }"
      />
      <p class="position-absolute top-50" :class="buttonClass" :aria-hidden="true">
        {{ checkmark }}
      </p>
      <div class="d-flex justify-content-center" :class="dayClass">Dag {{ dayNumber }}</div>
    </div>
  </div>
</template>

<style scoped>
/* Input not  visible but accessible for screen readers: */
.check input {
  position: absolute;
  left: -100vw;
}

.check input + label {
  width: 75px;
  height: 75px;
  background-image: v-bind('imagePath');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin: 5px;
  filter: grayscale(1);
  opacity: 0.5;
}

.check input:checked + label {
  filter: none;
  opacity: 1;
}

.check input:focus-visible + label {
  outline: auto;
  opacity: 1;
}

.check input:hover + label {
  opacity: 1;
}

.transition {
  transition: transform 0.5s;
  transform-style: preserve-3d;
}

@media only screen and (max-width: 600px) {
  .check input + label {
    width: 52px;
    height: 52px;
  }
}
</style>

<script setup>
import { computed, ref, watch } from 'vue';
import { ChallengeDayService } from '../services';

const emit = defineEmits(['checked']);

const props = defineProps({
  challengeDay: Object,
  dayNumber: Number,
  todayNumber: Number,
  imageName: String,
  imagePath: String,
  checked: Boolean,
  isOwner: Boolean,
  isCompleted: Boolean
});

const deg = ref(0);

const isDisabled = computed(() =>
  !props.isOwner
    ? true
    : props.dayNumber > props.todayNumber || props.dayNumber < props.todayNumber - 1
);

const buttonClass = computed(() => (props.checked ? 'text-tertiary' : 'text-secondary'));

const checkmark = computed(() =>
  props.checked ? '✔' : props.dayNumber < props.todayNumber ? '✘' : ' '
);

const dayClass = computed(() =>
  props.dayNumber === props.todayNumber ? 'fw-bold text-primary' : ''
);

function onToggleCheck() {
  if (props.isCompleted) return;
  emit('checked');
}

async function updateChallengeDay() {
  deg.value += 180;

  await ChallengeDayService.instance().updateChallengeDay(props.challengeDay);
}

watch(
  () => props.checked,
  async () => await updateChallengeDay()
);
</script>
