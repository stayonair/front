<template>
  <div
    class="record__button__wrapper"
    @click="handleButtonClick"
  >
    <div class="record__button--outside">
      <div class="record__button--inside">
        <icon-microphone class="icon_microphone" />
      </div>
    </div>
  </div>
</template>

<script>
import IconMicrophone from '~/components/Atoms/Icons/IconMicrophone'

export default {
  components: {
    IconMicrophone
  },
  methods: {
    handleButtonClick() {
      this.$emit('buttonClick')
    }
  }
}
</script>

<style scoped lang="scss">
.record__button__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.record__button {
  &--outside {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: $color-white;
  }

  &--inside {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 5rem;
    background-color: $color-yellow;
    border-radius: 50%;
  }
}

.icon_microphone {
  padding-top: 0.5rem;

  /deep/ .icon--microphone {
    width: 3rem;
  }
}
</style>
