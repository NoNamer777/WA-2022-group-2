<template>
  <div
    class="modal fade"
    id="completedModal"
    ref="completedModal"
    tabindex="-1"
    aria-labelledby="modalLabel"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body w-100 text-center">
          <template v-if="badgeName && badgeImagePath">
            <img
              class="mb-4"
              :src="`${inject('serverBaseUrl')}${badgeImagePath}`"
              :alt="badgeName"
            />
            <h4 id="modalLabel">Goed gedaan!</h4>
            <h5>Je hebt een {{ badgeName }} verdiend!</h5>
          </template>
          <template v-else>
            <img class="w-25" src="/assets/images/mascot/mascotte_disappointed.png" alt="Mascot" />
            <h4 id="modalLabel">Goed gedaan!</h4>
            <p>
              Geweldig gedaan! Je hebt alle badges al behaald. Binnenkort voegen we nieuwe badges
              toe om je uitdagingen te blijven bieden!
            </p>
          </template>
        </div>
        <div class="modal-footer w-100 text-center">
          <button type="button" class="btn btn-tertiary" data-bs-dismiss="modal">OK!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.modal-header {
  border-width: 0 !important;
}

.modal-footer {
  justify-content: center !important;
  border-width: 0 !important;
}
</style>

<script>
import { inject } from 'vue';

export default {
  name: 'CompletedModal',
  methods: { inject },
  props: {
    badgeImagePath: String,
    badgeName: String
  }
};
</script>
