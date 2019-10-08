<template>
  <div class="app_aside_menu aside_menu--noon">
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

    <div 
      class="app_aside_menu__items"
    >
      <div
        v-for="(menuItem, index) in menuList"
        :key="index"
        class="app_aside_menu__item"
        @click="handleClick(menuItem)"
      >
        <div>
          <component 
            :is="getComponent(menuItem)"
            class="menu-icon"
          />
        </div>
        <div class="menu-label">
          {{ menuItem.label }}
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import IconNewsFeed from '~/components/Atoms/Icons/IconNewsFeed'
import IconSearch from '~/components/Atoms/Icons/IconSearch'
import IconMyPage from '~/components/Atoms/Icons/IconMyPage'
import IconFollow from '~/components/Atoms/Icons/IconFollow'
import IconStar from '~/components/Atoms/Icons/IconStar'
import IconPost from '~/components/Atoms/Icons/IconPost'
import IconAccount from '~/components/Atoms/Icons/IconAccount'
import IconCategory from '~/components/Atoms/Icons/IconCategory'
import IconTag from '~/components/Atoms/Icons/IconTag'

export default {
  name: 'AppAsideMenu',
  components: {
    IconNewsFeed,
    IconSearch,
    IconMyPage,
    IconFollow,
    IconStar,
    IconPost,
    IconAccount,
    IconCategory,
    IconTag
  },
  data: () => ({
    menuList: [
        {
          icon: 'news-feed',
          label: 'ニュースフィード',
          path: '/'
        },
        {
          icon: 'search',
          label: '検索',
          path: '/search'
        },
        {
          icon: 'my-page',
          label: 'マイページ',
          path: '/'
        },
        {
          icon: 'follow',
          label: 'フォロートラベラー',
          path: '/following'
        },
        {
          icon: 'star',
          label: 'あとで聴くリスト',
          path: '/favorite'
        },
        {
          icon: 'post',
          label: '投稿管理',
          path: '/my-posts'
        },
        {
          icon: 'account',
          label: 'アカウント',
          path: '/my-account'
        },
        {
          icon: 'category',
          label: 'カテゴリ',
          path: '/'
        },
        {
          icon: 'tag',
          label: 'タグ',
          path: '/'
        }
      ]
  }),
  computed: {
    ...mapState({
      user: store => store.user.user
    }),
  },
  methods: {
      getComponent(menuItem) {
        return 'icon-' + menuItem.icon
      },
      handleClick(menuItem) {
        this.$emit('click')
        this.$router.push(menuItem.path)
      }
    }
}
</script>

<style lang="scss" scoped>
@import '~/assets/background.scss';

.app_aside_menu {
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  position: fixed;
  top: 4rem;
  z-index: 2;
  transition: all 300ms 200ms ease;
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
  padding: 4rem 0 4rem 3rem;
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
  height: 100vh;
  padding-left: 4rem;
  padding-top: 4rem;
}

.app_aside_menu__item {
  display: flex;
  color: $color-white;
  margin-bottom: 1.5rem;
}

.menu-label {
  padding-left: 1rem;
}
</style>
