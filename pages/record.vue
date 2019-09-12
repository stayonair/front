<template>
  <div
    class="record__container"
    :class="{ 'record__button--active': isActiveRecord }"
  >
    <div class="record__timer">
      {{ min | zeroPadding }}:{{ sec | zeroPadding }}
    </div>
    <record-button
      :is-active="isActiveRecord"
      @buttonClick="handleRecord"
    />

    <audio
      v-if="previewAudioData"
      :src="previewAudioData"
      controls
    />
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'
import RecordButton from '~/components/Atoms/RecordButton'
import record from '~/utils/record'
import { mapActions } from 'vuex'

const storageRef = firebase.storage().ref()

export default {
  components: {
    RecordButton
  },
  filters: {
    zeroPadding(time) {
      return ('0' + time).slice(-2)
    }
  },
  data: () => ({
    isActiveRecord: false,
    rawAudioData: null,
    previewAudioData: null,
    downloadAudioUrl: null,
    timerId: null,
    min: 0,
    sec: 0
  }),
  methods: {
    ...mapActions('post', ['addAudioUrl']),
    async handleRecord() {
      // 録音状態だったら
      if (this.isActiveRecord) {
        this.isActiveRecord = false
        clearInterval(this.timerId)
        await this.stopRecording()
        await this.uploadAudioData(this.rawAudioData)
        return
      }
      this.isActiveRecord = true
      this.updateTimer()
      this.startRecording()
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
      record.recStart()
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
      // ここでの12桁の ID がファイル名になる
      const audioRef = storageRef.child(this.createId())
      await audioRef.put(data).then(snapshot => {
        console.log(`added firebase storage: ${snapshot.state}!!`)
      })
      await audioRef.getDownloadURL().then(url => {
        this.downloadAudioUrl = url
        // Vuex に URL を追加する
        this.addAudioUrl(this.downloadAudioUrl)
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
</style>
