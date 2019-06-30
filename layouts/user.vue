<template>
  <div>
    <div class="app_header">
      <app-header/>
    </div>
    <div class="app_page">
      <nuxt />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Atoms/AppHeader'

export default {
  components: {
    AppHeader
  }  
}
</script>


<style scoped lang="scss">
.app_header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.app_page {
  max-width: $global-max-width;
  margin: 0 auto;
  padding: 4rem 0 0;
}
</style>
