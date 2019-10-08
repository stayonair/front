<template>
  <div class="post_profile">
    <div class="post_profile__author">
      <img
        :src="iconUrl"
        class="post_profile__author_icon"
        alt="icon_url"
      >
      <span class="post_profile__author_name">
        @{{ name }}
      </span>
      <span class="post_profile__posted_at">
        {{ getPostedAt(postedAt) }}
      </span>
    </div>
  </div>
</template>

<script>
import formatDateMixins from '~/mixins/formatDateMixins'

export default {
  mixins: [formatDateMixins],
  props: {
    iconUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    postedAt: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/post.scss';  
</style>