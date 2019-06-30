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
          icon: '',
          path: '/news_feed'
        },
        {
          label: '検索',
          icon: '',
          path: '/'
        },
        {
          label: 'メッセージ',
          icon: '',
          path: '/'
        },
        {
          label: 'お知らせ',
          icon: '',
          path: '/'
        },
        {
          label: 'マイページ',
          icon: '',
          path: '/'
        },
        {
          label: '設定',
          icon: '',
          path: '/'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.app_aside_menu {
  height: 100vh;
  padding: 4rem 0 0;
  background-image: url('../../assets/img/bg_aside.png');
  transition: transform .6s;
}

.app_aside_menu__user {
  box-shadow: inset 0 0 0 25rem rgba($color-brand, 0.6);
  padding: 4rem 0;

  display: flex;
  justify-content: center;
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

  &_name, &_place {
    color: $color-white;
    margin: 0 0.8rem 0 0;
  }
}

.app_aside_menu__items {
  box-shadow: inset 0 0 0 25rem rgba($color-primary, 0.6);
  height: 100vh;

  padding-left: 4rem;
  padding-top: 4rem;
}

.app_aside_menu__item {
  color: $color-white;
}
</style>
