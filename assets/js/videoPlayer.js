const videoPlayer = document.querySelector("video");
const playBtn = document.getElementById("jsPlayBtn");
const volumnBtn = document.getElementById("jsVolumnBtn");
const expandBtn = document.getElementById("jsExpandBtn");

function handleExpandClick() {
  if (videoPlayer.requestFullscreen) {
    videoPlayer.requestFullscreen();
  }
  if (document.exitFullscreen) {
    document.exitFullscreen();
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

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("click", handlePlayClick);
  volumnBtn.addEventListener("click", handleVolumnClick);
  expandBtn.addEventListener("click", handleExpandClick);
  videoPlayer.play();
}

if (videoPlayer) {
  init();
}
