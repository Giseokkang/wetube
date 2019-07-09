const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("video");
const playBtn = document.getElementById("jsPlayBtn");
const volumnBtn = document.getElementById("jsVolumnBtn");
const expandBtn = document.getElementById("jsExpandBtn");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumnClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumnBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumnBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
  expandBtn.addEventListener("click", goFullScreen);
  document.webkitExitFullscreen();
}

function goFullScreen() {
  videoContainer.requestFullscreen();
  expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
  expandBtn.removeEventListener("click", goFullScreen);
  expandBtn.addEventListener("click", exitFullScreen);
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("click", handlePlayClick);
  volumnBtn.addEventListener("click", handleVolumnClick);
  expandBtn.addEventListener("click", goFullScreen);
  expandBtn.addEventListener("click", exitFullScreen);
  videoPlayer.play();
}

if (videoPlayer) {
  init();
}
