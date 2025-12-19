const likedContainer = document.getElementById("likedSongs");
const audio = new Audio();
let currentIndex = 0;

/* PLAYER ELEMENTS */
const playerModal = document.getElementById("playerModal");
const playerCover = document.getElementById("playerCover");
const playerTitle = document.getElementById("playerTitle");
const playerArtist = document.getElementById("playerArtist");

const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

/* GET DATA */
const allSongs = JSON.parse(localStorage.getItem("allSongs")) || [];
const likedNames = JSON.parse(localStorage.getItem("likedSongs")) || [];

/* FILTER LIKED SONGS */
const likedSongs = allSongs.filter(song =>
  likedNames.includes(song.name)
);

/* LOAD SONGS */
if (likedSongs.length === 0) {
  likedContainer.innerHTML =
    "<h2 style='grid-column:1/-1;text-align:center'>No liked songs ❤️</h2>";
} else {
  likedSongs.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song-card";
    div.innerHTML = `
      <img src="${song.img}">
      <div class="song-title">${song.name}</div>
      <div class="song-artist">${song.artist}</div>
    `;
    div.onclick = () => openPlayer(index);
    likedContainer.appendChild(div);
  });
}

/* OPEN PLAYER */
function openPlayer(index) {
  currentIndex = index;
  const song = likedSongs[currentIndex];

  playerCover.src = song.img;
  playerTitle.innerText = song.name;
  playerArtist.innerText = song.artist;

  audio.src = song.src;
  audio.play();

  playerModal.classList.add("show");
}

/* CONTROLS */
function togglePlay() {
  audio.paused ? audio.play() : audio.pause();
}

function nextSong() {
  currentIndex = (currentIndex + 1) % likedSongs.length;
  openPlayer(currentIndex);
}

function prevSong() {
  currentIndex = (currentIndex - 1 + likedSongs.length) % likedSongs.length;
  openPlayer(currentIndex);
}

function closePlayer() {
  audio.pause();
  audio.currentTime = 0;
  progress.value = 0;
  currentTimeEl.innerText = "0:00";
  durationEl.innerText = "0:00";
  playerModal.classList.remove("show");
}

function goBack() {
  window.location.href = "dashboard.html";
}

/* LOAD DURATION (IMPORTANT) */
audio.addEventListener("loadedmetadata", () => {
  durationEl.innerText = formatTime(audio.duration);
});

/* UPDATE PROGRESS */
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  progress.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.innerText = formatTime(audio.currentTime);
});

/* SEEK */
progress.addEventListener("input", () => {
  if (!audio.duration) return;
  audio.currentTime = (progress.value / 100) * audio.duration;
});

/* FORMAT TIME */
function formatTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.floor(time % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}
