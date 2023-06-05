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
          <img class="mb-4" :src="badgeImagePath" :alt="badgeName" />
          <h4 id="modalLabel">Goed gedaan!</h4>
          <h5>Je hebt een {{ badgeName }} verdiend!</h5>
        </div>
        <div class="modal-footer w-100 text-center">
          <button type="button" class="btn btn-tertiary" data-bs-dismiss="modal">OK!</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompletedModal',
  props: {
    badgeImagePath: String,
    badgeName: String
  }
};
</script>
<style>
.modal-header {
  border-width: 0 !important;
}

.modal-footer {
  justify-content: center !important;
  border-width: 0 !important;
}
</style>
