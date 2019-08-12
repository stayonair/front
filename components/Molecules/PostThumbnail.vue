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
export default {
  name: 'PostThumbnail',
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
    getPostedAt(postedAt) {
      const date = new Date(postedAt.replace(/-/g, '-'))
      const timeDiff = Math.floor((new Date() - date) / 3600000)
      const dateDiff = Math.floor(timeDiff / 24)

      if (dateDiff === 0) {
        // 24 時間以内の更新の場合、時間を表示する
        return `${timeDiff} hour${timeDiff > 1 ? 's' : ''} ago`
      }
      if (dateDiff > 30) {
        // 1 月以上前の更新の場合、日付を表示する
        return `${date.getFullYear()} / ${date.getMonth() +
          1} / ${date.getDate()}`
      }
      return `${dateDiff} day${dateDiff > 1 ? 's' : ''} ago` // 24 時間以上 1 月以内の更新の場合、何日前の更新かを表示する
    },
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
