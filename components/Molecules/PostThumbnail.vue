<template>
  <div class="post_thumbnail__wrapper">
    <div class="post_thumbnail__container">
      <div class="post_thumbnail">
        <div
          :style="`background-image: url(${post.thumbnail_photo_url});`"
          class="post_thumbnail__header__wrapper"
        >
          <div
            v-if="isSinglePostPage"
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
            <play-audio-icon
              v-if="isSinglePostPage"
              class="play_audio__icon"
              @handleAudioPlay="handleAudioPlay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayAudioIcon from '~/components/Molecules/PlayAudioIcon'

export default {
  name: 'PostThumbnail',
  components: {
    PlayAudioIcon
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isSinglePostPage() {
      const { path } = this.$route
      return (path.match(/\//g) || []).length > 1
    }
  },
  methods: {
    goToPrevious() {
      this.$router.push('/')
    },
    handleAudioPlay() {
      this.$emit('playAudio')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/post.scss';
.post_thumbnail__nav {
  height: 2rem;
  margin-bottom: 2rem;

  @include mobile {
    margin: 0;
  }
}

.post_thumbnail__header__wrapper {
  position: relative;
}
.play_audio__icon {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

.icon__arrow {
  cursor: pointer;
}
</style>
