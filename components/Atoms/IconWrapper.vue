<template>
  <div class="icon_wrapper__container">
    <div
      class="icon_wrapper"
      @click="handleClick"
    >
      <slot />
      <span
        v-if="existLabel"
        class="label"
      >
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconWrapper',
  props: {
    label: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    existLabel() {
      if (this.label == 0) {
        return true
      }
      if (!this.label) {
        return false
      }
      return true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon_wrapper {
  display: flex;
  align-items: center;
}
.label {
  margin-left: .3rem;
  margin-right: 1rem;
  width: 1rem;
  font-size: 1rem;
}
</style>
