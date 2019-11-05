<template>
  <header class="app_header__wrapper">
    <menu-icon
      class="icon-menu"
      @click="openMenu"
    />
    <p class="app_logo">
      StayOnAir
    </p>
    <div 
      v-if="!photoUrl"
      class="icon-user__wrapper"
      @click="$router.push('/login')"
    >
      <icon-user class="icon-user" />
    </div>
    <div class="app_aside_menu__user">
      <img
        :src="photoUrl"
        class="app_aside_menu__user_icon"
        alt=""
      >
    </div>
  </header>
</template>

<script>
import IconUser from '~/components/Atoms/Icons/IconUser'

export default {
  components: {
    IconUser
  },
  props: {
    photoUrl: {
      type: String,
      default: ''
    }
  },
  methods: {
    openMenu() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.app_header__wrapper {
  background-color: $color-white;
  display: flex;
  position: relative;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  height: 6rem;
  line-height: 6rem;
}

.app_logo {
  font-family: Vibur;
  font-size: 2.2rem;
  margin: 0;
  color: $color-primary;
}

.icon {
  &-setting {
    color: $color-primary;
  }

  &-menu {
    color: $color-primary;
  }
}

.app_aside_menu__user {
  &_icon {
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
    margin-top: 1rem;
  }
}

.icon-user__wrapper {
  position: absolute;
  top: 0;
  right: 1rem;
  height: 4rem;
  width: 4rem;
  margin-top: 1rem;
  border-radius: 50%;
  background-color: $gray-text-color;
}

.icon-user {
  position: absolute;
  top: -.1rem;
  right: 1rem;
}
</style>
