<template>
  <div class="post-favorite__container">
    <div
      @click="handleLikeClick"
      class="like_icon__container"
    >
      <icon-heart
        class="like_icon"
        :class="{'like_icon--active': existLike}"
      />
      <span class="like_total">{{ totalLikes }}</span>
    </div>
    <div
      @click="handleFavoriteClick"
    >
      <icon-star
        class="favorite_icon"
        :class="{'favorite_icon--active': existFavorite}"
      />
    </div>
  </div>
</template>

<script>
import IconHeart from '~/components/Atoms/Icons/IconHeart'
import IconStar from '~/components/Atoms/Icons/IconStar'

export default {
  name: 'PostFavorite',
  components: {
    IconHeart,
    IconStar
  },
  props : {
    existLike: {
      type: Boolean,
      default: false
    },
    existFavorite: {
      type: Boolean,
      default: false
    },
    totalLikes: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleLikeClick() {
      this.$emit('like')
    },
    handleFavoriteClick() {
      this.$emit('fave')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-favorite__container {
  display: flex;
}

.like_icon__container {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.like_icon {
  margin-right: .3rem;
  &--active {
    fill: $color-pink;
  }
}

.like_total {
  width: .8rem;
  color: $color-gray;
  font-size: 1rem;
}

.favorite_icon {
  width: 2.4rem;
  /deep/ {
    .icon--star--outline {
      fill: $color-yellow;
    }
  }

  &--active {
    fill: $color-yellow;
  }
}
</style>
