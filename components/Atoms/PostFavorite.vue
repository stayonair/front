<template>
  <div class="post-favorite__container">
    <div
      class="like_button"
      @click="likeHandle"
    >
      <icon-like v-if="isLike"/>
      <icon-heart v-else />
    </div>
    <div
      class="favorite_button"
      @click="favoriteHandle"
    >
      <icon-favorite v-if="isFavorite"/>
      <icon-star v-else />
    </div>
  </div>
</template>

<script>
import IconHeart from '~/components/Atoms/Icons/IconHeart'
import IconLike from '~/components/Atoms/Icons/IconLike'
import IconStar from '~/components/Atoms/Icons/IconStar'
import IconFavorite from '~/components/Atoms/Icons/IconFavorite'

export default {
  name: 'PostFavorite',
  components: {
    IconHeart,
    IconLike,
    IconStar,
    IconFavorite
  },
  props : {
    isLike: {
      type: Boolean,
      default: false
    },
    isFavorite: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    likeHandle() {
      this.$emit('like')
      console.log('いいね')
    },
    favoriteHandle() {
      this.$emit('favo')
      console.log('おきにいり')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-favorite__container {
  display: flex;
}

.like_button {
  margin-right: 1rem;
}

.favorite_button {
  /deep/ {
    .icon--star {
      width: 3rem;
    }
    .icon--star-shape {
      fill: $color-yellow;
    }
  }
}
</style>