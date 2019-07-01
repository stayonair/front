<template>
  <div class="app_user_layout">
    <div class="app_header">
      <app-header
        @toggle="toggleMenu"
      />
    </div>
    <div 
      :style="classObjectForAppContents" 
      class="app_contents" 
    >
      <app-aside-menu
        :class="{'app_aside_menu--opened': menuOpened}"
        :style="classObjectForAppAsideMenu" 
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
import AppAsideMenu from '~/components/Organisms/AppAsideMenu'

export default {
  components: {
    AppHeader,
    AppAsideMenu
  },
  data: () => {
    return {
      isOpened: false
    }
  },
  computed: {
    menuOpened() {
      return this.isOpened
    },
    classObjectForAppContents() {
      if (!this.isOpened) {
        return
      }
      return {
        overflow: 'hidden',
        height: '100%'
      }
    },
    classObjectForAppAsideMenu() {
      if (!this.isOpened) {
        return {
          'transform': 'translateX(-100%)'
        }
      }
      return {
        'transform': 'translateX(0)'
      }
    }
  },
  watch: {
    '$route': function (to, from) {
      if (to.path !== from.path) {
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
  z-index: 5;
}

$slide-size: 25rem;

.app_contents {
  display: flex;
}

.app_aside_menu {
  width: $slide-size;
  transition: transform .3s;
  position: fixed;
  top: 0;
  z-index: 4;
  transition: all 300ms 200ms ease;
}

.app_aside_menu--opened ~ .app_page {
  transform: translateX($slide-size);
  background-color: rgba($background-black, 0.6);
  transition: all 300ms 200ms ease;
}

.app_page {
  transition: all 300ms 200ms ease;
  max-width: $global-max-width;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 0 0;
  position: relative;
}

</style>
