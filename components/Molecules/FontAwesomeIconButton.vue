<template>
  <div
    class="app_icon_button"
    @click="handleClick()"
  >
    <i
      :class="getClasses"
      class="app_icon_button--icon fas"
    />
  </div>
</template>

<script>
export default {
  props: {
    awesomeIcon: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: 'red',
      validator(val) {
        return ['red'].includes(val)
      }
    }
  },
  computed: {
    getClasses() {
      const styles = {}
      styles[`${this.awesomeIcon}`] = true
      styles[`is_${this.color}`] = true
      return styles
    }
  },
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
.app_icon_button {
  font-size: 2rem;
  display: flex;
  align-items: center;
  
  &--icon {
    width: 3rem;
  }
}

.is_red {
  color: $color-red;
}
</style>