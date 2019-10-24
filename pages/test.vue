<template>
  <div class="icon_wrapper__container">
    <icon-wrapper
      class="icon_heart__container"
      label=24
      @click="postLike"
    >
      <icon-heart
        class="icon_heart"
        :class="{'icon_heart--active': true}"
      />
    </icon-wrapper>

    <icon-wrapper
      class="icon_star__container"
      @click="addFavorite"
    >
      <icon-star
        class="icon_star"
        :class="{'icon_star--active': true}"
      />
    </icon-wrapper>
  </div>
</template>

<script>
import IconWrapper from '~/components/Atoms/IconWrapper'
import IconHeart from '~/components/Atoms/Icons/IconHeart'
import IconStar from '~/components/Atoms/Icons/IconStar'

export default {
  components: {
    IconWrapper,
    IconHeart,
    IconStar
  },
  methods: {
    postLike() {
      console.log('いいね')
    },
    addFavorite() {
      console.log('おきにいり')
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon_wrapper__container {
    display: flex;
  }

  .icon_heart__container {
    display: flex;
    align-items: center;
  }

  .icon_heart {
    &--active {
      fill: $color-pink;
    }
  }


  .icon_star {
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