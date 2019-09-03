<template>
  <div class="post__wrapper">
    <div class="post__container">
      <div class="post">
        <post-thumbnail
          :post="post"
          class="post__thumbnail"
        />
        <!-- <figure class="post__audio">
          <audio
            class="audio"
            controls
            preload="auto"
            src="http://www.voice-pro.jp/announce/mp3/001-sibutomo.mp3"
          >
            <code>audio</code> element
          </audio>
        </figure> -->
        <figure class="post__audio">
          <audio
            ref="audio"
            class="audio"
            preload="metadata"
          >
            <code>audio</code> element
          </audio>
        </figure>

        <input
          v-model="audioProgress"
          class="input_range"
          type="range"
          min="0"
          max="100"
          step="5"
        >
        {{ audioCurrentTime }} / {{ audioDuration }}

        <div class="post__article">
          <p>
            {{ post.article }}
          </p>
          <!-- コンポーネント化予定の audio タグ -->
          <div>
            <div
              class="audio__wrapper"
              :class="className"
            >
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

export default {
  name: 'Post',
  layout: 'user',
  components: {
    PostThumbnail,
    IconPlay
  },
  data: () => ({
    className: '',
    isPlaying: false,
    audioProgress: 0,
    audioDuration: null, // audioトータル時間
    audioCurrentTime: null, // audio 経過時間
    audioData: 'http://www.voice-pro.jp/announce/mp3/001-sibutomo.mp3'
  }),
  computed: {
    ...mapState({
      post: store => store.post.post,
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
      } else {
        this.className = "audio--open"
      }
    },
    getDuration() {
      console.log(this.$refs)
      return this.$refs.audio.duration
    },
    playAudio() {
      // console.log('playAudio の時の audio' + this.$refs.audio);
      console.log(this.$refs.audio);
      console.log('readyState ' + this.$refs.audio.readyState);
      console.log('playクリックタイム ' + this.$refs.audio.currentTime);
      this.audioCurrentTime = this.$refs.audio.currentTime

      this.$refs.audio.play()
      this.isPlaying = !this.isPlaying
    },
    pauseAudio() {
      console.log('readyState ' + this.$refs.audio.readyState);
      console.log('pauseクリックタイム ' + this.$refs.audio.currentTime);
      this.audioCurrentTime = this.$refs.audio.currentTime

      this.$refs.audio.pause()
      this.isPlaying = !this.isPlaying
    },
    seekingAudio() {
      console.log("seeking began")
      console.log(this.audioProgress)
    },
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
  height: 7rem;
  background: $color-primary;
  color: $color-white;
  position: fixed;
  bottom: 5rem;
  left: 0;
  padding: 1rem;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-title__container {
  display: flex;
  align-items: center;
}

.traveler-icon {
  background: $color-white;
  margin-top: 1rem;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.post__title {
  margin-left: 1rem;
}

.post_thumbnail__author_name {
  font-size: 1.2rem;
  line-height: 1rem;
}

.icon_play {
  width: 3rem;
}

.audio--open {
  height:20rem;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function:ease-in-out;
  -webkit-transition-property: height; // Google Chrome、Safari向け
  -webkit-transition-duration:0.2s;
  -webkit-transition-timing-function:ease-in-out;
}

.audio--close {
  height: 7rem;
  transition-property: height;
  transition-duration:0.2s;
  transition-timing-function:ease-in-out;
  -webkit-transition-property: height;
  -webkit-transition-duration:0.2s;
  -webkit-transition-timing-function:ease-in-out;
}
.input_range{
  width: 20rem;
  margin-left: 1rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: #eaeaea;
  height: 2px;
  width: 70Vw;
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
</style>
