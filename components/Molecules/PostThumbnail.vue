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
              <div class="post_thumbnail__header__tags">
                <span
                  v-for="(tag, tagIndex) in post.tags"
                  :key="tagIndex"
                  class="post_thumbnail__header__tag"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
            <div class="post_thumbnail__status">
              <div class="post_thumbnail__author">
                <img
                  :src="post.author.icon_url"
                  class="post_thumbnail__author_icon"
                  alt="icon_url"
                >
                <span class="post_thumbnail__author_name">
                  @{{ post.author.name }}
                </span>
                <span class="post_thumbnail__posted_at">
                  {{ getPostedAt(post.posted_at) }}
                </span>
              </div>
              <div class="post_thumbnail__like">
                <heart-icon class="icon__heart" />
                <span class="post_thumbnail__like_number">
                  {{ post.like || '' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import formatDateMixins from '~/mixins/formatDateMixins'
import AppButton from '~/components/Atoms/AppButton'

export default {
  name: 'PostThumbnail',
  mixins: [formatDateMixins],
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isPostPage() {
      const path = this.$route.path
      if (path.includes('posts')) {
        return true
      }
      return false
    }
  },
  methods: {
    goToPrevious() {
      this.$router.push('/news_feed')
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
