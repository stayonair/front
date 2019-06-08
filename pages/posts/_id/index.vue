<template>
  <div class="post-detail__wrapper">
    {{ getParams }}
  </div>
</template>

<script>
export default {
  name: 'Posts',
  computed: {
    getParams() {
      return this.$route.params.id
    }
  }
}
</script>

<style></style>
