<template>
  <div
    class="record__container"
    :class="{ 'record__button--active': isActiveRecord }"
  >
    <icon-loading 
      v-if="isLoading"
      class="loading_icon"
    />
    <div class="record__timer">
      {{ min | zeroPadding }}:{{ sec | zeroPadding }}
    </div>
    <record-button
      :is-active="isActiveRecord"
      @buttonClick="handleRecord"
    />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import RecordButton from '~/components/Atoms/RecordButton'
import IconLoading from '~/components/Atoms/Icons/IconLoading'
import record from '~/utils/record'
import { mapActions } from 'vuex'

const audioStorageRef = firebase.storage().ref('audio')

export default {
  head: () => ({
    script: [
      {
        src: '/record/WebAudioRecorder.min.js'
      }
    ]
  }),
  components: {
    RecordButton,
    IconLoading
  },
  filters: {
    zeroPadding(time) {
      return ('0' + time).slice(-2)
    }
  },
  data: () => ({
    isActiveRecord: false,
    isLoading: false,
    isDisabled: false,
    rawAudioData: null,
    previewAudioData: null,
    timerId: null,
    min: 0,
    sec: 0
  }),
  methods: {
    ...mapActions('post', ['addPostId', 'addAudioUrl']),
    async handleRecord() {
      // 録音状態だったら
      if (this.isActiveRecord) {
        clearInterval(this.timerId)
        await this.stopRecording()
        await this.uploadAudioData(this.rawAudioData)
        this.$router.push('/posts/new')
        return
      }
      await this.startRecording()
      this.isActiveRecord = true
      this.updateTimer()
    },
    updateTimer() {
      this.timerId = setInterval(() => {
        this.sec++
        if (this.sec >= 60) {
          this.min++
          this.sec = 0
        }
      }, 1000)
    },
    startRecording() {
      record.startRecording()
    },
    async stopRecording() {
      const res = await record.stopRecording()
      this.rawAudioData = res

      const url = URL.createObjectURL(res)
      this.previewAudioData = url
    },
    // ランダムの12桁の ID を生成する
    createId() {
      return [...Array(2)].reduce(acc => {
        return (
          acc +
          Math.random()
            .toString(32)
            .slice(-6)
            .toString()
        )
      }, '')
    },
    async uploadAudioData(data) {
      // ここでの ID がポストID & ファイル名になる
      this.isLoading = true
      if (this.isDisabled) {
        return
      }
      this.isDisabled = true
      const id = this.createId()
      const audioRef = audioStorageRef.child(id)
      await audioRef.put(data).then(snapshot => {
        console.log(`added firebase storage: ${snapshot.state}!!`)
      })
      await audioRef.getDownloadURL().then(url => {
        // store に ID と URL を追加する
        this.addPostId(id)
        this.addAudioUrl(url)
        this.isLoading = false
        this.isDisabled = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.record__container {
  width: 100%;
  height: 100vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: $background-gray;
}

.record__timer {
  font-family: 'Unica One';
  font-size: 3.5rem;
  color: $color-white;
}

.record__button--active {
  background-color: $color-brand;
}

.loading_icon {
  position: absolute;
  -webkit-animation: loading_icon 5s linear infinite;
  animation: loading_icon 5s linear infinite;
  left: 59rem;

  @include tablet() {
    left: 35.5rem;
  }

  @include mobile() {
    left: 16rem;
  }
}

@-webkit-keyframes loading_icon {
	0% { -webkit-transform: rotate(0deg); }
	100% { -webkit-transform: rotate(360deg); }
}

@keyframes loading_icon {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}
</style>
