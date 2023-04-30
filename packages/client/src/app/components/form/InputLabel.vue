<template>
  <FormKit
    :type="type"
    :label="label"
    :name="name"
    :placeholder="placeholder"
    :validation="validation"
    @input="(value) => $emit('update:modelValue', value)"
    :value="modelValue"
    :validation-visibility="validationVisibility"
  />
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
    validationVisibility: {
      type: String,
      required: false
    },
    validation: {
      type: String,
      required: false,
      default: ''
    },
    name: {
      type: String
    },
    modelValue: {
      type: String
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
</style>
