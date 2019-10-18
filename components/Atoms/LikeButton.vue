<template>
  <div>
    <div
      @click="likeHandle()"
    >
      <icon-heart v-if="!isLike"/>
      <icon-like v-if="isLike"/>
    </div>
  </div>
</template>

<script>
import IconHeart from '~/components/Atoms/Icons/IconHeart'
import IconLike from '~/components/Atoms/Icons/IconLike'

export default {
  name: 'LikeButton',
  components: {
    IconHeart,
    IconLike
  },
  props : {
    isLike: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    likeToggleAct() {
      $emit('click')
      console.log('clicked')
    }
  }
}
</script>

<style>

</style>