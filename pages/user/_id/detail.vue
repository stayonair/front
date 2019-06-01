<template>
  <div>
    <p>ID 番号 {{ id }} のユーザー情報</p>
  </div>
</template>

<script>
export default {
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>
