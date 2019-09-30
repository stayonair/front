<template>
  <div class="my-posts__wrapper">
    <div class="my-posts__user_container">
      <img
        :src="user.icon_url"
        class="my-posts__user_icon"
        alt="icon_url"
      >
      <div class="my-posts__user_account">
        <p class="my-posts__user_name">
          @{{ user.name }}
        </p>
        <p class="my-posts__user_place">
          {{ user.place }}
        </p>
      </div>
    </div>

    <div class="post-category_container">
      <div class="post-category selected">
        投稿済み
        <div class="bottom-border"></div>
      </div>
      <div class="post-category">
        下書き
        <div class="bottom-border hidden"></div>
      </div>
    </div>

    <div class="my-posts__container">
      <div
        v-for="(post, key) in feedPosts"
        :key="key"
        class="my-posts"
        @click="goToPostPage(key)"
      >
        <post-thumbnail :post="post" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'

export default {
  name: 'my-posts',
  layout: 'user',
  components: {
    PostThumbnail
  },
  computed: {
    ...mapState({
      user: store => store.user.user,
      feedPosts: store => store.post.feedPosts,
    })
  },
  created() {
    this.initPosts()
  },
  methods: {
    ...mapActions('post', ['initPosts']),
    goToPostPage(key) {
      this.$router.push({ path: `posts/${key}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.my-posts__user_container {
  background-color: #8BD7E5;
  padding: 2.5rem 0 1rem;
  margin-bottom: 2rem;
}

.my-posts__user_container {
  text-align: center;
  color: $color-white;
}

.my-posts__user_icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background: $color-white;
}

.my-posts__user_name {
  margin-bottom: 0;
}

.my-posts__user_place {
  font-size: 1rem;
}

.post-category_container {
  display: flex;
  justify-content: center;
}

.post-category {
  width: 30Vw;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  text-align: center;
  color: $dark-gray-text-color;
}

.selected {
  color: $color-brand;
}

.bottom-border {
  width: 30Vw;
  height: 0.4rem;
  background: $color-brand;
  border-radius: 3rem;
}

.hidden {
  display: none;
}

.my-posts__container {
  background: $color-white;

  .my-posts {
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
