$(document).ready(function(){
  //Grabs elements for video
  var video = document.getElementById('video');

  //Get access to camera
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
          video.src = window.URL.createObjectURL(stream);
          video.play();
      });
  }

  //Snapshot elements
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var video = document.getElementById('video');

  // Trigger photo take
  document.getElementById("snap").addEventListener("click", function() {
  	context.drawImage(video, 0, 0, 640, 480);
  });
});
