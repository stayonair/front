<template>
  <div class="post-detail__wrapper">
    {{ getParams }}
  </div>
</template>

<script>
export default {
  name: 'posts',
  computed: {
    getParams() {
      return this.$route.params.id
    }
  }
}
</script>

<style>

</style>
