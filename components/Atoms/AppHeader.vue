<template>
  <header class="app_header__wrapper">
    <menu-icon/>
    <p class="app_logo">StayOnAir</p>
    <settings-icon/>
  </header>
</template>

<style lang="scss" scoped>
.app_header__wrapper {
  background-color: $color-white;
  display: flex;
  justify-content: space-between;

  margin: 0 auto;
  padding: 0 1rem;
  max-width: 50rem;
  width: 100%;
  height: 4rem;
  line-height: 4rem;
}

.app_logo {
  font-family: Vibur;
  font-size: 2.2rem;
}
</style>
