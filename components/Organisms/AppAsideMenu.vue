<template>
  <div class="app_aside_menu">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      user: store => store.user.user
    }),
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
    }
  }
}
</script>

<style lang="scss" scoped>
$slide-size: 25rem;

.app_aside_menu {
  width: $slide-size;
  transition: transform 0.3s;
  position: fixed;
  top: 4rem;
  z-index: 2;
  transition: all 300ms 200ms ease;
}

.drawer-wrap {
  position: fixed;
  top: 8rem;
  z-index: 2;
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
  background-image: url('../../assets/img/bg_aside.png');
  background-size: cover;
  box-shadow: inset 0 0 0 25rem rgba($color-primary, 0.7);
  height: 100vh;
  padding-left: 4rem;
  padding-top: 4rem;
}

.app_aside_menu__item {
  color: $color-white;
}
</style>
