<template>
  <div class="post__wrapper">
    <icon-loading
      v-if="isLoading"
      class="loading_icon"
    />
    <div
      v-for="(post, key) in feedPosts"
      :key="key"
      class="post__container"
      @click="goToPostPage(post.id)"
    >
      <post-thumbnail
        class="post"
        :post="post"
      />
      <post-profile
        :icon-url="post.author.icon_url"
        :name="post.author.name"
        :posted-at="post.posted_at"
        class="post_profile"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostProfile from '~/components/Atoms/PostProfile'
import IconLoading from '~/components/Atoms/Icons/IconLoading'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

export default {
  name: 'NewsFeed',
  layout: 'user',
  components: {
    PostProfile,
    IconLoading,
    PostThumbnail
  },
  data:() => ({
    isLoading: false,
    isDisabled: false
  }),
  computed: {
    ...mapState({
      feedPosts: store => store.post.posts
    })
  },
  async created() {
    this.isLoading = true
    if (this.isDisabled) {
      return
    }
    this.isDisabled = true
    await this.initPosts()
    this.isLoading = false
    this.isDisabled = false
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
.post__container {
  background: $color-white;
  margin-bottom: 2rem;
  border-bottom: 0.1rem solid #{$color-gray}33;

  .post {
    width: 100%;
    height: auto;
    max-width: 50rem;
    max-height: 30rem;
    margin: 0 auto;
    box-shadow: inset 0 0 0 25rem rgba(0, 30, 40, 0.6);
    transition: all 0.4s;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  &:hover {
    opacity: 0.8;
    transform: scale(0.99, 0.99);
  }
}

.post_profile {
  padding-left: 10rem;
  padding-bottom: 1rem;

  @include mobile() {
    padding-left: 3rem;
  }
}

.loading_icon {
  position: absolute;
  -webkit-animation: loading_icon 5s linear infinite;
  animation: loading_icon 5s linear infinite;
  left: 59rem;

  @include tablet() {
    left: 35.5rem;
  }

  @include mobile() {
    left: 16rem;
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

