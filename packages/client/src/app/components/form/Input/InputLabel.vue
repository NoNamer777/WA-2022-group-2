<template>
  <div class="form-group mb-4">
    <label v-if="label" class="form-check-label card-title">{{ label }}</label>
    <input
      :type="type"
      :placeholder="placeholder"
      class="form-control w-100"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      :required="required"
    />
  </div>
</template>

<script>
export default {
  name: 'InputLabel',
  props: {
    label: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    placeholder: {
      type: String
    },
    required: {
      type: Boolean,
      required: false,
      default: true
    },
    modelValue: {
      type: String
    }
  }
}
</script>
