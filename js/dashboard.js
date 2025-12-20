const songs = [
 { name: "For A Reason", artist: "Karan Aujla", img: "covers/cover2.jpg", src: "songs/song2.mp3" },
 {name :"Sapphire",artist:"Ed Sheeran", img:"covers/cover1.jpg", src:"songs/song1.mp3"},
 {name:"Sharaat",artist:"jasmine sandlas",img:"covers/cover50.jpg",src:"songs/Shararat Dhurandhar 128 Kbps.mp3"},
 { name: "Wavy", artist: "Karan Aujla", img: "covers/cover4.jpg", src: "songs/song12.mp3" },
 { name:"Dhurandhar Title Track", artist: "Karan Aujla", img: "covers/cover5.jpg", src: "songs/Title Track Dhurandhar 128 Kbps.mp3" },
 { name: "Chammak Challo", artist: "Akon", img: "covers/cover51.jpg", src: "songs/Chammak Challo Ra One 128 Kbps.mp3" },
 { name: "Winning Speech", artist: "Karan Aujla", img: "covers/cover10.jpg", src: "songs/song10.mp3" },
 { name: "One Love", artist: "Shubh", img: "covers/cover11.jpg", src: "songs/One Love Shubh 128 Kbps.mp3" },
 {name :"Laila main Laila",artist:"Pawni Pandey", img:"covers/cover6.jpg", src:"songs/Laila Main Laila.mp3"},
 {name :"Desi Boyz",artist:"KK,Bob", img:"covers/cover7.jpg", src:"songs/song7.mp3"},
 {name: "Malhari",artist:"Vishal Dadlani",img:"covers/cover35.jpg", src:"songs/Malhari Bajirao Mastani 128 Kbps.mp3"},
 {name :"Mere Dholna",artist:"Pritam and Shreya Goshal", img:"covers/cover12.jpg", src:"songs/Mere Dholna Bhool Bhulaiyaa 128 Kbps.mp3"},
 { name: "Shaky", artist: "Sanju Rathod", img: "covers/cover13.jpg", src: "songs/Shaky (PenduJatt.Com.Se).mp3" },
 { name: "Sundari", artist: "Sanju Rathod", img: "covers/cover14.jpg", src: "songs/Sundari (PenduJatt.Com.Se).mp3" },
 { name: "Selfie Le re", artist: "Pritam,Vishal Dadlani", img: "covers/cover15.jpg", src: "songs/Selfie Le Le Re Bajrangi Bhaijaan 128 Kbps.mp3" },
 {name :"Nit Khair Manga",artist:"Rahat Fateh Ali Khan", img:"covers/cover9.jpg", src:"songs/Nit Khair Manga Raid 128 Kbps.mp3"},
 {name :"Gulabi Ankhen (SANAM)",artist:"SANAM", img:"covers/cover18.jpg", src:"songs/Gulabi Aankhen Universally Sanam 128 Kbps.mp3"},
 {name :"Suno Na Sangemarmar",artist:"Arijit singh", img:"covers/cover23.jpg", src:"songs/Suno Na Sangemarmar Youngistaan 128 Kbps.mp3"},
{name :"9:45",artist:"Prabh Singh", img:"covers/cover25.jpg", src:"songs/9_45-(Mr-Jat.in).mp3"},
{name :"Nasha",artist:"jasmine Sandlas", img:"covers/cover26.jpg", src:"songs/Nasha Raid 2 128 Kbps.mp3"},
{name :"Ved Tujha",artist:"Ajay-Atul", img:"covers/cover27.jpg", src:"songs/Ved Tujha Mp3 Song Download.mp3"},
{name :"Dil Diyan Gallan",artist:"Atif Aslam", img:"covers/cover28.jpg", src:"songs/Dil Diyan Gallan (Tiger Zinda Hai) - DjPunjab.Com.Se.mp3"},
{name :"Millionaire",artist:"Honey Singh", img:"covers/cover29.jpg", src:"songs/Millionaire Glory 128 Kbps.mp3"},
{name :"Love Dose",artist:"Honey Singh", img:"covers/cover30.jpg", src:"songs/Love Dose Desi Kalakaar 128 Kbps.mp3"},
{name :"Brown Rang",artist:"Honey Singh", img:"covers/cover31.jpg", src:"songs/Brown Rang International Villager 128 Kbps.mp3"},
{name :"Mere Rashke Qamar",artist:"Rahat Fateh Ali Khan", img:"covers/cover32.jpg", src:"songs/Mere Rashke Qamar Baadshaho 128 Kbps.mp3"},
{name :"Afgan Jalebi",artist:"Asrar", img:"covers/cover52.jpg", src:"songs/Afghan Jalebi Ya Baba Phantom 128 Kbps.mp3"},

{name :"Gali Gali",artist:"Neha Kakkar", img:"covers/cover37.jpg", src:"songs/Gali Gali.mp3"},
{name :"O Jaana Na Jaana",artist:"Kumar Sanu,Lata Mangeshkar", img:"covers/cover39.jpg", src:"songs/O Jaana Na Jaana Part 1 Jab Pyaar Kisise Hota Hai 128 Kbps.mp3"},
{name :"Khalibali",artist:"Shivam Pathak ", img:"covers/cover45.jpg", src:"songs/Khalibali Padmaavat 128 Kbps.mp3"},
{name :"Nashe Si Chadh Gayi",artist:"Arijit singh", img:"covers/cover46.jpg", src:"songs/Nashe Si Chadh Gayi Befikre 128 Kbps.mp3"},
{name :"Aaj Ki Raat",artist:"Madhubanti Bachi", img:"covers/cover49.jpg", src:"songs/Aaj Ki Raat Stree 2 128 Kbps.mp3"}
];
localStorage.setItem("allSongs", JSON.stringify(songs));

const songDiv = document.getElementById("songs");
const searchInput = document.getElementById("search");

function loadSongs(list = songs) {
  songDiv.innerHTML = "";

  if (list.length === 0) {
    songDiv.innerHTML = `
      <div class="no-song-full">
        <h1>😔</h1>
        <h2>Sorry! No songs found</h2>
        <p>Try searching with a different name</p>
      </div>
    `;
    return;
  }

  list.forEach((song, index) => {
    const div = document.createElement("div");
    div.className = "song-card";
    div.innerHTML = `
      <img src="${song.img}">
      <div class="song-title">${song.name}</div>
      <div class="song-artist">${song.artist}</div>
    `;
    div.onclick = () => openPlayer(index);
    songDiv.appendChild(div);
  });
}


searchInput.addEventListener("input", () => {
  const q = searchInput.value.toLowerCase();
  const filtered = songs.filter(song =>
    song.name.toLowerCase().includes(q) ||
    song.artist.toLowerCase().includes(q)
  );
  loadSongs(filtered);
});

loadSongs();




