<template>
  <div class="my-2 w-100 border shadow p-4 rounded-3">
    <h2>{{ title }}</h2>
    <div class="d-flex flex-row flex-wrap justify-content-center gap-4">
      <div class="d-flex flex-row flex-wrap flex-item">
        <CheckBox
          v-for="(challengeDay, index) in challengeDays"
          :key="index"
          :checked="challengeDay.earned"
          :isCompleted="userChallenge.completed"
          :challengeDay="challengeDay"
          :dayNumber="index + 1"
          :todayNumber="todayNumber"
          :imageName="imageName"
          :imagePath="`url(${inject('serverBaseUrl')}${props.userChallenge.user.profileImagePath})`"
          :isOwner="isOwner"
          @checked="() => check(index + 1)"
        />
      </div>
      <div class="d-flex flex-column">
        <p>{{ numberOfCompletedText }} dagen afgerond</p>
        <button
          class="w-100"
          v-if="showToggleButton"
          :class="buttonClass"
          @click="check(todayNumber)"
        >
          Vink vandaag {{ buttonText }}
        </button>
        <p class="text-primary" v-if="userChallenge.completed">Goed gedaan!</p>
      </div>
    </div>
    <CompletedModal :badgeName="badge?.name" :badgeImagePath="badge?.imagePath" />
  </div>
</template>

<script setup>
import CheckBox from './ChallengeCheckBox.vue';
import Modal from 'bootstrap/js/dist/modal';
import CompletedModal from './CompletedModal.vue';
import { computed, inject, nextTick, onMounted, ref, watch } from 'vue';
import { UserChallengeService } from '../services';

const props = defineProps({
  userChallenge: Object,
  todayNumber: Number,
  isActive: Boolean,
  isOwner: Boolean
});

const challengeDays = ref([]);

const buttonText = ref('');

const badge = ref(null);

const title = computed(() =>
  props.isOwner ? 'Mijn voortgang' : `Voortgang van ${props.userChallenge.user.username}`
);

const numberOfCompletedDays = computed(() =>
  challengeDays.value.reduce((count, day) => (day.earned ? count + 1 : count), 0)
);

const numberOfCompletedText = computed(
  () => `${numberOfCompletedDays.value} van de ${challengeDays.value.length}`
);

const buttonClass = computed(() => {
  if (challengeDays.value.length === 0 || !props.isActive) return '';

  return challengeDays.value[props.todayNumber - 1].earned
    ? 'btn btn-secondary'
    : 'btn btn-primary';
});

const imageName = computed(() => {
  const path = props.userChallenge.user.profileImagePath;
  const image = path.substring(path.lastIndexOf('/') + 1);
  return image.substring(0, image.lastIndexOf('.'));
});

const showToggleButton = computed(
  () => props.isActive && props.isOwner && !props.userChallenge.completed
);

onMounted(() => {
  challengeDays.value = props.userChallenge.challengeDays;
});

function check(dayNumber) {
  if (props.userChallenge.completed) return;
  challengeDays.value[dayNumber - 1].earned = !challengeDays.value[dayNumber - 1].earned;
}

watch(
  () => challengeDays.value,
  async () => {
    if (challengeDays.value.length === 0) return;
    if (props.isActive && props.isOwner) {
      buttonText.value = challengeDays.value[props.todayNumber - 1].earned ? 'uit' : 'aan';
    }
    if (props.userChallenge.completed) {
      return;
    }
    if (props.isOwner && numberOfCompletedDays.value === challengeDays.value.length) {
      badge.value = await UserChallengeService.instance().completeUserChallenge(
        props.userChallenge
      );

      nextTick(() => {
        const completedModal = new Modal(document.getElementById('completedModal'));
        completedModal.toggle();
        showToggleButton.value = false;
      });
    }
  },
  {
    deep: true
  }
);
</script>
