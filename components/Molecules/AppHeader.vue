<template>
  <header class="app_header__wrapper">
    <menu-icon 
      class="icon-menu"
      @click="openMenu"
    />
    <p class="app_logo">
      StayOnAir
    </p>
    <settings-icon class="icon-setting" />
  </header>
</template>

<script>
export default {
  methods: {
    openMenu(){
      this.$emit('toggle')
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
  height: 4rem;
  line-height: 4rem;
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
</style>
