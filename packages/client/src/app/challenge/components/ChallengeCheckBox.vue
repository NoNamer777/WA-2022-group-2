<template>
  <div class="d-flex justify-content-center">
    <div class="check position-relative w-100">
      <input
        :id="id"
        type="checkbox"
        :checked="checked"
        @change="$emit('update:checked', $event.target.checked)"
        :disabled="isDisabled"
      />
      <label
        :for="id"
        :aria-label="`${imageName}, dag ${dayNumber}`"
        class="transition"
        :style="{
          transform: `rotateY(${this.deg}deg)`
        }"
      />
      <p :aria-hidden="true" :class="getButtonClass">
        {{ getCheckmarks }}
      </p>
      <div :class="getDayClass">Dag {{ dayNumber }}</div>
    </div>
  </div>
</template>

<script>
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
      this.deg += 180;
    },
    getIsDisabled() {
      return this.isOwner
        ? this.dayNumber > this.todayNumber || this.dayNumber < this.todayNumber - 1
        : true;
    }
  },
  watch: {
    checked() {
      this.rotate();
      /* handle saving of challengeDays by challengeDayId? */
      console.log(this.id);
    }
  },
  computed: {
    getButtonClass() {
      return this.checked
        ? 'position-absolute top-50 text-tertiary'
        : 'position-absolute top-50 text-secondary';
    },
    getCheckmarks() {
      return this.checked ? '✔' : this.dayNumber < this.todayNumber ? '✘' : ' ';
    },
    getDayClass() {
      return this.dayNumber === this.todayNumber
        ? 'fw-bold text-primary d-flex justify-content-center'
        : 'd-flex justify-content-center';
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
    /*flex-basis: 20%;*/
  }
}
</style>
