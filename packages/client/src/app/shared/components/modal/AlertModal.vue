<template>
  <div
    class="modal fade"
    id="alertModal"
    tabindex="-1"
    aria-labelledby="alertModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="alertModalLabel">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ content }}</div>
        <div class="modal-footer mx-sm-auto">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            {{ cancellation }}
          </button>
          <button
            type="button"
            class="btn btn-tertiary"
            data-bs-dismiss="modal"
            @click="$emit('confirm')"
          >
            {{ confirmation }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertModal',
  props: {
    title: String,
    content: String,
    confirmation: String,
    cancellation: String
  }
};
</script>
