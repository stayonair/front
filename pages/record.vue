<template>
  <div class="record__container">
    <div class="record__timer">
      01:30
    </div>
    <record-button @buttonClick="handleRecord" />
  </div>
</template>

<script>
import RecordButton from '~/components/Atoms/RecordButton'

export default {
  components: {
    RecordButton
  },
  methods: {
    handleRecord() {
      console.log('録音ボタン')
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
</style>