<template>
  <div>
    <div
      v-if="isOpened"
      class="mask"
      @click="isOpened = !isOpened"
    />
    <div class="modal" />
    <div
      class="audio__wrapper"
      :class="isOpened ? 'audio--open' : 'audio--close'"
    >
      <div class="icon-title-play-btn__wrapper">
        <div
          class="icon-title__container"
          @click="isOpened = !isOpened"
        >
          <div class="traveler-icon__container">
            <img
              :src="audio.author.icon_url"
              class="traveler-icon"
            >
          </div>
          <div class="post__title">
            {{ audio.title }}
            <div class="post_thumbnail__author_name">
              @{{ audio.author.name }}
            </div>
          </div>
        </div>

        <!-- play / pause アイコン （小）ここから-->
        <div
          v-if="!isOpened"
          class="icon_controls__container"
        >
          <div
            v-if="!isPlaying"
            class="audio_controller --play"
            @click="playAudio()"
          >
            <div class="icon_contain_circle">
              <icon-play class="icon_play" />
            </div>
          </div>

          <div
            v-else
            class="audio_controller --pause"
            @click="pauseAudio()"
          >
            <div class="icon_contain_circle">
              <icon-pause class="icon_pause" />
            </div>
          </div>
          <div class="icon_close__container">
            <span @click="resetAudioData()">✕</span>
          </div>
        </div>
        <!-- play / pause アイコン （小）ここまで-->
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

      <div
        v-if="isOpened"
        class="input_range__container"
      >
        {{ audioDuration * audioProgress / 100 | convertToMinites }}
        <input
          v-model="audioProgress"
          class="input_range"
          type="range"
          min="0"
          max="100"
          step="0.1"
          value="0"
          @change="seekingAudio()"
        >
        {{ audioDuration | convertToMinites }}
        <!-- 経過時間 / 全体 -->
      </div>
      <!-- range ここまで -->

      <div v-if="isOpened">
        <div class="control-audio-seconds">
          <div
            class="icon_undo__container"
            @click="backAudioSeconds(10)"
          >
            <icon-undo class="icon_undo" />
            <span>10秒戻る</span>
          </div>

          <!-- play / pause アイコン （大）ここから-->
          <div class="icon_play-pause__container">
            <div
              v-if="!isPlaying"
              class="audio_controller--play icon-bigger"
              @click="playAudio()"
            >
              <div class="icon_contain_circle">
                <icon-play class="icon_play" />
              </div>
            </div>

            <div
              v-else
              class="audio_controller--play icon-bigger"
              @click="pauseAudio()"
            >
              <div class="icon_contain_circle">
                <icon-pause class="icon_pause" />
              </div>
            </div>
          </div>
          <!-- play / pause アイコン （大）ここまで-->

          <div
            class="icon_proceed__container"
            @click="proceedAudioSeconds(30)"
          >
            <icon-proceed class="icon_proceed" />
            <span>30秒進む</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import IconPlay from '~/components/Atoms/Icons/IconPlay'
import IconPause from '~/components/Atoms/Icons/IconPause'
import IconProceed from '~/components/Atoms/Icons/IconProceed'
import IconUndo from '~/components/Atoms/Icons/IconUndo'

export default {
  name: 'Post',
  layout: 'user',
  components: {
    IconPlay,
    IconPause,
    IconProceed,
    IconUndo
  },
  filters: {
    convertToMinites(value) {
      if (!value) {
        return '00:00'
      }
      const minute = value > 60 ? ('00' + (value / 60).toFixed(0)).slice(-2) : '00'
      const second = ('00' + (value % 60).toFixed(0)).slice(-2)
      return `${minute}:${second}`
    }
  },
  data: () => ({
    isOpened: false,
    isPlaying: false,
    audioProgress: 0,
    audioDuration: null, // audioトータル時間
    audioCurrentTime: null, // audio 経過時間
    timerObj: null,
  }),
  computed: {
    ...mapState({
      post: store => store.post.post,
      audio: store => store.audio.audioData
    }),
    getParams() {
      return this.$route.params.id
    }
  },
  async mounted() {
    // audio data を template の audio タグ と紐付ける
    const audio = new Audio(this.audio.audio_url)
    this.$refs.audio = audio
    console.log(this.$refs)
    await audio.load()
    audio.onloadedmetadata = () => {
      this.audioDuration = audio.duration
    }

    // store に audio 情報があったら playAudio() を発火
    if(this.audio) {
      this.playAudio()
    }
  },
  beforeDestroy() {
    this.pauseAudio()
  },
  methods: {
    ...mapActions('audio',['resetAudioData']),
    playAudio() {
      if (this.isPlaying) {
        return
      }
      this.isPlaying = !this.isPlaying
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
    },
    async seekingAudio() {
      const onPlaying = this.isPlaying
      if (this.isPlaying) {
        await this.pauseAudio()
      }
      this.audioCurrentTime = (this.audioDuration * this.audioProgress) / 100
      this.$refs.audio.currentTime = this.audioCurrentTime
      if (onPlaying) {
        this.playAudio()
      }
    },
    backAudioSeconds(value) {
      if (!this.isPlaying) {
        this.isPlaying = true
        this.$refs.audio.currentTime = this.audioCurrentTime - value
        this.audioProgress =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        this.isPlaying = false
      }
      if (this.isPlaying) {
        this.$refs.audio.currentTime = this.audioCurrentTime - value
      }
    },
    proceedAudioSeconds(value) {
      if (!this.isPlaying) {
        this.isPlaying = true
        this.$refs.audio.currentTime = this.audioCurrentTime + value
        this.audioProgress =
          (this.$refs.audio.currentTime / this.$refs.audio.duration) * 100
        this.isPlaying = false
      }
      if (this.isPlaying) {
        this.$refs.audio.currentTime = this.audioCurrentTime + value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post__audio {
  margin-bottom: 2rem;
  text-align: center;

  .audio {
    width: 90%;
  }
}

.audio__wrapper {
  height: 10rem;
  background: $color-white;
  color: $dark-gray-text-color;
  border-top: 0.1rem solid $dark-gray-text-color;
  padding: 1.2rem 0.5rem 1.5rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
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
  border: #d1d1d1;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.post__title {
  margin-left: 0.7rem;
  width: 70vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.post_thumbnail__author_name {
  font-size: 1.2rem;
  line-height: 1.4rem;
}

.icon_controls__container {
  position: relative;
}

.audio_controller {
  position: absolute;
  top: .5rem;
  right: 4rem;
}

.icon_contain_circle {
  position: relative;
  background: $dark-gray-text-color;
  width: 3rem;
  height: 3rem;
  margin-top: 0.3rem;
  border-radius: 50%;
}

.icon_play {
  position: absolute;
  top: 0;
  left: 30%;
  width: 1.3rem;
}

.icon_pause {
  position: absolute;
  width: 2.2rem;
  left: 2px;
  top: 1px;
  margin-top: -0.9rem;
}

.icon_close__container {
  position: absolute;
  top: .8rem;
  right: 0rem;
  font-size: 2rem;
}

.audio--open {
  height: 28rem;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-transition-property: height; // Google Chrome、Safari向け
  -webkit-transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in-out;
}

.audio--close {
  height: 12rem;
  transition-property: height;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
  -webkit-transition-property: height;
  -webkit-transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in-out;
}

.input_range {
  width: 20rem;
  -webkit-appearance: none;
  appearance: none;
  background-color: $dark-gray-text-color;
  height: 2px;
  width: 70vw;
  border-radius: 6px;

  &__container {
    margin-bottom: 2.5rem;
  }

  &:focus,
  &:active {
    outline: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    width: 15px;
    height: 15px;
    display: block;
    background-color: $dark-gray-text-color;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    -webkit-border-radius: 50%;
  }
}

.control-audio-seconds {
  display: flex;
}

.icon_undo__container,
.icon_proceed__container {
  width: 6rem;
  height: 5rem;
}

.mask {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.modal {
  width: 100%;
  background: $color-white;
}

.icon_play-pause__container {
  margin: 1rem 2rem 0 1.7rem;
}

.icon-bigger {
  transform: scale(1.5, 1.5);
}
</style>
