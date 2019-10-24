<template>
  <header class="app_header__wrapper">
    <menu-icon
      class="icon-menu"
      @click="openMenu"
    />
    <p class="app_logo">
      StayOnAir
    </p>
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
export default {
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
    background-color: $color-white;
    height: 4rem;
    width: 4rem;
    margin-top: 1rem;
  }
}
</style>
