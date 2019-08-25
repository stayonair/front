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
        <!-- <a
          href="javascript:void(0)"
          class="btn"
          @click="handleToggleDrawer"
        >
        </a> -->
        <!-- AppAsideMenuコンポーネントここから-->
        <div class="app_aside_menu__user">
        <img
          :src="user.icon_url"
          class="app_aside_menu__user_icon"
          alt="icon_url"
        >
        <div class="app_aside_menu__user_account">
          <p class="app_aside_menu__user_name">
            @{{ user.name }}
          </p>
          <p class="app_aside_menu__user_place">
            {{ user.place }}
          </p>
        </div>
      </div>
        <div class="app_aside_menu__items">
          <p
            v-for="(item, index) in menuList"
            :key="index"
            class="app_aside_menu__item"
            @click="$router.push(item.path)"
          >
            {{ item.label }}
          </p>
        </div>
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
        </a> -->
      </div>
    </vue-drawer-layout>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '~/components/Molecules/AppHeader'
// import AppAsideMenu from '~/components/Organisms/AppAsideMenu'
import AppFooter from '~/components/Molecules/AppFooter'

export default {
  components: {
    AppHeader,
    // AppAsideMenu,
    AppFooter
  },
  data: () => {
    return {
      isOpened: false
    }
  },
  computed: {
    //AppAsideMenuコンポーネントここから
    ...mapState({
      user: store => store.user.user
    }),
    //AppAsideMenuコンポーネントここまで
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
    //AppAsideMenuコンポーネントここから
    menuList() {
      return [
        {
          label: 'ニュースフィード',
          path: '/news_feed'
        },
        {
          label: '検索',
          path: '/'
        },
        {
          label: 'メッセージ',
          path: '/'
        },
        {
          label: 'お知らせ',
          path: '/'
        },
        {
          label: 'マイページ',
          path: '/'
        },
        {
          label: '設定',
          path: '/'
        }
      ]
    },
    //AppAsideMenuコンポーネントここまで
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
    //AppAsideMenuコンポーネントここから
    handleToggleDrawer() {
      this.$refs.drawerLayout.toggle()
    },
    //AppAsideMenuコンポーネントここまで
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

//AppAsideMenuコンポーネントここから
.app_aside_menu {
  width: $slide-size;
  transition: transform 0.3s;
  position: fixed;
  top: 0;
  z-index: 4;
  transition: all 300ms 200ms ease;
}

// .app_aside_menu--opened ~ .app_page {
//   transform: translateX($slide-size);
//   background-color: rgba($background-black, 0.6);
//   transition: all 300ms 200ms ease;
// }
//AppAsideMenuコンポーネントここまで

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
  z-index: 3;
}

//AppAsideMenuコンポーネントここから
.drawer {
  z-index: 900;
}

.drawer-wrap {
  max-width: 100vw;
}

.drawer-layout.dorowa {
  position: fixed;
}

.dorowa {
  /deep/ .drawer {
    height: 100vh;
  }
}

.app_aside_menu__user {
  box-shadow: inset 0 0 0 25rem rgba($color-brand, 1);
  padding: 8rem 0 4rem 3rem;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: $color-white;
  font-weight: 100;

  &_icon {
    border-radius: 50%;
    background-color: $color-white;
    margin-right: 0.8rem;
    height: 4rem;
    width: 4rem;
  }

  &_name,
  &_place {
    color: $color-white;
    margin: 0 0.8rem 0 0;
  }
}

.app_aside_menu__items {
  background-image: url('../assets/img/bg_aside.png');
  background-size: cover;
  box-shadow: inset 0 0 0 25rem rgba($color-primary, 0.7);
  height: 100vh;
  padding-left: 4rem;
  padding-top: 4rem;
}

.app_aside_menu__item {
  color: $color-white;
}
//AppAsideMenuコンポーネントここまで
</style>
