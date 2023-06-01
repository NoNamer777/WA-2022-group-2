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
    :input-class="inputClass"
    :help="help"
  />
  <datalist v-if="dataList" :id="dataListId">
    <option v-for="(data, index) in dataList" :key="index">{{ data }}</option>
  </datalist>
</template>

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
      type: [String, Array],
      required: false,
      default: ''
    },
    modelValue: {
      type: [String, Number, Array]
    },
    validationVisibility: {
      type: String,
      required: false
    },
    options: {
      type: Array,
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
    },
    help: {
      type: String,
      required: false
    }
  },
  computed: {
    dataListId() {
      return this.dataList ? name + '-dataList' : '';
    }
  }
};
</script>
