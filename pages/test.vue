<template>
  <div>
    <post-favorite
      @like="likeAct"
      @favo="favoriteAct"
      :isLike="isLike"
      :isFavorite="isFavorite"
    />
  </div>
</template>

<script>
import PostFavorite from '~/components/Atoms/PostFavorite'

export default {
  components: {
    PostFavorite
  },
  data: () => ({
    like: false
  }),
  computed: {
    isLike() {
      if (this.like) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    likeAct() {
      if (this.like) {
        this.like = false
        return
      }
      this.like = true
    },
    favoriteAct() {
    }
  }

}
</script>

<style>

</style>