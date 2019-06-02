<template>
  <div class="app_button__wrapper">
    <div class="app_button__container">
      <button
        :type="type"
        :disabled="disabled"
        :class="buttonClasses"
        @click="handleClick"
      >
        {{ text }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'white',
      validator(val) {
        return ['white', 'gray', 'yellow', 'transparent'].includes(val)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'submit',
      validator(val) {
        return ['submit', 'button'].includes(val)
      }
    }
  },
  computed: {
    buttonClasses() {
      const styles = { app_button: true }
      styles[`is_${this.color}`] = true
      return styles
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped lang="scss">
.app_button {
  padding: rem(10px) rem(22px);
  border-radius: rem(20px);
  font: inherit;
  line-height: normal;
  overflow: visible;
  transition: 0.2s all;
  -webkit-appearance: none;
  -moz-appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover,
  &:focus {
    cursor: pointer;
    opacity: 0.6;
  }
  &:disabled {
    background-color: $form-disabled-color;
    border: solid 1px $form-disabled-color;
  }
}
.is_white {
  border: solid 1px $color-white;
  background-color: $color-white;
  color: $color-primary;
}
.is_gray {
  border: solid 1px $button-gray;
  background-color: $button-gray;
  color: $color-white;
}
.is_yellow {
  border-color: $button-yellow;
  background-color: $button-yellow;
  color: $color-white;
}
.is_transparent {
  border-color: $color-white;
  background-color: none;
  color: $color-white;
}
</style>
