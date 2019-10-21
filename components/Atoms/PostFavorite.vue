<template>
  <div class="post-favorite__container">
    <div
      @click="likeHandle"
      class="like_button__container"
    >
      <icon-heart
        class="like_button"
        :class="{'like_button--like': existLike}"
      />
      <span class="like_total">{{ totalLikes }}</span>
    </div>
    <div
      @click="favoriteHandle"
    >
      <icon-star
        class="favorite_button"
        :class="{'favorite_button--fave': existFavorite}"
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
    likeHandle() {
      this.$emit('like')
    },
    favoriteHandle() {
      this.$emit('fave')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-favorite__container {
  display: flex;
}

.like_button__container {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.like_button {
  margin-right: .3rem;
  &--like {
    fill: $color-pink;
  }
}

.like_total {
  width: .8rem;
  color: $color-gray;
  font-size: 1rem;
}

.favorite_button {
  width: 2.4rem;
  /deep/ {
    .icon--star--outline {
      fill: $color-yellow;
    }
  }

  &--fave {
    fill: $color-yellow;
  }
}
</style>