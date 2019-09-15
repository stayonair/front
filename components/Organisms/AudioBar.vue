<template>
  <div>
    <div
      class="mask"
      :class="classForMask"
      @click="removeMask()"
    />
    <div class="modal" />
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
          <div class="icon_contain_circle">
            <icon-play class="icon_play" />
          </div>
        </div>

        <div
          v-else
          @click="pauseAudio()"
        >
          <icon-pause class="icon_pause" />
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
          value="0"
          @change="seekingAudio()"
        >
        {{ audioCurrentTime | showMinutes }} /
        {{ audioDuration | showMinutes }}
        <!-- <p>{{ audioCurrentTime | showMinutes }}</p> -->
        <p>{{ audioProgress | showPercents }}%</p>
        <!-- <p>{{ (audioCurrentTime * audioProgress) / 100 }}</p> -->
      </div>
      <!-- range ここまで -->

      <div class="control-audio-seconds">
        <div
          class="icon_undo__container"
          @click="backAudioSeconds(10)"
        >
          <span>10秒戻る</span>
          <icon-undo class="icon_undo" />
        </div>
        <div
          class="icon_proceed__container"
          @click="proceedAudioSeconds(30)"
        >
          <span>30秒進む</span>
          <icon-proceed class="icon_proceed" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    classForMask: 'mask--hidden',
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
        this.classForMask = 'mask--hidden'
      } else if (this.className !== 'audio--open') {
        this.className = 'audio--open'
        this.classForMask = 'mask--showed'
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
    },
    backAudioSeconds(value) {
      if (!this.isPlaying) {
        return
      }
      this.$refs.audio.currentTime = this.audioCurrentTime - value
    },
    proceedAudioSeconds(value) {
      if (!this.isPlaying) {
        return
      }
      this.$refs.audio.currentTime = this.audioCurrentTime + value
    },
    removeMask() {
      this.classForMask = 'mask--hidden'
      this.className = 'audio--close'
      this.classForRange = 'range--close'
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
  padding: 2rem 0.5rem;
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
  margin-left: 1rem;
}

.post_thumbnail__author_name {
  font-size: 1.2rem;
  line-height: 1rem;
}

.icon_contain_circle {
  position: relative;
  background: #269edd;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

.icon_play {
  position: absolute;
  top: 0;
  left: 28%;
  width: 1.5rem;
}

.icon_pause {
  margin-top: -1rem;
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
  background-color: $dark-gray-text-color;
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
    width: 15px;
    height: 15px;
    display: block;
    background-color: $dark-gray-text-color;
    background: rgba(0, 0, 0, 0.7);
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

.control-audio-seconds {
  display: flex;
}

.icon_undo__container,
.icon_proceed__container {
  width: 7rem;
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

.mask--hidden {
  display: none;
}

.mask--showed {
  display: block;
}
</style>
