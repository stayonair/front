<template>
  <div class="news-feed-post__wrapper">
    <icon-loading
      v-if="isLoading"
      class="loading_icon"
    />
    <div class="news-feed-post__container">
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="news-feed-post"
        @click="goToPostPage(post.id)"
      >
        <post-thumbnail :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IconLoading from '~/components/Atoms/Icons/IconLoading'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

export default {
  name: 'NewsFeed',
  layout: 'user',
  components: {
    IconLoading,
    PostThumbnail
  },
  data:() => ({
    isLoading: false
  }),
  computed: {
    ...mapState({
      feedPosts: store => store.post.posts
    })
  },
  async created() {
    this.isLoading = true
    await this.initPosts()
    this.isLoading = false
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
.news-feed-post__container {
  background: $color-white;
  margin-bottom: 20rem;

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

.loading_icon {
  position: absolute;
  -webkit-animation: loading_icon 5s linear infinite;
  animation: loading_icon 5s linear infinite;
  left: 59rem;

  @include tablet() {
    left: 34rem;
  }

  @include mobile() {
    left: 15rem;
  }
}

@-webkit-keyframes loading_icon {
	0% { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}

@keyframes loading_icon {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>

