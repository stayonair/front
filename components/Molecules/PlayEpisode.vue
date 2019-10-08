<template>
  <div class="play_episode">
    <div
      class="icon-play__container"
      @click="audioPlay"
    >
      <icon-play class="icon-play"/>
    </div>
  </div>
</template>

<script>
import IconPlay from '~/components/Atoms/Icons/IconPlay'

export default {
  name: 'PlayEpisode',
  components: {
    IconPlay
  },
  methods: {
    audioPlay() {
      this.$emit('handleAudioPlay')
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-play__container {
  position: relative;
  width: 4rem;
  height: 4rem;
  border: 0.2rem solid $color-white;
  border-radius: 50%;
  margin-right: 1.4rem;
}

.icon-play {
  position: absolute;
  width: 1.5rem;
  fill: #fff;
  left: 30%;
}

</style>