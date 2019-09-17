<template>
  <div class="splash__container --noon">
    <div class="app_logo__container">
      <icon-balloon />
      <p class="app_logo">
        StayOnAir
      </p>
    </div>
  </div>
</template>

<script>
import IconBalloon from '~/components/Atoms/Icons/Iconballoon'

export default {
  components: {
    IconBalloon
  }
}
</script>

<style scoped lang="scss">
@import '~/assets/background.scss';

.splash__container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.app_logo__container {
  text-align: center;
  /deep/ .icon--balloon {
    fill: $color-white;
  }
}

.app_logo {
  font-family: Vibur;
  font-size: 5rem;
  color: $color-white;
}
</style>
