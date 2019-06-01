<template>
  <div class="form_item">
    <div class="form_item__inner">
      <div class="form_input__body form_item__body">
        <app-input
          :value="value"
          :type="type"
          :name="name"
          :placeholder="placeholder"
          :pattern="pattern"
          :disabled="disabled"
          :required="required"
          :is-error="errorContains()"
          :inner-label="innerLabel"
          class="form_input__input form_item__content"
          @input="updateInput"
          @blur="blurInput"
        />
      </div>
      <error-messages
        v-if="errorContains()"
        :errors="errors"
        class="form_input__error_messages form_item__error_messages"
      />
    </div>
  </div>
</template>

<script>
import formMixins from '~/mixins/formMixins'
import AppInput from '~/components/Atoms/AppInput'
export default {
  components: {
    AppInput
  },
  mixins: [formMixins],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    subLabel: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: [String, Number],
      default: null
    },
    pattern: {
      type: String,
      default: '.*'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Array,
      default: () => []
    },
    innerLabel: {
      type: String,
      default: ''
    }
  },
  methods: {
    updateInput(value) {
      this.$emit('input', value)
    },
    blurInput(value) {
      this.$emit('blur', value)
    }
  }
}
</script>

<style scoped lang="scss"></style>