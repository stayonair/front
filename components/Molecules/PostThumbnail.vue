<template>
  <div class="post_thumbnail__wrapper">
    <div class="post_thumbnail__container">
      <div class="post_thumbnail">
        <div
          :style="`background-image: url(${post.thumbnail_photo_url});`"
          class="post_thumbnail__header__wrapper"
        >
          <div
            v-if="isPostPage"
            class="post_thumbnail__nav"
          >
            <left-arrow-icon
              class="icon__arrow"
              @click="goToPrevious"
            />
          </div>
          <div class="post_thumbnail__header__container">
            <div class="post_thumbnail__header">
              <h1 class="post_thumbnail__header__title">
                {{ post.title }}
              </h1>
            </div>
            <post-profile 
              :icon-url="post.author.icon_url"
              :name="post.author.name"
              :posted-at="post.posted_at"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostProfile from '~/components/Atoms/PostProfile'

export default {
  name: 'PostThumbnail',
  components: {
    PostProfile
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isPostPage() {
      const path = this.$route.path
      if (
        !path.includes('/posts') &&
        !path.includes('/my-posts')
      ) {
        return false
      }
      return true
    }
  },
  methods: {
    goToPrevious() {
      this.$router.push('/posts')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/post.scss';
.icon__arrow {
  cursor: pointer;
}
</style>
