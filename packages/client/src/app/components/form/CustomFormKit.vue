<template>
  <FormKit
    @input="(value) => $emit('update:modelValue', value)"
    :type="type"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :validation="validation"
    :value="modelValue"
    :validation-visibility="validationVisibility"
  />
</template>

<script>
export default {
  name: 'CustomFormKit',
  props: {
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    label: {
      type: String,
      required: false
    },
    name: {
      type: String
    },
    placeholder: {
      type: String
    },
    validation: {
      type: String,
      required: false,
      default: ''
    },
    modelValue: {
      type: String
    },
    validationVisibility: {
      type: String,
      required: false
    }
  }
}
</script>

<style>
.formkit-wrapper {
  max-width: unset !important;
}

[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

[data-complete] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px green;
}
.formkit-input {
  width: 100% !important;
}
.formkit-input:focus-visible {
  outline: auto;
}
</style>
