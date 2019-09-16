<template>
  <div>
    <h2 class="app_page_title">
      {{ title }}
    </h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.app_page_title {
  font-size: 1.4rem;
  color: $color-brand;
}
</style>