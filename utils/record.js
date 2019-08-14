// if (!navigator.mediaDevices) {
//   alert("mediaDevices is unavailable")
// }
 
let mediaRecorder = null
let localstream = {}

function recStart() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      localstream = stream;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
    })
    .catch(function(e){
      console.log(e);
    })
}

function stopRecording() {
  return new Promise((resolve) => {
    mediaRecorder.stop()
    mediaRecorder.ondataavailable = function(e) {
      resolve(e.data)
    }
    localstream.getTracks().forEach(track => track.stop())
  })
}

const record = {
  recStart,
  stopRecording
}

export default record