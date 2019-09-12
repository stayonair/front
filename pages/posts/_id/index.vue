<template>
  <div class="post__wrapper">
    <div class="post__container">
      <div class="post">
        <post-thumbnail
          :post="post"
          class="post__thumbnail"
        />
        <div class="post__article">
          <p>
            {{ post.article }}
          </p>
          <div>
            <div
              class="audio__wrapper"
              :class="className"
            >
              <div class="icon-title-play-btn__wrapper">
                <div
                  class="icon-title__container"
                  @click="changeAudioFooterSize()"
                >
                  <div class="traveler-icon__container">
                    <img
                      :src="post.author.icon_url"
                      class="traveler-icon"
                    >
                  </div>
                  <div class="post__title">
                    {{ post.title }}
                    <div class="post_thumbnail__author_name">
                      @{{ post.author.name }}
                    </div>
                  </div>
                </div>

                <div
                  v-if="!isPlaying"
                  class="audio_controller--play"
                  @click="playAudio()"
                >
                  <icon-play class="icon_play" />
                </div>

                <div
                  v-else
                  @click="pauseAudio()"
                >
                  <button>pause</button>
                </div>
              </div>

              <!-- range ここから -->
              <figure class="post__audio">
                <audio
                  ref="audio"
                  class="audio"
                  preload="metadata"
                >
                  <code>audio</code> element
                </audio>
              </figure>

              <div :class="classForRange">
                <input
                  v-model="audioProgress"
                  class="input_range"
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  @change="seekingAudio()"
                >
                {{ audioCurrentTime | showMinutes }} /
                {{ audioDuration | showMinutes }}
                <p>{{ audioCurrentTime | showMinutes }}</p>
                <p>{{ audioProgress | showPercents }}%</p>
                <p>{{ (audioCurrentTime * audioProgress) / 100 }}</p>
              </div>

              <!-- range ここまで -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PostThumbnail from '~/components/Molecules/PostThumbnail'
import IconPlay from '~/components/Atoms/Icons/IconPlay'
import { clearInterval } from 'timers'

export default {
  name: 'Post',
  layout: 'user',
  components: {
    PostThumbnail,
    IconPlay
  },
  filters: {
    showMinutes(value) {
      if (!value) {
        return '00:00'
      }

      const minute = value > 60 ? value / 60 : '00'
      const second = ('00' + (value % 60).toFixed(0)).slice(-2)
      return `${minute}:${second}`
    },
    showPercents(value) {
      if (!value) {
        return '0'
      }
      const percents = parseFloat(value).toFixed(0)
      return percents
    }
  },
  data: () => ({
    className: 'audio--close',
    classForRange: 'range--close',
    isPlaying: false,
    audioProgress: 0,
    audioDuration: null, // audioトータル時間
    audioCurrentTime: null, // audio 経過時間
    timerObj: null,
    audioData: 'http://www.voice-pro.jp/announce/mp3/001-sibutomo.mp3'
  }),
  computed: {
    ...mapState({
      post: store => store.post.post
    }),
    getParams() {
      return this.$route.params.id
    }
  },
  async mounted() {
    const audio = new Audio(this.audioData)
    this.$refs.audio = audio
    await audio.load()
    audio.onloadedmetadata = () => {
      this.audioDuration = audio.duration
    }
  },
  methods: {
    changeAudioFooterSize() {
      if (this.className === 'audio--open') {
        this.className = 'audio--close'
      } else if (this.className !== 'audio--open') {
        this.className = 'audio--open'
      }
      if (this.classForRange === 'range--open') {
        this.classForRange = 'range--close'
      } else if (this.classForRange !== 'range--open') {
        this.classForRange = 'range--open'
      }
    },
    playAudio() {
      if (this.isPlaying) {
        return
      }
      this.isPlaying = !this.isPlaying
      console.log('playクリックタイム ' + this.$refs.audio.currentTime)
      this.timerObj = setInterval(() => {
        this.audioProgress =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        this.audioCurrentTime = this.$refs.audio.currentTime
      }, 100)
      this.$refs.audio.play()
    },
    pauseAudio() {
      if (!this.isPlaying) {
        return
      }
      this.isPlaying = !this.isPlaying
      window.clearInterval(this.timerObj)
      this.$refs.audio.pause()

      console.log('pauseクリックタイム ' + this.$refs.audio.currentTime)
    },
    async seekingAudio() {
      const onPlaying = this.isPlaying
      if (this.isPlaying) {
        console.log('とまって')
        await this.pauseAudio()
      }
      this.audioCurrentTime = (this.audioDuration / 100) * this.audioProgress
      this.$refs.audio.currentTime = this.audioCurrentTime
      console.log(`currentTimeは${this.$refs.audio.currentTime}`)
      if (onPlaying) {
        this.playAudio()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post__container {
  background-color: $color-white;
}

.post__thumbnail /deep/ {
  margin-bottom: 3rem;

  .post_thumbnail__header__wrapper {
    padding: 8rem 10rem;

    @include tablet() {
      padding: 5rem;
    }
    @include mobile() {
      padding: 3rem 1rem 2rem;
    }

    .post_thumbnail__header__container {
      padding: 1rem 5rem;

      @include tablet() {
        padding: 0;
      }
      @include mobile() {
        padding: 0;
      }

      .post_thumbnail__header {
        &__title {
          margin-bottom: 5rem;
        }

        &__tags {
          margin-bottom: 1rem;
        }

        @include mobile() {
          &__title {
            font-size: 2.5rem;
          }
        }
      }
    }
  }
}

.post__audio {
  margin-bottom: 2rem;
  text-align: center;

  .audio {
    width: 90%;
  }
}

.post__article {
  padding: 0 5rem;
  font-size: 1.4rem;
  line-height: 3rem;
}

// コンポーネント化予定の audio タグ について
.audio__wrapper {
  height: 10rem;
  background: $color-primary;
  color: $color-white;
  position: fixed;
  bottom: 5rem;
  left: 0;
  padding: 0.5rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-title-play-btn__wrapper {
  display: flex;
  justify-content: space-between;
  width: 90vw;
}

.icon-title__container {
  display: flex;
  align-items: center;
}

.traveler-icon {
  background: $color-white;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.post__title {
  margin-left: 1rem;
  // padding-bottom: 1rem;
}

.post_thumbnail__author_name {
  font-size: 1.2rem;
  line-height: 1rem;
}

.icon_play {
  width: 3rem;
}

.audio--open {
  height: 20rem;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-transition-property: height; // Google Chrome、Safari向け
  -webkit-transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in-out;
}

.audio--close {
  height: 7rem;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-transition-property: height;
  -webkit-transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in-out;
}

.input_range {
  width: 20rem;
  margin-left: 1rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: #eaeaea;
  height: 2px;
  width: 70vw;
  border-radius: 6px;

  &:focus,
  &:active {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    position: relative;
    width: 22px;
    height: 22px;
    display: block;
    background-color: #07be19;
    border-radius: 50%;
    -webkit-border-radius: 50%;
  }
}

.range--open {
  display: block;
}

.range--close {
  display: none;
}
</style>
