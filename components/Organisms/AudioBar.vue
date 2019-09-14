<template>
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
          <div class="icon_contain_circle">
            <icon-play class="icon_play" />
          </div>
          <!-- <icon-play classç="icon_play" /> -->
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
          @change="seekingAudio()"
        >
        {{ audioCurrentTime | showMinutes }} /
        {{ audioDuration | showMinutes }}
        <!-- <p>{{ audioCurrentTime | showMinutes }}</p> -->
        <p>{{ audioProgress | showPercents }}%</p>
        <!-- <p>{{ (audioCurrentTime * audioProgress) / 100 }}</p> -->
      </div>
      <!-- range ここまで -->
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import IconPlay from '~/components/Atoms/Icons/IconPlay'
import IconPause from '~/components/Atoms/Icons/IconPause'

export default {
  name: 'Post',
  layout: 'user',
  components: {
    IconPlay,
    IconPause
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
  padding: 1rem 0.5rem;
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
  border: #D1D1D1;
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
  background: #269EDD;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

}

.icon_play {
  position: absolute;
  top: 0;
  left: 28%;
  width: 2rem;
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

  // &::-webkit-slider-thumb {
  //   -webkit-appearance: none;
  //   appearance: none;
  //   cursor: pointer;
  //   position: relative;
  //   width: 15px;
  //   height: 15px;
  //   display: block;
  //   // background-color: $dark-gray-text-color;
  //   background: rgba(0,0,0,0.3);
  //   border-radius: 50%;
  //   -webkit-border-radius: 50%;
  // }
  input[type="range"].custom {
	-webkit-appearance: none;
	appearance: none;
	background: rgba(0,0,0,0.3);
	height:5px;
	width: 400px;
    position:absolute;
    left:32px;
    &:focus {
	    outline:none;
    }
    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        appearance: none;
        background: #008ee0;
        width: 30px;
        height: 30px;
        border-radius:20px;
        cursor:pointer;
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        margin-bottom: 2px;
    }
  }
}

.range--open {
  display: block;
}

.range--close {
  display: none;
}
</style>