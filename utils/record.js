let mediaRecorder // WebAudioRecorder object
let localStream // stream from getUserMedia()
let mediaStreamSorce // MediaStreamAudioSourceNode

// 録音開始時
const startRecording = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(stream => {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      const audioContext = new AudioContext({ sampleRate: 22000 }) // sampleRare = 22000 kHz

      localStream = stream
      mediaStreamSorce = audioContext.createMediaStreamSource(stream)

      mediaRecorder = new WebAudioRecorder(mediaStreamSorce, {
        workerDir: '/record/',
        encoding: 'mp3',
        numChannels: 2 // 2 is the default, mp3 encoding supports only 2
      })

      mediaRecorder.setOptions({
        timeLimit: 1200, // Maximum record time(seconds)
        mp3: { bitRate: 192 }, // bitRate for mp3 encording
        encodeAfterRecord: true
      })

      mediaRecorder.startRecording()
    })
    .catch(e => {
      console.error(e)
    })
}

// 録音停止時
const stopRecording = () => {
  return new Promise(resolve => {
    localStream.getAudioTracks()[0].stop()
    mediaRecorder.finishRecording()
    mediaRecorder.onComplete = (_, blob) => {
      resolve(blob)
    }
  })
}

const record = {
  startRecording,
  stopRecording
}

export default record
