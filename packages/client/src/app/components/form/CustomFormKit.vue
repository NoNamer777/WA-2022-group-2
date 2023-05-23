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
    :validation-messages="validationMessages"
    :list="dataListId"
    :options="options"
    :multiple="isMultiple"
    :input-class="inputClass"
  />
  <datalist v-if="dataList" :id="dataListId">
    <option v-for="(data, index) in dataList" :key="index">{{ data }}</option>
  </datalist>
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
      type: [String, Array]
    },
    validationVisibility: {
      type: String,
      required: false
    },
    options: {
      type: Array,
      required: false
    },
    isMultiple: {
      type: Boolean,
      required: false
    },
    dataList: {
      type: Array,
      required: false
    },
    validationMessages: {
      type: Object,
      required: false
    },
    inputClass: {
      type: String,
      required: false
    }
  },
  computed: {
    dataListId() {
      return name + '-dataList';
    }
  }
};
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
