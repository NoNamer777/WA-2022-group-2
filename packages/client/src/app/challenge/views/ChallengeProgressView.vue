<template>
  <main>
    <div class="d-flex flex-row flex-wrap justify-content-between">
      <div>
        <div class="mb-1 w-100">
          <div
            class="d-flex flex-row flex-wrap w-100 mr-auto justify-content-between"
            v-if="challenge"
          >
            <div v-if="isEditing">
              <FormKit type="form" @submit="saveText" :actions="false" :incomplete-message="false">
                <CustomFormKit
                  v-model="challenge.name"
                  label="Challenge naam"
                  name="name"
                  :placeholder="challenge.name"
                  validation="required|length:5,80"
                />
                <div>
                  <CustomFormKit type="submit" label="Sla op" input-class="form-btn-tertiary" />
                </div>
              </FormKit>
            </div>
            <h1 v-else>{{ challenge.name }}</h1>
          </div>
          <p class="fw-bold">
            Startdatum: <span class="fw-normal">{{ startDate }}</span>
          </p>
        </div>
        <p class="fw-bold">
          Vandaag:
          <span class="fw-normal"> {{ dayTitle }}</span>
        </p>
      </div>
      <div v-if="!isEditing" class="h-25 mb-2 d-flex flex-wrap">
        <div class="btn-group">
          <button
            type="button"
            ref="editButton"
            class="btn btn-sm btn-primary dropdown-toggle my-2 me-1"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Pas challenge aan
          </button>
          <ul class="dropdown-menu" role="menu">
            <li>
              <button class="dropdown-item small" role="menuitem" @click="adjustText">
                Pas titel aan
              </button>
            </li>
            <li class="dropdown-divider" />
            <li>
              <button
                class="dropdown-item small text-secondary"
                type="button"
                role="menuitem"
                data-bs-toggle="modal"
                data-bs-target="#alertModal"
              >
                Verlaat challenge
              </button>
            </li>
          </ul>
        </div>
        <SelectChallengeButton />
      </div>
    </div>

    <div class="d-flex flex-row flex-wrap justify-content-start gap-xl-2">
      <ChallengeProgress
        v-for="userChallenge in userChallenges"
        :key="userChallenge.id"
        :userChallenge="userChallenge"
        :todayNumber="todayNumber"
        :isActive="isActive"
        :isOwner="isOwner(userChallenge)"
        :class="challengeProgressClass(userChallenge)"
        @completed="getUserChallenges"
      />
    </div>
    <AlertModal
      :key="authenticatedUser.id"
      title="Challenge verlaten"
      content="Weet je zeker dat je deze challenge wilt verlaten?"
      cancellation="Nee, breng me terug!"
      confirmation="Ja, ik weet het zeker"
      @confirm="leaveChallenge"
    ></AlertModal>
  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ChallengeProgress, SelectChallengeButton } from '../components';
import { ChallengeService, UserChallengeService } from '../services';
import { router } from '../../app-router.js';
import { useAuthStore } from '../../auth';
import { AlertModal, CustomFormKit } from '../../shared/components';
import { storeToRefs } from 'pinia';

const { user: authenticatedUser } = storeToRefs(useAuthStore());

const route = useRoute();

/** @type {import('vue').Ref<Challenge | null>} */
const challenge = ref(null);

/** @type {import('vue').Ref<UserChallenge | null>} */
const userChallenge = ref(null);

/** @type {import('vue').Ref<number | null>} */
const challengeIdFromRoute = ref(null);

/** @type {import('vue').Ref<UserChallenge[]>} */
const userChallenges = ref([]);

/** @type {import('vue').Ref<string | null>} */
const startDate = ref(null);

/** @type {import('vue').Ref<string | null>} */
const today = ref(null);

/** @type {import('vue').Ref<boolean>} */
const isActive = ref(true);

/** @type {import('vue').Ref<string>} */
const dayTitle = ref('');

/** @type {import('vue').Ref<boolean>} */
const isEditing = ref(false);

const editButton = ref(null);

/** @type {import('vue').ComputedRef<number>} */
const todayNumber = computed(() => {
  if (!challenge.value?.startDate) {
    return 1;
  }
  const timeZoneOffsetInMilliSeconds = new Date().getTimezoneOffset() * 1000 * 60;
  const todayDiff =
    new Date().getTime() -
    new Date(challenge.value.startDate).getTime() -
    2 * timeZoneOffsetInMilliSeconds;
  return Math.ceil(todayDiff / (1000 * 60 * 60 * 24));
});

onMounted(async () => {
  getChallengeIdFromRoute();

  await getUserChallenges();
});

function getChallengeIdFromRoute() {
  challengeIdFromRoute.value = parseInt(route.params['challengeId']);
}

function setChallenge() {
  for (const entry of userChallenges.value) {
    if (entry.userChallenges.id !== challengeIdFromRoute.value) continue;
    if (challenge.value !== null) break;

    userChallenge.value = entry;
    challenge.value = entry.userChallenges;

    startDate.value = getDateString(challenge.value.startDate);
    isActive.value = checkIsActive(challenge.value.startDate, challenge.value.endDate);
    dayTitle.value = getTodayTitle();
  }
}

/** @return {Promise<void>} */
async function getUserChallenges() {
  // TODO: sort UserChallenges in backend?
  const results = await UserChallengeService.instance().getUserChallengesById(
    challengeIdFromRoute.value
  );

  userChallenges.value = sortUserChallenges(results);

  setChallenge();
}

/** @return {Promise<void>} */
async function leaveChallenge() {
  await UserChallengeService.instance().deleteUserChallenge(userChallenges.value[0].id);
  await router.push({ name: 'challenge' });
}

/** @return {Promise<void>} */
async function saveText() {
  await ChallengeService.instance().update(challenge.value);
  isEditing.value = false;

  await nextTick(() => editButton.value.focus());
}

function adjustText() {
  isEditing.value = true;

  nextTick(() => {
    document.querySelector(`[name='name']`).focus();
  });
}

function challengeProgressClass(userChallenge) {
  return isOwner(userChallenge) ? 'bg-white' : 'bg-opponent';
}

function checkIsActive(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).setHours(23, 59, 59);
  const today = new Date().getTime();

  return end >= today && start <= today;
}

/**
 * Returns a formatted date string.
 * @param date {string | Date}
 * @return {string}
 */
function getDateString(date) {
  return new Date(date).toLocaleDateString('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function getTodayTitle() {
  today.value = getDateString(new Date());
  return isActive.value ? `Dag ${todayNumber.value}, ${today.value}` : `${today.value}`;
}

function isOwner(userChallenge) {
  return authenticatedUser.value.id === userChallenge.user.id;
}

/**
 * Sort the Challenges by username alphabetically, and put the authenticated user on top.
 * @param challenges {UserChallenge[]}
 * @return {UserChallenge[]}
 */
function sortUserChallenges(challenges) {
  return challenges
    .sort((a, b) => a.user.username.localeCompare(b.user.username))
    .sort(
      (a, b) =>
        (b.user.id === authenticatedUser.value.id) - (a.user.id === authenticatedUser.value.id)
    );
}
</script>
