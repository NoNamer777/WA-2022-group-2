<template>
  <div class="d-flex justify-content-center">
    <div class="check position-relative">
      <!--      <div class="border border-primary m-1 p-1 rounded">-->
      <input :id="id" type="checkbox" v-model="innerCheck" @change="check" />
      <label
        :for="id"
        :aria-label="`${imageName}, dag ${id}`"
        class="transition"
        :style="{
          transform: `rotateY(${this.deg}deg)`
        }"
      />
      <!--      </div>-->
      <div class="position-absolute top-50 text-tertiary">
        {{ checked ? '✔' : ' ' }}
      </div>
      <div class="d-flex justify-content-center">Dag {{ id }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  data() {
    return {
      deg: 0,
      innerCheck: false
    }
  },
  mounted() {
    this.innerCheck = this.checked
  },
  props: {
    id: Number,
    imageName: String,
    imagePath: String,
    checked: Boolean
  },
  methods: {
    rotate() {
      this.deg += 180
    },
    check(event) {
      this.innerCheck = event.target.checked
      this.$emit('update:checked', this.innerCheck)
    }
  },
  watch: {
    checked() {
      this.rotate()
      this.innerCheck = this.checked
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
