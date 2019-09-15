<template>
  <div
    class="record__button__wrapper"
    @click="handleButtonClick"
  >
    <div class="record__button--outside">
      <div
        class="record__button--inside"
        :class="{ active: isActive }"
      >
        <icon-microphone
          v-if="!isActive"
          class="icon_microphone"
        />
        <div v-if="isActive">
          <div class="icon_square" />
        </div>
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
  props: {
    isActive: {
      type: Boolean
    }
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
    background-color: $color-pink;
    border-radius: 50%;
  }
}

.icon_microphone {
  padding-top: 0.5rem;

  /deep/ .icon--microphone {
    width: 3rem;
  }
}

.active {
  background-color: $color-white;
  border: 0.4rem solid $color-brand;
}

.icon_square {
  width: 2rem;
  height: 2rem;
  background-color: $color-brand;
}
</style>
