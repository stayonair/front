<template>
  <div class="news-feed-post__wrapper">
    <div class="news-feed-post__container">
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="news-feed-post"
        @click="goToPostPage(key)"
      >
        <post-thumbnail
          :post="post"
        /> 
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

export default {
  name: 'NewsFeed',
  layout: 'user',
  components: {
    PostThumbnail
  },
  computed: {
    ...mapState({
      feedPosts: store => store.post.feedPosts
    })
  },
  methods: {
    goToPostPage(key) {
      this.$router.push({ path: `posts/${key}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.news-feed-post__container {
  background: $color-white;

  .news-feed-post {
    width: 100%;
    height: auto;
    max-width: 50rem;
    max-height: 30rem;
    margin: 0 auto;
    box-shadow: inset 0 0 0 25rem rgba(0, 30, 40, 0.6);
    transition: all 0.4s;

    &:not(:last-child) {
      margin-bottom: 4rem;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(0.99, 0.99);
    }
  }
}
</style>
