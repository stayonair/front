<template>
  <div class="post_thumbnail__wrapper">
    <div class="post_thumbnail__container">
      <div class="post_thumbnail">
        <div
          :style="`background-image: url(${post.thumbnail_photo_url});`"
          class="post_thumbnail__header__wrapper"
        >
          <div
            v-if="isListPage"
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
            <play-episode
              v-if="isListPage"
              class="play_episode"
              @handleAudioPlay="handleAudioPlay"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PlayEpisode from '~/components/Molecules/PlayEpisode'

export default {
  name: 'PostThumbnail',
  components: {
    PlayEpisode
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    isListPage() {
      const { path } = this.$route
      return (path.match(/\//g) || []).length > 1
    }
  },
  methods: {
    goToPrevious() {
      this.$router.push('/posts')
    },
    handleAudioPlay() {
      this.$emit('handleAudioPlay')
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
.play_episode {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}

.icon__arrow {
  cursor: pointer;
}
</style>
