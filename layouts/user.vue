<template>
  <div class="app_user_layout">
    <div>
      <div class="app_header">
        <app-header
          @click="handleToggleDrawer"
        />
      </div>
      <div
        :style="classObjectForAppContents"
        class="app_contents"
      >
        <div class="app_page">
          <nuxt />
        </div>
      </div>
      <app-footer
        class="app_footer"
        :path="getPath"
      />
    <!-- v-if="!menuOpened" -->
    </div>
    <!-- ⬇プラグイン -->
    <vue-drawer-layout
      ref="drawerLayout"
      class="dorowa"
    >
      <!-- ⬇ないと動かない -->
      <div
        slot="drawer"
        class="drawer"
      >
        <!-- ⬇プラグインの内容だけど無くて動く -->
        <a
          href="javascript:void(0)"
          class="btn"
          @click="handleToggleDrawer"
        >
        </a>
        <!-- AppAsideMenuコンポーネントここから-->
          <app-aside-menu />
      </div>
      <!-- AppAsideMenuコンポーネントここまで-->
      <!-- ⬇ないと動かない -->
      <div
        slot="content"
        class="content"
      >
        <!-- ⬇プラグインの内容だけど無くて動く -->
        <!-- <a
          href="javascript:void(0)"
          class="btn"
          @click="handleToggleDrawer"
        >
        </app-aside-menu> -->
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import AppHeader from '~/components/Molecules/AppHeader'
import AppAsideMenu from '~/components/Organisms/AppAsideMenu'
import AppFooter from '~/components/Molecules/AppFooter'

export default {
  components: {
    AppHeader,
    AppAsideMenu,
    AppFooter
  },
  data: () => {
    return {
      isOpened: false
    }
  },
  computed: {
    getPath() {
      return this.$route.path
    },
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
          transform: 'translateX(-100%)'
        }
      }
      return {
        transform: 'translateX(0)'
      }
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.path !== from.path) {
        this.isOpened = false
      }
    }
  },
  methods: {
    handleToggleDrawer() {
       this.$refs.drawerLayout.toggle()
     },
    toggleMenu() {
      // this.isOpened = !this.isOpened
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
  z-index: 820; // プラグイン drawer メニュー が818のため
}

.app_contents {
  display: flex;
}

.app_page {
  transition: all 300ms 200ms ease;
  max-width: $global-max-width;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 5rem; // .app_footer の height と同じ値にする
  padding: 4rem 0 0;
  position: relative;
}

.app_footer {
  width: 100%;
  height: 5rem; // .app_page の margin-bottom と同じ値にする
  line-height: 7rem;
  border-top: solid 0.1rem $gray-text-color;
  background-color: $color-white;
  position: fixed;
  bottom: 0;
  z-index: 819; // プラグイン drawer メニュー が818のため
}
</style>
