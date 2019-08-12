<template>
  <div
    class="record__container"
    :class="{ active: isActiveRecord }"
  >
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
import RecordButton from '~/components/Atoms/RecordButton'

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
    timerId: null,
    min: 0,
    sec: 0
  }),

  methods: {
    handleRecord() {
      // 録音状態だったら
      if (this.isActiveRecord) {
        this.isActiveRecord = false
        clearInterval(this.timerId)
        this.stopRecording()
        return
      }
      this.isActiveRecord = true
      this.updateTimer()
      this.startRecording()

      // 背景、ボタンのスタイルを変更
      // タイマーのスタート
      // レコーディング開始
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
      console.log('録音スタート♪')
    },
    stopRecording() {
      console.log('録音ストップ！！')
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

.active {
  background-color: $color-primary;
}
</style>
