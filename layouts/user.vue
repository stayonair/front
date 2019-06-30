<template>
  <div>
    <div class="app_header">
      <app-header
        @toggle="toggleMenu"
      />
    </div>
    <div class="app_contents">
      <div
        v-if="menuOpened"
        class="app_aside_menu" 
      />
      <div class="app_page">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Molecules/AppHeader'

export default {
  components: {
    AppHeader
  },
  data: () => {
    return {
      isOpened: false
    }
  },
  computed: {
    menuOpened() {
      return this.isOpened
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to !== from) {
        this.isOpened = false
      }
    }
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened
    }
  }
}
</script>


<style scoped lang="scss">
.app_header {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100vw; // これを入れないとドロワーメニューを閉じるときの挙動がおかしい.
  width: 100%;
  z-index: 1;
}

.app_aside_menu {
  height: 1vh;
  width: 15rem;
  transition: transform .3s;
}

.app_aside_menu ~ .app_page {
  transform: translateX(15rem);
}

.app_contents {
  display: flex;
}

.app_page {
  transition: transform .6s;
  max-width: $global-max-width;
  margin: 0 auto;
  padding: 4rem 0 0;
}
</style>
