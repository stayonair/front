<template>
  <div class="posts__wrapper">
    <div class="posts__container">
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="post"
        @click="goToPostPage(post.id)"
      >
        <post-thumbnail
          :post="post"
          class="post_thumbnail"
        />
        <post-profile
          :icon-url="post.author.icon_url"
          :name="post.author.name"
          :posted-at="post.posted_at"
          class="post_profile"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'
import PostProfile from '~/components/Atoms/PostProfile'

export default {
  name: 'NewsFeed',
  layout: 'user',
  components: {
    PostThumbnail,
    PostProfile
  },
  computed: {
    ...mapState({
      feedPosts: store => store.post.posts
    })
  },
  created() {
    this.initPosts()
  },
  methods: {
    ...mapActions('post', ['initPosts']),
    goToPostPage(id) {
      this.$router.push({ path: `posts/${id}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.posts__wrapper {
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
}
.posts__container {
  background-color: #{$background-gray}77;
  margin-bottom: 5rem;

  .post {
    background-color: $color-white;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.4);
    width: 100%;
    height: auto;
    max-width: 50rem;
    margin: 0 auto;
    padding-bottom: 1rem;
    transition: all 0.4s;

    &__thumbnail {
      margin-bottom: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: 0.8rem;
    }

    &:hover {
      opacity: 0.8;
      transform: scale(0.99, 0.99);
    }
  }
}
</style>
