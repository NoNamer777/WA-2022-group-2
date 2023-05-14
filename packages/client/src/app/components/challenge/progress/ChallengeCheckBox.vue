<template>
  <div class="d-flex justify-content-center">
    <div class="check position-relative">
      <input
        :id="id"
        type="checkbox"
        :checked="checked"
        @change="$emit('update:checked', $event.target.checked)"
        :disabled="isOwner ? dayNumber > todayNumber || dayNumber < todayNumber - 1 : true"
      />
      <label
        :for="id"
        :aria-label="`${imageName}, dag ${dayNumber}`"
        class="transition"
        :style="{
          transform: `rotateY(${this.deg}deg)`
        }"
      />
      <div
        aria-hidden="true"
        :class="
          checked
            ? 'position-absolute top-50 text-tertiary'
            : 'position-absolute top-50 text-secondary'
        "
      >
        {{ checked ? '✔' : dayNumber < todayNumber ? '✘' : ' ' }}
      </div>
      <div class="d-flex justify-content-center">Dag {{ dayNumber }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  data() {
    return {
      deg: Number
    }
  },
  mounted() {
    this.deg = 0
  },
  props: {
    id: Number,
    dayNumber: Number,
    todayNumber: Number,
    imageName: String,
    imagePath: String,
    checked: Boolean,
    isOwner: Boolean
  },
  methods: {
    rotate() {
      this.deg += 180
    }
  },
  watch: {
    checked() {
      this.rotate()
      /* handle saving of challengeDays by challengeDayId? */
      console.log(this.id)
    }
  }
}
</script>

<style scoped>
.check input[type='checkbox'] {
  position: absolute;
  left: -100vw;
}

.check input[type='checkbox'] + label {
  width: 52px;
  height: 52px;
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
</style>
