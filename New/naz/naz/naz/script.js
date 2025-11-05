// script.js dosyasının tamamı

// --- 🛑 ÖNEMLİ: BURAYI DÜZENLEYİN 🛑 ---

// 1. Arkadaşınızın adını buraya yazın
const friendName = "Beyza";

// 2. Doğum günü tarihi ve saati 
const birthdayTime = new Date(2025, 9, 30, 17, 0, 0).getTime(); 

// 3. Varsayılan Fotoğraflar
const defaultPhotos = [
 "https://i.imgur.com/FSfch1C.png", 
 "https://i.imgur.com/15bvPdC.png", 
 "https://i.imgur.com/7M450uB.png",
 "https://i.imgur.com/wzA9fHK.png",
 "https://i.imgur.com/q3AZfQv.png",
 "https://i.imgur.com/RcpoU83.png",
 "https://i.imgur.com/b2kgblN.png",
 "https://i.imgur.com/UgEJZw3.png",
 "https://i.imgur.com/xLjWqMD.png",
]

// --- ⚙️ AYARLAR ⚙️ ---
const AUTO_SLIDE_INTERVAL = 5000; 
const DEFAULT_ACCENT_COLOR = '#bb86fc';
const DEFAULT_BG_COLOR = '#121212';
const YOUTUBE_VIDEO_ID = 'AYnojfDGgwI'; 
const LOCAL_STORAGE_KEY = 'user_surprise_photos'; // LocalStorage anahtarı

// ------------------------------------------
// HTML Elementleri ve Global Değişkenler
const startButtonScreen = document.getElementById('startButtonScreen');
const countdownContainer = document.getElementById('countdown-container'); 
const startButton = document.getElementById('startButton');
const birthdayScreen = document.getElementById('birthdayContent');
const birthdayTitle = document.getElementById('birthdayTitle');
const photoTrack = document.getElementById('photo-track');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const pauseMusicBtn = document.getElementById('pauseMusicBtn');
const playMusicBtn = document.getElementById('playMusicBtn');
const photoUploader = document.getElementById('photoUploader'); 
const backgroundUploader = document.getElementById('backgroundUploader'); 
const bodyElement = document.body; 
const settingsToggleBtn = document.getElementById('settingsToggleBtn');
const settingsPanel = document.getElementById('settingsPanel');
const bgColorPicker = document.getElementById('bgColorPicker');
const themeColorPicker = document.getElementById('themeColorPicker');
const resetBgBtn = document.getElementById('resetBgBtn');
const overlay = document.getElementById('overlay'); 

// ⭐️ YENİ: Fotoğraf Yöneticisi Elementleri
const photoManagerContainer = document.getElementById('photo-manager-container');
const resetPhotosBtn = document.getElementById('resetPhotosBtn');

let player; 
let currentSlide = 0;
let photos = []; // ⬅️ Başlangıçta boş, LocalStorage'dan yüklenecek
let isPlayerReady = false;
let userClickedStart = false;
let slideInterval; 
let countdownInterval; 
let slides = []; 

// ------------------------------------------
// LOCAL STORAGE FONKSİYONLARI
// ------------------------------------------

function loadPhotosFromLocalStorage() {
    let loadedPhotos = [];
    const storedPhotos = localStorage.getItem(LOCAL_STORAGE_KEY);
    
    // Önce varsayılanları ekle
    loadedPhotos.push(...defaultPhotos);
    
    if (storedPhotos) {
        try {
            // Sonra kullanıcının kaydettiği (Base64) fotoğrafları ekle
            const userUploadedPhotos = JSON.parse(storedPhotos);
            loadedPhotos.push(...userUploadedPhotos);
        } catch (e) {
            console.error("LocalStorage verisi bozuk.", e);
        }
    }
    return loadedPhotos;
}

function savePhotosToLocalStorage() {
    // Sadece kullanıcının yüklediği (Base64) fotoğrafları kaydet
    const userUploadedPhotos = photos.filter(url => url.startsWith('data:image/'));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userUploadedPhotos));
}

// ------------------------------------------
// YOUTUBE VE MÜZİK FONKSİYONLARI
// ------------------------------------------
function onYouTubeIframeAPIReady() {
 player = new YT.Player('player', {
  height: '0', width: '0', videoId: YOUTUBE_VIDEO_ID,
  playerVars: {
   'autoplay': 0, 'controls': 0, 'loop': 1, 'playlist': YOUTUBE_VIDEO_ID, 
   'disablekb': 1, 'modestbranding': 1, 'showinfo': 0, 'fs': 0, 'iv_load_policy': 3
  },
  events: { 'onReady': onPlayerReady }
 });
}
function onPlayerReady(event) {
 isPlayerReady = true;
 if ((birthdayTime - new Date().getTime()) < 0) {
  event.target.mute(); event.target.seekTo(22, true); event.target.playVideo();
 }
}
function playMusic() {
 if (isPlayerReady) {
  player.unMute(); player.playVideo();
  pauseMusicBtn.classList.remove('hidden'); playMusicBtn.classList.add('hidden');
 }
}
function pauseMusic() {
 if (isPlayerReady) {
  player.mute(); player.pauseVideo();
  pauseMusicBtn.classList.add('hidden'); playMusicBtn.classList.remove('hidden');
 }
}
function startSurprise() {
 userClickedStart = true;
 startButtonScreen.classList.add('hidden'); 
    startButtonScreen.style.display = 'none'; 
 birthdayScreen.classList.remove('hidden');
 
 birthdayTitle.innerHTML = `İyi ki Doğdun ${friendName}! 💖`;
 playMusic();
 document.querySelector('.music-controls').classList.add('visible');
 
 setupSlider();
 startAutoSlide();
}


// ------------------------------------------
// GERİ SAYIM MANTIĞI
// ------------------------------------------
function updateCountdown() {
    const now = new Date().getTime();
    const distance = birthdayTime - now;
    
    if (distance < 0) {
        if (countdownContainer.classList.contains('hidden') && !startButtonScreen.classList.contains('hidden')) {
             return;
        }
        clearInterval(countdownInterval);
        countdownContainer.classList.add('hidden'); 
        startButtonScreen.classList.remove('hidden'); 
        
        if (isPlayerReady && !userClickedStart) {
   player.mute(); player.seekTo(22, true); player.playVideo();
  }
        return;
    }
 const days = Math.floor(distance / (1000 * 60 * 60 * 24));
 const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
 const seconds = Math.floor((distance % (1000 * 60)) / 1000);

 document.getElementById('days').innerText = days;
 document.getElementById('hours').innerText = hours;
 document.getElementById('minutes').innerText = minutes;
 document.getElementById('seconds').innerText = seconds;
}
updateCountdown();
countdownInterval = setInterval(updateCountdown, 1000); 


// ------------------------------------------
// SLAYT VE YÜKLEME FONKSİYONLARI
// ------------------------------------------
function setupSlider() {
    photoTrack.innerHTML = '';
    slides = []; 
    
    photos.forEach(url => {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const img = document.createElement('img');
        img.src = url;
        img.alt = "Anı Fotoğrafı";
        slide.appendChild(img);
        photoTrack.appendChild(slide);
        slides.push(slide); 
    });

    currentSlide = 0; 
    showSlide(currentSlide); 
}

function showSlide(index) {
    if (slides.length === 0) return;
    if (index >= slides.length) { currentSlide = 0; }
    else if (index < 0) { currentSlide = slides.length - 1; }
    else { currentSlide = index; }

    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');

    resetAutoSlide(); 
}

function startAutoSlide() {
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, AUTO_SLIDE_INTERVAL);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    if (userClickedStart) { 
        startAutoSlide();
    }
}

// ⭐️ GÜNCELLENDİ: handlePhotoUpload (Base64'e çevirir)
function handlePhotoUpload(event) {
    const files = Array.from(event.target.files);
    let filesProcessed = 0;
    
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            photos.push(e.target.result); // Base64 verisini ekle
            filesProcessed++;
            
            // Eğer tüm dosyalar işlendiyse güncelle ve kaydet
            if (filesProcessed === files.length) {
                savePhotosToLocalStorage();
                setupSlider(); 
                populatePhotoManager(); // Ayar panelini de güncelle
            }
        };
        reader.readAsDataURL(file); // Dosyayı Base64 olarak oku
    });
}

function handleBackgroundUpload(event) {
 const file = event.target.files[0];
 if (!file) return;
 const bgUrl = URL.createObjectURL(file);
 bodyElement.classList.add('custom-bg');
 bodyElement.style.backgroundImage = `url('${bgUrl}')`;
    bodyElement.style.backgroundColor = ''; 
    settingsPanel.classList.remove('visible');
    overlay.classList.remove('visible'); 
}

function handleBgColorChange(event) {
    const newColor = event.target.value;
    bodyElement.style.backgroundColor = newColor;
    bodyElement.classList.remove('custom-bg');
    bodyElement.style.backgroundImage = '';
}

function handleThemeColorChange(event) {
    const newColor = event.target.value;
    document.documentElement.style.setProperty('--accent-color', newColor);
}

function handleResetBackground() {
    bodyElement.classList.remove('custom-bg');
    bodyElement.style.backgroundImage = '';
    bodyElement.style.backgroundColor = ''; 
    bgColorPicker.value = DEFAULT_BG_COLOR;
    themeColorPicker.value = DEFAULT_ACCENT_COLOR;
    document.documentElement.style.setProperty('--accent-color', DEFAULT_ACCENT_COLOR);
    settingsPanel.classList.remove('visible');
    overlay.classList.remove('visible'); 
}

// ------------------------------------------
// ⭐️ YENİ: FOTOĞRAF YÖNETİCİSİ FONKSİYONLARI ⭐️
// ------------------------------------------

function populatePhotoManager() {
    photoManagerContainer.innerHTML = '';
    
    if (photos.length === 0) {
        photoManagerContainer.innerText = "Yüklü fotoğraf yok.";
        return;
    }

    photos.forEach((photoUrl, index) => {
        const thumbWrapper = document.createElement('div');
        thumbWrapper.className = 'thumbnail';
        
        const img = document.createElement('img');
        img.src = photoUrl;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = 'X';
        deleteBtn.onclick = () => handleDeletePhoto(index);
        
        thumbWrapper.appendChild(img);
        thumbWrapper.appendChild(deleteBtn);
        photoManagerContainer.appendChild(thumbWrapper);
    });
}

function handleDeletePhoto(index) {
    photos.splice(index, 1); // Fotoğrafı global diziden sil
    savePhotosToLocalStorage(); // LocalStorage'ı güncelle
    setupSlider(); // Ana slider'ı yeniden kur
    populatePhotoManager(); // Ayar panelindeki listeyi yeniden kur
}

function handleResetPhotos() {
    // Sadece varsayılan fotoğrafları bırak
    photos = [...defaultPhotos]; 
    localStorage.removeItem(LOCAL_STORAGE_KEY); // Kayıtlı olanları sil
    setupSlider(); 
    populatePhotoManager(); 
}


// ------------------------------------------
// OLAY DİNLEYİCİLERİ VE BAŞLATMA
// ------------------------------------------

startButton.addEventListener('click', startSurprise);
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1)); 
prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
pauseMusicBtn.addEventListener('click', pauseMusic);
playMusicBtn.addEventListener('click', playMusic);

photoUploader.addEventListener('change', handlePhotoUpload);
backgroundUploader.addEventListener('change', handleBackgroundUpload);

// Ayar menüsü açıldığında fotoğraf yöneticisini doldur
settingsToggleBtn.addEventListener('click', () => {
    populatePhotoManager(); // ⭐️ YENİ: Menü açılmadan önce listeyi doldur
    settingsPanel.classList.toggle('visible');
    overlay.classList.toggle('visible');
});

overlay.addEventListener('click', () => {
    settingsPanel.classList.remove('visible');
    overlay.classList.remove('visible');
});

bgColorPicker.addEventListener('input', handleBgColorChange);
themeColorPicker.addEventListener('input', handleThemeColorChange);
resetBgBtn.addEventListener('click', handleResetBackground);
resetPhotosBtn.addEventListener('click', handleResetPhotos); // ⭐️ YENİ


document.addEventListener('DOMContentLoaded', () => {
    // Sayfa yüklendiğinde fotoğrafları yükle
    photos = loadPhotosFromLocalStorage();
    
    // Varsayılan renkleri ayarla
    bgColorPicker.value = DEFAULT_BG_COLOR;
    themeColorPicker.value = DEFAULT_ACCENT_COLOR;
    document.documentElement.style.setProperty('--accent-color', DEFAULT_ACCENT_COLOR);
    document.documentElement.style.setProperty('--bg-color-dark', DEFAULT_BG_COLOR);
});