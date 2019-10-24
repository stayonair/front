<template>
  <div class="app_user_layout">
    <div>
      <app-header
        class="app_header"
        :photo-url="getPhotoURL"
        @click="handleToggleDrawer"
      />
      <audio-bar
        v-if="isAudioData"
        class="post_audio"
      />
      <app-footer
        class="app_footer"
        :path="getPath"
      />
    </div>

    <!-- ⬇プラグイン -->
    <vue-drawer-layout
      ref="drawerLayout"
      class="vue_drawer_layout"
      :z-index="10"
      :backdrop="true"
      :drawer-width="250"
      :content-drawable="true"
      @mask-click="handleMaskClick"
    >
      <div
        slot="drawer"
        class="drawer-content"
      >
        <app-aside-menu @click="hideDrawerMenu" />
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
import { mapState } from 'vuex'
import AppHeader from '~/components/Molecules/AppHeader'
import AppAsideMenu from '~/components/Organisms/AppAsideMenu'
import AppFooter from '~/components/Molecules/AppFooter'
import AudioBar from '~/components/Organisms/AudioBar'

export default {
  components: {
    AppHeader,
    AppAsideMenu,
    AppFooter,
    AudioBar
  },
  computed: {
    ...mapState({
      audioData: store => store.audio.audioData,
      auth: store => store.auth.user
    }),
    getPath() {
      return this.$route.path
    },
    getPhotoURL() {
      if (this.auth) {
        return this.auth.photoURL
      }
      return ''
    },
    isAudioData() {
      if (this.audioData) {
        return true
      }
      return false
    }
  },
  methods: {
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle()
    },
    handleMaskClick() {
      this.$refs.drawerLayout.toggle(false)
    },
    hideDrawerMenu() {
      this.$refs.drawerLayout.toggle()
    }
  }
}
</script>

<style scoped lang="scss">
.vue_drawer_layout {
  position: relative;
  /deep/ .content-wrap {
    overflow: scroll;
  }
}

.vue_drawer_layout {
  /deep/.drawer-mask {
    height: 500rem;
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
  padding: 6rem 0 0;
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
  z-index: 12;
  width: 100%;
  font-size: 1.2rem;
}
</style>
