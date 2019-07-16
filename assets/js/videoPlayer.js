import { conditionalExpression } from "babel-types";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("video");
const playBtn = document.getElementById("jsPlayBtn");
const volumeBtn = document.getElementById("jsVolumeBtn");
const expandBtn = document.getElementById("jsExpandBtn");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeBar = document.getElementById("jsvolumeBar");

let timeout;
let isHidden = false;

function registerView() {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
}

const handleMouse = () => {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (!isHidden) {
      videoPlayer.style.cursor = "none";
      isHidden = true;
    }
  }, 3000);
  if (isHidden) {
    videoPlayer.style.cursor = "default";
    isHidden = false;
  }
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function volumeBtninner() {
  if (videoPlayer.volume === 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (videoPlayer.volume <= 0.3) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (videoPlayer.volume <= 1) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeBar.value = videoPlayer.volume;
    volumeBtninner();
  } else {
    volumeBar.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  expandBtn.innerHTML = '<i class="fas fa-expand"></i>';
  expandBtn.addEventListener("click", goFullScreen);
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
  expandBtn.innerHTML = '<i class="fas fa-compress"></i>';
  expandBtn.removeEventListener("click", goFullScreen);
  expandBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

function setTotalTime() {
  const totalTimeString = videoPlayer.duration;
  totalTime.innerHTML = formatDate(totalTimeString);
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag() {
  videoPlayer.volume = volumeBar.value;
  volumeBtninner();
}

const handleKeyCode = e => {
  if (e.keyCode === 32) {
    e.preventDefault();
    if (videoPlayer.paused) {
      videoPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  if (e.keyCode === 38) {
    e.preventDefault();
    volumeBar.value += 0.1;
    videoPlayer.volume = volumeBar.value;
    console.log(volumeBar.value);
  }
  if (e.keyCode === 40) {
    e.preventDefault();
    volumeBar.value -= 0.1;
    videoPlayer.volume = volumeBar.value;
    console.log(volumeBar.value);
  }
};

function init() {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  expandBtn.addEventListener("click", goFullScreen);
  expandBtn.addEventListener("click", exitFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeBar.addEventListener("input", handleDrag);
  window.addEventListener("keydown", handleKeyCode);
  videoPlayer.addEventListener("mousemove", handleMouse);
  videoPlayer.addEventListener("dblclick", goFullScreen);
  videoPlayer.addEventListener("dblclick", exitFullScreen);
}

if (videoContainer) {
  init();
}
