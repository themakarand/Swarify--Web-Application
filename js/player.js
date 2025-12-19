let currentIndex = 0;
const audio = new Audio();

/* PROGRESS ELEMENTS */
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

/* OPEN PLAYER */
function openPlayer(index) {
  currentIndex = index;
  const song = songs[currentIndex];

  document.getElementById("playerCover").src = song.img;
  document.getElementById("playerTitle").innerText = song.name;
  document.getElementById("playerArtist").innerText = song.artist;

  audio.src = song.src;
  audio.play();
   updateLikeUI();
  document.getElementById("playerModal").classList.add("show");
}

/* PLAY / PAUSE */
function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* NEXT SONG */
function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  openPlayer(currentIndex);
}

/* PREVIOUS SONG */
function prevSong() {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  openPlayer(currentIndex);
}

/* CLOSE PLAYER */
function closePlayer() {
  audio.pause();
  audio.currentTime = 0;
  progress.value = 0;
  currentTimeEl.innerText = "0:00";
  durationEl.innerText = "0:00";
  document.getElementById("playerModal").classList.remove("show");
}

/* UPDATE PROGRESS BAR */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;

  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration);
});

/* SEEK SONG */
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* FORMAT TIME mm:ss */
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

let likedSongs = JSON.parse(localStorage.getItem("likedSongs")) || [];

/* CHECK LIKE STATUS WHEN SONG OPENS */
function updateLikeUI() {
  const btn = document.getElementById("likeBtn");
  const songName = songs[currentIndex].name;

  if (likedSongs.includes(songName)) {
    btn.classList.add("liked");
    btn.innerText = "❤️";
  } else {
    btn.classList.remove("liked");
    btn.innerText = "🤍";
  }
}

/* TOGGLE LIKE */
function toggleLike() {
  const songName = songs[currentIndex].name;
  const btn = document.getElementById("likeBtn");

  if (likedSongs.includes(songName)) {
    likedSongs = likedSongs.filter(name => name !== songName);
    btn.innerText = "🤍";
    btn.classList.remove("liked");
  } else {
    likedSongs.push(songName);
    btn.innerText = "❤️";
    btn.classList.add("liked");
  }

  localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
}

