<template>
  <div class="app_user_layout">
    <div>
      <app-header
        class="app_header"
        @click="handleToggleDrawer"
      />
      <div 
        class="icon-record__container"
        @click="$router.push('/record')"
      >
        <icon-record />
      </div>
      <audio-bar class="post_audio" />
      <app-footer
        class="app_footer"
        :path="getPath"
      />
    </div>

    <!-- ⬇プラグイン -->
    <vue-drawer-layout
      ref="drawerLayout"
      :z-index="10"
      :backdrop="false"
      class="vue_drawer_layout"
    >
      <div
        slot="drawer"
        class="drawer-content"
      >
        <app-aside-menu />
      </div>
      <div
        slot="content"
        class="content"
      >
        <div class="app_page">
          <nuxt />
        </div>
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
import AppHeader from '~/components/Molecules/AppHeader'
import AppAsideMenu from '~/components/Organisms/AppAsideMenu'
import AppFooter from '~/components/Molecules/AppFooter'
import AudioBar from '~/components/Organisms/AudioBar'
import IconRecord from '~/components/Atoms/Icons/IconRecord'


export default {
  components: {
    AppHeader,
    AppAsideMenu,
    AppFooter,
    AudioBar,
    IconRecord
  },
  computed: {
    getPath() {
      return this.$route.path
    }
  },
  methods: {
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle()
    },
  }
}
</script>

<style scoped lang="scss">
.vue_drawer_layout {
  /deep/ .content-wrap {
    overflow: scroll;
  }
}

.app_header {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 100vw; // これを入れないとドロワーメニューを閉じるときの挙動がおかしい.
  width: 100%;
  z-index: 11; // プラグイン drawer メニューに合わせて
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
  z-index: 12; // プラグイン drawer メニュー に合わせて
}

.post_audio {
  position: fixed;
  bottom: 0;
  z-index: 13;
  width: 100%;
  font-size: 1.2rem;
}

.icon-record__container {
  width: 5rem;
  height: 5rem;
  background-color: $color-pink;
  filter: drop-shadow(3px 3px 3px rgba(0,0,0,0.6));
  border-radius: 50%;
  position: fixed;
  right: 3rem;
  bottom: 10rem;
  z-index: 13;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
